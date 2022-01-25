import {Rest} from './base/rest';
import {BlogService} from '../service/blog.service';

export const BlogRest: Rest[] = [
    new Rest(
        'get',
        `/api/blog/custom`,
        BlogService,
        'customGet',
    ),
    ...Rest.BaseRestPoints(BlogService, 'api/blog'),
];