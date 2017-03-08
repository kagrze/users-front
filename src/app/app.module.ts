import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }       from './app-routing.module'
import { AppComponent }           from './app.component';
import { UserListComponent }      from './user-list.component';
import { NewUserComponent }       from './new-user.component';
import { UsersGroupsComponent }   from './users-groups.component';
import { NewUsersGroupComponent } from './new-users-group.component';
import { GroupListComponent }     from './group-list.component';
import { NewGroupComponent }      from './new-group.component';
import { UserService }            from './user.service';
import { GroupService }           from './group.service';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
    declarations: [ 
        AppComponent,
        UserListComponent,
        UsersGroupsComponent,
        NewUsersGroupComponent,
        GroupListComponent,
        NewGroupComponent,
        NewUserComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ UserService, GroupService ]
})
export class AppModule { }
