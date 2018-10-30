import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-post',
  templateUrl: './group-post.component.html',
  styleUrls: ['./group-post.component.css']
})
export class GroupPostComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  desc = '';
  content = '';

  @ViewChild('file') file;

  group: any = {
    name: '',
    description: '',
    list: [],
    ref: null
  };

  isNew = false;

  /**
   * The group id edited.
   */
  ref: any = null;

  total = 0;
  sub = 0;

  constructor(private formBuilder: FormBuilder, 
    private groupService: GroupService, 
    private route: ActivatedRoute,
    private router: Router) { 
        
  }

  ngOnInit() {
    this.ref = this.route.snapshot.paramMap.get('id');
    if(this.ref) {
      this.groupService.getGroup(this.ref).subscribe(data => {
        this.group = data;
      });
      
    }
  }

  uploadFile() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    
    if(this.file.nativeElement.files.length != 0) {
      this.groupService.uploadFile2(this.group.ref, this.file.nativeElement.files[0]).then(data => {
        alert('Successfully updated emails');
      });
    }
  }

  saveGroup() {
    if(this.group.name == "") {
      alert('Please input email group name');
      return;
    }
    this.groupService.saveGroup(this.ref, this.group).then((data) => {
      alert('Successfully updated!');
    });
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

  /**
   * Email Validation
   */
  validate() {

    this.total = this.group.list.length;

    this.sub = 0;
    let promises = [];
    this.group.list.forEach((val, key) => {
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
      let payload = {list: Array.from( this.group.list.values() )};
      //console.log(this.mergedEmails.values());
      this.groupService.saveGroup(this.group.ref, payload)
    });
  }
}
