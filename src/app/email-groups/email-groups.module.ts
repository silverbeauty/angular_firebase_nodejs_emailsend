import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailGroupsRoutingModule } from './email-groups-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupPostComponent } from './group-post/group-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { BoxModule } from 'angular-admin-lte';

@NgModule({
  imports: [
    CommonModule,
    EmailGroupsRoutingModule,
    BoxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [GroupComponent, GroupPostComponent]
})
export class EmailGroupsModule { }
