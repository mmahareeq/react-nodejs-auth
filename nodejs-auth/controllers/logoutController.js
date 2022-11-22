
// @desc Logout
// @ route POST /logout
// @access puplic

const logout = (req, res)=>{
    const cookie = req.cookies;

    if(!cookie.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', {httponly: true, sameSite: 'None', secure: true});
    res.json({'message': 'Cookie cleared'})

}

module.exports = logout;