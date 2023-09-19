import config from '../config/configEnv.js';
import { dtoProfile } from '../dtos/dtoProfile.js';
const { default: daoProducts } = await import(`../daos/${config.PERSISTENCE}/daoProducts.js`)
import { dtoViews } from "../dtos/dtoViews.js"
import { serviceUsers } from '../services/serviceUsers.js';

class Repository {
    async repositoryGetProducts(reqQuery) {
        try {
            let { limit, page, sort, ...query } = reqQuery
            const response = await daoProducts.getProducts(limit, page, sort, query)
            const products = dtoViews(response)
            return products 
        } catch (error) {
            throw error
        }
    }
    async repositoryGetProductsWithPaginate(reqQuery) {
        try {
            let { limit, page, sort, ...query } = reqQuery
            const response = await daoProducts.getProducts(limit, page, sort, query)
            const products = dtoViews(response)
            return {products,...response} 
        } catch (error) {
            throw error
        }
    }
    async repositoryGetUsersById(id) {
        try {
            const user = await serviceUsers.serviceGetById(id);
            return dtoProfile(user) 
        } catch (error) {
            throw error
        }
    }
}
export const repository = new Repository()