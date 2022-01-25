import {BaseService} from '../../service/base/base.service';

export enum RestType {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

export class Rest<T extends BaseService<any, any>> {
    type: RestType;
    route: string;
    service: T;
    method: string;

    constructor(type: RestType, route: string, service: T, method: string) {
        this.type = type;
        this.route = route;
        this.service = service;
        this.method = method;
    }

    static BaseRestPoints(service,entryPoint: string) {
        return [
            new Rest(
                RestType.get,
                `/${entryPoint}`,
                service,
                'getAll'
            ),
            new Rest(
                RestType.get,
                `/${entryPoint}`,
                service,
                'getById'
            ),
        ];
    }
}