// import request from 'supertest'
// import server from '../server'
import { connectDB } from '../server'
import db from '../config/db'

// ------------------ JEST
// Al crear un test, utilizamos (describe) y este toda 2 parametros, el primero es el nombre, y el segundo sera un callback
describe('Nuestro primer test', () => { // Se nombra el agrupador
    test('Debe revisar que 1 + 1 sean 2', () => { // Creamos el primer test, toma un nombre y un callback
        expect(1+1).toBe(2) // En (expect) le pasamos lo que esperamos y en (toBe) lo que debe de ser "Esperamos que 1+1 sean 2"

    })
    // it() /* Tambien se puede usar it, es un alias de (test) */

    test('Debe revisar que 1 + 1 no sean 3', () => {
        expect(1+1).not.toBe(3)
    })
})

// -------------------------- SUPERTEST
// Supertest nos ayuda a testear solicitudes http a diferencia de jest que solo son funciones, componentes ets
// -----  Las pruebas siempre deben de ir acompañadas de lo que deben de hacer y tambien de lo que no deben de hacer ----- 
// describe('GET /api', () => {
//     test('should send back a json response', async () => {
//         const res = await request(server).get('/api') /* Le pasamos el (request) de supertest y le pasamos el (servidor) que creamos para que sepa a donde se tiene que conectar*/
//         
//         expect(res.status).toBe(200)  /* Revisar estado */
//         expect(res.headers['content-type']).toMatch(/json/) /* Esperamos que haga match con algun json */
//         expect(res.body.msg).toBe('Desde API') /* Accedemos al body para obtener el json  */
// 
//         expect(res.status).not.toBe(404) /* Probamos lo que no debe de pasar */
//         expect(res.body.msg).not.toBe('desde api')
//     })
// }) 

// ------ FORZAR ERRORES 
jest.mock('../config/db') /* Creamos el mock pasandole la base de datos */

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        /* Para forzar este error, loq ue tenemos que hacer es usar (spyOn) al cual le pasamos 2 datos, el primero sera la base 
        de datos que usara, y el segundo sera el metodo que usara pero se lo se lo pasamos en string para que vigile el comportamiento de este metodo */
        // Despues usamos (mockRejectedValueOnce) para forzar el error y le pasamos el error o el valor que queremos 
        jest.spyOn(db, 'authenticate')/* Creamos el espia */
            .mockRejectedValueOnce(new Error('Hubo un error al conectar en la base de datos')) /*Forzamos el catch para que no ejecute el try */
        /* Despues creamos la variable que sera el spyOn que esperara por el (conosole), y leeremos el (log) */
        const consoleSpy = jest.spyOn(console, 'log') /* Este espia estara esperando por el log... */
        /* finalmente llamamos la funcion para ejecutarla y que la pueda detectar para testear */
        await connectDB()
        /* Despues ya podemos escribir los (expect)*/
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar en la base de datos'),
            expect.any(Error)
        )
    })
})
