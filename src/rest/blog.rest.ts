import {BlogService} from '../service/blog.service';
import {GetMapping} from '../util/decorators';
import {NextFunction, Request, Response} from 'express';
import {BlogEntity} from '../repository/entity/blog.entity';
import {BaseService} from '../service/base/base.service';

export class BaseResource<T extends BaseService<any, any>> {

    service: T;
    basePath: string;

    constructor(basePath: string, service: T) {
        this.service = service;
        this.basePath = basePath;
    }

    @GetMapping('/')
    async getAll(request: Request, response: Response, next: NextFunction): Promise<BlogEntity[]> {
        return await this.service.getAll(request, response, next);
    }

    @GetMapping('/:id')
    async getById(request: Request, response: Response, next: NextFunction): Promise<BlogEntity[]> {
        return await this.service.getById(request, response, next);
    }

}

export class BlogResource extends BaseResource<BlogService> {

    constructor() {
        super('/blog', new BlogService());
    }

}