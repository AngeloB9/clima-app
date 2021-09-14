const axios = require('axios');

class Busquedas {
  historial = ['Quito', 'Madrid', 'Bogota'];

  constructor() {
    //TODO: leer DB si existe una
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  async ciudad(lugar = '') {
    //petición http

    //console.log('ciudad', lugar);

    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log('No se encontró nada');
      return [];
    }

    return []; //retornar los lugares que coincidan con el valor recibido como párametro
  }
}

module.exports = Busquedas;
