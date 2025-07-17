import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config() /* Iniciamos dotenv */

// Creamos la DB con sequelize y le pasamos los modelso que usara
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false /* Lo desactivamos para que no mande logs a la consola de los (select, insert etc....) que hace en sql */
}) 

export default db