function adicionarCategoria() {
    const nome = $("#nome-categoria").val();
    let dados = {
        nome: nome
    };
    
    $.post("http://localhost:8080/categoria/cadastrar", dados, function(categoria) {
        renderizarCategorias();
        $("#nome-categoria").val(''); 
    });
}

function renderizarCategorias() {
    $("#lista-categorias").html("");
    
    $.get("http://localhost:8080/categorias", function(categorias) {
        categorias.forEach(categoria => {
            $("#lista-categorias").append(`
                <tr>
                    <td>${categoria.id}</td>
                    <td>${categoria.nome}</td>
                    <td>
                        <button onclick="excluirCategoria(${categoria.id})" class="btn-excluir">Excluir</button>
                        <button onclick="editarCategoria(${categoria.id})" class="btn-editar">Editar</button>
                    </td>
                </tr>
            `);
        });
    });
}



function excluirCategoria(categoriaId) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
        const index = categorias.findIndex(c => c.id === categoriaId);
        if (index !== -1) {
            categorias.splice(index, 1);
            renderizarCategorias();
        }
    }
}

function atualizarSelectCategorias() {
    const select = $("#categoria-produto");
    select.empty();
    select.append('<option value="">Selecione uma categoria</option>');
    
    $.get("http://localhost:8080/categorias", function(categorias) {
        categorias.forEach(categoria => {
            select.append(`<option value="${categoria.id}">${categoria.nome}</option>`);
        });
    });
}


function carregarCategoriasParaFiltro() {
    const select = $("#filtro-categoria");
    select.html('<option value="">Todas as categorias</option>');
    
    $.get("http://localhost:8080/categorias", function(categorias) {
        categorias.forEach(categoria => {
            select.append(`<option value="${categoria.id}">${categoria.nome}</option>`);
        });
    });
}

function filtrarPorCategoria() {
    const categoriaId = $("#filtro-categoria").val();
    
    if (!categoriaId) {
        // Show all products if no category selected
        $.get("http://localhost:8080/produtos", function(produtos) {
            $("#lista-produtos").empty();
            produtos.forEach(produto => {
                renderizarProduto(produto);
            });
        });
        return;
    }

    // Get products filtered by category
    $.get(`http://localhost:8080/produtos/categoria/${categoriaId}`, function(produtos) {
        $("#lista-produtos").empty();
        produtos.forEach(produto => {
            renderizarProduto(produto);
        });
    });
}

$(document).ready(function() {
    carregarCategoriasParaFiltro();
});

function editarCategoria(categoriaId) {
    const novoNome = prompt("Digite o novo nome da categoria:");
    if (novoNome) {
        const dados = {
            id: categoriaId,
            nome: novoNome
        };
        
        $.post("http://localhost:8080/categoria/atualizar", dados, function(response) {
            renderizarCategorias();
            atualizarSelectCategorias();
        });
    }
}

function excluirCategoria(categoriaId) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
        const dados = {
            id: categoriaId
        };
        
        $.post("http://localhost:8080/categoria/deletar", dados, function(response) {
            renderizarCategorias();
            atualizarSelectCategorias();
        });
    }
}
