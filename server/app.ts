//Install express server
import * as express from 'express';
import * as path from 'path';

const app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(app.get('port'), function() {
  console.log(`Angular Full Stack listening on port ${app.get('port')}`);
});
