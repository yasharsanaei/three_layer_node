import {BaseService} from './base/base.service';
import {BlogEntity} from '../repository/entity/blog.entity';
import {NextFunction, Request, Response} from 'express';

export class BlogService extends BaseService<BlogEntity> {

    async getCustom(request: Request, response: Response, next: NextFunction): Promise<BlogEntity> {
        return await this.repository.findOne(1);
    }

}