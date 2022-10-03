const fs = require('fs')
// const { resolve } = require('path')
const path = require('path')
const userDBPath = path.join(__dirname, "db", 'users.json')

const getAllUsers = (req, res)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(userDBPath, "utf8", (err, users)=>{
            if(err){
                reject(err)
            }
            resolve(JSON.parse(users))
        })
    })
}

const authenticateUser = (req, res)=>{
    return new Promise((resolve, reject)=>{
        const body = []

        req.on('data', (chunk)=>{
            body.push(chunk)
        })
        req.on('end', async ()=>{
            const parseBody = Buffer.concat(body).toString()
            // console.log(parseBody)

            if (!parseBody){
                reject("No username or password")
            }

            const loginDetails = JSON.parse(parseBody)
            // console.log(loginDetails)

            const users = await getAllUsers()
            const userFound = users.find((user) => {
                return user.username === loginDetails.username
            })

            if (!userFound){
                reject("User not found, Please sign up!")
            }
            // console.log(userFound)
            if (userFound.password !== loginDetails.password){
                reject("Invalid username or password!")
            }
            resolve()
        })
    })
}

module.exports = {
    authenticateUser
}