import { Router, json } from "express";
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

router.put("/", async (req, res) => {
  const { id, marca, modelo, precio } = req.body

  if ( id && marca && modelo && precio ) {
    try {
      const text = 'UPDATE bicicletas SET marca = $2, modelo = $3, precio = $4 WHERE id = $1 RETURNING *'
      const values = [id, marca, modelo, precio]

      const result = await db.query(text, values)

      res.status(202).json({
        message: 'Bicicleta actualizada con éxito',
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

// localhost:3000/bicicletas ? id = 66bc0c5f-76ae-49e4-af3a-b41747ed101c
router.delete("/", async (req, res) => {
  const { id } = req.query

  if ( id ) {
    try {
      const text = 'DELETE FROM bicicletas WHERE id = $1'
      const values = [id]

      const result = await db.query(text, values)

      res.json({
        message: 'Bicicleta eliminada con éxito',
        status: 200
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
