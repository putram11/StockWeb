const { User, Stock, Investment, UserProfile } = require(`../models/index`)
const bcrypt = require(`bcryptjs`);
const MailSlurp = require('mailslurp-client').default;
const apiKey = 'aa9afe15df090811de543c6a332aff51113d18198e4372eee3cd864aff0912df';
const mailslurp = new MailSlurp({ apiKey });


class Controller {
    static async homePage(req, res) {
        try {
            res.render(`HomePage`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async listStocks(req, res) {
        try {
            const session = req.session.user
            const { type } = req.query
            let opt = {
                include: User
            }
            if (type) {
                opt.where = { type }
            }
            const stocks = await Stock.findAll(opt)
            res.render(`Stocks`, { stocks, session })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async registerUser(req, res) {
        try {
            res.render(`RegisUser`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postUser(req, res) {
        try {
            const { username, password, email, role } = req.body
            await User.create({ username, password, email, role });

            const newUser = await User.create({ username, password, email, role });

            console.log(req.body);

            // Buat inbox baru menggunakan MailSlurp
            const inbox = await mailslurp.createInbox();

            // Kirim email konfirmasi
            await mailslurp.sendEmail(inbox.id, {
                to: [newUser.email], // Gunakan newUser.email bukan User.email
                subject: 'Automatic Message from Finance Market',
                body: `Hello ${newUser.username},\n\nTerima kasih sudah mendaftarkan akun di Finance Market. Selamat Trading!\n\nBest regards,\nFinance Market Team`
            });

            res.redirect(`/login?msg=${username} successfully resgistered`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async loginUser(req, res) {
        try {
            const { msg } = req.query
            res.render(`LoginForm`, { msg })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async checkLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                where: { username },
                include: UserProfile
            })
            if (user) {
                const checkPassword = bcrypt.compareSync(password, user.password);
                if (checkPassword) {
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        username: user.username
                    }
                    if (user.UserProfile) {
                        return res.redirect(`/userProfile`)
                    }
                    else {
                        return res.redirect(`/createProfile`)
                    }
                }
                else {
                    return res.redirect(`/login?msg=incorrect password`)
                }
            }
            else {
                return res.redirect(`/login?msg=username not found`)
            }
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async logoutSession(req, res) {
        try {
            req.session.user = undefined
            res.redirect(`/login`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async createProfile(req, res) {
        try {
            const session = req.session.user
            const user = User.findByPk(session.id)
            res.render(`CreateProfile`, { user })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postProfile(req, res) {
        try {
            const session = req.session.user
            const { firstName, lastName, dateOfBirth, gender } = req.body;
            UserProfile.create({ firstName, lastName, dateOfBirth, gender, userId: session.id })
            res.redirect(`/userProfile`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async userProfile(req, res) {
        try {
            const { msg } = req.query
            const session = req.session.user
            const user = await User.findByPk(session.id, {
                include: [UserProfile]
            })
            const investment = await Investment.findAll({
                attributes: [`id`, `name`, `heldStock`, `value`, `userId`, `stockId`],
                where: { userId: session.id }
            })
            res.render(`UserProfile`, { user, session, msg, investment })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async updateProfile(req, res) {
        try {
            const session = req.session.user
            const user = await User.findOne({
                where: { id: session.id },
                include: UserProfile
            })
            res.render(`UpdateProfile`, { user, session })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postUpdProfile(req, res) {
        try {
            const session = req.session.user
            UserProfile.update(req.body, {
                where: { userId: session.id }
            })
            res.redirect(`/userProfile`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async adminStock(req, res) {
        try {
            const { type } = req.query
            const session = req.session.user
            let opt = {
                include: {
                    model: User
                }
            }
            if (type) {
                opt.where = { type }
            }
            const stocks = await Stock.findAll(opt)
            const user = await User.findByPk(session.id)
            // res.send(stocks)
            res.render(`AdminStock`, { stocks, session, user })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getEditStock(req, res) {
        try {
            const { idStock } = req.params;
            const session = req.session.user;
            const stock = await Stock.findByPk(idStock)
            const user = await User.findByPk(session.id)
            res.render(`EditStock`, { stock, session, user })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postEditStock(req, res) {
        try {
            const { idStock } = req.params;
            const session = req.session.user
            await Stock.update(req.body, {
                where: { id: idStock }
            })
            res.redirect(`/editStock`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async buyStock(req, res) {
        try {
            const { idStock } = req.params;
            const session = req.session.user
            const stock = await Stock.findByPk(idStock)
            res.render(`BuyStock`, { stock, session })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postBuyInvestment(req, res) {
        try {
            const { idStock } = req.params;
            const { bought } = req.body
            const session = req.session.user;
            const stock = await Stock.findByPk(idStock)
            await Stock.update({ stock: stock.stock - bought }, {
                where: { id: idStock }
            })
            await Investment.create({
                name: stock.name,
                heldStock: 0 + bought,
                value: stock.price * bought,
                userId: session.id,
                stockId: idStock
            })
            res.redirect(`/userProfile?msg=Stock successfully bought`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async getSellInvestment(req, res) {
        try {
            const { idInvest } = req.params;
            const investment = await Investment.findByPk(idInvest, {
                include: Stock
            })
            console.log(investment)
            res.render(`SellStock`, { investment })
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async sellInvestment(req, res) {
        try {
            const { idInvest } = req.params;
            const invest = await Investment.findOne({
                where: { id: idInvest },
                include: Stock
            })
            await Investment.destroy({
                where: { id: idInvest }
            })
            await Stock.update({ stock: invest.Stock.stock + invest.heldStock }, {
                where: { id: invest.stockId }
            })
            res.redirect(`/userProfile`)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    // static async postSellInvestment(req, res){
    //     try{
    //         const {bought} = req.body
    //     }
    //     catch(err){
    //         console.log(err)
    //         res.send(err)
    //     }
    // }
}

module.exports = Controller