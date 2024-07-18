const { tester, registerUser, postUser, homePage, loginUser, checkLogin, listStocks, userProfile, createProfile, postProfile, updateProfile, postUpdProfile } = require("../controllers/controller")

const router = require(`express`).Router()

router.get(`/tester`, tester)
router.get(`/`, homePage)
router.get(`/stocks`, listStocks)
router.get(`/register`, registerUser)
router.post(`/register`, postUser)
router.get(`/login`, loginUser)
router.post(`/login`, checkLogin)
router.use(function (req, res, next) {
    const session = req.session.user
    if(session){
        next()
    }
    else{
        res.redirect(`/login?msg=Please login first`)
    }
})
router.get(`/createProfile/:id`, createProfile)
router.post(`/createProfile/:id`, postProfile)
router.get(`/userProfile/:id`, userProfile)
router.get(`/updateProfile/:id`, updateProfile)
router.post(`/updateProfile/:id`, postUpdProfile)

module.exports = router