import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { UserListComponent }      from './user-list.component';
import { NewUserComponent }       from './new-user.component';
import { UsersGroupsComponent }   from './users-groups.component';
import { NewUsersGroupComponent } from './new-users-group.component';
import { GroupListComponent }     from './group-list.component';
import { NewGroupComponent }      from './new-group.component';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users',              component: UserListComponent },
    { path: 'user',               component: NewUserComponent },
    { path: 'user/:userId',       component: UsersGroupsComponent },
    { path: 'user/:userId/group', component: NewUsersGroupComponent },
    { path: 'groups',             component: GroupListComponent },
    { path: 'group',              component: NewGroupComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
