const  userService = require('../services/userService.js');

//Metodo que permite crer un usuario
const sigIn = async (req, res) => {
  try {
    const result = await userService.sigIn(req.body);
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};


//Metodo que permite obtener todos los usuarios
const getAllUser = async (req, res) => {
  try {
    const result = await userService.getAllUser();
    return res.status(200).json({
      success: true,
      body: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      body: error.message,
    });
  }
};


//Metodo que permite obtener todos los usuarios que estan activos
const getUserActive = async (req, res) => {
  try {
    const result = await userService.getUserActive();
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


//Metodo que permite obtener todos los usuarios que estan inactivos
const getUserInactive = async (req, res) => {
    try {
      const result = await userService.getUserInactive();
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

//Metodo que permite obtener un usuario
const getUserById = async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.id);
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

//Metodo que permite modificar un usuario por medio del id
const updateUser = async (req, res) => {
    try {
      const result = await userService.updateUser(req.params.id, req.body);
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

//Metodo que elmininar un usuario
const deleteUser = async (req, res) => {
    try {
      const result = await userService.deleteUser(req.params.id);
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
    sigIn,
    getAllUser,
    getUserActive,
    getUserInactive,
    getUserById,
    updateUser,
    deleteUser
}