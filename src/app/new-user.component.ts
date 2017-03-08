import { Component } from '@angular/core';
import { Location }  from '@angular/common';

import { User }        from './dto';
import { UserService } from './user.service'

@Component({
    moduleId: module.id,
    selector: 'new-user',
    templateUrl: '/templates/new-user.component.html'
})
export class NewUserComponent {
    user: User = new User();

    constructor(private userService: UserService, private location: Location) {}

    save(): void {
        this.userService.create(this.user)
            .subscribe(_ => this.location.back());
    }
}
