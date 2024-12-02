function adicionarAoCarrinho(produtoId) {
    if (!usuarioAtual) {
        alert("Por favor, faça login para adicionar produtos ao carrinho");
        return;
    }

    fetch("http://localhost:8080/carrinho/adicionar", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `usuario_id=${usuarioAtual.id}&produto_id=${produtoId}`
    })
    .then(response => response.json())
    .then(data => {
        alert("Produto adicionado ao carrinho!");
        renderizarCarrinho();
    })
    .catch(error => {
        console.error("Erro ao adicionar ao carrinho:", error);
        alert("Erro ao adicionar produto ao carrinho");
    });
}


function removerDoCarrinho(itemId) {
    $.post('http://localhost:8080/carrinho/deletar', { id: itemId }, function() {
        renderizarCarrinho();
    })
    .fail(function(error) {
        console.error("Erro ao remover item do carrinho:", error);
        alert("Erro ao remover item do carrinho");
    });
}

function finalizarCompra() {
    if (!usuarioAtual) {
        alert("Por favor, faça login para finalizar a compra");
        return;
    }

    let valorTotal = 0;
    const itensCarrinho = $("#itens-carrinho tr").toArray();
    
    if (itensCarrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // pega nome e quantidade do primeiro item
    const nomeProduto = $(itensCarrinho[0]).find('td').eq(1).text();
    const quantidade = parseInt($(itensCarrinho[0]).find('td').eq(2).text());
    
    // valor total calculo
    itensCarrinho.forEach(item => {
        if ($(item).find('td').length > 0) {
            const valorTexto = $(item).find('td').eq(3).text().replace('R$ ', '').trim();
            const valor = parseFloat(valorTexto);
            if (!isNaN(valor)) {
                valorTotal += valor;
            }
        }
    });

    const venda = {
        usuario_id: usuarioAtual.id,
        data_venda: new Date().toISOString(),
        valor_total: valorTotal,
        status: "Pedido feito",
        nome_produto: nomeProduto,
        quantidade: quantidade
    };

    fetch("http://localhost:8080/venda/finalizar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venda)
    })
    .then(response => response.json())
    .then(data => {
        alert("Compra finalizada com sucesso!");
        renderizarCarrinho();
    })
    .catch(error => {
        console.error("Erro ao finalizar compra:", error);
        alert("Erro ao finalizar compra");
    });
}

function renderizarCarrinho() {
    if (!usuarioAtual) {
        console.log("Nenhum usuário logado");
        return;
    }
    
    console.log("Renderizando carrinho para usuário:", usuarioAtual.id);
    $("#itens-carrinho").html("");
    let precoTotal = 0;

    fetch(`http://localhost:8080/carrinho/usuario/${usuarioAtual.id}`)
        .then(response => response.json())
        .then(itensCarrinho => {
            console.log("Itens do carrinho recebidos:", itensCarrinho);
            if (itensCarrinho.length === 0) {
                $("#itens-carrinho").html("<tr><td colspan='5'>Carrinho vazio</td></tr>");
                return;
            }

            itensCarrinho.forEach(item => {
                fetch(`http://localhost:8080/produto/${item.produto_id}`)
                    .then(response => response.json())
                    .then(produto => {
                        console.log("Produto recebido:", produto);
                        precoTotal += produto.valor * item.quantidade;
                        
                        $("#itens-carrinho").append(`
                            <tr>
                                <td>${produto.id}</td>
                                <td>${produto.nome}</td>
                                <td>${item.quantidade}</td>
                                <td>R$ ${(produto.valor * item.quantidade).toFixed(2)}</td>
                                <td>
                                    <button onclick="removerDoCarrinho(${item.id})">Remover</button>
                                </td>
                            </tr>
                        `);

                        $("#preco-total").text(`Total: R$ ${precoTotal.toFixed(2)}`);
                    });
            });
            $("#itens-carrinho").append(`
                <tr>
                    <td colspan="5" style="text-align: right">
                        <button onclick="finalizarCompra()">Finalizar Compra</button>
                    </td>
                </tr>
            `);
            
        })
        .catch(error => {
            console.error("Erro ao carregar carrinho:", error);
            $("#itens-carrinho").html("<tr><td colspan='5'>Erro ao carregar carrinho</td></tr>");
        });
}
$(document).ready(() => {
    $("#botaoPerfil").hide();
    $("#botaoAdm").hide();
    $("#botaoCarrinho").show();
    renderizarProdutos();
    
    if (usuarioAtual) {
        renderizarCarrinho();
    }
});




