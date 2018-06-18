import * as express from 'express';


import CatCtrl from './controllers/cat';

export default function setRoutes(app) {
  const router = express.Router();

  const catCtrl = new CatCtrl();

  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  app.use('/api', router);
}