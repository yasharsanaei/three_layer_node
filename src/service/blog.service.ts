import {BaseService} from './base/base.service';
import {BlogEntity} from '../repository/entity/blog.entity';
import {NextFunction, Request, Response} from 'express';
import {BlogRepository} from '../repository/blog.repository';
import {BaseRepository} from '../repository/base/base.repository';

export class BlogService extends BaseService<BlogEntity, BaseRepository<BlogEntity>> {

    constructor() {
        super(new BlogRepository());
    }

    async getCustom(request: Request, response: Response, next: NextFunction): Promise<BlogEntity> {
        return await this.repository.findOneById(1);
    }

}