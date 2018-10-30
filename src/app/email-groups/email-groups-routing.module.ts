import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from '../email-groups/group/group.component';
import { GroupPostComponent } from '../email-groups/group-post/group-post.component';


const routes: Routes = [
  {
    path: '',
    component: GroupComponent
  },
  {
    path: 'post',
    component: GroupPostComponent
  },
  {
    path: 'post/:id',
    component: GroupPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailGroupsRoutingModule { }
