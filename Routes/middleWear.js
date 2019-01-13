const jwt = process.env.JWT
const secret = process.env.SECRET


function protects(req, res, next){
	const token = req.headers.authorization
	if(token){
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				//token is invalid
				res.status(401).json({msg: "Invalid Token"})

			} else {
				//token is valid
				req.username = decodedToken.username;
				next()
			}
		});
	} else {
		res.status(401).json({msg: "no token provided"})
	}
}

module.exports = protects