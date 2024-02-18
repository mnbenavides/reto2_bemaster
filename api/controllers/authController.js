const  authService = require('../services/authService.js');


//Metodo que permite logear el usuario
const logIn = async (req, res) => {
    try {
      const result = await authService.logIn(req.body);
      return res.status(200).json({
        success: true,
        body: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        body: error.message,
      });
    }
};



module.exports = {
    logIn
}