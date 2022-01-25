import {NextFunction, Request, Response} from 'express';
import {BaseRepository} from '../../repository/base/base.repository';

export class BaseService<T,R extends BaseRepository<T>> {

    repository: R;

    constructor(repository: R) {
        this.repository = repository;
    }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<T[]> {
        return await this.repository.findAll();
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<T> {
        const id = request.params.id;
        return await this.repository.findOneById(id);
    }

}