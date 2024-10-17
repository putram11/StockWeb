const {
    registerUser,
    postUser,
    homePage,
    loginUser,
    checkLogin,
    listStocks,
    userProfile,
    createProfile,
    postProfile,
    updateProfile,
    postUpdProfile,
    getEditStock,
    adminStock,
    postEditStock,
    buyStock,
    postBuyInvestment,
    sellInvestment,
    logoutSession
} = require('../controllers/controller');

const router = require('express').Router();

// Public Routes
router.get('/', homePage);
router.get('/stocks', listStocks);
router.get('/register', registerUser);
router.post('/register', postUser);
router.get('/login', loginUser);
router.post('/login', checkLogin);

// Authentication Middleware
router.use((req, res, next) => {
    const session = req.session.user;
    if (session) {
        next();
    } else {
        res.redirect('/login?msg=Please login first');
    }
});

// Protected Routes
router.get('/logout', logoutSession);
router.get('/createProfile', createProfile);
router.post('/createProfile', postProfile);
router.get('/userProfile', userProfile);
router.get('/updateProfile', updateProfile);
router.post('/updateProfile', postUpdProfile);

// Admin Stock Management
router.get('/editStock', adminStock);
router.get('/editStock/:idStock', getEditStock);
router.post('/editStock/:idStock', postEditStock);

// Open Stock Operations
router.get('/openStocks', listStocks);
router.get('/openStocks/:idStock', buyStock);
router.post('/openStocks/:idStock', postBuyInvestment);

// Sell Investment
router.get('/sellStock/:idInvest', sellInvestment);

module.exports = router;
