function renderizarProdutos() {
    const $listaProdutos = $("#lista-produtos");
    $listaProdutos.empty();
    
    fetch("http://localhost:8080/produtos")
        .then(response => response.json())
        .then(produtos => {
            produtos.forEach(produto => {
                const $produtoCard = $("<div>", {
                    class: "produto-card"
                }).append(
                    $("<h3>").text(produto.nome || 'Sem nome'),
                    $("<p>").text(`R$ ${parseFloat(produto.valor).toFixed(2)}`),
                    $("<p>").text(produto.descricao || 'Sem descrição'),
                    $("<p>").text(`Categoria: ${produto.categorias ? produto.categorias.map(c => c.nome).join(', ') : 'Sem categoria'}`),
                    $("<button>", {
                        class: "btn-avaliacoes",
                        text: "Ver Avaliações",
                        click: () => mostrarAvaliacoesProduto(produto.id)
                    }),
                    $("<button>", {
                        class: "btn-carrinho",
                        text: "Adicionar ao Carrinho",
                        click: () => adicionarAoCarrinho(produto.id)
                    })
                );

                $listaProdutos.append($produtoCard);
            });
        });
}



// Adiciona um produto (somente admin)
function adicionarProduto() {
    const formData = new FormData();
    formData.append("nome", $("#nome-produto").val());
    formData.append("valor", $("#preco-produto").val());
    formData.append("descricao", $("#descricao-produto").val());
    formData.append("categoria_id", $("#categoria-produto").val());

    console.log("Categoria ID being sent:", $("#categoria-produto").val()); // Add this line to debug

    fetch("http://localhost:8080/produto/cadastrar", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(produto => {
        renderizarProdutos();
        renderizarProdutosAdmin();
        $("#nome-produto, #preco-produto, #categoria-produto, #descricao-produto").val("");
    });
}


function editarProduto(id) {
    // First load all categories
    fetch("http://localhost:8080/categorias")
        .then(response => response.json())
        .then(categorias => {
            const selectCategoria = $("#editar-categoria-produto");
            selectCategoria.empty();
            selectCategoria.append('<option value="">Selecione uma categoria</option>');
            
            categorias.forEach(categoria => {
                selectCategoria.append(`<option value="${categoria.id}">${categoria.nome}</option>`);
            });

            // Then load product data
            $.get(`http://localhost:8080/produto/${id}`, function(produto) {
                $('#editar-nome-produto').val(produto.nome);
                $('#editar-preco-produto').val(produto.valor);
                $('#editar-descricao-produto').val(produto.descricao);
                $('#editar-categoria-produto').val(produto.categoriaId);
                $('#form-editar-produto').data('produto-id', produto.id);
                $('#modal-produto').show();
            });
        });
}



function fecharModalProduto() {
    $("#modal-produto").hide();
    produtoEmEdicao = null; 
}
function salvarAlteracoes() {
    let id = $('#form-editar-produto').data('produto-id');
    let nome = $('#editar-nome-produto').val();
    let valor = $('#editar-preco-produto').val();
    let descricao = $('#editar-descricao-produto').val();
    let categoriaId = $('#editar-categoria-produto').val();

    let formData = new FormData();
    formData.append('id', id);
    formData.append('nome', nome);
    formData.append('valor', valor);
    formData.append('descricao', descricao);
    formData.append('categoria_id', categoriaId);

    fetch(`http://localhost:8080/produto/atualizar`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        fecharModalProduto();
        renderizarProdutos();
        renderizarProdutosAdmin();
    });
}

function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        const formData = new FormData();
        formData.append('id', id);

        fetch(`http://localhost:8080/produto/deletar`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao excluir produto');
            }
            return response.json();
        })
        .then(() => {
            renderizarProdutos();
            renderizarProdutosAdmin();
            alert("Produto excluído com sucesso!");
        })
        .catch(error => {
            alert("Erro ao excluir produto: " + error.message);
            console.error('Error:', error);
        });
    }
}

function adicionarProduto() {
    const formData = new FormData();
    formData.append("nome", $("#nome-produto").val());
    formData.append("valor", $("#preco-produto").val());
    formData.append("descricao", $("#descricao-produto").val());
    formData.append("categoria_id", $("#categoria-produto").val());

    fetch("http://localhost:8080/produto/cadastrar", {
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Saved product:', data);
        renderizarProdutos();
        renderizarProdutosAdmin();
        $("#nome-produto, #preco-produto, #categoria-produto, #descricao-produto").val("");
    })
    .catch(error => {
        console.error('Error saving product:', error);
    });
}


function renderizarProdutosAdmin() {
    $("#lista-produtos-admin").html("");
    
    fetch("http://localhost:8080/produtos")
    .then(response => response.json())
    .then(produtos => {
        produtos.forEach(produto => {
            $("#lista-produtos-admin").append(`
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>R$ ${produto.valor.toFixed(2)}</td>
                    <td>${produto.descricao || 'Sem descrição'}</td>
                    <td>${produto.categoriaId}</td>
                    <td>
                        <button onclick="editarProduto(${produto.id})" class="btn-editar">Editar</button>
                        <button onclick="excluirProduto(${produto.id})" class="btn-excluir">Excluir</button>
                    </td>
                </tr>
            `);
        });
    });
}