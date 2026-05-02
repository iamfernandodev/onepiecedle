import { Router } from 'express';
import {
    createCharacter,
    findCharacters,
} from '../controllers/characterController';

const router: Router = Router();

router.get('/', findCharacters);
router.post('/create', createCharacter);

export default router;