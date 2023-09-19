import config from '../config/configEnv.js';
import sendEmail from '../config/configMail.js';
import { dtoProduct } from '../dtos/dtoProduct.js';
import {dtoTicket} from '../dtos/dtoTicket.js'
const {default: daoCart} = await import(`../daos/${config.PERSISTENCE}/daoCarts.js`)
const {daoTickets} = await import(`../daos/${config.PERSISTENCE}/daoTickets.js`)
class ServiceCarts {
    async serviceAddCart (){
        try {
            const newCart = await daoCart.addCart()
            return newCart
        } catch (error) {
            throw error
        }
    }
    async serviceGetProdToCart (cid){
        try {
            const products = await daoCart.getProdToCart(cid)
            return products
        } catch (error) {
            throw error
        }
    }
    async serviceAddProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.addProductToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.deleteProductToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateAllProductsToCart (cid, newCart){
        try {
            const cartUpdated = await daoCart.updateAllProductsToCart(cid, newCart)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateQuantityProdToCart (cid, pid, quantity){
        try {
            const cartUpdated = await daoCart.updateQuantityProdToCart(cid,pid, quantity)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteAllProductsToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.deleteAllProductsToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceBuyCart (cid, user){
        try {
            const { productsToBuy, productsOutOfStock, amount } = await daoCart.buyCart(cid)
            let articleBuyed= []
            if (productsToBuy.length) {
                const ticket = dtoTicket(amount, user)
                await daoTickets.addTickets(ticket)
                await this.serviceUpdateAllProductsToCart(cid, productsOutOfStock)                
                articleBuyed = dtoProduct(productsToBuy)
                await sendEmail('Venta Online: Transacción Aprobada', { ...ticket, ...user, articleBuyed })
            }
            let message
            let msg = `Se le ha enviado un correo a su casilla registrada ${user.email} con los datos de la compra`

            if (!productsToBuy.length) {
                message= `Transaccion rechazada, actualmente no hay stock de el/los producto/s solicitado/s.`
            } else if (productsOutOfStock.length){
                message = `Transaccion realizada parcialmente, actualmente algun/os producto/s solicitado/s se encuentran sin stock. ${msg}`
            } else {
                message = `Transaccion completada con exito!! ${msg}`
            }

            return {
                message,
                articleBuyed,
                articleOutOfStock: dtoProduct(productsOutOfStock)
            }
        } catch (error) {
            throw error
        }
    }
}
export const serviceCarts = new ServiceCarts()