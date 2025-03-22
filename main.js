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

        carregarConteudo(valorSelecionado); // Carrega o conteúdo após o clique
    } catch (e) {
        console.error(e);
    }
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
    const botao = document.getElementById('alternarBtn');
    const p = document.getElementById('linguagemTexto');
    const principal = document.getElementById('principal');
    const sobre = document.getElementById('sobre');
    const habilidades = document.getElementById('habilidades');
    const projetos = document.getElementById('projetos');
    const contato = document.getElementById('contato');
    valor = valorSelecionado; // Atualiza o valor global
    const arquivo = isPortuguese ? `texto${valorSelecionado}.txt` : `textoIngles${valorSelecionado}.txt`;
    botao.textContent = isPortuguese ? document.getElementById('alternarBtn').src = './brasil (1).png' : document.getElementById('alternarBtn').src = './estados-unidos-da-america.png';
    p.textContent = isPortuguese ? 'Change language' : 'Mudar linguagem';
    principal.textContent = isPortuguese ? 'Principal' : 'Home';
    sobre.textContent = isPortuguese ? 'Sobre' : 'About me';
    habilidades.textContent = isPortuguese ? 'Habilidades' : 'Skills';
    projetos.textContent = isPortuguese ? 'Projetos' : 'Projects';
    contato.textContent = isPortuguese ? 'Contato' : 'Contact';
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

function alterarLinguagem(){
    isPortuguese = !isPortuguese;
    carregarConteudo(valor); // Carrega o conteúdo com a nova linguagem
}

carregarConteudo("home");

function redirecionarGitHub() {
    window.open('https://github.com/samaraCassie/FreeFrom', '_blank');
}