import { Router } from "express";
import * as db from '../db/index.js'
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.get("/", async (req, res) => {
  try {
    const text = 'SELECT * FROM bicicletas'
    const result = await db.query(text)

    res.json({
      bicicletas: result.rows
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: 500,
      message: 'Error interno de servidor'
    })
  }
})

router.post("/", async (req, res) => {
  const { marca, modelo, precio } = req.body

  if ( marca && modelo && precio ) {
    // La solicitud correcta
    try {
      const text = 'INSERT INTO bicicletas (id, marca, modelo, precio) VALUES ($1, $2, $3, $4) RETURNING *'
      const values = [uuidv4(), marca, modelo, Number(precio)]

      const result = await db.query(text, values)

      res.status(201).json({
        message: 'Bicicleta creada con éxito',
        status: 201,
        bicicleta: result.rows
      })
    } catch (error) {
      console.error(error)

      res.status(500).json({
        status: 500,
        message: 'Error interno de servidor'
      })
    }
  } else {
    // Bad request
    res.status(400).json({
      message: 'Bad request',
      status: '400',
      error: "Faltan parámetros en el body"
    })
  }
})

export { router }
