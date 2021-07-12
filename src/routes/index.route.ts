import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}:id`, this.indexController.index);
    this.router.post(`${this.path}:id`,this.indexController.sendMessage);
    this.router.get(`${this.path}load/message`, this.indexController.loadMessage);
  }
}

export default IndexRoute;
