import express from "express"
import employeesRoutes from './routes/employes.routes.js'
import indexRoutes from './routes/index.routes.js'
import juntasRoutes from './routes/juntas.routes.js'
import membersRoutes from './routes/members.routes.js'
import authRoutes from './routes/auth.routes.js'
 


const app = express()
app.use(express.json())

app.use("/api", authRoutes)
app.use("/api", indexRoutes)
app.use("/api", employeesRoutes)
app.use("/api", membersRoutes)
app.use("/api", juntasRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: 'endpoint not found' })
})

export default app;
