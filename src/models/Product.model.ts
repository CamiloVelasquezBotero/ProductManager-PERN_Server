import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
    /* timestamps: false */ // No crear los timestamps
})

class Product extends Model {
    @Column({ /* Decorador */
        type: DataType.STRING(100) /* Definimos cantidad de caracteres tipo (VARCHAR) */
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true) //availability sera true por default, siempre se coloca antes de la columna
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}
export default Product