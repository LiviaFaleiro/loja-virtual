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
