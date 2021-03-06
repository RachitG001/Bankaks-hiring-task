const jwt = require('jsonwebtoken');
const apikey = process.env.API_KEY;
const messagebird = require('messagebird')(apikey);

module.exports = {

    getAccessToken : (user)=>{
        payload = {id: user.id, mobile: user.mobile}
        userToken = jwt.sign({data: payload},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFE});
        return userToken;
    },
    verifyUser: (token)=>{
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.data;
        }
        catch (err) {
            return null;
        }
    },
    validateApi: (mobile)=>{
        return new Promise((resolve, reject)=>{
            mobile = "91"+mobile;
            messagebird.lookup.read(mobile,(err,res)=>{
                if(err){
                    reject(new Error(err.errors[0].description));
                }
                console.log(res);
                resolve(true);
            });
        });
    }
}