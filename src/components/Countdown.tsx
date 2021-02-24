import styles from '../styles/components/Countdown.module.css'
import {useState, useEffect} from 'react'
//useEffect é um hook do react que serve para dsparar efeitos colaterais, ou seja, quando algo mudar ou acontecer, eu quero executar alguma função.
//Ele recebe dois parâmetros. O primeiro é o que quer executar (funcão). O segundo é quando eu quero executar a primeira função.


export function Countdown (){
    //Funcionalidade do Countdown. Precisa adicionar um estado que vai representar o tempo atual que falta.
    //É mais fácil que o tempo esteja em segundos para realização das contas.
    //Precisa adicionar um estado, visto que é um componente que vai mudar ao longo da aplicação


    //ESTADOS
    const [time, setTime] = useState(25 * 60); // retorna uma tupla, o valor e uma função para alterar o valor
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60); // Retorna o piso, pois pode dar um número quebrado
    const seconds = time % 60; //Como o tempo já está em segundos, ao encontrar o valor exato de minutos, o resto representa os segundos atuais


    //Transforma em string e faz um split (como não foi passado nada no split, é caracter por caracter). Porém precisa ter no mínimo 2 caracteres para dar o split
    //Assim, se o minuto for abaixo de 10 (abaixo de 2 caracteres), por exemplo, a função padStart vai compltar com 0 a esquerda.
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //Desestruturei o array com JS
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    function startCountdown(){
        setActive(true);
    }

    useEffect(() =>{
        
        if (active && time > 0){

            setTimeout(() =>{ //A função setTimeout() chama uma função ou avalia uma expressão a cada X milisegundos
                
                setTime(time - 1); //Sempre que o time muda aqui, vai executar o useEffect novamente.
            }, 1000);
        }
    }, [active, time]) // É possível adicionar dois parâmetros de mudança, ou seja, sempre que mudar para ativo e sempre que o tempo mudar, aplica a função.


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

            <button type="button" 
                    className={styles.startCountdownButton}
                    onClick={startCountdown}
            >

                Iniciar um Ciclo
            </button>
        </div>

    );
}