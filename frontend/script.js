// Elementos
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinhoSpan = document.getElementById('total-carrinho');
const verProdutos = document.getElementById('ver-produto');

// Dados de login (admin e usuários comuns)
const usuarios = [
    { usuario: 'admin', senha: '1234', tipo: 'admin' },
    { usuario: 'user', senha: '5678', tipo: 'normal' }
];

// Dados
let produtos = [];
let carrinho = [];

// Navegação entre telas
function mostrarTela(tela) {
    document.querySelectorAll('.tela').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`tela-${tela}`).style.display = 'block';
}

// Renderizar produtos
function renderizarProdutos() {
    listaProdutos.innerHTML = '';
    produtos.forEach((produto, index) => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
        `;
        listaProdutos.appendChild(produtoDiv);
    });
}

// Renderizar carrinho
function renderizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');
        itemDiv.innerHTML = `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(itemDiv);
    });

    totalCarrinhoSpan.textContent = total.toFixed(2);
}


function adicionarAoCarrinho(index) {
    carrinho.push(produtos[index]);
    renderizarCarrinho();
    mostrarTela('carrinho');
}


function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderizarCarrinho();
}

function adicionarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-produto').value;
    const preco = parseFloat(document.getElementById('preco-produto').value);
    const imagem = document.getElementById('imagem-produto').value;

    produtos.push({ nome, preco, imagem });
    renderizarProdutos();
    formProduto.reset();
    mostrarTela('produtos');
}


formProduto.addEventListener('submit', adicionarProduto);
renderizarProdutos();
renderizarCarrinho();



// Elementos
const formLogin = document.getElementById('form-login');
const telaLogin = document.getElementById('tela-login');
const conteudoPrincipal = document.getElementById('conteudo-principal');
const mensagemErro = document.getElementById('mensagem-erro');
const botaoCadastrar = document.querySelector('button[onclick="mostrarTela(\'cadastro\')"]');
const botaoMinhasCompras = document.querySelector('button[onclick="mostrarTela(\'compras\')"]');
const botaoMeuCarrinho = document.querySelector('button[onclick="mostrarTela(\'carrinho\')"]');

// Controle do tipo de usuário
let tipoUsuarioLogado = null;

// Função para verificar login
function verificarLogin(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;

    const usuarioValido = usuarios.find(
        u => u.usuario === usuarioInput && u.senha === senhaInput
    );

    if (usuarioValido) {
        tipoUsuarioLogado = usuarioValido.tipo;
        telaLogin.style.display = 'none';
        conteudoPrincipal.style.display = 'block';

        // Verificar permissões
        if (tipoUsuarioLogado === 'normal') {
            botaoCadastrar.style.display = 'none'; // Mostrar botão de cadastro
            botaoMinhasCompras.style.display = 'inline-block'; // Mostrar "Minhas Compras"
            botaoMeuCarrinho.style.display = 'inline-block'; // Mostrar "Meu Carrinho"
        } else {
            botaoCadastrar.style.display = 'inline-block'; // Mostrar botão de cadastro
            botaoMinhasCompras.style.display = 'none'; // Ocultar "Minhas Compras"
            botaoMeuCarrinho.style.display = 'none'; // Ocultar "Meu Carrinho"
        }

        mostrarTela('produtos'); // Exibir a tela de produtos por padrão
    } else {
        mensagemErro.style.display = 'block';
        verProdutos.style.display = 'none';
    }
}
formLogin.addEventListener('submit', verificarLogin);

// Navegação segura entre telas
function mostrarTela(tela) {
    // Bloquear acesso à tela de cadastro para usuários normais
    if (tela === 'cadastro' && tipoUsuarioLogado !== 'admin') {
        alert('Acesso negado. Somente administradores podem cadastrar produtos.');
        return;
    }

    document.querySelectorAll('.tela').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`tela-${tela}`).style.display = 'block';
}

// Função para trocar de usuário
function trocarUsuario() {
    // Resetar estado atual
    tipoUsuarioLogado = null;
    telaLogin.style.display = 'flex'; // Mostrar tela de login
    conteudoPrincipal.style.display = 'none'; // Ocultar conteúdo principal
    mensagemErro.style.display = 'none'; // Ocultar mensagem de erro
    document.getElementById('usuario').value = ''; // Limpar campo de usuário
    document.getElementById('senha').value = ''; // Limpar campo de senha
}
// Função para exibir a tela de finalização de compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    mostrarTela('finalizacao');
});

// Função para processar os dados de finalização
const formFinalizacao = document.getElementById('form-finalizacao');
formFinalizacao.addEventListener('submit', event => {
    event.preventDefault();

    // Coletar os dados do formulário
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const metodoPagamento = document.querySelector('input[name="pagamento"]:checked').value;

    // Exibir mensagem de confirmação
    document.getElementById('mensagem-confirmacao').style.display = 'block';

    // Simular envio e limpar o carrinho
    setTimeout(() => {
        alert(`Pedido enviado!\nEndereço: ${endereco}, ${cidade}, ${cep}\nPagamento: ${metodoPagamento}`);
        mostrarTela('produtos'); // Redirecionar para a tela de produtos
        limparCarrinho(); // Função fictícia para limpar o carrinho
    }, 2000);
});


// Função para avaliar o produto
function avaliarProduto(index) {
    const produto = compras[index];
    const avaliacao = prompt(`
Avalie o produto "${produto.nome}":
1. Digite uma nota de 1 a 5.
2. Opcionalmente, insira um comentário (separado por "|").
Exemplo: 5|Produto excelente!
    `);

    if (!avaliacao) return; // Cancelou a avaliação

    const [nota, comentario] = avaliacao.split('|').map(s => s.trim());

    if (!nota || isNaN(nota) || nota < 1 || nota > 5) {
        alert('Por favor, insira uma nota válida de 1 a 5.');
        return;
    }

    produto.avaliacao = {
        nota: parseInt(nota),
        comentario: comentario || 'Sem comentário.'
    };

    alert('Avaliação registrada com sucesso!');
    mostrarCompras(); // Atualizar a lista de compras para mostrar a avaliação
}

// Lista global para armazenar compras finalizadas
let compras = [];

// Simulação de um carrinho (exemplo)

// Registrar a compra ao finalizar
function registrarCompra() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
    }

    // Adicionar produtos do carrinho à lista de compras
    compras.push(...carrinho.map(produto => ({ ...produto, avaliacao: null })));

    alert('Compra finalizada com sucesso!');
    limparCarrinho(); // Limpar carrinho após finalizar
    mostrarTela('compras'); // Redirecionar para a tela de compras
}

// Função para limpar o carrinho
function limparCarrinho() {
    carrinho = []; // Esvaziar carrinho
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
    document.getElementById('total-carrinho').innerText = '0.00';
}

// Função para mostrar as compras realizadas
function mostrarCompras() {
    const listaCompras = document.getElementById('lista-compras');
    listaCompras.innerHTML = ''; // Limpa a lista antes de renderizar

    if (compras.length === 0) {
        listaCompras.innerHTML = '<p>Você ainda não realizou nenhuma compra.</p>';
        return;
    }

    compras.forEach((produto, index) => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto-compra');
        divProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100px;">
            <div>
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                ${
                    produto.avaliacao
                        ? `<p>Avaliação: ${'⭐'.repeat(produto.avaliacao.nota)}</p>
                           <p>Comentário: ${produto.avaliacao.comentario}</p>`
                        : `<button onclick="avaliarProduto(${index})">Avaliar Produto</button>`
                }
            </div>
        `;
        listaCompras.appendChild(divProduto);
    });
}

// Atualizar a tela ao clicar em "Minhas Compras"
document.querySelector('button[onclick="mostrarTela(\'compras\')"]').addEventListener('click', mostrarCompras);
