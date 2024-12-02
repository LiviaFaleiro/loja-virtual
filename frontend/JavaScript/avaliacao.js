function avaliarProduto(vendaId) { //abre o modal de avalicao
    console.log("Starting avaliarProduto with vendaId:", vendaId);
    fetch(`http://localhost:8080/item-venda/${vendaId}`)
        .then(response => response.json())
        .then(itemVenda => {
            console.log("ItemVenda received:", itemVenda);
            document.getElementById("venda-id-avaliacao").value = vendaId;
            document.getElementById("produto-id-avaliacao").value = itemVenda.produto_id;
            console.log("Set values - vendaId:", vendaId, "produtoId:", itemVenda.produto_id);
            $("#modal-avaliacao").show();
            $("#modal-compras").hide();
        });
}


function enviarAvaliacao() { //cria avaliacao / envia para o banco
    const vendaId = $("#venda-id-avaliacao").val();
    const produtoId = $("#produto-id-avaliacao").val();
    const comentario = $("#comentario-avaliacao").val();
    const rating = $("#rating").val();
    console.log('Sending rating:', rating);
    console.log("Sending evaluation for vendaId:", vendaId, "produtoId:", produtoId);
    
    if (!produtoId) {
        console.error("Product ID is undefined");
        return;
    }
    const dados = {
        usuario_id: usuarioAtual.id,
        nome_usuario: usuarioAtual.usuario,
        produto_id: parseInt(produtoId),
        data_avaliacao: new Date().toISOString(),
        texto_avaliacao: comentario,
        nota: parseInt(rating)
    };
    

    fetch(`http://localhost:8080/vendas/avaliar/${produtoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            return fetch(`http://localhost:8080/vendas/atualizarStatus/${vendaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: "Avaliado"
                })
            });
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Avaliação enviada com sucesso!");
            fecharModalAvaliacao();
            $("#modal-compras").show();
            carregarComprasUsuario();
        }
    });
}

function mostrarAvaliacoesProduto(produtoId) {
    $("#produtos").hide();
    $("#modal-ver-avaliacoes").show();
    
    fetch(`http://localhost:8080/avaliacoes/${produtoId}`)
        .then(response => response.json())
        .then(avaliacoes => {
            const avaliacoesHtml = avaliacoes.map(avaliacao => `
                <div class="avaliacao-item">
                    <div class="avaliacao-header">
                        <span class="usuario">${avaliacao.nome_usuario}</span>
                        <span class="nota">${'⭐'.repeat(avaliacao.nota)}</span>
                        <span class="data">${new Date(avaliacao.data_avaliacao).toLocaleDateString('pt-BR')}</span>
                        ${usuarioAtual && usuarioAtual.id === avaliacao.usuario_id ? 
                            `<button onclick="abrirModalEditarAvaliacao(${avaliacao.id})">Editar</button>
                             <button onclick="ExcluirAvaliacao(${avaliacao.id})">Excluir</button>` 
                            : ''}
                    </div>
                    <p class="comentario">${avaliacao.texto_avaliacao}</p>
                </div>
            `).join('');
            
            $("#modal-lista-avaliacoes").html(avaliacoesHtml || '<p>Nenhuma avaliação encontrada para este produto</p>');
        });
}


function EditarAvaliacao(avaliacaoId) {
    fetch(`http://localhost:8080/avaliacoes/${avaliacaoId}`)
    .then(response => response.json())
    .then(avaliacao => {
        $("#editar-avaliacao-id").val(avaliacaoId);
        $("#editar-rating").val(avaliacao.nota);
        $("#editar-comentario-avaliacao").val(avaliacao.texto_avaliacao);
        $("#modal-editar-avaliacao").show();
        $("#modal-ver-avaliacoes").hide();
        $("#modal-avaliacao").hide(); // Hide the create review modal
    });
}



function ExcluirAvaliacao(avaliacaoId) { //exclui a avaliacao sem mais nem menos ksksks
    if (confirm("Deseja realmente excluir esta avaliação?")) {
        fetch(`http://localhost:8080/avaliacao/excluir/${avaliacaoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Avaliação excluída com sucesso!");
                $("#modal-avaliacao").hide();
                $("#modal-compras").show();
                carregarComprasUsuario();
            }
        });
    }
}

function abrirModalEditarAvaliacao(avaliacaoId) {
    fetch(`http://localhost:8080/avaliacoes/${avaliacaoId}`)
        .then(response => response.json())
        .then(avaliacao => {
            $("#editar-avaliacao-id").val(avaliacaoId);
            $("#editar-rating").val(avaliacao.nota);
            $("#editar-comentario-avaliacao").val(avaliacao.texto_avaliacao);
            $("#modal-editar-avaliacao").show();
            $("#modal-ver-avaliacoes").hide();
        });
}

function fecharModalEditarAvaliacao() {
    $("#modal-editar-avaliacao").hide();
    $("#modal-ver-avaliacoes").show();
}

function atualizarAvaliacao() {
    const avaliacaoId = $("#editar-avaliacao-id").val();
    const rating = $("#editar-rating").val();
    const comentario = $("#editar-comentario-avaliacao").val();

    const dados = {
        id: avaliacaoId,
        data_avaliacao: new Date().toISOString(),
        texto_avaliacao: comentario,
        nota: parseInt(rating)
    };

    fetch(`http://localhost:8080/avaliacao/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Avaliação atualizada com sucesso!");
            $("#modal-editar-avaliacao").hide();
            $("#modal-ver-avaliacoes").show();
            mostrarAvaliacoesProduto(data.id_produto);
        }
    });
}
function fecharModalAvaliacao() {
    $("#modal-avaliacao").hide();
    $("#modal-compras").show();
}
