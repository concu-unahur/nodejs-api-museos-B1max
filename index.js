const superagent = require('superagent');
const fs = require('fs');
function guardarEnArchivo(error, resultado, ){
  if (error){
    throw new Error('ocurrio un error, algo se jodio')
  }
  
  fs.writeFile('museos.txt', resultado.body.count, terminar);
}
function spAgent(next){
  superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(next)
}
function terminar(error){
  console.log('programa terminado, archivo grabado\n')
}
function organismos(next){
  superagent
  .get('https://www.cultura.gob.ar/api/v2.0/organismos')
  .query({ format: 'json' })
  .end(next)
}
function guardarEnArchivoOrganismo(error, resultado){
  if (error){
    throw new Error('ocurrio un error, algo se jodio')
  }
  const organismos = resultado.body.results
  for(let i = 0;i<organismos.length;i++){
    fs.appendFile('organismos.txt', '{'+organismos[i].nombre +'-'+ organismos[i].direccion +'\n Por cualquier consulta comunicarse al '+organismos[i].telefono +'}' + '\n\n', terminar);
  }
}
// spAgent(guardarEnArchivo)
organismos(guardarEnArchivoOrganismo)