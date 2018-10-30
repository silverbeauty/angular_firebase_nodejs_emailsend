import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { TemplatePostComponent } from './template-post/template-post.component';

const routes: Routes = [{
  path: '',
  component: TemplateComponent
}, {
  path: 'post',
  component: TemplatePostComponent
}, { path: 'post/:id', 
  component: TemplatePostComponent 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
