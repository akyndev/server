import JWT from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "unauthorize" });
    }

    const token = authHeader.split(" ")[1];
    const decodedData = JWT.decode(token)
    req.user = decodedData
    next()
  } catch (error) {
    next(error);
  }
};
