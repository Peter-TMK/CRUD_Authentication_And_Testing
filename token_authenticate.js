require('dotenv').config()

// console.log(process.env.API_KEY)
// console.log(process.env.TEST_ENV)

const TOKEN = process.env.API_KEY

const authenticateUser = (req, res)=>{
    return new Promise((resolve, reject) => {
        let token = req.headers.authorization

        if (!token){
            reject('No token provided')
        }

        token = token.split(" ")[1]

        if (token !== TOKEN){
            reject('Invalid Token!')
        }
        resolve()
    })
}


module.exports = {
    authenticateUser
}