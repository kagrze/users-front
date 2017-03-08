import { Component } from '@angular/core';
import { Router }    from '@angular/router'

import { Group }        from './dto';
import { GroupService } from './group.service';

@Component({
    moduleId: module.id,
    selector: 'new-group',
    templateUrl: '/templates/new-group.component.html'
})
export class NewGroupComponent {
    group: Group = new Group();

    constructor(private groupService: GroupService, private router: Router){}

    save(): void {
        this.groupService.create(this.group)
            .subscribe(_ => this.router.navigate(['/groups']));
    }
}
