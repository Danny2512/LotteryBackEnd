import { Router } from 'express';
import { validateLogin, getOTP, validateOTP, changePasswordByOTP } from '../controllers/auth.controller';
import { authenticate } from '../services/auth/authenticate.service';
import { catchErrors } from'../handlers/error.handlers';

const router = Router();

router.post('/auth/validateLogin', catchErrors(validateLogin));

router.get('/auth/getOTP', catchErrors(getOTP));

router.post('/auth/validateOTP', catchErrors(validateOTP));

router.put('/auth/changePasswordByOTP', catchErrors(authenticate), catchErrors(changePasswordByOTP));

export default router;