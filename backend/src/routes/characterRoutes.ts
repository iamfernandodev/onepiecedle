import { Router } from 'express';
import {
    findCharacters,
} from '../controllers/characterController';

const router: Router = Router();

router.get('/', findCharacters);

export default router;