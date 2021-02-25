import styles from '../styles/components/Countdown.module.css'
import {useState, useEffect, useContext} from 'react'
import { ChallengesContext } from '../contexts/ChallengeContexts';

//useEffect é um hook do react que serve para dsparar efeitos colaterais, ou seja, quando algo mudar ou acontecer, eu quero executar alguma função.
//Ele recebe dois parâmetros. O primeiro é o que quer executar (funcão). O segundo é quando eu quero executar a primeira função.


let countdownTimeout: NodeJS.Timeout;



export function Countdown (){
    //Funcionalidade do Countdown. Precisa adicionar um estado que vai representar o tempo atual que falta.
    //É mais fácil que o tempo esteja em segundos para realização das contas.
    //Precisa adicionar um estado, visto que é um componente que vai mudar ao longo da aplicação


    //ESTADOS
    const [time, setTime] = useState(0.05 * 60); // retorna uma tupla, o valor e uma função para alterar o valor
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    //CONTEXTO
    //Importando a função de começar uma novo desafio do contexto para esse componente
    const { startNewChallenge } = useContext(ChallengesContext);



    const minutes = Math.floor(time / 60); // Retorna o piso, pois pode dar um número quebrado
    const seconds = time % 60; //Como o tempo já está em segundos, ao encontrar o valor exato de minutos, o resto representa os segundos atuais


    //Transforma em string e faz um split (como não foi passado nada no split, é caracter por caracter). Porém precisa ter no mínimo 2 caracteres para dar o split
    //Assim, se o minuto for abaixo de 10 (abaixo de 2 caracteres), por exemplo, a função padStart vai compltar com 0 a esquerda.
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //Desestruturei o array com JS
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    function startCountdown(){
        setIsActive(true);
    }

    function endResetCountdown(){
        clearTimeout(countdownTimeout); //Limpa e para o delay da execução do useEffect()
        setIsActive(false); //Para o Countdown pois ao entrar no useEffect, vai dar false a verificação

        setTime(0.05 * 60);
    }

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


    //Retorno HTML
    return(
        <div>

            <div className={styles.countdownContainer}>

                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>

                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>

                
            </div>

            { hasFinished ? (
                //Botão de Ciclo Encerrado

                <button    /*Sempre que tiver mais de uma linha usa parênteses por fora */                  
                disabled 
                className={styles.countdownButton} /*o resultado do className é uma string, então é possível concatenar duas string para adicionar um estilo a mais, herdando outros */
                >
                    Ciclo Encerrado  
                </button>

            ) : (
                //Como introduziu um HTML e tem mais de um elemento, deu erro. Precisa ter algo em volta. Poderia ter colocado uma <div> para encapsular, porém
                //afetaria o html. Dessa forma, para contornar foi colocado apenas um Fragment que é <> </> em volta para contornar essa limitação do react.
                <>  
                { isActive ?  (<button    /*Sempre que tiver mais de uma linha usa parênteses por fora */                  
                    type="button" 
                    className={`${styles.countdownButton} ${styles.endCountdownButton}`} /*o resultado do className é uma string, então é possível concatenar duas string para adicionar um estilo a mais, herdando outros */
                    onClick={endResetCountdown}
                  >         
                    Abandonar Ciclo   <img style={{filter: 'grayscale(100%)'}} src="icons/close.svg" alt="Close"/> 
                  </button>) 
                  
                  :     /* Separação Condicional. Se estiver ativo mostra um, se não, mostra outro */
                  
                  (<button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                  >           
                    Iniciar Ciclo
                  </button>)
                }
                </>


            )}




        </div>

    );
}