const axios = require('axios');

class Busquedas {
  historial = ['Quito', 'Madrid', 'Bogota'];

  constructor() {
    //TODO: leer DB si existe una
  }

  async ciudad(lugar = '') {
    //petición http

    //console.log('ciudad', lugar);

    try {
      const resp = await axios.get('https://reqres.in/api/users?page=2');
      console.log(resp.data);
      return [];
    } catch (error) {
      console.log('No se encontró nada');
      return [];
    }

    return []; //retornar los lugares que coincidan con el valor recibido como párametro
  }
}

module.exports = Busquedas;
