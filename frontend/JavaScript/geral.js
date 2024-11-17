// Simulação de banco de dados
const usuarios = [
    { usuario: "admin", senha: "123", tipo: "admin" },
];

const produtos = []; // Lista de produtos
let carrinho = []; // Lista de itens no carrinho
var usuarioAtual = usuarioEncontrado; // Usuário logado
var usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);



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
            $("#botaoCarrinho").hide();
        }
        else{
            $("#painel-admin").hide();
            $("#botaoCarrinho").show();
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
    $("#lista-produtos").html(""); // Limpa a lista de produtos

    produtos.forEach(produto => {
        let produtoHTML = `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}" />
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
        `;

        if (usuarioAtual.tipo === 'admin') {
            // Botões para admin
            produtoHTML += `
                <button onclick="editarProduto(${produto.id})">Editar Produto</button>
                <button onclick="excluirProduto(${produto.id})">Excluir Produto</button>
            `;
        } else if(usuarioAtual.tipo = 'usuario') {
            // Botão para usuários comuns
            produtoHTML += `<button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>`;
        }

        produtoHTML += `</div>`; // Fecha o card do produto
        $("#lista-produtos").append(produtoHTML); // Adiciona o card à lista de produtos
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
    const item = carrinho.find(item => item.id === produtoId);
    if (item.quantidade > 1) {
        item.quantidade--;
    } else {
        carrinho = carrinho.filter(item => item.id !== produtoId);
    }
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

function verCarrinho(){
    document.getElementById('carrinho').style.display = 'block'
}

function telaPrincipal(){
     document.getElementById('carrinho').style.display = 'none'
     document.getElementById('produtos').style.display = 'block'
}

let produtoEmEdicao = null; // Variável para armazenar o produto que está sendo editado

// Abre o modal para editar o produto
function editarProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    // Armazena o produto atual em edição
    produtoEmEdicao = produto;

    // Preenche os campos do modal com os dados do produto
    $("#editar-nome-produto").val(produto.nome);
    $("#editar-preco-produto").val(produto.preco);
    $("#imagem-preview").attr("src", produto.imagem).show();

    // Exibe o modal
    $("#modal-produto").show();
}

// Fecha o modal
function fecharModalProduto() {
    $("#modal-produto").hide();
    produtoEmEdicao = null; // Limpa o produto em edição
}

// Salva as alterações feitas no modal
function salvarAlteracoes() {
    if (!produtoEmEdicao) return;

    const novoNome = $("#editar-nome-produto").val();
    const novoPreco = parseFloat($("#editar-preco-produto").val());
    const imagemInput = document.getElementById("editar-imagem-produto");

    if (!novoNome || isNaN(novoPreco)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    produtoEmEdicao.nome = novoNome;
    produtoEmEdicao.preco = novoPreco;

    if (imagemInput.files[0]) {
        const leitor = new FileReader();
        leitor.onload = function (e) {
            produtoEmEdicao.imagem = e.target.result;
            renderizarProdutos();
            fecharModalProduto();
        };
        leitor.readAsDataURL(imagemInput.files[0]);
    } else {
        renderizarProdutos();
        fecharModalProduto();
    }

    alert("Produto atualizado com sucesso!");
}

// Remove o produto diretamente sem modal
function excluirProduto(produtoId) {
    const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
    if (confirmacao) {
        const index = produtos.findIndex(p => p.id === produtoId);
        if (index !== -1) {
            produtos.splice(index, 1);
            renderizarProdutos();
            alert("Produto excluído com sucesso.");
        }
    }
}
