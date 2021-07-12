process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import WhatsappGenerator from './Whatsapp';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);
//console.log(app.listen);
//const httpServer = new WhatsappGenerator();
app.listen();



