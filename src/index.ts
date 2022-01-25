import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as express from 'express';
import {Express, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import {BlogEntity} from './repository/entity/blog.entity';

createConnection().then(async connection => {

    const app: Express = express();

    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.listen(3000);

    app.use(express.static('./src/views/assets'));
    app.use(morgan('dev'));
    app.use(bodyParser.json());

    const RestPoints = [
        {
            type: 'get/post/put/delete/',
            route: 'api-path',
            service: {},
            method: 'methodName',
        },
    ];

    RestPoints.forEach(
        rest => {
            (app as any)[rest.type](rest.route, (req: Request, res: Response, next: Function) => {
                const result = (new (rest.service as any))[rest.method](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        },
    );

    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next);
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
    //
    //         } else if (result !== null && result !== undefined) {
    //             res.json(result);
    //         }
    //     });
    // });


    app.use((req: Request, res: Response) => {
        res.status(404).render('404', {title: '404'});
    });

    // let blog = new BlogEntity();
    // blog.title = 'Blog number 2';
    // blog.brief = 'Blog number 2 brief is this.';
    // blog.content = 'Blog number 2, updating BlogEntity class...';
    //
    // await connection.manager
    //     .save<BlogEntity>(blog)
    //     .then(blog => {
    //         console.log('..::Saved::.. ',blog)
    //     });

    console.log('Express server has started on port 3000....');

}).catch(error => console.log(error));
