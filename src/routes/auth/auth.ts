import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Hola' })
})

export default router