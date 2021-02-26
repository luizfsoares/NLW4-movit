
import styles from '../styles/components/ChallengeBox.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContexts';
import { CountdownContexts } from '../contexts/CountdownContexts';


export function ChallengeBox() {

    //Recebendo dados do contexto de Challenges
    //A partir dessa variável, como ela é um objeto, podemos ter acesso aqui a cada parâmetro, tipo, texto e quantidade.
    const { currentChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const {challengeFailed, challengeSucceeded} = useContext(CountdownContexts);



    return(

        <div className={styles.challengeBoxContainer}>

            {currentChallenge ? ( //Se for true, mostra a tela de desafios ativos, se for false, mostra a tela inicial 

                <div className={styles.challengeActivated}>

                    <header>Ganhe {currentChallenge.amount} xp.</header>
                    <main>
                        <img src={`icons/${currentChallenge.type}.svg`} alt="Desafio"/>
                        <strong>Novo Desafio.</strong>
                        <p>{currentChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.loserButton} onClick={challengeFailed/*muda pra null e alterao resultado do loop */}>Falhei</button>
                        <button type="button" className={styles.winnerButton} onClick={challengeSucceeded}>Completei</button>
                    </footer>

                </div>
            ): (
                <div className={styles.challengeInitial}>

                    <strong>Finalize um ciclo para receber um novo desafio.</strong>
                    <p>

                        <img src="/icons/level-up.svg" alt="Level UP"/>
                        Avance de level completando desafios
                    </p>
                </div>


            )}

            

        </div>
    );
}