import { CompletedChallenges } from '../components/CompetedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

export default function Home() {

  //Dentro do head, pode importar os links e meta dados. Coloca os links na tag head do html
  //Lembrar que precisa estar encapsulado por algo, nesse caso a <div>
  return (

    <div className={styles.container}>
      
      <ExperienceBar/>

      <section>
        <div>
          <Profile />
          <CompletedChallenges/>
          <Countdown/>
        </div>
        <div>

        </div>
      </section>
    
    </div>
  )
}
