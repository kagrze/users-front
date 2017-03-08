import { Headers } from '@angular/http';

export abstract class BaseService {
    protected readonly SERVICE_ROOT = 'http://localhost:8080/';
    protected readonly HEADERS = new Headers({'Content-Type': 'application/json'});
    protected readonly USER_ENDPOINT = 'user';
    protected readonly GROUP_ENDPOINT = 'group';
}
