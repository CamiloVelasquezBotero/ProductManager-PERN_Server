import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        // Contrparte
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price  is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor TESTING',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        // Contrparte
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

        it('should validate that the price is number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor testing',
            price: 'hola'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        // Contrparte
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
          name: "Mouse - TESTING",
          price: 300
        })
        expect(response.status).toBe(201) /* (toBe) tambien puede ser igual a (toEqual) */
        expect(response.body).toHaveProperty('data') /* Si devuelve el json con un data significa que si se creo */

        // Contraparte
        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })

})

describe('GET /api/products', () => {
    it('Should  check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products') /* Hacemos la peticion pasandole el archivo del servidor y luego la url */
        expect(response.status).toBe(200) /* Sea estado 200 */
        expect(response.headers['content-type']).toMatch(/json/) /* Que en cualquier lado del header traiga un json */
        expect(response.body).toHaveProperty('data') /* Qu el body que manda o el json, tenga la propiedad de data */
        expect(response.body.data).toHaveLength(1) /* Que la cantidad de resultados que nos traiga este data sea igual a 1 */
        expect(response.body.data).not.toHaveProperty('errors') /* Que no tenga la propiedad de errores */
        expect(response.status).not.toBe(404)  /* Que el estaod no sea 404 */
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-exist product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')
    })
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not_valid_url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID No valido')
    })
    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/not_valid_url')
            .send({
                "name": "Monitor Curvo",
                "price": 300,
                "availability": true
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID No valido')
    })
    it('Should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy() /* Se utiliza cundo no nos importa lo que traiga solo que contenga algo como true al coontrario de (toBeFalsy) */
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Should validate that the price is grater than 0', async () => {
        const response = await request(server).put('/api/products/1')
            .send({
                "name": "Monitor Curvo 2",
                "availability": true,
                "price": 0
                }
            )
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy() /* Se utiliza cundo no nos importa lo que traiga solo que contenga algo como true al coontrario de (toBeFalsy) */
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`)
            .send({
                "name": "Monitor Curvo 2",
                "availability": true,
                "price": 300
                }
            )
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBeTruthy() /* Se utiliza cundo no nos importa lo que traiga solo que contenga algo como true al coontrario de (toBeFalsy) */
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should update an existing product with valid data', async () => {
        const response = await request(server).put(`/api/products/1`)
            .send({
                "name": "Monitor Curvo EDITADOTESTING",
                "availability": true,
                "price": 300
                }
            )
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    test('should return a 404 response for a non-existing product', async  () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products', () => {
    test('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/no-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID No valido')
        expect(response.body.errors).toHaveLength(1)
    })
    test('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        expect(response.status).not.toBe(200)
    })
    test('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})