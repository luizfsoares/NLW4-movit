import { createContext, useState, ReactNode, useContext, useEffect} from 'react';
import { ChallengesContext } from './ChallengeContexts';

interface CountdownContextData{

    minutes:number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    startCountdown: () => void;
    endResetCountdown: () => void;
    challengeFailed: () => void;
    challengeSucceeded: () => void;

}
let countdownTimeout: NodeJS.Timeout;

export const CountdownContexts = createContext({} as CountdownContextData);

interface CountdownProviderProps{ //Funciona da mesma forma de type, atribuindo um tipo. Children é pq no app.tsx é um Componente ChallengesProvider que envolve outro.
    children: ReactNode;
}

export function CountdownProvider ({children}: CountdownProviderProps) {

        //ESTADOS
        const [time, setTime] = useState(0.05 * 60); // retorna uma tupla, o valor e uma função para alterar o valor
        const [isActive, setIsActive] = useState(false);
        const [hasFinished, setHasFinished] = useState(false);
    
        //CONTEXTO
        //Importando a função de começar uma novo desafio do contexto para esse componente
        const { startNewChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    
    
    
        const minutes = Math.floor(time / 60); // Retorna o piso, pois pode dar um número quebrado
        const seconds = time % 60; //Como o tempo já está em segundos, ao encontrar o valor exato de minutos, o resto representa os segundos atuais

        function startCountdown(){
            setIsActive(true);
        }
    
        function endResetCountdown(){
            clearTimeout(countdownTimeout); //Limpa e para o delay da execução do useEffect()
            setIsActive(false); //Para o Countdown pois ao entrar no useEffect, vai dar false a verificação
    
            setTime(0.05 * 60);
        }

        function challengeFailed(){

            resetChallenge();
            endResetCountdown();
            setHasFinished(false);
        }

        function challengeSucceeded(){

            completeChallenge();
            resetChallenge();
            endResetCountdown();
            setHasFinished(false);
        }


        //useEffect é um hook do react que serve para dsparar efeitos colaterais, ou seja, quando algo mudar ou acontecer, eu quero executar alguma função.
        //Ele recebe dois parâmetros. O primeiro é o que quer executar (funcão). O segundo é quando eu quero executar a primeira função.
    
        useEffect(() =>{
            
            if (isActive && time > 0){
                countdownTimeout = setTimeout(() =>{ //A função setTimeout() chama uma função ou avalia uma expressão a cada X milisegundos            
                    setTime(time - 1); //Sempre que o time muda aqui, vai executar o useEffect novamente.
                }, 1000);
            }
    
            else if(isActive && time == 0){
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge();
            }
        }, [isActive, time]) // É possível adicionar dois parâmetros de mudança, ou seja, sempre que mudar para ativo e sempre que o tempo mudar, aplica a função.


    return (

        <CountdownContexts.Provider value={{startCountdown, minutes, seconds, hasFinished, isActive, endResetCountdown, challengeFailed, challengeSucceeded}}>

            {children}
        </CountdownContexts.Provider>
    );
}