import styles from '../styles/components/CompletedChallenges.module.css'
import { ChallengesContext } from '../contexts/ChallengeContexts';
import {useContext} from 'react';


export function CompletedChallenges(){

    const {currentNumberChallenges} = useContext(ChallengesContext);

    return(

        <div className={styles.completedChallengesContainer}>

            <span>Desafios Completos</span>
            <span>{currentNumberChallenges}</span>
        </div>
    );
}