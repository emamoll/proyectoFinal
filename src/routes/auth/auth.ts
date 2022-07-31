import { Router } from "express";
import passportLocal from '../../middlewares/authentication';
import { userController } from '../../controllers/user';

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Hola emanuel' })
});

router.post('/signup', userController.userExists, userController.incompleteData, userController.passwordConfirmed, passportLocal.authenticate('signup'), (req, res) => {

  return res.status(200).json({
    msg: 'Usuario creado',

  })
})


export default router