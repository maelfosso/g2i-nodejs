import express from 'express';
import { body } from 'express-validator';
import * as api from '../controllers/api.controller';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();
  
router.route('/acronym/:code')
  .get(api.get)
  .put(requireAuth, api.update)
  .delete(requireAuth, api.remove)
;

router.route('/random/:count?')
  .get(api.random)
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
