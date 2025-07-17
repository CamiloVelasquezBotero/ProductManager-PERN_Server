import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

// Primero creamos las opciones y le pasamos el type que le corresponde indicandole que sera de tipo opciones
const options:swaggerJSDoc.Options = {
    swaggerDefinition: { /* Aqui va la definicion de nuestra API */
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Doc fr Products'
        }
    },
    apis: ['./src/router.ts'] /* Aqui le pasamos las rutas que define neustra api, si tuvieramos mas las agregariamos con una (.) */
}
const swaggerSpec = swaggerJSDoc(options) /* Cremos nuestro swaggerSpec con el (swaggerJSDoc) importado y le pasamos las opciones */

const swaggerUiOptions:SwaggerUiOptions = { /* Creamos valiable de opciones para cambiar el LOGOTIPO */
    customCss: `
        .topbar-wrapper .link {
            content: url('/logo.png');
            height: 100px;
            object-fit: cover;
        }
    `,
    customSiteTitle: 'Documentacion Rest API  Express / TypeScript'
}

export default swaggerSpec
export {
    swaggerUiOptions
}