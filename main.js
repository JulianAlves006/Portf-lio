document.addEventListener('click', e => {
    const el = e.target;
    const tag = el.tagName.toLowerCase();
    if (tag === 'a') {
        e.preventDefault();
        carregaPagina(el);
    }
});

async function carregaPagina(el) {
    try {
        const href = el.getAttribute('href');
        const response = await fetch(href);
        if (response.status !== 200) throw new Error('ERRO 404 PAGE NOT FOUND');
        const html = await response.text();
        carregaResultado(html);
    } catch (e) {
        console.error(e);
    }
}

function carregaResultado(response) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = response;
}

let isPortuguese = true; // Começa com o arquivo em português
let valorSelecionado = "";

// Função para carregar o conteúdo do arquivo
function carregarConteudo() {
    // Variável para armazenar o valor do link clicado
    const links = document.querySelectorAll('.mymenu');

    // Adiciona o evento de clique em cada link
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            // Pega o valor associado ao link através do atributo 'data-link'
            valorSelecionado = this.getAttribute('data-link');
            const arquivo = isPortuguese ? `texto${valorSelecionado}.txt` : `textoIngles${valorSelecionado}.txt`;

            // Faz a requisição para carregar o conteúdo do arquivo
            fetch(arquivo)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('titulo').innerText = data; // Atualiza o conteúdo
                })
                .catch(error => {
                    console.error('Erro ao carregar o arquivo:', error);
                    document.getElementById('titulo').innerText = 'Erro ao carregar o conteúdo.';
                });

            // Exibe o valor na tela ou faz alguma outra ação
            console.log("Link clicado: " + valorSelecionado);
        });
    });
}

// Função para alternar entre os arquivos
document.getElementById('alternarBtn').addEventListener('click', () => {
    isPortuguese = !isPortuguese; // Alterna entre português e inglês
    carregarConteudo(); // Carrega o conteúdo do novo arquivo
});


