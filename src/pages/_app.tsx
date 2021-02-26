import { ChallengesProvider } from '../contexts/ChallengeContexts'
import { CountdownProvider } from '../contexts/CountdownContexts'
import '../styles/global.css' // Estilos globais também fica aqui, pois é algo que será aplicada a todas as páginas.



function MyApp({ Component, pageProps }) {
  //Todos os componentes que forem estáticos, coloca aqui, pois será reaproveitado por todas as páginas.]
  //Como o contexto de Countdown DEPENDE do contexto de Challenges, então não pode botar ele em volta.
  //O Contexto de Challenges precisa ficar em volta de tudo
  return(

      <ChallengesProvider>
        <CountdownProvider>

          <Component {...pageProps} />
        </CountdownProvider>
      </ChallengesProvider>

)}

export default MyApp
