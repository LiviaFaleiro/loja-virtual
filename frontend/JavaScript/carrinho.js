// Adicionar ao carrinho
function adicionarAoCarrinho(index) {
    if (tipoUsuarioLogado === 'normal') { // Apenas usuários normais podem adicionar ao carrinho
        carrinho.push(produtos[index]);
        renderizarCarrinho();
        alert('Produto adicionado ao carrinho!');
    } else {
        alert('Somente usuários normais podem adicionar produtos ao carrinho.');
    }
}

// Renderizar carrinho
function renderizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');
        itemDiv.innerHTML = `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(itemDiv);
    });

    totalCarrinhoSpan.textContent = total.toFixed(2);
}

function adicionarAoCarrinho(index) {
    carrinho.push(produtos[index]);
    renderizarCarrinho();
    mostrarTela('carrinho');
}


function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderizarCarrinho();
}
