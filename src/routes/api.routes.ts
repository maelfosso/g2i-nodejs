import express from 'express';
import { body } from 'express-validator';
import * as api from '../controllers/api.controller';

const router = express.Router();
  
router.route('/acronym/:code')
  .get(api.get)
  .put(api.update)
  .delete(api.remove)
;

router.route('/acronym') 
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


export default router;
