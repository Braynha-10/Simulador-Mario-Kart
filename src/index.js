const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();//Math.random em js sem parametros retorna um valor maior ou igual a 0 e menor do que 1
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
};

async function getRandomStar(character1, character2) {
    let random = Math.random();//Math.random em js sem parametros retorna um valor maior ou igual a 0 e menor do que 1
    let result;
    if(random < 0.5){
        result = "character1";
        character1.VELOCIDADE += 2;
        character1.MANOBRABILIDADE += 1;
        character1.PODER += 1;
    }else{
        result = "character2";
        character2.VELOCIDADE += 2;
        character2.MANOBRABILIDADE += 1;
        character2.PODER += 1;
    }
    return result;
};

async function  logRollResult(characterName, block, diceResult, atribute) {
    console.log(`${characterName} 🎲 rolou um dado e recebeu ${block} + ${diceResult} somados com os seus pontos (${atribute}) o total =  ${diceResult+atribute}`);//expressão dentro do print atraves do ${}
}

async function verifyWinnerBlock(TotalTestSkill1, TotalTestSkill2, character1, character2){
        // verificando o vencedor
        if(TotalTestSkill1 > TotalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++;
        }
        else if(TotalTestSkill2 > TotalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++;
        }  
        else if(TotalTestSkill2 == TotalTestSkill1){
            console.log(`${character1.NOME} e ${character2.NOME} empataram!`)
            character1.PONTOS++ && character2.PONTOS++;
        };
};

async function extraRound(character1, character2){
    let aux2 = 0;
    for(let round=1; round<=3; round++){
        console.log(`\n\n🏁 Rodada Extra ${round}`);

        // sortear estrela a cada rodada
        let star = await getRandomStar(character1, character2);
        if (star == "character1"){
            console.log(`⭐🌟⭐🌟✨${character1.NOME}✨🌟⭐🌟⭐`);
        }
        else if(star == "character2"){
            console.log(`⭐🌟⭐🌟✨${character1.NOME}✨🌟⭐🌟⭐`);
        };

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)


        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if(block === "RETA"){
            aux2++;
            TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

            
            // verificando o vencedor
            await verifyWinnerBlock(TotalTestSkill1, TotalTestSkill2, character1, character2);
        };

        if(block === "CURVA"){
            aux2++;
            TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
            
            // verificando o vencedor
            await verifyWinnerBlock(TotalTestSkill1, TotalTestSkill2, character1, character2);
        };

        if(block === "CONFRONTO"){
            let aux = 0;
            TotalTestSkill1 = diceResult1 + character1.PODER;
            TotalTestSkill2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} VS ${character2.NOME} 🥊🥊🥊!`)

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

        // IFs ternarios codigo clean verificando o vencedor
            character2.PONTOS -= TotalTestSkill1 > TotalTestSkill2 && character2.PONTOS > 0 ? 1 && console.log(`${character1.NOME} derrotou e tirou um ponto de🐢🐢${character2.NOME}`): 0;
            aux+= character2.PONTOS == 0 && aux2 != 0 ? 1 && console.log(`${character2.NOME} ainda não possui pontos portanto nada ocorre...`): 0;

            // if(character2.PONTOS == 0){
            //     console.log(`${character2.NOME} ainda não possui pontos portanto nada ocorre...`);
            // };
            character1.PONTOS -= TotalTestSkill2 > TotalTestSkill1 && character1.PONTOS > 0 ? 1 && console.log(`${character2.NOME} derrotou e tirou um ponto de🐢🐢 ${character1.NOME}`): 0;
            aux+= character1.PONTOS == 0 && aux2 !=0 ? 1 && console.log(`${character1.NOME} ainda não possui pontos portanto nada ocorre...`): 0;
            // if(character1.PONTOS == 0){
            //     console.log(`${character1.NOME} ainda não possui pontos portanto nada ocorre...`);
            // };
            if(TotalTestSkill1 === TotalTestSkill2){
                console.log(`${character1.NOME} e ${character2.NOME} empataram!`);
                character1.PONTOS-- && character2.PONTOS--;
            };
            aux2++;
        };
        if (star == "character1"){
            character1.VELOCIDADE -= 2;
            character1.MANOBRABILIDADE -= 1;
            character1.PODER -= 1;
        }
        else if(star == "character2"){
            character2.VELOCIDADE -= 2;
            character2.MANOBRABILIDADE -= 1;
            character2.PODER -= 1;
        };

    };
    //declareWinner(character1, character2)
}

async function declareWinner(character1, character2){
    let aux = 0;
    console.log("\n\nResultado Final:");
    console.log(`PONTUAÇÃO DE ${character1.NOME} = ${character1.PONTOS}`);
    console.log(`PONTUAÇÃO DE ${character2.NOME} = ${character2.PONTOS}`);
    //Clean IFs
    if(character1.PONTOS > character2.PONTOS)
        console.log(`🏆🏆Vencedor: ${character1.NOME}🏆🏆`);
    else if(character1.PONTOS < character2.PONTOS)
        console.log(`🏆🏆Vencedor: ${character2.NOME}🏆🏆`);
    else if(character1.PONTOS === character2.PONTOS)
        extraRound(character1, character2);

    console.log("\n\nGAME OVER...");
};

async function  playRaceEngine(character1, character2){
    let aux2 = 0;
    for(let round=1; round<=5; round++){
        console.log(`\n\n🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)


        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if(block === "RETA"){
            aux2++;
            TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

            
            // verificando o vencedor
            await verifyWinnerBlock(TotalTestSkill1, TotalTestSkill2, character1, character2);
        };

        if(block === "CURVA"){
            aux2++;
            TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
            
            // verificando o vencedor
            await verifyWinnerBlock(TotalTestSkill1, TotalTestSkill2, character1, character2);
        };

        if(block === "CONFRONTO"){
            let aux = 0;
            TotalTestSkill1 = diceResult1 + character1.PODER;
            TotalTestSkill2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} VS ${character2.NOME} 🥊🥊🥊!`)

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

        // IFs ternarios codigo clean verificando o vencedor
            character2.PONTOS -= TotalTestSkill1 > TotalTestSkill2 && character2.PONTOS > 0 ? 1 && console.log(`${character1.NOME} derrotou e tirou um ponto de🐢🐢${character2.NOME}`): 0;
            aux+= character2.PONTOS == 0 && aux2 != 0 ? 1 && console.log(`${character2.NOME} ainda não possui pontos portanto nada ocorre...`): 0;

            // if(character2.PONTOS == 0){
            //     console.log(`${character2.NOME} ainda não possui pontos portanto nada ocorre...`);
            // };
            character1.PONTOS -= TotalTestSkill2 > TotalTestSkill1 && character1.PONTOS > 0 ? 1 && console.log(`${character2.NOME} derrotou e tirou um ponto de🐢🐢 ${character1.NOME}`): 0;
            aux+= character1.PONTOS == 0 && aux2 !=0 ? 1 && console.log(`${character1.NOME} ainda não possui pontos portanto nada ocorre...`): 0;
            // if(character1.PONTOS == 0){
            //     console.log(`${character1.NOME} ainda não possui pontos portanto nada ocorre...`);
            // };
            if(TotalTestSkill1 === TotalTestSkill2){
                console.log(`${character1.NOME} e ${character2.NOME} empataram!`);
                character1.PONTOS-- && character2.PONTOS--;
            };
            aux2++;
        };
    };

    // await declareWinner(character1, character2);
};


// Função auto-invocavel muito util em js, assim que inicia o programa ela é chamada
(async function main(){
    console.log(`✨🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);//functions chains;
    await declareWinner(player1, player2);
})();


// conceito da esttrelinha, mais personagens, mais corridas variadas influenciadas pelo terreno, pesos calculados em conjunto, mais variaveis, definir e avisar quando personagem esta zerado informar o placar a cada bloco