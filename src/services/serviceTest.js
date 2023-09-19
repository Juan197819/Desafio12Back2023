import { faker } from '@faker-js/faker'

class ServiceTest {
    async serviceTestMock(qty) {
        try {
            let arrayProduct =[]
            for (let i = 0; i < qty; i++) {
                const product = {
                    title: faker.commerce.product(2),
                    description: faker.commerce.productDescription(),
                    status: faker.datatype.boolean(),
                    stock: faker.number.int({max:100}),
                    category: faker.commerce.department(),
                    code: faker.finance.currencyCode() +faker.finance.accountNumber(3),
                    thumbnail:[ faker.image.url()],
                    price: faker.commerce.price({max:5000})
                }
                arrayProduct.push(product)
            }
            return arrayProduct
        } catch (error) {
            throw error
        }
    }
}
export const serviceTest = new ServiceTest()