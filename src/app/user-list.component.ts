import { Component, OnInit } from '@angular/core';

import { User }         from './dto';
import { UserService }  from './user.service';
import { BaseComponent} from './base.component';

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: '/templates/user-list.component.html'
})
export class UserListComponent extends BaseComponent implements OnInit {
    users: User[];

    constructor(private userService: UserService){ super(); }

    ngOnInit(): void {
        this.userService.getUsers()
            .subscribe(users => this.users = users);
    }

    remove(user: User): void {
        this.userService.delete(user)
            .subscribe(_ => this.users = this.users.filter(u => u.id != user.id), this.onError);
    }
}
