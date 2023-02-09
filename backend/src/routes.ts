import { Router } from 'express';
import PetController from './controllers/PetController';
const routes = Router();

const petController = new PetController();

routes.get('/pets', petController.index);
routes.post('/pets', petController.store);

export { routes };