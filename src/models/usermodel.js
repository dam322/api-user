import connection from '../database/database.js';
import bcrypt from 'bcrypt';

const User = {};

// Función para hashear la contraseña
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

User.createUser = (userData, callback) => {
  hashPassword(userData.contrasena)
    .then((hashedPassword) => {
      userData.contrasena = hashedPassword;
      connection.query('INSERT INTO users SET ?', userData, (error, results, fields) => {
        if (error) return callback(error, null);
        return callback(null, results);
      });
    })
    .catch((error) => {
      return callback(error, null);
    });
};

User.getAllUsers = (callback) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) return callback(error, null);
    return callback(null, results);
  });
};

User.getUserById = (userId, callback) => {
  connection.query('SELECT * FROM users WHERE id = ?', userId, (error, results, fields) => {
    if (error) return callback(error, null);
    if (results.length === 0) return callback(null, null); // Usuario no encontrado
    return callback(null, results[0]);
  });
};

User.updateUser = (userId, userData, callback) => {
  hashPassword(userData.contrasena)
    .then((hashedPassword) => {
      userData.contrasena = hashedPassword;
      connection.query('UPDATE users SET ? WHERE id = ?', [userData, userId], (error, results, fields) => {
        if (error) return callback(error, null);
        return callback(null, results);
      });
    })
    .catch((error) => {
      return callback(error, null);
    });
};

User.deleteUser = (userId, callback) => {
  connection.query('DELETE FROM users WHERE id = ?', [userId], (error, results, fields) => {
    if (error) return callback(error, null);
    return callback(null, results);
  });
};

User.getUserByUsername = (username, callback) => {
    connection.query('SELECT * FROM users WHERE nombre_usuario = ?', username, (error, results, fields) => {
        if (error) return callback(error, null);
        if (results.length === 0) return callback(null, null); // Usuario no encontrado
        return callback(null, results[0]);
    });
};

export default User;
