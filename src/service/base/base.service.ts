import {NextFunction, Request, Response} from 'express';
import {Repository} from 'typeorm';

export class BaseService<T> {

    repository: Repository<T>;

    constructor(repository?: Repository<T>) {
        this.repository = null;
    }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<T[]> {
        return await this.repository.find();
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<T> {
        const id = request.params.id;
        return await this.repository.findOne(id);
    }

}