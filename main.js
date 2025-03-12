document.addEventListener('click', e => {
    const el = e.target;
    const tag = el.tagName.toLowerCase();

    if (tag === 'a') {
        e.preventDefault();
        const valorClicado = obterValorLink(e);
        carregaPagina(el, valorClicado);
    }
});

async function carregaPagina(el, valorSelecionado) {
    try {
        const href = el.getAttribute('href');
        const response = await fetch(href);

        if (response.status !== 200) throw new Error('ERRO 404 PAGE NOT FOUND');

        const html = await response.text();
        carregaResultado(html);
        carregarConteudo(valorSelecionado); // Carrega o conteúdo após o clique
    } catch (e) {
        console.error(e);
    }
}

function carregaResultado(response) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = response;
}

function obterValorLink(event) {
    const valor = event.target.getAttribute('data-link');
    return valor;
}

let isPortuguese = true; // Começa com o arquivo em português
let valor = ''; // Inicializa o valor vazio

// Função para carregar o conteúdo do arquivo
function carregarConteudo(valorSelecionado) {
    if (!valorSelecionado) return;

    valor = valorSelecionado; // Atualiza o valor global
    const arquivo = isPortuguese ? `texto${valorSelecionado}.txt` : `textoIngles${valorSelecionado}.txt`;
    fetch(arquivo)
        .then(response => response.text())
        .then(data => {
            document.getElementById('titulo').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo:', error);
            document.getElementById('titulo').innerText = 'Erro ao carregar o conteúdo.';
        });
}

// Função para alternar entre os arquivos
document.getElementById('alternarBtn').addEventListener('click', () => {
    isPortuguese = !isPortuguese;
    carregarConteudo(valor); // Carrega o conteúdo com a nova linguagem
});
