import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body' | 'eye';
    description:string;
    amount:number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    currentNumberChallenges: number;
    levelUp: () => void;
    startNewChallenge:()  => void; //formato é um objeto do tipo Challenge, criamos o tipo
    currentChallenge: Challenge; 
    resetChallenge: () => void;
    nextLevelExperience: number;
  }



interface ChallengesProviderProps{ //Funciona da mesma forma de type, atribuindo um tipo. Children é pq no app.tsx é um Componente ChallengesProvider que envolve outro.
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData); //Atribuindo o tipo dos valores do contexto

//Quando é exportado essa função toda, o retorno dela é a tag com o value já setado que possui os estados e funções associadas.
//Ao ser usado a tag exportada lá no _app.tsx, que envolve a aplicação toda, compartilha pra todos os componentes.
export function ChallengesProvider({ children }: ChallengesProviderProps){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [currentNumberChallenges, setCurrentNumberChallenges] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(null);

    function levelUp(){

        setLevel(level + 1);
    }

    function startNewChallenge(){
        
        const challengeNumber = Math.floor(Math.random() * challenges.length) /*Numero aleatorio entre 0 e o que está multiplicando, ou seja, o tamanho do array json */
        
        const challenge = challenges[challengeNumber];
        setCurrentChallenge(challenge);
    }

    function resetChallenge(){

        setCurrentChallenge(null);
    }

    //Calculo usado por games de RPG para calcular a experiência do proximo nível
    const nextLevelExperience = Math.pow((level + 1)*4, 2);

    return(

        <ChallengesContext.Provider value={{level, levelUp, currentExperience, currentNumberChallenges, 
                                            startNewChallenge, currentChallenge, resetChallenge, nextLevelExperience}}>

            {children}
        </ChallengesContext.Provider>
    );
}