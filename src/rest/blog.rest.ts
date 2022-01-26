import {Rest} from './base/rest';
import {BlogService} from '../service/blog.service';
import {GetMapping} from '../util/decorators';
import {Express, NextFunction, Request, Response} from 'express';
import {BlogEntity} from '../repository/entity/blog.entity';
import {BaseService} from '../service/base/base.service';

export const BlogRest: Rest[] = [
    new Rest(
        'get',
        `/api/blog/custom`,
        BlogService,
        'customGet',
    ),
    ...Rest.BaseRestPoints(BlogService, 'api/blog'),
];

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

export const ResourceMethods = (resource: BlogResource): string[] => {
    return Reflect.getMetadataKeys(resource);
};

export const CreateApiPaths = (app: Express, resource: BlogResource) => {
    const type = Reflect.getMetadata('getAll', resource)['type'];
    const route = Reflect.getMetadata('getAll', resource)['route'];
    ResourceMethods(resource).forEach(m => {
        app[type](`/api${resource.basePath}${route}`, (req, res, next) => {
            const result = resource[m](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
};