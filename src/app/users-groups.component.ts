import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User, Group, UsersGroup } from './dto';
import { UserService }             from './user.service';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'users-groups',
    templateUrl: '/templates/users-groups.component.html'
})
export class UsersGroupsComponent implements OnInit {
    user: User;
    userGroups: Group[];

    constructor(private userService: UserService, private route: ActivatedRoute){};

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(+params['userId']))
            .subscribe(user => this.user = user);
        this.userGroups = [];
        this.route.params
            .switchMap((params: Params) => this.userService.getUsersGroups(+params['userId']))
            .subscribe(group => this.userGroups.push(group));
      }

    remove(group: Group) {
        var usersGroup = new UsersGroup();
        usersGroup.groupId = group.id;
        this.userService.deleteUsersGroup(this.user, usersGroup)
            .subscribe(_ => this.userGroups = this.userGroups.filter(g => g.id != group.id));
    }
}
