import { Router } from "express"
import { isAdmin } from '../middleware/isAdmin.js'
import { authPassport } from '../middleware/authPasport.js'
import { routerProducts } from "./routerProducts.js";
import { routerCarts } from "./routerCarts.js";
import { routerViews } from "./routerViews.js";
import { routerSessions } from "./routerSessions.js";
import { controllerTests } from "../controllers/controllerTest.js";
import { isUser } from "../middleware/isUser.js";

const router = Router()

router.use('/api/products', authPassport, isAdmin, routerProducts)
router.use('/api/carts', authPassport, isUser, routerCarts)
router.use('/api/sessions', routerSessions)
router.use('/', routerViews)
router.get('/mockingproducts', controllerTests.controllerTestMock)

export default router