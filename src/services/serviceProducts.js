import config from '../config/configEnv.js';
import { errorCustom } from '../middleware/errorHandler.js';
import { repository } from '../repository/repository.js';
const { default: daoProducts } = await import(`../daos/${config.PERSISTENCE}/daoProducts.js`)
console.log('Persistencia',config.PERSISTENCE)

class ServiceProducts {
    async serviceAddProduct (product){
        try {
            const newProduct = await daoProducts.addProduct(product)
            return newProduct
        } catch (error) {
            throw error
        }
    }
    async serviceGetProducts (reqQuery){
        try {
            const productos = await repository.repositoryGetProducts(reqQuery)
            return productos
        } catch (error) {
            throw error
        }
    }
    async serviceGetProductsWithPaginate (query){
        try {
            const productosWithPaginate = await repository.repositoryGetProductsWithPaginate(query)
            return productosWithPaginate
        } catch (error) {
            throw error
        }
    }

    async serviceGetProductById (id){
        try {
            const product = await daoProducts.getProductById(id)
            return product
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateProduct (id, product){
        try {
            const response = await daoProducts.updateProduct(id, product)
            return response
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProduct (id){
        try {
            const response = await daoProducts.deleteProduct(id)
            return response
        } catch (error) {
            throw error
        }
    }
}
export const serviceProducts = new ServiceProducts()