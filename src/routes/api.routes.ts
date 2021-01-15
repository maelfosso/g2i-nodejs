import express from 'express';
import * as api from '../controllers/api.controller';

const router = express.Router();

router.route('/') 
  .post(api.create)
  .get(api.getAll)
;
  
router.route('/:id')
  .get(api.get)
  .delete(api.remove)
;

export default router;
