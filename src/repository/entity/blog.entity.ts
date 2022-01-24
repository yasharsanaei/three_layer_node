import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BlogEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    brief: string;

    @Column()
    content: string;

}