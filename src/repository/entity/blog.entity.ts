import {Column, Entity} from 'typeorm';
import {BaseInfoEntity} from '../../_base/baseInfo.entity';

@Entity()
export class BlogEntity extends BaseInfoEntity {

    @Column()
    title: string;

    @Column()
    brief: string;

    @Column()
    content: string;

}