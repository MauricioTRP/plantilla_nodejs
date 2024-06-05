import express from 'express'

// Importamos rutas
import { router as users } from './routes/users.js'
import { router as bicicletas } from './routes/bicicletas.js'
const app = express()

app.use(express.json())
app.use("/users", users)
app.use("/bicicletas", bicicletas)

app.listen(3000, () => {
  console.log("App en puerto 3000")
})