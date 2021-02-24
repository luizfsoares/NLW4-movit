import Document, {Html, Head, NextScript, Main} from 'next/document';


//Estrutura que pode ser copiado em todo projeto, não precisa decorar
//Essa estrutura document é carregada apenas uma vez. No app.tsx é reaproveitado mas também é recalculado, então há processamento a mais. Aqui não.
export default class MyDocument extends Document{
    render(){
        return(

            <Html>

                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet"/>
                </Head>
                <body>

                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}