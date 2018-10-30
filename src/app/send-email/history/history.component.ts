import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    /**
   * Email groups
   */
  historyRecods: Observable<any[]>;


  constructor(private historyService: HistoryService) { }

  
  ngOnInit() {
    this.historyRecods = this.historyService.getHistories();
    console.log('historyRecods',this.historyRecods);
  }

  onDelete(record) {
    if(confirm('Are sure to remove this template?')) {
      this.historyService.removeHistory(record);
    }
  }


}
