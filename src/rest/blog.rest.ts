import {Rest, RestType} from './base/rest';
import {BlogService} from '../service/blog.service';

export const BlogRest: Rest[] = [
    ...Rest.BaseRestPoints(BlogService, 'blog'),
    new Rest(
        RestType.get,
        `/blog/custom`,
        BlogService,
        'customGet',
    ),
];