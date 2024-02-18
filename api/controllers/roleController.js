const roleService = require('../services/roleService.js');

//Metodo que permite crer un rol
const createRole = async (req, res) => {
  try {
    const result = await roleService.createRole(req.body);
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


//Metodo que permite obtener todos los roles
const getAllRole = async (req, res) => {
  try {
    const result = await roleService.getAllRole();
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


//Metodo que permite obtener todos los roles que estan activos
const getRoleActive = async (req, res) => {
  try {
    const result = await roleService.getRoleActive();
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


//Metodo que permite obtener todos los roles que estan inactivos
const getRoleInactive = async (req, res) => {
  try {
    const result = await roleService.getRoleInactive();
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

//Metodo que permite obtener un rol
const getRoleById = async (req, res) => {
  try {
    const result = await roleService.getRoleById(req.params.id);
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

//Metodo que permite modificar un rol por medio del id
const updateRole = async (req, res) => {
  try {
    const result = await roleService.updateRole(req.params.id, req.body);
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

//Metodo que elmininar un rol
const deleteRole = async (req, res) => {
  try {
    const result = await roleService.deleteRole(req.params.id);
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
  createRole,
  getAllRole,
  getRoleActive,
  getRoleById,
  updateRole,
  getRoleInactive,
  deleteRole
}