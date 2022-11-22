const User = require('../model/User');
const bcrypt = require('bcrypt');

const handlerNewUser = async (req, res)=>{
  const {user, pwd} = req.body;

  if(!user || !pwd || !email) return res.status(400).json({'message': 'UserName and Password are required'}); 

  const isFind = await User.findOne({userName: user, email: email}).exec();
  if(isFind) return res.sendStatus(409);

  try{
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = User.create({
        userName: user,
        email: email,
        password: hashedPwd
    });

    // const newUser = new User({userName: user,
    //     email: email,
    //     password: hashedPwd
    // });

    // const result = newUser.save();
    res.status(201).json({'message': 'new user created!'});
  }
  catch (err){
    res.status(500).json({'message': err.message});
  }
}

module.exports = handlerNewUser;