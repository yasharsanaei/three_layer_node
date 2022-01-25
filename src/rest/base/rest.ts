import {BaseService} from '../../service/base/base.service';

export enum RestType {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export class Rest {
    // type: RestType;
    type: 'get' | 'post' | 'put' | 'delete';
    route: string;
    service: any;
    method: string;

    constructor(type: 'get' | 'post' | 'put' | 'delete', route: string, service: any, method: string) {
        this.type = type;
        this.route = route;
        this.service = service;
        this.method = method;
    }

    static BaseRestPoints(service:any,entryPoint: string) {
        return [
            new Rest(
                'get',
                `/${entryPoint}`,
                service,
                'getAll'
            ),
            new Rest(
                'get',
                `/${entryPoint}/:id`,
                service,
                'getById'
            ),
        ];
    }
}