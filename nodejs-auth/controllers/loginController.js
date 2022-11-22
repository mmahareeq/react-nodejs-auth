const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const loginController = async(req,res)=>{
   const {userName, password} = req.body;

   if(!useName || !password) 
   return res.status(400).json({message:'All fields are required!'});

   const user = await User.findOne({userName: userName}).exec();

   if(!user) return res.status(401).json({message: 'user is not found'});


   const match = await bcrypt.compare(password, user.password);
   if(!match) return res.status(401).json({message: 'Unauthorized'});

   const accessToken = jwt.sign({'UserInfo': {
    'userName': user.username,
    'roles': user.roles
    } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' });

    const refreshToken = jwt.sign(
        { "userName": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    res.json({ accessToken })

}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async(req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    
};


module.exports = {loginController, refresh};