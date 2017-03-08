import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { User, Group, UsersGroup } from './dto';
import { GroupService }            from './group.service';
import { BaseService }             from './base.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

@Injectable()
export class UserService extends BaseService {
    private readonly SERVICE_URL = this.SERVICE_ROOT + this.USER_ENDPOINT;

    constructor(private http: Http, private groupService: GroupService) { super(); }

    create(user: User): Observable<User> {
        return this.http
            .post(this.SERVICE_URL, JSON.stringify(user), {headers: this.HEADERS})
            .map(response => response.json() as User);
    }

    delete(user: User): Observable<void> {
        return this.http
            .delete(this.SERVICE_URL + `/${user.id}`)
            .map(_ => null);
    }

    getUsers(): Observable<User[]> {
        return this.http
            .get(this.SERVICE_URL)
            .map(response => response.json() as User[]);
    }

    getUser(id: number): Observable<User> {
        return this.http
            .get(this.SERVICE_URL + `/${id}`)
            .map(response => response.json() as User);
    }

    getUsersGroups(userId: number): Observable<Group> {
        return this.http
            .get(this.SERVICE_URL + `/${userId}/` + this.GROUP_ENDPOINT)
            .flatMap(response => Observable.from(response.json()))
            .flatMap(singleGroup => this.groupService.getGroup(singleGroup['groupId']));
    }

    getAllGroupsButUsers(userId: number): Observable<Group[]> {
        return this.http
            .get(this.SERVICE_URL + `/${userId}/` + this.GROUP_ENDPOINT)
            .map(response => response.json() as UsersGroup[])
            .map(groupIds => groupIds.map(g => g.groupId))
            .flatMap(groupIds => this.groupService.getGroups().map(
                groups => groups.filter(group => !groupIds.includes(group.id))));
    }

    createNewUsersGroup(user: User, usersGroup: UsersGroup): Observable<void> {
        return this.http
            .post(this.SERVICE_URL + `/${user.id}/` + this.GROUP_ENDPOINT, JSON.stringify(usersGroup), {headers: this.HEADERS})
            .map(_ => null);
    }

    deleteUsersGroup(user: User, usersGroup: UsersGroup): Observable<void> {
        return this.http
            .delete(this.SERVICE_URL + `/${user.id}/` + this.GROUP_ENDPOINT + `/${usersGroup.groupId}`)
            .map(_ => null);
    }
}
