import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({ /* podemos dejarlo vacio o pasarle configuraciones en objeto */
            order: [
                ['id', 'ASC'] /* primer valor sera por  el que traera, y el segundo puede ser ASC(scendente) o DESC(decendiente) como un (orderBy) */
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] } /* Excluimos lo que no necesitamos */
            // limit: 2 /* Limite de datos que se traiga */

    })
    res.json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ error: 'Producto No Encontrado' })
        }
        res.json({ data: product })
    } catch (error) {

    }
}

export const createProduct = async (req: Request, res: Response) => {
    const product = new Product(req.body) // Creamos nueva instancia con el modelo ya creado
    const savedProduct = await product.save() // Guardamos la instancia en la db
    // Se puede hacer tambien con el metodo (create()) sin necesidad de usar el (save()) todo en un solo metodo
    // const product = await Product.create(req.body) 
    res.status(201).json({ data: savedProduct }) /* Retornamos el producto que se guardo en la DB */
}

export const updateProduct = async (req: Request, res: Response) => {
    // Comprobar Existencia
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto No Encontrado' })
    }

    // Actualizar
    await product.update(req.body) /* (update) nos protege y nos sirve para actualizar solo el valor que le pasemos, sin importar si enviamos los otros en blanco no se eliminaran */
    // En caso de queer actualizar estrictamente cada dato se hace de la siguiente manera (hay que verificar que si se pase primero por que si no se pasara en blanco)
    // product.name = req.body.name
    // product.price = req.body.price
    await product.save() /* Guardamos el producto actualizado */
    res.json({data: product})
}

export const updateAvailability = async (req:Request, res:Response) => {
    // Comprobar Existencia
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto No Encontrado' })
    }

    // Actualizar
    product.availability = !product.dataValues.availability /* Le ponemos lo contrario a loq ue tengamos accediendo con el (dataValues) */
    await product.save() 
    res.json({data: product})
}

export const deleteProduct = async (req:Request, res:Response) => {
    // Comprobar Existencia
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Producto No Encontrado' })
    }

    // Eliminar
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
    // En caso de un eliminado logico usariamos un patch para actualizarlo y no hacerlo mas visible
}
