import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    // console.log("Token:", token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // invalid token
        req.user = decoded; // { userId, role }
        next();
    });
}

function verifyAdmin(req, res, next) {
    // console.log("User role", req.user?.role);
    if (req.user?.role !== 'admin') return res.sendStatus(403);
    if (req.headers["x-api-key"] !== process.env.ADMIN_API_KEY) return res.sendStatus(401);
    next();
}

const createToken = (user) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export { verifyToken, verifyAdmin, createToken };