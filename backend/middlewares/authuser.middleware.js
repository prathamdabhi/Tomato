import jwt from 'jsonwebtoken';

const authUser = () => (req,res,next) => {
  try {
      const { token } = req.headers
      if(!token) return res.status(401).json({success:false,message:"Please login"});
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.body.userId = decoded.id
      next();
  } catch (error) {
    console.log(error.message)
    res.status(401).json({success:false,message:error.message});
  }

}

export default authUser