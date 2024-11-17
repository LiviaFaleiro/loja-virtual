// Simulação de banco de dados
const usuarios = [
    { usuario: "admin", senha: "123", tipo: "admin" },
];

const produtos = []; // Lista de produtos
let carrinho = []; // Lista de itens no carrinho
let usuarioAtual = null; // Usuário logado

// Função para login
function fazerLogin() {
    const usuario = $("#usuario").val();
    const senha = $("#senha").val();

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (usuarioEncontrado) {  //o que cada tipo de usuário vai verrr
        usuarioAtual = usuarioEncontrado;
        alert(`Bem-vindo, ${usuarioAtual.usuario}`);
        $("#modal-login").hide();
        if (usuarioAtual.tipo === "admin") {
            $("#painel-admin").show();
            $("#carrinho").hide();
        }
        else{
            $("#painel-admin").hide();
        }
    } else {
        alert("Usuário ou senha inválidos.");
    }
}

// Função para registrar usuário
function fazerRegistro() {
    const usuario = $("#usuario-registro").val();
    const senha = $("#senha-registro").val();

    if (usuarios.find(u => u.usuario === usuario)) {
        alert("Usuário já existe.");
        return;
    }

    usuarios.push({ usuario, senha, tipo: "usuario" });
    alert("Usuário registrado com sucesso. Faça login!");
    $("#modal-registro").hide();
}

// Exibe ou oculta o modal de login
function alternarModalLogin() {
    $("#modal-login").toggle();
}

// Exibe ou oculta o modal de registro
function alternarModalRegistro() {
    $("#modal-registro").toggle();
}

// Adiciona um produto (somente admin)
function adicionarProduto() {
    if (!usuarioAtual || usuarioAtual.tipo !== "admin") {
        alert("Você não tem permissão para adicionar produtos.");
        return;
    }

    const nome = $("#nome-produto").val();
    const preco = parseFloat($("#preco-produto").val());
    const imagemInput = document.getElementById("imagem-produto");

    if (!nome || !preco || isNaN(preco) || !imagemInput.files[0]) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Carrega a imagem como um URL base64 para exibição
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const produto = {
            id: produtos.length + 1,
            nome,
            preco,
            imagem: e.target.result, // Salva a imagem como base64
        };

        produtos.push(produto);
        renderizarProdutos();
        alert("Produto adicionado com sucesso.");
    };

    leitor.readAsDataURL(imagemInput.files[0]);
}


// Renderiza os produtos
function renderizarProdutos() {
    $("#lista-produtos").html("");

    produtos.forEach(produto => {
        let produtoHTML = `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}" />
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
        `;

        if (!usuarioAtual || usuarioAtual.tipo !== 'admin') {
            produtoHTML += `<button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>`;
        }

        produtoHTML += `</div>`;
        $("#lista-produtos").append(produtoHTML);
    });
}


// Adiciona um produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    renderizarCarrinho();
}

// Remove um produto do carrinho
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    renderizarCarrinho();
}

// Renderiza o carrinho
function renderizarCarrinho() {
    $("#itens-carrinho").html("");
    let precoTotal = 0;

    carrinho.forEach(item => {
        precoTotal += item.preco * item.quantidade;
        $("#itens-carrinho").append(`
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
                <td><button onclick="removerDoCarrinho(${item.id})">Remover</button></td>
            </tr>
        `);
    });

    $("#preco-total").text(`Total: R$ ${precoTotal.toFixed(2)}`);
}

// Inicialização
$(document).ready(() => {
    renderizarProdutos();
});

if(usuarioAtual.tipo==='admin'){
    document.getElementById('botaoCarrinho').style.display = 'none'
}

function verCarrinho(){
    document.getElementById('carrinho').style.display = 'block'
}

function telaPrincipal(){
     document.getElementById('carrinho').style.display = 'none'
     document.getElementById('produtos').style.display = 'block'
}