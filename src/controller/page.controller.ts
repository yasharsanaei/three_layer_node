import {NextFunction, Request, Response} from 'express';
import {Rest} from '../rest/base/rest';
import {BlogService} from '../service/blog.service';
import {BlogEntity} from '../repository/entity/blog.entity';

export class PageController {

    private blogService: BlogService = new BlogService();

    constructor() {
    }

    async home(request: Request, response: Response, next: NextFunction) {
        const blogList: BlogEntity[] = await this.blogService.getAll(request, response, next);
        response.render('index', {title: 'Blogs | Home', blogs: blogList});
    }

    async blogs(request: Request, response: Response, next: NextFunction) {
        response.redirect('/');
    }

    async createBlog(request: Request, response: Response, next: NextFunction) {
        response.render('create', {title: 'Blogs | Create Blogs'});
    }

}

export const ViewRoutes = [
    new Rest(
        'get',
        '/',
        PageController,
        'home',
    ),
    new Rest(
        'get',
        '/blogs',
        PageController,
        'blogs',
    ),
    new Rest(
        'get',
        '/blogs/create',
        PageController,
        'createBlog',
    ),
];