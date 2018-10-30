import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(public af: AngularFireDatabase, public fireAuth: AngularFireAuth) { }

  /**
   * 
   * @param email 
   * @param password 
   */

  signIn(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
                .then((data) => {
                    console.log(data);
                    resolve();
                }, (error) => {
                    var errorMessage;
                    switch (error.code) {
                        case 'auth/invalid-email':
                            errorMessage = 'Sorry, the email is invalid';
                            break;
                        case 'auth/wrong-password':
                            errorMessage = 'Incorrect Password.';
                            break;
                        case 'auth/user-not-found':
                            errorMessage = 'Account isn`t found, please create one.';
                            break;
                        case 'auth/argument-error':

                            errorMessage = 'Undefined Error. Probably missing data.';
                            break;
                        case 'auth/network-request-failed':
                            errorMessage = 'No Internet Access. Please try when you have a 4G Connection';
                            break;
                        case 'auth/user-disabled':
                            errorMessage = 'Sorry, your account is disabled';
                            break;
                        default:
                            errorMessage = error;
                            break;
                    }
                    alert(errorMessage);
                    reject(errorMessage);
                });
        
    })
  }

}
