import { ChallengesContext } from '../contexts/ChallengeContexts';
import styles from '../styles/components/LevelUpModal.module.css';
import {useContext} from 'react';


export function LevelUpModal(){

    const {level, closeLevelModal} = useContext(ChallengesContext);

    return(

        <div className={styles.overlay}>

            <div className={styles.containerModal}>

                <header>{level}</header>
                    <strong>Parabéns!</strong>
                    <p>Você alcançou um novo level.</p>
                    <button type="button" onClick={closeLevelModal}>
                        <img src="/icons/close.svg" alt="Fechar modal"></img>
                    </button>

                
            </div>

        </div>

    );
}