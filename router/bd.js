
const { Router } = require("express")
const router = Router()
const metodosBd = require('../controllers/db')

router.post("/",metodosBd.insert)
router.get("/",metodosBd.get)
router.get("/:id",metodosBd.getId)
router.get("/book/:id",metodosBd.getBookUser)
router.delete("/:id",metodosBd.deleted)
router.put("/:id",metodosBd.update)
router.delete("/reg/all",metodosBd.deleteAll)
router.post("/login",metodosBd.login)
router.put("/addBook/:id",metodosBd.addBooks)

module.exports = router;