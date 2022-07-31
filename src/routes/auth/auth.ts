import { Router } from "express";
import passportLocal from '../../middlewares/authentication';
import { userController } from '../../controllers/user';
import { rmSync } from "fs";

const router = Router();

// Routes de login del usuario
router.get('/', (req, res) => {
  res.json({ msg: 'Hola emanuel' })
});

// Routes de signup del usuario
router.get('/signup', (req, res) => {
  res.json({
    msg: 'Complete todos los campos para registrarse'
  })
})

router.post('/signup', userController.userExists, userController.incompleteData, userController.passwordConfirmed, passportLocal.authenticate('signup'), (req, res) => {
  return res.status(200).json({
    msg: 'Usuario creado',

  })
})


export default router