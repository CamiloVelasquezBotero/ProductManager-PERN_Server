import express from 'express'
import path from 'path'
import colors from 'colors' /* Cambiar colores de errores o textos lanzados a la terminal para identificarlos mejor */
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

// Conectar a la Base de Datos
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log(colors.cyan.bold('Conexion existosa a la base de datos'))
    } catch (error) {
        /* console.log(error) */
        console.log(colors.red.bold('Hubo un error al conectar en la base de datos'), error)
    }
}
connectDB()

// Creamos el servidor
const server = express()

// Permitimos las Conexiones con CORS
const corsOptions:CorsOptions = {
    origin: function(origin, callback) {
        // Permitimos solicitudes sin origen (como visitas directas al navegador a /docs o herramientas de testeo)
        // o si el origen coincide con la URL del frontend configurada.
        if (!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

// Hacemos publica la carpeta public para el logo
server.use(express.static(path.join(__dirname, '../public')))

// Habilitar leer datos de formularios 
server.use(express.json())

// Morgan nos ayduara a monitorear en tiempo real cada solicitud y ver que tiempo se demoro en ejecutarla
server.use(morgan('dev'))

server.use('/api/products', router) /* (use) entra y filtra en nuestro router depende al tipo de htpp que se use */

// ----------------- DOCS
// Creamos un nuevo (endpoint) en el cual le pasaremos el UI de swagger, le pasaremos el (serve) y luego la configuracion con (setup) con el Spec que creamos
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions)) /* Le pasamos sl Spec y le pasamos tambein las opciones para el logo que establecimos */

export default server