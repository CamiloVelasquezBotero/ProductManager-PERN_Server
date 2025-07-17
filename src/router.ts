import { Router } from 'express'
import { body, param } from 'express-validator' /* Se utiliza cuando se usa en un router, si lo usaramos en una funcion asyncrona usariamos (check) */
import { getProducts, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()
//Routing

/** ----- Comentario exclusivo para la documentacion de Swagger
 * @swagger
 * components: 
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo 49 pulgadas
 *                  price: 
 *                      type: number
 *                      description: The Product PRICE
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
*/
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a product list
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
*/
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses:
 *              200: 
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: not found
 *              400:
 *                  description: Bad Request - Invalid ID
 *          
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID No valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *                  description: Product created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid input data
 *                          
 */
router.post('/', 
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'), //Usamos los metodos anidados de (check) y ejecutamos con (run) pasandole el (req)
    body('price')
        .isNumeric().withMessage('Valor no valido') /* Validamos que sea numerico y le anidamos un metodo de mensaje */
        .notEmpty().withMessage('El precio no puede ir vacio') /* que no vaya vacio */
        .custom(value => value > 0 ).withMessage('Precio no valido'), /* (custom) metodo personalizable, en caso de que sea menor a 0 */
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user info
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas - EDITADO"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */
router.put('/:id', // PUT Actualiza todo y reescribe todo lo que tenemos en nuestra DB a diferencia de PATCH
    param('id').isInt().withMessage('ID No valido'),
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
    .isNumeric().withMessage('Valor no valido') 
    .notEmpty().withMessage('El precio no puede ir vacio')
    .custom(value => value > 0 ).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product update
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */
router.patch('/:id', /* PATCH Solo reeescribe el valor que le pasemos asi no usemos (update) con sequelize a diferencia de PUT*/
    param('id').isInt().withMessage('ID No valido'),
    handleInputErrors,
    updateAvailability) 

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product
 *      tags:
 *          - Products
 *      description: Delete a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Product ID to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID No valido'),
    handleInputErrors,
    deleteProduct
)

export default router