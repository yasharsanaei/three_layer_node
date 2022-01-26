import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as express from 'express';
import {Express, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import {ApisRest} from './rest/base/apis.rest';
import * as path from 'path';
import {PageController} from './controller/page.controller';
import {GetPageRoutes} from './util/util';

createConnection().then(async connection => {

    const app: Express = express();

    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.listen(3000);

    app.use('/assets', express.static(path.join(__dirname, '/views/assets')));
    app.use(morgan('dev'));
    app.use(bodyParser.json());

    GetPageRoutes(new PageController()).forEach(
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

    ApisRest.forEach(
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
