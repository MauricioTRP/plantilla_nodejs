import { Router } from 'express'
import * as db from '../db/index.js'

const router = Router()

router.get("/", async (req, res) => {
  try {
    // Tratamos de obtener los usuarios
    const text = 'SELECT * FROM usuarios'
    const result = await db.query(text)

    res.send(result)
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})

export { router }