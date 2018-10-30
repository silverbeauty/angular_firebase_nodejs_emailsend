import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  /**
   * History Record Ref
   */
  recordRef: any;

  /**
   * History Record
   */
  recordHistory: any;

  /**
   * Email content
   */
  content = '';

   /**
   * Sender Email
   */
  from = '';

  /**
   * Email subject
   */
  subject = '';

  /**
   * To email lists
   */
  list: any[] =[];


  /**
   * Merged emails
   */
  mergedEmails: Map<string, any> = new Map();

  constructor(private route: ActivatedRoute, private historyService: HistoryService) {
    this.route.params.subscribe( params => this.recordRef = params.ref );
  }

  ngOnInit() {
    this.historyService.getHistory(this.recordRef).subscribe((data)=>{
      this.recordHistory = data;
      this.list = this.recordHistory.list;
      this.content = this.recordHistory.text;
      this.subject = this.recordHistory.subject;
      this.from = this.recordHistory.from;
      console.log('this.recordHistory', this.recordHistory);
    });
  }

  getStatusClass(val) {
    if(val == 'sent')
      return 'bg-yellow';
    else if (val == 'fail')
      return 'bg-red'
    else 
      return 'bg-red'
  }

}
