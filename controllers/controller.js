const { User, Stock, Investment, UserProfile } = require('../models/index');
const bcrypt = require('bcryptjs');
const MailSlurp = require('mailslurp-client').default;

const apiKey = 'aa9afe15df090811de543c6a332aff51113d18198e4372eee3cd864aff0912df';
const mailslurp = new MailSlurp({ apiKey });

class Controller {
    // Home Page
    static async homePage(req, res) {
        try {
            res.render('HomePage');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // List Stocks
    static async listStocks(req, res) {
        try {
            const session = req.session.user;
            const { type } = req.query;
            const options = { include: User };

            if (type) {
                options.where = { type };
            }

            const stocks = await Stock.findAll(options);
            res.render('Stocks', { stocks, session });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Register User
    static async registerUser(req, res) {
        try {
            res.render('RegisUser');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async postUser(req, res) {
        try {
            const { username, password, email, role } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser = await User.create({ username, password: hashedPassword, email, role });
            const inbox = await mailslurp.createInbox();

            await mailslurp.sendEmail(inbox.id, {
                to: [newUser.email],
                subject: 'Automatic Message from Finance Market',
                body: `Hello ${newUser.username},\n\nTerima kasih sudah mendaftarkan akun di Finance Market. Selamat Trading!\n\nBest regards,\nFinance Market Team`,
            });

            res.redirect(`/login?msg=${username} successfully registered`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Login User
    static async loginUser(req, res) {
        try {
            const { msg } = req.query;
            res.render('LoginForm', { msg });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async checkLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username }, include: UserProfile });

            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = { id: user.id, role: user.role, username: user.username };
                return user.UserProfile ? res.redirect('/userProfile') : res.redirect('/createProfile');
            }

            return res.redirect(`/login?msg=${user ? 'incorrect password' : 'username not found'}`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Logout User
    static async logoutSession(req, res) {
        try {
            req.session.user = undefined;
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Profile
    static async createProfile(req, res) {
        try {
            const session = req.session.user;
            const user = await User.findByPk(session.id);
            res.render('CreateProfile', { user });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async postProfile(req, res) {
        try {
            const session = req.session.user;
            const { firstName, lastName, dateOfBirth, gender } = req.body;

            await UserProfile.create({ firstName, lastName, dateOfBirth, gender, userId: session.id });
            res.redirect('/userProfile');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async userProfile(req, res) {
        try {
            const { msg } = req.query;
            const session = req.session.user;
            const user = await User.findByPk(session.id, { include: [UserProfile] });

            const investments = await Investment.findAll({
                attributes: ['id', 'name', 'heldStock', 'value', 'userId', 'stockId'],
                where: { userId: session.id },
            });

            res.render('UserProfile', { user, session, msg, investments });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async updateProfile(req, res) {
        try {
            const session = req.session.user;
            const user = await User.findOne({ where: { id: session.id }, include: UserProfile });

            res.render('UpdateProfile', { user, session });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async postUpdProfile(req, res) {
        try {
            const session = req.session.user;
            await UserProfile.update(req.body, { where: { userId: session.id } });
            res.redirect('/userProfile');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Admin Stocks
    static async adminStock(req, res) {
        try {
            const { type } = req.query;
            const session = req.session.user;
            const options = { include: { model: User } };

            if (type) options.where = { type };

            const stocks = await Stock.findAll(options);
            const user = await User.findByPk(session.id);

            res.render('AdminStock', { stocks, session, user });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async getEditStock(req, res) {
        try {
            const { idStock } = req.params;
            const session = req.session.user;
            const stock = await Stock.findByPk(idStock);
            const user = await User.findByPk(session.id);

            res.render('EditStock', { stock, session, user });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async postEditStock(req, res) {
        try {
            const { idStock } = req.params;
            await Stock.update(req.body, { where: { id: idStock } });

            res.redirect(`/editStock`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Buying Stocks
    static async buyStock(req, res) {
        try {
            const { idStock } = req.params;
            const session = req.session.user;
            const stock = await Stock.findByPk(idStock);

            res.render('BuyStock', { stock, session });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async postBuyInvestment(req, res) {
        try {
            const { idStock } = req.params;
            const { bought } = req.body;
            const session = req.session.user;

            const stock = await Stock.findByPk(idStock);
            await Stock.update({ stock: stock.stock - bought }, { where: { id: idStock } });

            await Investment.create({
                name: stock.name,
                heldStock: bought,
                value: stock.price * bought,
                userId: session.id,
                stockId: idStock,
            });

            res.redirect(`/userProfile?msg=Stock successfully bought`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    // Selling Investments
    static async getSellInvestment(req, res) {
        try {
            const { idInvest } = req.params;
            const investment = await Investment.findByPk(idInvest, { include: Stock });

            res.render('SellStock', { investment });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

    static async sellInvestment(req, res) {
        try {
            const { idInvest } = req.params;

            const investment = await Investment.findOne({
                where: { id: idInvest },
                include: Stock,
            });

            await Investment.destroy({ where: { id: idInvest } });
            await Stock.update({ stock: investment.Stock.stock + investment.heldStock }, { where: { id: investment.stockId } });

            res.redirect('/userProfile');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }
}

module.exports = Controller;
