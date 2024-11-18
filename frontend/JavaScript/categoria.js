const categorias = [];

function adicionarCategoria() {
    const nome = $("#nome-categoria").val();
    if (nome) {
        const novaCategoria = {
            id: categorias.length + 1,
            nome: nome
        };
        categorias.push(novaCategoria);
        renderizarCategorias();
        $("#nome-categoria").val('');
    }
}

function renderizarCategorias() {
    $("#lista-categorias").html("");
    categorias.forEach(categoria => {
        $("#lista-categorias").append(`
            <tr>
                <td>${categoria.id}</td>
                <td>${categoria.nome}</td>
                <td>
                    <button onclick="excluirCategoria(${categoria.id})" class="btn-excluir">Excluir</button>
                </td>
            </tr>
        `);
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
    select.html('<option value="">Selecione uma categoria</option>');
    categorias.forEach(categoria => {
        select.append(`<option value="${categoria.id}">${categoria.nome}</option>`);
    });
}

function carregarCategoriasParaFiltro() {
    const select = $("#filtro-categoria");
    select.html('<option value="">Todas as categorias</option>');
    categorias.forEach(categoria => {
        select.append(`<option value="${categoria.id}">${categoria.nome}</option>`);
    });
}

function filtrarPorCategoria() {
    const categoriaId = parseInt($("#filtro-categoria").val());
    const produtosFiltrados = categoriaId 
        ? produtos.filter(p => p.categoriaId === categoriaId) 
        : produtos;
    
    renderizarProdutos(produtosFiltrados);
}