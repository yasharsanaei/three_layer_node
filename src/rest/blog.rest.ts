import {Rest} from './base/rest';
import {BlogService} from '../service/blog.service';

export const BlogRest: Rest<BlogService>[] = [
    ...Rest.BaseRestPoints(BlogService, 'blog'),
];