import * as express from 'express';
import * as Cors from 'cors';
import clubsRoute from './routes/clubsRoute';
import matchsRoute from './routes/matchsRoute';
import userRoute from './routes/userRoute';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.app.use(Cors());
    this.app.use('/login', userRoute);
    this.app.use('/clubs', clubsRoute);
    this.app.use('/matchs', matchsRoute);

    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
