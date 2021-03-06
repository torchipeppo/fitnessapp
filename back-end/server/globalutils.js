/*Per funzioni che vanno usate in più punti del backend.*/

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

/**
 * Verifica un JWT e restituisce le info che contiene,
 * gestendo un po' d'errori nel frattempo.
 * Tutte le chiamate API devono usare questa funzione,
 * pressoché invariata.
 */
function verifyJWT(req, res, next) {
    var token, decoded;
    const authHeader = req.headers.authorization || "";   //in questo modo anche se Authorization non viene fornito affatto l'esecuzione può comunque andare avanti e darci un messaggio d'errore di jwt
    token = authHeader.split(" ")[1];  //formato header = "Bearer TOKEN"
    try {
        decoded = jwt.verify(token, jwtSecret);
    }
    catch (err) {
        console.error(`jwt ${err.name}: ${err.message}`);   //non vogliamo rimandare al client il messaggio d'errore di jwt
        if (err.name=="TokenExpiredError") {
            return res.status(401).send("Token Expired");
        }
        else {
            return res.status(401).send("Wrong Token or No token");
        }
    }
    //se va tutto bene...
    req.token=token;
    req.user=decoded;
    return next();
}

module.exports = {
    verifyJWT,
}