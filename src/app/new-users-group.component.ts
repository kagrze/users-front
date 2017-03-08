import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User, Group, UsersGroup } from './dto';
import { UserService }             from './user.service';

@Component({
    moduleId: module.id,
    selector: 'new-user-group',
    templateUrl: '/templates/new-users-group.component.html'
})
export class NewUsersGroupComponent implements OnInit {
    user: User;
    allNonAssignedGroups: Group[] = [];
    newUsersGroupId: string;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(+params['userId']))
            .subscribe(user => this.user = user);

        this.route.params
            .switchMap((params: Params) => this.userService.getAllGroupsButUsers(+params['userId']))
            .subscribe(groups => this.allNonAssignedGroups = groups);
    }

    assign(): void {
        var newUserGroup = new UsersGroup();
        newUserGroup.groupId = +this.newUsersGroupId;
        this.userService.createNewUsersGroup(this.user, newUserGroup)
            .subscribe(_ => this.router.navigate(['/user', this.user.id]));
    }
}
