import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendComponent } from './send/send.component';
import { HistoryComponent } from './history/history.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'send',
    component: SendComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'detail/:ref',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendEmailRoutingModule { }
