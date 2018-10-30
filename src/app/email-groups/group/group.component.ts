import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  /**
   * Email groups
   */
  groups: Observable<any[]>;


  constructor(private groupService: GroupService) { }

  
  ngOnInit() {
    this.groups = this.groupService.getGroups();
  }

  onDelete(group) {
    if(confirm('Are sure to remove this template?')) {
      this.groupService.removeGroup(group);
    }
  }

}
