require('dotenv').config();

const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

//console.log(process.env.MAPBOX_KEY);
const main = async () => {
  let opt = '';
  const busqueda = new Busquedas();
  do {
    // Imprimir el menú
    opt = await inquirerMenu();
    //console.log({ opt });

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const termino = await leerInput('Ciudad: ');
        //Buscar el lugar
        const lugares = await busqueda.ciudad(termino);
        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === '0') continue;

        //Guardar en DB
        const lugarSel = lugares.find((l) => l.id === id);
        busqueda.agregarHistorial(lugarSel.nombre);

        //Datos del clima
        const clima = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng);

        //Mostar resultados
        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', lugarSel.nombre.green);
        console.log('Lat:', lugarSel.lat);
        console.log('Lgn:', lugarSel.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
        console.log('Cómo está el clima:', clima.desc.green);
        break;
      case 2:
        busqueda.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}`;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }

    //guardarDB(tareas.listadoArr);
    if (opt !== 0) {
      await pausa();
    }
  } while (opt !== 0);
};

main();
