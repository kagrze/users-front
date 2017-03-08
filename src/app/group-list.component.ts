import { Component, OnInit } from '@angular/core';

import { Group }         from './dto';
import { GroupService }  from './group.service';
import { BaseComponent } from './base.component';

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: '/templates/group-list.component.html'
})
export class GroupListComponent extends BaseComponent implements OnInit {
    groups: Group[];

    constructor(private groupService: GroupService){ super(); }

    ngOnInit(): void {
        this.groupService.getGroups()
            .subscribe(groups => this.groups = groups);
    }

    remove(group: Group): void {
        this.groupService.delete(group)
            .subscribe(_ => this.groups = this.groups.filter(g => g.id != group.id), this.onError);
    }
}
