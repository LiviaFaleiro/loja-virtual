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

// Elementos pt 2
const formLogin = document.getElementById('form-login');
const telaLogin = document.getElementById('tela-login');
const conteudoPrincipal = document.getElementById('conteudo-principal');
const mensagemErro = document.getElementById('mensagem-erro');
const botaoCadastrar = document.querySelector('button[onclick="mostrarTela(\'cadastro\')"]');
const botaoMinhasCompras = document.querySelector('button[onclick="mostrarTela(\'compras\')"]');
const botaoMeuCarrinho = document.querySelector('button[onclick="mostrarTela(\'carrinho\')"]');
const botaoConfiguracao = document.querySelector('button[onclick="mostrarTela(\'configuracao\')"]');


// Dados
let produtos = [];
let carrinho = [];

// Controle do tipo de usuário
let tipoUsuarioLogado = null;

// Navegação entre telas
function mostrarTela(tela) {
    document.querySelectorAll('.tela').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`tela-${tela}`).style.display = 'block';
}


// Renderizar produtos
function renderizarProdutos() {
    listaProdutos.innerHTML = ''; // Limpa a lista de produtos antes de renderizar
    produtos.forEach((produto, index) => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
   

           if( tipoUsuarioLogado === 'normal'){

        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>

        `;
           }
           else{
            produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
        `;

           }


        listaProdutos.appendChild(produtoDiv); // Adiciona o produto na lista
    });
}


// Atualiza o tipo de usuário no login
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

        // Atualiza permissões e renderiza os produtos novamente
        renderizarProdutos();

        if (tipoUsuarioLogado === 'normal') {
            botaoCadastrar.style.display = 'none';
            botaoMinhasCompras.style.display = 'inline-block';
            botaoMeuCarrinho.style.display = 'inline-block';
            botaoConfiguracao.style.display =   'none';
        } else if (tipoUsuarioLogado === 'admin') {
            botaoCadastrar.style.display = 'inline-block';
            botaoMinhasCompras.style.display = 'none';
            botaoMeuCarrinho.style.display = 'none';
        }

        mostrarTela('produtos');
    } else {
        mensagemErro.style.display = 'block';
    }
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



