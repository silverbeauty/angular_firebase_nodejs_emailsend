import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailRoutingModule } from './send-email-routing.module';
import { SendComponent } from './send/send.component';
import { HistoryComponent } from './history/history.component';
import { BoxModule } from 'angular-admin-lte';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { DetailComponent } from './detail/detail.component';
@NgModule({
  imports: [
    CommonModule,
    SendEmailRoutingModule,
    BoxModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentCodeEditorModule,
  ],
  declarations: [SendComponent, HistoryComponent, DetailComponent]
})
export class SendEmailModule { }
