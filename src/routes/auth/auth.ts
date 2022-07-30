import { Router } from "express";
import passportLocal from '../../middlewares/authentication'

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Hola emanuel' })
});

router.post('/signup', passportLocal.authenticate('signup'), (req, res) => {
  return res.status(200).json({
    msg: 'Usuario creado',
    
  })
})


export default router