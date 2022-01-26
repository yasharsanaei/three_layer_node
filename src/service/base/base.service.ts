import {NextFunction, Request, Response} from 'express';
import {BaseRepository} from '../../repository/base/base.repository';
import {isIdInvalid} from '../../util/util';

export class BaseService<T, R extends BaseRepository<T>> {

    repository: R;

    constructor(repository: R) {
        this.repository = repository;
    }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<T[]> {
        return await this.repository.findAll();
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<T> {
        const id = request.params.id;
        if (isIdInvalid(id)) next();
        else return await this.repository.findOneById(id);
    }

}