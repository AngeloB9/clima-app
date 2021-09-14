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

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async ciudad(lugar = '') {
    //petición http

    //console.log('ciudad', lugar);

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
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

  async climaLugar(lat, lon) {
    try {
      //Instance de axios.create()
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });
      //resp: Extraer la información con .data
      const resp = await instance.get();
      const { weather, main } = resp.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
