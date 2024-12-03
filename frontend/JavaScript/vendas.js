//livia está enloquecendo aos pooucos (tudo comentado para eu não me peder ksksksks)
function carregarComprasUsuario() {
    if (!usuarioAtual) return;
    
    fetch(`http://localhost:8080/vendas/usuario/${usuarioAtual.id}`) //requisição para pegar as compras do usuario
        .then(response => response.json()) //resposta em json
        .then(vendas => { //se tiver vendas 
            const tbody = document.querySelector("#lista-compras"); //tabela com as compras
            tbody.innerHTML = '';
            
            if (vendas.length === 0) { //se não tiver compras, mostra mensagem
                tbody.innerHTML = '<tr><td colspan="7">Nenhuma compra encontrada</td></tr>';
                return;
            }

            vendas.forEach(venda => { //para cada venda
                const dataFormatada = new Date(new Date(venda.data_venda).getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR'); //data formatada
                
                let botoesAcao; //condicao para mostrar os botoes com base no status da venda
                if (venda.status === 'CANCELADO' || venda.status === 'Produto Enviado'  || venda.status === 'Devolução Solicitada' || venda.status === 'Devolução Aprovada' || venda.status === 'Devolução Recusada' || venda.status === 'Devolução solicitada') {
                    botoesAcao = '';
                } else {
                    botoesAcao = `
                        <button onclick="solicitarDevolucao(${venda.id})">Pedir Devolução</button>
                        <button onclick="avaliarProduto(${venda.produto_id})">Avaliar Produto</button>
                        <button onclick="cancelarPedido(${venda.id})">Cancelar Pedido</button>
                    `;
                }
                if(venda.status === 'Produto Enviado') {
                    botoesAcao = `<button onclick="confirmarEntrega(${venda.id})">Confirmar Entrega</button>`;
                }                
                
                if(venda.status === 'Pedido Entregue'){
                    botoesAcao = `<button onclick="avaliarProduto(${venda.id})">Avaliar Produto</button>
                                  <button onclick="solicitarDevolucao(${venda.id})">Pedir Devolução</button>`;
                }
                
                
                
                
                if(venda.status === 'Pedido feito') {
                    botoesAcao = `<button onclick="cancelarPedido(${venda.id})">Cancelar Pedido</button>`;
                }
                if(venda.status === 'Devolução Solicitada' || venda.status === 'Devolução Aprovada' || venda.status === 'Devolução Recusada') {
                    botoesAcao = `<button onclick="avaliarProduto(${venda.id})">Avaliar Produto</button>`;
                }
                if(venda.status === 'Avaliado') {
                    botoesAcao = `Vá para o produto para editar ou excluir avaliação`;
                }
                const row = `
                    <tr>
                        <td>Compra #${venda.id}</td>
                        <td>${venda.nome_produto}</td>
                        <td>${venda.quantidade}</td>
                        <td>R$ ${venda.valor_total.toFixed(2)}</td>
                        <td>${dataFormatada}</td>
                        <td>${venda.status}</td>
                        <td>${botoesAcao}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar compras:', error);
            document.querySelector("#lista-compras").innerHTML = 
                '<tr><td colspan="7">Erro ao carregar as compras</td></tr>';
        });
}

function cancelarPedido(vendaId) { //id da venda não produto 
    fetch(`http://localhost:8080/vendas/cancelar/${vendaId}`, { //requisição para cancelar a venda
        method: 'POST', //método de requisição post
        headers: {//cabeçalho da requisição indica json
            'Content-Type': 'application/json' //converte em json
        },
        body: JSON.stringify({
            usuario_id: usuarioAtual.id //converte  string em json
        })
    })
    .then(response => response.json()) // resposta do servidor em javascritp ksksksksksks (deveria ter usado jquery)
    .then(data => {
        if(data.success) {
            carregarComprasUsuario(); //se for bem sucedida carregar novamente as compras do usuario atualizada ;)
        }
    })
    .catch(error => { // se pegar erro, mostra a mensagem "erri ao cancelar pedido. Tente novamente."
        console.error('Erro ao cancelar pedido:', error);
        alert('Erro ao cancelar o pedido. Tente novamente.');
    });
}

function mostrarEstatisticasVendas() {

    if (!usuarioAtual || usuarioAtual.tipo !== 'admin') return;

    
    fetch(`http://localhost:8080/vendas/todas`) //requisição para pegar todas as vendas
        .then(response => { //resposta em json
            return response.json();
        })
        .then(vendas => { //se tiver vendas
            console.log("Vendas:", vendas); // console.log para ver se está pegando as vendas
            const tbody = document.querySelector("#estatisticas-vendas"); // tabela com as estatisticas
            console.log("tbody element:", tbody); // ve se elemento existe
            tbody.innerHTML = ''; // limpa a tabela
            
            if (vendas.length === 0) { // se não tiver vendas, mostra mensagem
                tbody.innerHTML = '<tr><td colspan="8">Nenhuma venda encontrada</td></tr>';
                return;
            }
            
            vendas.forEach(venda => { // para cada venda
                const dataFormatada = new Date(new Date(venda.data_venda).getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR'); //novamente a data formtatada 
                
                // condicao para mostrar os botoes com base no status da venda
                let botoesAcao;
                if (venda.status === 'CANCELADO' || venda.status === 'Produto Enviado' || venda.status === 'Pedido Entregue' || venda.status === 'Devolução Aprovada' || venda.status === 'Devolução Recusada' || venda.status === 'Devolução Solicitada') {
                    botoesAcao = '<td>Não tem ações</td>';
                } else {
                    botoesAcao = `<td>
                        <button onclick="enviarProduto(${venda.id})">Enviar Produto</button>
                        <button onclick="cancelarPedido(${venda.id})">Cancelar Pedido</button>
                    </td>`;
                }
                
            
                const row = `
                    <tr>
                        <td>${venda.id}</td>
                        <td>${venda.nome_produto}</td>
                        <td>${venda.quantidade}</td>
                        <td>R$ ${venda.valor_total.toFixed(2)}</td>
                        <td>${dataFormatada}</td>
                        <td>${venda.status}</td>
                        <td>${venda.usuario_id}</td>
                        ${botoesAcao}
                    </tr>
                `; // cria uma linha da tabela com os dados da venda
                tbody.innerHTML += row; // adiciona a linha na tabela
            }); // pega os dados da venda e adiciona na tabela
})          
}

function enviarProduto(vendaId) {
    fetch(`http://localhost:8080/vendas/enviar/${vendaId}`, { //requisição para enviar o produto
        method: 'POST', //metodo de requisição post
        headers: { //cabeçalho da requisição > json
            'Content-Type': 'application/json' //converte em json
        }
    })
    .then(response => response.json()) //resposta do servidor em js
    .then(data => { //se for bem sucedida
        if(data.success) { //se for bem sucedida
            mostrarEstatisticasVendas(); //carrega as vendas
        }

        vendas.forEach(venda => {  //for cada
            const dataFormatada = new Date(new Date(venda.data_venda).getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR'); //data
            const row = ` //cria uma linha da tabela com os dados da venda
                <tr>
                    <td>${venda.id}</td>
                    <td>${venda.nome_produto}</td>
                    <td>${venda.quantidade}</td>
                    <td>R$ ${venda.valor_total.toFixed(2)}</td>
                    <td>${dataFormatada}</td>
                    <td>${venda.status}</td>
                    <td>${venda.usuario_id}</td>
                    ${botoesAcao}
                </tr>
            `; //honestamente nao sei se era necessario isso aqui MAS copiei do carregar produtos ksksksks
            tbody.innerHTML += row;
        });
    })
}

function confirmarEntrega(vendaId) {
    fetch(`http://localhost:8080/vendas/confirmar/${vendaId}`, { //8080 para confirmar
        method: 'POST', //metodo
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) //resposta json
    .then(data => {
        if(data.success) { // se tudo ok
            carregarComprasUsuario();
            mostrarEstatisticasVendas();
        }
    })
    .catch(error => { // se nao, mensagem
        console.error('Erro ao confirmar entrega:', error);
        alert('Erro ao confirmar entrega. Tente novamente.');
    });
}

