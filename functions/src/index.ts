import * as functions from 'firebase-functions';
import { forEach } from '@angular/router/src/utils/collection';
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

const csv = require('csv-parser')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const cors = require('cors')(corsOptions);
const sgMail = require('@sendgrid/mail');

const sendgrid_key = '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';
const gcs = require('@google-cloud/storage')();


sgMail.setApiKey(sendgrid_key);


export const upload = functions.https.onRequest(async (req, res) => {
    console.log('upload triggered');
    
    return cors(req, res, async () => {
        
        let results = [];
        const file = gcs.bucket('mailing-dev-80dc9.appspot.com').file('/upload/excel/file');
        const readStream = file.createReadStream();
        res.setHeader("content-type", "application/excel");
        readStream.pipe(csv(['email', 'name']))
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                res.json(results).end();
                console.log(results);               
            });
    });
});

export const uploadfile = functions.https.onRequest(async (req, res) => {
    console.log('upload triggered');
    
    return cors(req, res, async () => {
        
        let results = [];
        const file = gcs.bucket('mailing-dev-80dc9.appspot.com').file('/upload/excel/file');
        const readStream = file.createReadStream();
        res.setHeader("content-type", "application/excel");
        readStream.pipe(csv(['email', 'name']))
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                saveEmail(req.body.ref, results).then(() => {
                    res.json({success: true}).end();

                }).catch(err => {
                    res.json({success: false, message: err.message}).end();
                })
                console.log(results);
               
            });
    });
});

const saveEmail = function(ref, csv) {

    return new Promise((resolve, rejected) => {
        db.collection(`emails`).doc(ref).get().then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
              rejected({message: 'No such document!'});
            } else {
              console.log('Document data:', doc.data());
      
              let mergedEmails = new Map<string, any>();
      
              let data = doc.data();

              console.log('data===', doc.data());
              csv.map(i => {
                  mergedEmails.set(i.email, i);
              });
      
              data.list.map(i => {
                  mergedEmails.set(i.email, i);
              });

              let list = Array.from(mergedEmails.values());
              data.list = JSON.parse(JSON.stringify(list));
              console.log('updated after====', data);
              db.collection('emails').doc(ref).set(data).then(() => {
                  resolve();
              });
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
            rejected({message: err.message});
          });
    });
    
}

export const sendemail = functions.https.onRequest(async (req, res) => {
    console.log('send email');
    
    return cors(req, res, async () => {
        
        const msg = {
            to: req.body.email,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.content,
            html: req.body.content,
        };

        console.log('msg', msg);
        sgMail.send(msg).then((mailres) => {
            
            console.log('mailres.errorcode', mailres[0].statusCode);
            if(mailres[0].statusCode >= 200 && mailres[0].statusCode < 400)
                res.json({status: 'sent', code: mailres[0].statusCode}).end();
            else {
                res.json({status: 'fail', code: mailres[0].statusCode}).end();
            }
        }).catch(error => {
            res.json({status: 'server fail', code: 500}).end();
        });
    });
});

export const sendemails = functions.https.onRequest(async (req, res) => {
    console.log('send emails');
    
    return cors(req, res, async () => {
        
        const ref = req.body.emailGroupId; 
        // Get collection with emailGroupId
        db.collection(`emails`).doc(ref).get().then(doc=>{
            if (!doc.exists) {
                console.log('No such document!');
                res.json({status: 'fail', code: 'No such document!'}).end();
              }
            else{
                console.log('Document data:', doc.data());
          
                let data = doc.data();

                // Save History Collection

                let newHistory = db.collection("histories").doc();

                let newHistoryDoc = {
                    list: data.list,
                    from: req.body.from,
                    subject: req.body.subject,
                    text: req.body.content,
                    html: req.body.content,
                    created_at: new Date().toISOString()
                }

                // Get emails in list field
        
                let promisall = [];
            
                data.list.forEach((email, key) => {
                    const msg = {
                        to: email,
                        from: req.body.from,
                        subject: req.body.subject,
                        text: req.body.content,
                        html: req.body.content,
                    };
                    
                    // Send msg to each email

                    promisall.push(new Promise((resolve, reject) => {
                        sgMail.send(msg).then((mailres) => {
            
                            console.log('mailres.errorcode', mailres[0].statusCode);
                            if(mailres[0].statusCode >= 200 && mailres[0].statusCode < 400){
                                console.log('here');
                                newHistoryDoc.list[key].sent = 'sent';
                                //res.json({status: 'sent', code: mailres[0].statusCode}).end();
                            }
                            else {
                                console.log('here');
                                newHistoryDoc.list[key].sent = 'fail';
                                //res.json({status: 'fail', code: mailres[0].statusCode}).end();
                            }
                            resolve();
                        }).catch(error => {
                            newHistoryDoc.list[key].sent = 'server fail';
                            //res.json({status: 'server fail', code: 500}).end();
                            resolve();
                        }); 
                        

                    }));


                });

                Promise.all(promisall).then(() => {
                    console.log('newHistory', newHistoryDoc);
                    newHistory.set(newHistoryDoc);

                    res.json({status: 'success'}).end();
                }).catch((error) => {
                    res.json({status: 'success', message: error.message}).end();
                }) 
                
            }
        })
    });
});