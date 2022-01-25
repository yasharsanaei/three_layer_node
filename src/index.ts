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

    app.use((req: Request, res: Response) => {
        res.status(404).render('404', {title: '404'});
    });

    // let blog = new BlogEntity();
    // blog.title = 'Blog number 1';
    // blog.brief = 'Blog number brief is this.';
    // blog.content = 'Blog number 1 content is this. it should be long and ver ver ver ver ver lorem and other things.';
    //
    // await connection.manager
    //     .save<BlogEntity>(blog)
    //     .then(blog => {
    //         console.log('..::Saved::.. ',blog)
    //     });

    console.log('Express server has started on port 3000....');

}).catch(error => console.log(error));
