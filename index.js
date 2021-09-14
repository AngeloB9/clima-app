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
        const lugarSel = lugares.find((l) => l.id === id);

        //Datos del clima
        //Mostar resultados
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', lugarSel.nombre);
        console.log('Lat:', lugarSel.lat);
        console.log('Lgn:', lugarSel.lng);
        console.log('Temperatura');
        console.log('Mínima');
        break;
      case 2:
        console.log('Hola esta es la op2');
        break;
    }

    //guardarDB(tareas.listadoArr);
    if (opt !== 0) {
      await pausa();
    }
  } while (opt !== 0);
};

main();
