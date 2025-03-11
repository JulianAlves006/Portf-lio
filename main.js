document.addEventListener('click', e =>{
    const el = e.target;
    const tag = el.tagName.toLowerCase();
    if(tag === 'a'){
        e.preventDefault();
        carregaPagina(el);
    }
});

async function carregaPagina(el){
    try{
        const href = el.getAttribute('href');
        const response = await fetch(href);
        if(response.status !== 200) throw new Error('ERRO 404 PAGE NOT FOUND');
        const html = await response.text();
        carregaResultado(html);
    }
    catch(e){
        console.error(e);
    }
}

function carregaResultado(response){
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = response;
}

function reload(){
    location.reload();
}

let isPortuguese = true; // Começa com o arquivo em português

        // Função para carregar o conteúdo do arquivo
        function carregarConteudo() {
            // Arquivo a ser carregado dependendo da linguagem
            const arquivo = isPortuguese ? 'texto.txt' : 'textoIngles.txt';

            fetch(arquivo)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('titulo').innerText = data; // Atualiza o conteúdo
                })
                .catch(error => {
                    console.error('Erro ao carregar o arquivo:', error);
                    document.getElementById('titulo').innerText = 'Erro ao carregar o conteúdo.';
                });
        }

        // Função para alternar entre os arquivos
        document.getElementById('alternarBtn').addEventListener('click', () => {
            isPortuguese = !isPortuguese; // Alterna entre português e inglês
            carregarConteudo(); // Carrega o conteúdo do novo arquivo
        });

        // Carrega o conteúdo inicial
        carregarConteudo();
