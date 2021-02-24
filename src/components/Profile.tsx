import styles from '../styles/components/Profile.module.css'


export function Profile(){

    //Dificil um componente não ter uma <div> em volta
    //se botar o usuario do github no link .png pega a foto
    //TODOS os arquivos que estão dentro da pasta public estão visíveis para
    return(

        <div className={styles.profileContainer}>

            <img src="https://github.com/luizfsoares.png" alt="Luiz Cardoso"/>
            <div >
                <strong>Luiz Cardoso</strong>
                
                <p> <img src="icons/level.svg" alt="Level Up"/> Level 1</p>

            </div>
            
        </div>
    );
}