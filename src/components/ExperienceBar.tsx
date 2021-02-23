export function ExperienceBar(){

    return(

        //Será criado como header apenas por estar no cabeçalho da aplicação mas pode ser uma <div/> também
        //Duas spans representando a experiência inicial e final
        // e uma div que vai representar a barrinha
        <header className="experience-bar">

            <span>0 xp</span>
            <div>
                <div style={{width: '50%'}}>
                    <span className="current-experience"  style={{left: '50%'}}>250px</span>
                </div>
            </div>
            <span>500 xp</span>

        </header>
    );
}