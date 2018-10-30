import { Component, AfterViewInit, ViewChild, OnInit  } from '@angular/core';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild('file') file;

  public files: Set<File> = new Set();

  /**
   * Total number of operations
   */
  total: number = 0;

  /**
   * The number of completed operations
   */
  sub: number = 0;

  /**
   * Email Subject
   */
  subject = 'Subject is here';

  /**
   * From email
   */
  from = 'info@test.com';

  /**
   * Email content
   */
  content = '';

  /**
   * Firestore Database emails
   */
  dbEmails: any[] =[];

  /**
   * Excel emails
   */
  excelEmails: any[] = [];

  /**
   * Merged emails
   */
  mergedEmails: Map<string, any> = new Map();


  public constructor(private groupService: GroupService) {

  }

  ngOnInit() {

    // getting the group data

    this.groupService.getDemoGroup('demo').subscribe((data: any) => {

      
      this.dbEmails = data.list;
      this.getMergedEmails();
    });

  }


  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;

    this.files.clear();
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    if(this.file.nativeElement.files.length != 0) {

      console.log(this.file.nativeElement.files[0]);
      this.groupService.uploadFile(this.file.nativeElement.files[0]).then(data => {
        this.excelEmails = data;

        this.getMergedEmails();
      });
    }
  }

  getMergedEmails() {
    this.mergedEmails.clear();
    
    this.dbEmails.map(i => {
      this.mergedEmails.set(i.email, i);
    });

    this.excelEmails.map(i => {
      this.mergedEmails.set(i.email, i);
    });

    return this.mergedEmails
  }

  getKeys(map){
    return Array.from(map.keys());
  }

  getStatus(val) {
    if(val.status == 'sent')
      return 'sent';
    else if (val.status == 'fail')
      return 'fail'
    else if (val.status == 'server fail')
      return 'server fail'
    else 

      return '';
  }

  getValid(val) {
    if(val.valid == 'valid')
      return 'valid';
    else if (val.valid == 'invalid')
      return 'invalid'
    else if (val.valid == 'error')
      return 'error'
    else
      return 'new'
  }

  getValidClass(val) {
    if(val.valid == 'valid')
      return 'bg-yellow';
    else if (val.status == 'invalid')
      return 'bg-red'
    else 
      return 'bg-red'
  }

  getStatusClass(val) {
    if(val.status == 'sent')
      return 'bg-yellow';
    else if (val.status == 'fail')
      return 'bg-red'
    else 
      return 'bg-red'
  }

  /**
   * Email Validation
   */
  validate() {

    this.total = this.mergedEmails.size;

    this.sub = 0;
    let promises = [];
    this.mergedEmails.forEach((val, key) => {
      promises.push(this.groupService.validateEmail(val.email).then(status => {
        if(status == undefined) {
          val.valid = 'error';
        } else {
          val.valid = status;
        }
        this.sub++
      }));
    })

    Promise.all(promises).then(() => {
      
      let payload = {list: Array.from( this.mergedEmails.values() )};


      //console.log(this.mergedEmails.values());
      this.groupService.saveGroup('demo', payload)
    });

  }

  /**
   * Sending email
   */
  sendEmail() {
    // 
    if(this.subject == '' || this.from == '' || this.content == '') {
      alert('Please input data!');
      return;
    }

    
    let promises = [];
    this.total = this.mergedEmails.size;
    this.sub = 0;

    this.mergedEmails.forEach((val, key) => {
      if(val.valid == 'valid') {
        promises.push(this.groupService.sendEmail(val.email, this.from, this.subject, this.content).then((status : any) => {

          console.log('status', status);
          val.status = status.status;
          this.sub++;
        }, (error) => {
          console.log('error', error);
          val.status = 'error';
          this.sub++;
        }));
      }
    })

    Promise.all(promises).then(() => {
      let payload = {list: Array.from( this.mergedEmails.values() )};
      this.groupService.saveGroup('demo', payload)
    });
  }
}
