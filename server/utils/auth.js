const jwt=require('jsonwebtoken');

async function generateAuthToken(email,type,first_name,last_name) {

    let token =jwt.sign({email:email,type:type,name:first_name+" "+last_name},process.env.JWT_KEY,{ expiresIn: '24h' });
    return token;

}

async function isLoggedIn(req, res,next){
    try{
        const token = req.cookies.jwtoken;
        if(token){
            const user=await jwt.verify(token,process.env.JWT_KEY);
            if(user){
                const data={email:user.email, type:user.type};
                res.status(200).send(data);
            }else{
                res.sendStatus(401);
            }
        }
        next();

    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

module.exports.generateAuthToken = generateAuthToken
module.exports.isLoggedIn = isLoggedIn