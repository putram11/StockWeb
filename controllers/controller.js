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

    static async listStocks(req, res){
        try{
            const stocks = await Stock.findAll({
                include: User
            })
            res.render(`Stocks`, {stocks})
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
            res.redirect(`/login?msg=${username} successfully resgistered`)
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
                where: {username},
                include: UserProfile
            })
            console.log(user)
            if(user){
                const checkPassword = bcrypt.compareSync(password, user.password);
                if(checkPassword){
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        username: user.username
                    }
                    if(user.UserProfile){
                        return res.redirect(`/userProfile/${user.id}`)
                    }
                    else{
                        return res.redirect(`/createProfile/${user.id}`)
                    }
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

    static async createProfile(req, res){
        try{
            const {id} = req.params
            const user = User.findByPk(id)
            res.render(`CreateProfile`, {user})
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async postProfile(req, res){
        try{
            const {id} = req.params
            const {firstName, lastName, dateOfBirth, gender} = req.body;
            UserProfile.create({firstName, lastName, dateOfBirth, gender, userId: id})
            res.redirect(`/userProfile/${id}`)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async userProfile(req, res){
        try{
            const{id} = req.params
            const user = await User.findByPk(id, {
                include: [Stock, UserProfile]
            })
            res.render(`UserProfile`, {user})
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async updateProfile(req, res){
        try{
            const {id} = req.params;
            const profile = await UserProfile.findOne({
                where: {userId: id}
            })
            res.render(`UpdateProfile`, {profile})
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    static async postUpdProfile(req, res){
        try{
            const {id} = req.params;
            UserProfile.update(req.body, {
                where: {userId: id}
            })
            console.log(req.body)
            res.redirect(`/userProfile/${id}`)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }
}

module.exports = Controller