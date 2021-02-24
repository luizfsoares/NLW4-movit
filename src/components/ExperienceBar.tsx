import styles from '../styles/components/ExperienceBar.module.css';
//Essa forma de importação de CSS importando através do module CSS, a gente importa uma variável JS que contém o css
//Dessa forma, ao chamar no className, precisa do {}


export function ExperienceBar(){

    return(

        //Será criado como header apenas por estar no cabeçalho da aplicação mas pode ser uma <div/> também
        //Duas spans representando a experiência inicial e final
        // e uma div que vai representar a barrinha
        <header className={styles.experienceBar}>

            <span>0 xp</span>
            <div>
                <div style={{width: '50%'}}>
                    <span className={styles.currentExperience}  style={{left: '50%'}}>250px</span>
                </div>
            </div>
            <span>500 xp</span>

        </header>
    );
}