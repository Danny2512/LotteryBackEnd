import { Router } from 'express';
import { GenerateLottery } from '../controllers/lottery.controller';
import { catchErrors } from'../handlers/error.handlers';

const router = Router();

router.get('/lottery/generateLottery', catchErrors(GenerateLottery));

export default router;