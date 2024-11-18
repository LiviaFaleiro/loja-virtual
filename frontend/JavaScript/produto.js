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

// Abre o modal para editar o produto
function editarProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    let produtoEmEdicao = null; // Variável para armazenar o produto que está sendo editado
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