import express from 'express';
import { body } from 'express-validator';
import * as api from '../controllers/api.controller';

const router = express.Router();

router.route('/') 
  .post(
    [
      body('code')
        .notEmpty()
        .trim()
        .escape(),
      body('description')
        .notEmpty()
        .trim()
        .escape()
    ], 
    api.create
  )
  .get(api.getAll)
;
  
router.route('/:id')
  .get(api.get)
  .delete(api.remove)
;

export default router;
