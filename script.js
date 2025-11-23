// Seleciona o elemento HTML onde os cards serão inseridos.
let cardContainer = document.querySelector(".card-container");
// Seleciona o campo de input da busca.
let inputBusca = document.querySelector("#input-busca");
// Array que irá armazenar os dados carregados do arquivo data.json.
let dados =[];

// Adiciona um evento que será disparado assim que o conteúdo da página for carregado.
document.addEventListener('DOMContentLoaded', iniciarBusca);

// Função assíncrona que inicia a busca e a renderização dos cards.
async function iniciarBusca() {
    // Otimização: Carrega os dados do JSON apenas na primeira vez que a função é chamada.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Pega o valor digitado no campo de busca e converte para minúsculas para uma busca case-insensitive.
    const termoBusca = inputBusca.value.toLowerCase();

    // Filtra o array 'dados' com base no termo de busca.
    const dadosFiltrados = dados.filter(dado => {
        // Converte o nome e a descrição de cada item para minúsculas.
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descrição.toLowerCase();
        // Retorna true se o termo de busca estiver contido no nome OU na descrição.
        return nome.includes(termoBusca) || descricao.includes(termoBusca);
    });

   // Chama a função para renderizar na tela apenas os dados que passaram no filtro.
   renderizarCards(dadosFiltrados);
}

// Função responsável por criar e exibir os cards na página.
function renderizarCards(dados){
    cardContainer.innerHTML = ""; // Limpa o contêiner para remover os cards de uma busca anterior.
    // Itera sobre cada objeto 'dado' no array de dados filtrados.
    for(let dado of dados){
        let article = document.createElement("article"); // Cria um novo elemento <article>.
        article.classList.add("card"); // Adiciona a classe "card" ao article.
        // Usa template literals (crases) para montar o HTML interno do card com os dados dinâmicos.
        article.innerHTML = `
            <div class="card-conteudo">
                <h2>${dado.nome}</h2>
                <p>${dado.descrição}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article); // Adiciona o card recém-criado ao contêiner na página.
    }
}