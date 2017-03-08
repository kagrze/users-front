import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Group }       from './dto';
import { BaseService } from './base.service'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupService extends BaseService {
    private readonly SERVICE_URL = this.SERVICE_ROOT + this.GROUP_ENDPOINT;

    constructor(private http: Http){ super(); }

    create(group: Group): Observable<Group> {
        return this.http
            .post(this.SERVICE_URL, JSON.stringify(group), {headers: this.HEADERS})
            .map(response => response.json() as Group);
    }

    delete(group: Group): Observable<void> {
        return this.http.delete(this.SERVICE_URL + `/${group.id}`, {headers: this.HEADERS})
            .map(_ => null);
    }

    getGroups(): Observable<Group[]> {
        return this.http.get(this.SERVICE_URL)
            .map(response => response.json() as Group[]);
    }

    getGroup(id: number): Observable<Group> {
        return this.http.get(this.SERVICE_URL + `/${id}`)
            .map(response => response.json() as Group);
    }
}
