import {NextFunction, Request, Response} from 'express';
import {BlogService} from '../service/blog.service';
import {BlogEntity} from '../repository/entity/blog.entity';
import 'reflect-metadata';
import {PageRoute} from '../util/decorators';

export class PageController {

    private blogService: BlogService = new BlogService();

    constructor() {
    }

    @PageRoute('/')
    async home(request: Request, response: Response, next: NextFunction) {
        const blogList: BlogEntity[] = await this.blogService.getAll(request, response, next);
        response.render('index', {title: 'Blogs | Home', blogs: blogList});
    }

    @PageRoute('/blogs')
    async blogs(request: Request, response: Response, next: NextFunction) {
        response.redirect('/');
    }

    @PageRoute('/blogs/create')
    async createBlog(request: Request, response: Response, next: NextFunction) {
        response.render('create', {title: 'Blogs | Create Blogs'});
    }

}