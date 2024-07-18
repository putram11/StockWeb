const { tester, registerUser, postUser, homePage, loginUser, checkLogin } = require("../controllers/controller")

const router = require(`express`).Router()

router.get(`/tester`, tester)
router.get(`/`, homePage)
router.get(`/register`, registerUser)
router.post(`/register`, postUser)
router.get(`/login`, loginUser)
router.post(`/login`, checkLogin)

module.exports = router