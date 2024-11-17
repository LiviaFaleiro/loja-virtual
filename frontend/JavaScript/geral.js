
const usuarios = [
    { usuario: "admin", senha: "123", tipo: "admin" },
];

const produtos = [];
let carrinho = []; 
var usuarioAtual = usuarioEncontrado;
var usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);



// login
function fazerLogin() {
    const usuario = $("#usuario").val();
    const senha = $("#senha").val();
    $("#produtos").show(); 
    $(".cabecalho").show(); 

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha); 

    if (usuarioEncontrado) {
        usuarioAtual = usuarioEncontrado; //usuário atual
        alert(`Bem-vindo, ${usuarioAtual.usuario}`);
        $("#modal-login").hide();

        if (usuarioAtual.tipo === "admin") {
            $("#botaoCarrinho").hide();
            $("#botaoAdm").show();
            $("#botaoPerfil").hide(); 
        } else {
            $("#botaoAdm").hide();
            $("#botaoCarrinho").show();
            $("#botaoPerfil").show(); 
        }

        renderizarProdutos();
    } else {
        // Exibe uma mensagem de erro e mantém o modal aberto
        alert("Usuário ou senha inválidos. Por favor, tente novamente.");
        $("#modal-login").show(); // Garante que o modal permaneça visível
        $("#produtos").hide(); 
        $(".cabecalho").hide(); 
    }
}


function trocarUsuario(){
    $("#modal-login").show(); 
    $("#produtos").hide();
    $(".cabecalho").hide(); 
    $("#painel-admin").hide(); 
}

function fazerRegistro() {
    $("#modal-login").show(); 

    const usuario = $("#usuario-registro").val();
    const senha = $("#senha-registro").val();
    const novoId = usuarios.length + 1; // Generate new ID

    if (usuarios.find(u => u.usuario === usuario)) {
        alert("Usuário já existe.");
        return;
    }

    usuarios.push({ 
        id: novoId,
        usuario, 
        senha, 
        tipo: "usuario" 
    });
    
    alert("Usuário registrado com sucesso. Faça login!");
    $("#modal-registro").hide();
}


function alternarModalLogin() {
    $("#modal-login").toggle();
}


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

        if (usuarioAtual && usuarioAtual.tipo === 'admin') {
            // Botões para admin
            produtoHTML += `
                <button onclick="editarProduto(${produto.id})">Editar Produto</button>
                <button onclick="excluirProduto(${produto.id})">Excluir Produto</button>
            `;
        } else if (usuarioAtual && usuarioAtual.tipo === 'usuario') {
           
            produtoHTML += `<button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>`;
        }

        produtoHTML += `</div>`; // Fecha o card do produto
        $("#lista-produtos").append(produtoHTML); 
    });
}


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


function removerDoCarrinho(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item.quantidade > 1) {
        item.quantidade--;
    } else {
        carrinho = carrinho.filter(item => item.id !== produtoId);
    }
    renderizarCarrinho();
}



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


$(document).ready(() => {
    $("#botaoPerfil").hide();
    $("#botaoAdm").hide();
    $("#botaoCarrinho").hide();
    renderizarProdutos();
});


function verCarrinho(){ 
    document.getElementById('carrinho').style.display = 'block'
    $("#produtos").hide();
    $("#perfil-usuario").hide();
    $("#painel-admin").hide();
}

function telaPrincipal(){
     document.getElementById('carrinho').style.display = 'none'
     document.getElementById('produtos').style.display = 'block'
     $("#painel-admin").hide();
     $("#perfil-usuario").hide();
}

let produtoEmEdicao = null; // Variável para armazenar o produto que está sendo editado

// Abre o modal para editar o produto
function editarProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }


    produtoEmEdicao = produto;

    $("#editar-nome-produto").val(produto.nome);
    $("#editar-preco-produto").val(produto.preco);
    $("#imagem-preview").attr("src", produto.imagem).show();


    $("#modal-produto").show();
}


function fecharModalProduto() {
    $("#modal-produto").hide();
    produtoEmEdicao = null; 
}


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

function painelPerfil(){
    $("#produtos").hide();
    $("#perfil-usuario").show();
}

function painelAdm(){
    $("#painel-admin").show();
    $("#produtos").hide();
    $("#carrinho").hide();
    renderizarUsuarios(); // Add this line
}


function editarPerfil() {
    document.getElementById('produtos').style.display = 'none';
    document.getElementById('perfil-usuario').style.display = 'block';
    
    // Pre-fill the form with current user data
    document.getElementById('nome-usuario').value = usuarioAtual.usuario;
    document.getElementById('email-usuario').value = usuarioAtual.email || '';
}

function atualizarPerfil() {
    const novoNome = document.getElementById('nome-usuario').value;
    const novoEmail = document.getElementById('email-usuario').value;
    const senhaAtual = document.getElementById('senha-atual').value;
    const novaSenha = document.getElementById('nova-senha').value;

    if (senhaAtual === usuarioAtual.senha) {
        usuarioAtual.usuario = novoNome;
        usuarioAtual.email = novoEmail;
        if (novaSenha) {
            usuarioAtual.senha = novaSenha;
        }
        alert('Perfil atualizado com sucesso!');
        voltar();
    } else {
        alert('Senha atual incorreta!');
    }
}

function voltar(){
    document.getElementById('perfil-usuario').style.display = 'none';
    document.getElementById('produtos').style.display = 'block';
    $("#painel-admin").hide();
    $("#carrinho").hide();
}

function login() {
    $("#modal-login").show();
    $("#modal-registro").hide();


}
function cadastro() {
    $("#modal-login").hide();
    $("#modal-registro").show();
}

function renderizarUsuarios() {
    $("#lista-usuarios").html("");
    
    usuarios.forEach(usuario => {
        $("#lista-usuarios").append(`
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.email || 'N/A'}</td>
                <td>${usuario.tipo}</td>
                <td>
                    <button onclick="alterarSenhaUsuario(${usuario.id})">Alterar Senha</button>
                    <button onclick="excluirUsuario(${usuario.id})" class="btn-excluir">Excluir</button>
                </td>
            </tr>
        `);
    });
}
function excluirUsuario(userId) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        const index = usuarios.findIndex(u => u.id === userId);
        if (index !== -1) {
            usuarios.splice(index, 1);
            renderizarUsuarios();
            alert("Usuário excluído com sucesso!");
        }
    }
}


function alterarSenhaUsuario(userId) {
    const usuario = usuarios.find(u => u.id === userId);
    const novaSenha = prompt(`Digite a nova senha para o usuário ${usuario.usuario}:`);
    
    if (novaSenha) {
        if (usuario) {
            usuario.senha = novaSenha;
            alert(`Senha alterada com sucesso para o usuário ${usuario.usuario}`);
        }
    }
}