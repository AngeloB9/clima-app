const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

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

        const lugar = await leerInput('Ciudad: ');
        await busqueda.ciudad(lugar);

        //Buscar el lugar
        //Seleccionar el lugar
        //Datos del clima
        //Mostar resultados
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad');
        console.log('Lat');
        console.log('Lgn');
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
