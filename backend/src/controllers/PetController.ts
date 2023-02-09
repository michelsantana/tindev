import { Request, Response } from 'express';
import Pet from '../model/Pet';

export default class PetController {
   async index(req: Request, res: Response) {
      const pet: Pet = req.body
      return res.status(200).json(pet);
   };
   async store(req: Request, res: Response) {
      const pet: Pet = req.body
      return res.status(200).json(pet);
   };
};
