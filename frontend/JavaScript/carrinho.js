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

let vendas = [];

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const precoTotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const nomeCliente = prompt("Digite seu nome para finalizar a compra:");
    
    if (nomeCliente && confirm(`Confirmar compra no valor total de R$ ${precoTotal.toFixed(2)}?`)) {
        const novaVenda = {
            id: vendas.length + 1,
            data: new Date().toLocaleString(),
            nomeCliente: nomeCliente,
            itens: carrinho,
            total: precoTotal
        };

        vendas.push(novaVenda);
        mostrarEstatisticasVendas();
        carrinho = [];
        renderizarCarrinho();
        alert("Compra realizada com sucesso!");
    }
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
                <td>
                    <button onclick="removerDoCarrinho(${item.id})">Remover</button>
                </td>
            </tr>
        `);
    });

    $("#preco-total").text(`Total: R$ ${precoTotal.toFixed(2)}`);
    
    // Add purchase button if cart is not empty
    if (carrinho.length > 0) {
        $("#itens-carrinho").append(`
            <tr>
                <td colspan="4">
                    <button onclick="finalizarCompra()" class="btn-finalizar">Finalizar Compra</button>
                </td>
            </tr>
        `);
    }
}


$(document).ready(() => {
    $("#botaoPerfil").hide();
    $("#botaoAdm").hide();
    $("#botaoCarrinho").show(); // Show cart button
    renderizarProdutos();
});
