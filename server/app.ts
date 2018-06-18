import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

let mongodbURI = process.env.MONGODB_URI;
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI).then(db => {
  
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log(`Angular Full Stack listening on port ${app.get('port')}`);
  });

}).catch(err => {
  console.error(err);
});

export { app };