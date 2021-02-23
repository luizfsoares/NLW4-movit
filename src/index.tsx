import React from 'react';
import ReactDOM from 'react-dom'; //Precisa importar para trabalhar com react para WEB
import App from './App';



//Usando Tags como se fossem codigos HTML, isso se chama JSV (Usar HTML dentro do Javascript)
ReactDOM.render(
  <React.StrictMode>
    <App /> 

  </React.StrictMode>,
  document.getElementById('root') //Vai no documento, busca o elemento que possui o ID root e dentro dele joga o que tem acima <App/>
);

