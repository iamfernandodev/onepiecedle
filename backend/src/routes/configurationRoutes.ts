import { Router } from 'express';
import { getConfiguration } from '../controllers/configurationController';

const router: Router = Router();

router.get('/', getConfiguration);

export default router;