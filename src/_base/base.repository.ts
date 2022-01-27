import {Repository} from 'typeorm';

export class BaseRepository<T> {

    repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    findAll(): Promise<T[]> {
        return this.repository.find();
    }

    findOneById(id: number | string): Promise<T> {
        return this.repository.findOne(id);
    }

}