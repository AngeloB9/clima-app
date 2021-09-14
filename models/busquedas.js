const axios = require('axios');

class Busquedas {
  historial = ['Quito', 'Madrid', 'Bogota'];

  constructor() {
    //TODO: leer DB si existe una
  }

  async ciudad(lugar = '') {
    //petición http

    console.log('ciudad', lugar);

    return []; //retornar los lugares que coincidan con el valor recibido como párametro
  }
}

module.exports = Busquedas;
