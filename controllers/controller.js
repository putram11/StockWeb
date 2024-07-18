const {User, Stock, Investment, UserProfile} = require(`../models/index`)
const bcrypt = require(`bcryptjs`)

class Controller {
    static async tester(req, res){
        try{
            const user = await User.findAll({
                include: Stock
            })
            res.send(user)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async homePage(req, res){
        try{
            res.render(`HomePage`)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async registerUser(req, res){
        try{
            res.render(`RegisUser`)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async postUser(req, res){
        try{
            const {username, password, email, role} = req.body
            User.create({username, password, email, role});
            res.redirect(`/?msg=${username} successfully resgistered`)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async loginUser(req, res){
        try{
            const {msg} = req.query
            res.render(`LoginForm`, {msg})
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async checkLogin(req, res){
        try{
            const {username, password} = req.body;
            const user = await User.findOne({
                where: {username}
            })
            if(user){
                const checkPassword = bcrypt.compareSync(password, user.password);
                if(checkPassword){
                    return res.redirect(`/`)
                }
                else{
                    return res.redirect(`/login?msg=incorrect password`)
                }
            }
            else{
                return res.redirect(`/login?msg=username not found`)
            }
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }
}

module.exports = Controller