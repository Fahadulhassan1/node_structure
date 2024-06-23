const jwt = require("jsonwebtoken");

//generate token

exports.getToken = async(user) => {
    const payload = {
      id: user._id,
      email: user.email
    };
    
    const secret = process.env.SECRET_TOKEN;
    const options = { expiresIn: '1h' };
  
    const token = jwt.sign(payload, secret, options);
    return token;
  }

//validate access token

exports.validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        return true ;
      } catch (error) {
        return false;
      }
}

//Authenticate access token

exports.authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({error: "token unauthorized"});
    }
  
    const result = await this.validateToken(token);
  
    if (!result) {
      return res.status(403).json({ error: "Token unauthorized." });
    }
  
    req.user = result.data;
    next();
  }