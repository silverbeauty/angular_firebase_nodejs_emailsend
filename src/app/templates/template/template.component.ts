import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

  /**
   * Templates list
   */
  templates: Observable<any[]>;

  constructor(private templateService: TemplateService, private route: ActivatedRoute,
    private router: Router) { 
  }
  ngOnInit() {
    this.templates = this.templateService.getTemplates();
    this.templates.subscribe(data => {
      console.log(data);
    });
  }
  onDelete(template, index) {
    if(confirm('Are sure to remove this template?')) {
      this.templateService.removeTemplate(template);
    }
  }
}
