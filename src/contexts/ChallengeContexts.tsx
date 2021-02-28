import next from 'next';
import { createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    completeChallenge: ()=> void;
    closeLevelModal: () => void;
  }



interface ChallengesProviderProps{ //Funciona da mesma forma de type, atribuindo um tipo. Children é pq no app.tsx é um Componente ChallengesProvider que envolve outro.
    children: ReactNode;
    level: number,
    currentExperience: number,
    currentNumberChallenges:number
}

export const ChallengesContext = createContext({} as ChallengesContextData); //Atribuindo o tipo dos valores do contexto

//Quando é exportado essa função toda, o retorno dela é a tag com o value já setado que possui os estados e funções associadas.
//Ao ser usado a tag exportada lá no _app.tsx, que envolve a aplicação toda, compartilha pra todos os componentes.
export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps){ //Rest operator, todas as propriedades fora a chidren.

    const [level, setLevel] = useState(rest.level ?? 1); //rest.level e se não existir, usa 1
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [currentNumberChallenges, setCurrentNumberChallenges] = useState(rest.currentNumberChallenges ?? 0);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);


    //Pedir permissões para mostrar notificiação;
    //Quando o segundo argumento é um [] vazio, vai executar uma unica vez quando o componente aparecer pela primeira vez na tela
    useEffect(() => {
        
    }, [])

    //Executar a função sempre que o que tiver dentro do [] mudar
    //Armazenar nos cookies
    useEffect(() =>{
        //Cookies só armazena texto, por isso precisa fazer a conversão pyaara string
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('currentNumberChallenges', String(currentNumberChallenges));
    }, [level, currentExperience, currentNumberChallenges])

    function levelUp(){

        setLevel(level + 1);
        setIsLevelModalOpen(true);
        
    }

    function startNewChallenge(){
        
        const challengeNumber = Math.floor(Math.random() * challenges.length) /*Numero aleatorio entre 0 e o que está multiplicando, ou seja, o tamanho do array json */
        
        const challenge = challenges[challengeNumber];
        setCurrentChallenge(challenge);

        //Notificação em Audio de Desafio Novo
        new Audio('/notification.mp3').play();

        //Notificação de Desafio NOvo
        new Notification('Novo Desafio 🚀🚀', {
            
        })
        
    }

    function resetChallenge(){

        setCurrentChallenge(null);
    }

    function closeLevelModal(){

        setIsLevelModalOpen(false);
    }

    //Calculo usado por games de RPG para calcular a experiência do proximo nível
    const nextLevelExperience = Math.pow((level + 1)*4, 2);

    //Função de Completar
    function completeChallenge(){

        if (!currentChallenge){
            return;
        }

        const { amount } = currentChallenge;
        let sumExperience = amount + currentExperience
        if(sumExperience >= nextLevelExperience){
            levelUp();
            const differenceExperience = sumExperience - nextLevelExperience;
            setCurrentExperience(differenceExperience);
            setCurrentChallenge(null);
            setCurrentNumberChallenges(currentNumberChallenges + 1);

        }
        else{
            setCurrentExperience(sumExperience);
            setCurrentChallenge(null);
            setCurrentNumberChallenges(currentNumberChallenges + 1);
        }
    }

    return(

        <ChallengesContext.Provider value={{level, levelUp, currentExperience, currentNumberChallenges, 
                                            startNewChallenge, currentChallenge, resetChallenge, nextLevelExperience,
                                            completeChallenge, closeLevelModal}}>

            {children /*Posso botar meu modal aqui, pois ele pode ser usado em cantos que tenham o Challenges Provider e como é um componente, pela hierarquia pode ser botado aqui */}
            
            {isLevelModalOpen ? <LevelUpModal/> : null}
        </ChallengesContext.Provider>
    );
}