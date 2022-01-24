import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

createConnection().then(async connection => {

    const app: Express = express();

    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.use(express.static('./src/views/assets'));
    app.use(morgan('dev'));

    app.use(bodyParser.json());

    app.use((req: Request, res: Response) => {
        res.status(404).render('404', {title: '404'});
    });

    app.listen(3000);

    console.log('Express server has started on port 3000....');


    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    //
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    //
    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
