import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TemplateService } from '../../services/template.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template-post',
  templateUrl: './template-post.component.html',
  styleUrls: ['./template-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplatePostComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  desc = '';
  content = '';
  template$: Observable<any>;
  ref = null;

  constructor(private formBuilder: FormBuilder, 
    private templateService: TemplateService, 
    private route: ActivatedRoute,
    private router: Router) { 
        
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        desc: ['']
    });

    this.ref = this.route.snapshot.paramMap.get('id');
    if(this.ref) {
      this.template$ = this.templateService.getTemplate(this.ref);
      this.template$.subscribe(data => {
        this.registerForm.controls['name'].setValue(data.name);
        this.desc = data.description;
        this.content = data.content;
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      let payload = {
          name: this.registerForm.controls['name'].value,
          description: this.desc,
          content: this.content,
          ref: this.ref
      }

      //console.log(this.templateService.getTemplates());

      if(!this.ref) {
        this.templateService.createTemplate(payload);
      } else {
        this.templateService.saveTemplate(payload);
      }

      this.router.navigate(['/templates']);
      
  }

  saveTemplate() {

  }

}
