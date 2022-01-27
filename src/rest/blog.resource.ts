import {BlogService} from '../service/blog.service';
import {BaseResource} from './base/base.resource';

export class BlogResource extends BaseResource<BlogService> {

    constructor() {
        super('/blog', new BlogService());
    }

}