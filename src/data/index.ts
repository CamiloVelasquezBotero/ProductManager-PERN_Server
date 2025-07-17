import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit() /* Le podemos colocar 0 o le pdemos colocar nada para que sepa que finalizo pero que finalizo bien */
    } catch (error) {
        console.log(error)
        exit(1) /* Al usar (exit) si le colocamos (1) esto significa que finalizara el programa pero lo finalizara con errores <, si lo pusieramos solo simplemente finalizaria */
    }
}
if(process.argv[2] === '--clear') {
    clearDB()
}