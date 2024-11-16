// Lista global para armazenar compras finalizadas
let compras = [];

// Simulação de um carrinho (exemplo)

// Registrar a compra ao finalizar
function registrarCompra() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
    }

    // Adicionar produtos do carrinho à lista de compras
    compras.push(...carrinho.map(produto => ({ ...produto, avaliacao: null })));

    alert('Compra finalizada com sucesso!');
    limparCarrinho(); // Limpar carrinho após finalizar
    mostrarTela('compras'); // Redirecionar para a tela de compras
}

// Função para limpar o carrinho
function limparCarrinho() {
    carrinho = []; // Esvaziar carrinho
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
    document.getElementById('total-carrinho').innerText = '0.00';
}

// Função para mostrar as compras realizadas
function mostrarCompras() {
    const listaCompras = document.getElementById('lista-compras');
    listaCompras.innerHTML = ''; // Limpa a lista antes de renderizar

    if (compras.length === 0) {
        listaCompras.innerHTML = '<p>Você ainda não realizou nenhuma compra.</p>';
        return;
    }

    compras.forEach((produto, index) => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto-compra');
        divProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100px;">
            <div>
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                ${
                    produto.avaliacao
                        ? `<p>Avaliação: ${'⭐'.repeat(produto.avaliacao.nota)}</p>
                           <p>Comentário: ${produto.avaliacao.comentario}</p>`
                        : `<button onclick="avaliarProduto(${index})">Avaliar Produto</button>`
                }
            </div>
        `;
        listaCompras.appendChild(divProduto);
    });
}

// Atualizar a tela ao clicar em "Minhas Compras"
document.querySelector('button[onclick="mostrarTela(\'compras\')"]').addEventListener('click', mostrarCompras);
