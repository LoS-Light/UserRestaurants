import express, { Application } from 'express';
import { Config, DbMysqlConfig, OAuth2FacebookConfig, OAuth2GoogleConfig, SessionConfig } from './env.config';
import { MainRoute } from './routes/main.route';
import { DbMysql } from './database/data-source.mysql';
import { engine } from 'express-handlebars';

import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import ConfigurePassportStrategy from './passport/passport.strategy';
import ConfigurePassportSerialization from './passport/passport.serialization';


const main = async () => {
    const port = Config.port;
    const app: Application = express();

    await debugConfigs();
    await initDbMysql();
    await initHandlebars(app);
    await initWeb(app);
    await initSession(app);
    await initPassport(app);

    app.use(MainRoute);
    app.listen(port, () => { console.log('-> Listening on port ' + port); });
}

async function debugConfigs() {
    if (Config.nodeEnv !== 'production') {
        console.log("Config:", Config);
        console.log("DbMysqlConfig:", DbMysqlConfig);
        console.log("SessionConfig:", SessionConfig);
        console.log("OAuth2FacebookConfig", OAuth2FacebookConfig);
        console.log("OAuth2GoogleConfig", OAuth2GoogleConfig);
    }
}

async function initDbMysql() {
    await DbMysql.initialize();
    console.log('-> Database mysql connection established');
}

async function initHandlebars(app: Application) {
    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', `${__dirname}/web/views`);
}

async function initWeb(app: Application) {
    app.use(express.static(`${__dirname}/web`));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride('_method'));
}

async function initSession(app: Application) {
    app.set('trust proxy', Config.trustProxy) // trust first proxy
    app.use(session(SessionConfig));
    app.use(flash());
}

async function initPassport(app: Application) {
    ConfigurePassportStrategy();
    ConfigurePassportSerialization();
    app.use(passport.initialize());
    app.use(passport.session());
}

main();