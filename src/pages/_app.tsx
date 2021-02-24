import '../styles/global.css' // Estilos globais também fica aqui, pois é algo que será aplicada a todas as páginas.

function MyApp({ Component, pageProps }) {
  //Todos os componentes que forem estáticos, coloca aqui, pois será reaproveitado por todas as páginas.
  return <Component {...pageProps} />
}

export default MyApp
