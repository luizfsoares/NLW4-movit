import styles from '../styles/components/Profile.module.css'
import { ChallengesContext } from '../contexts/ChallengeContexts';
import { useContext } from 'react';


export function Profile(){

    const { level } = useContext(ChallengesContext);

    //Dificil um componente não ter uma <div> em volta
    //se botar o usuario do github no link .png pega a foto
    //TODOS os arquivos que estão dentro da pasta public estão visíveis para
    return(

        <div className={styles.profileContainer}>

            <img src="https://github.com/luizfsoares.png" alt="Luiz Cardoso"/>
            <div >
                <strong>Luiz Cardoso</strong>
                
                <p> <img src="icons/level.svg" alt="Level Up"/> Level {level}</p>

            </div>
            
        </div>
    );
}