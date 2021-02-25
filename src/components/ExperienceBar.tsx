import { ChallengesContext } from '../contexts/ChallengeContexts';
import { useContext } from 'react';
import styles from '../styles/components/ExperienceBar.module.css';
//Essa forma de importação de CSS importando através do module CSS, a gente importa uma variável JS que contém o css
//Dessa forma, ao chamar no className, precisa do {}


export function ExperienceBar(){

    const {currentExperience, nextLevelExperience} = useContext(ChallengesContext);
    const percentBar = Math.round((currentExperience/nextLevelExperience) * 100);

    return(

        //Será criado como header apenas por estar no cabeçalho da aplicação mas pode ser uma <div/> também
        //Duas spans representando a experiência inicial e final
        // e uma div que vai representar a barrinha
        <header className={styles.experienceBar}>

            <span>0 xp</span>
            <div>
                <div style={{width: `${percentBar}%`}}>
                    <span className={styles.currentExperience}  style={{left: `${percentBar}%`}}>{currentExperience}px</span>
                </div>
            </div>
            <span>{nextLevelExperience} xp</span>

        </header>
    );
}