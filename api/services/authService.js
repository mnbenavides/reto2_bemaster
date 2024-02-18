const User = require('../../database/model/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;


//Metodo que permite logear al usuario
const logIn = async (body) => {
    const email = body.email;
    const password = body.password;
    if (!email || !password) throw new Error('Por favor ingrese todos los campos requeridos para crear el usuario');

    const user = await User.findOne({ $and: [{ email: email }, { state: 1 }] })
      .select('+password')
      .populate('role');
    if (!user) {
      throw new Error('Usuario o contraseña incorrecta');
    }
    const comparePass = bcrypt.compareSync(password, user.password);
    if (!comparePass) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    const payload = {
      role: user.role.name,
      email: user.email,
      password: user.password,
      name_user: user.name_user,
    };
    // crear a token
    const token = jwt.sign(payload, 'g3$T1onVid30+B3M4$7eR', {
      expiresIn: 10800, // 3 hours
    });
    const res = { msj: 'Autenticación correcta', token: token, user: user };
    return res;
};

module.exports = {
  logIn
}