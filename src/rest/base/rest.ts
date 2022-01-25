import {BaseService} from '../../service/base/base.service';

export enum RestType {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export class Rest {
    type: RestType;
    route: string;
    service: any;
    method: string;

    constructor(type: RestType, route: string, service: any, method: string) {
        this.type = type;
        this.route = route;
        this.service = service;
        this.method = method;
    }

    static BaseRestPoints(service:any,entryPoint: string) {
        return [
            new Rest(
                RestType.get,
                `/${entryPoint}`,
                service,
                'getAll'
            ),
            new Rest(
                RestType.get,
                `/${entryPoint}/:id`,
                service,
                'getById'
            ),
        ];
    }
}