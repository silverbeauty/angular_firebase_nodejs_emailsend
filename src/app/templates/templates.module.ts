import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplateComponent } from './template/template.component';
import { BoxModule } from 'angular-admin-lte';
import { TemplatePostComponent } from './template-post/template-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovalentCodeEditorModule } from '@covalent/code-editor';






@NgModule({
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    BoxModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentCodeEditorModule,
  ],
  declarations: [TemplateComponent, TemplatePostComponent]
})
export class TemplatesModule { }
