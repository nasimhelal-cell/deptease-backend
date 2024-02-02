import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {  
    const token = req.headers['token']
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Attach the decoded user information to the request for further use
      req.user = decoded;
  
      next();
    });
  };