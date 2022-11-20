const dotenv = require("dotenv");

dotenv.config({path:__dirname+'/./../../../.env'})
/*
*    expiration - JWT time to live(seconds or time units)
*    expiration: 3600 // 1 hour
*    expiration: '1h' // 1 hour
*    expiration: '7d' // 7 days
*/
module.exports = { 
    secret: process.env.JWT_SECRET,
    expiration: 3600
}