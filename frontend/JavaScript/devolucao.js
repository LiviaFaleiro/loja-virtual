function carregarDevolucoes() { //carrega as devolucoes
    if (!usuarioAtual || usuarioAtual.tipo !== 'admin') return; //confere se é admin, se não for, retorna

    fetch('http://localhost:8080/devolucoes') //requisicao para pegar as devolucoes
        .then(response => response.json()) //resposta em json
        .then(devolucoes => { //se der certo
            const tbody = document.querySelector("#lista-devolucoes"); //seleciona a tabela
            tbody.innerHTML = ''; //limpa a tabela
            
            if (devolucoes.length === 0) { //se nao tiver devolucoes
                tbody.innerHTML = '<tr><td colspan="7">Nenhuma devolução encontrada</td></tr>'; 
                return;
            }

            devolucoes.forEach(devolucao => { //pra cada 
                const dataFormatada = new Date(devolucao.data_solicitacao).toLocaleDateString('pt-BR'); //data
                
                let botoesAcao = ''; 
                if (devolucao.status !== 'Devolução Aprovada' && devolucao.status !== 'Devolução Recusada') { //confere se o status é aprovado ou recusado
                    botoesAcao = `
                        <button onclick="aprovarDevolucao(${devolucao.id})">Aprovar</button>
                        <button onclick="recusarDevolucao(${devolucao.id})">Recusar</button>
                    `;
                }
                else{
                    botoesAcao = `<td>Não tem ações</td>`;
                }

                const row = `
                    <tr>
                        <td>${devolucao.usuario_id}</td>
                        <td>${devolucao.venda_id}</td>
                        <td>R$ ${devolucao.valor_total.toFixed(2)}</td>
                        <td>${devolucao.justificativa}</td>
                        <td>${dataFormatada}</td>
                        <td>${devolucao.status}</td>
                        <td>${botoesAcao}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}


function aprovarDevolucao(devolucaoId) {
    fetch(`http://localhost:8080/vendas/aprovarD/${devolucaoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            carregarDevolucoes();
            alert("Devolução aprovada com sucesso!");
        }
    })
    .catch(error => {
        console.error('Erro ao aprovar devolução:', error);
        alert('Erro ao aprovar devolução. Tente novamente.');
    });
}


function recusarDevolucao(devolucaoId) {
    fetch(`http://localhost:8080/vendas/recusarD/${devolucaoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            carregarDevolucoes();
            alert("Devolução recusada");
        }
    })
    .catch(error => {
        console.error('Erro ao recusar devolução:', error);
        alert('Erro ao recusar devolução. Tente novamente.');
    });
}

function enviarSolicitacaoDevolucao() {
    const vendaId = $("#venda-id-devolucao").val(); //pega o id da venda
    const justificativa = $("#justificativa-devolucao").val(); //pega a justificativa

    if (!justificativa.trim()) { //se a justificativa está vazia
        //TRIM() TIRA OS ESPAÇOS EM BRANCO
        alert("Por favor, insira uma justificativa");
        return;
    }

    const dados = { //dados da solicitação
        justificativa: justificativa, //justificativa
        usuario_id: usuarioAtual.id, //id do usuario
        data_solicitacao: new Date().toISOString() //data da solicitação 
    };

    fetch(`http://localhost:8080/vendas/devolucao/${vendaId}`, { //requisição para enviar a solicitação de devolução
        method: 'POST', //METODO
        headers: { //cabeçalho
            'Content-Type': 'application/json' ////tipo de conteúdo
        },
        body: JSON.stringify(dados) //corpo da requestr
    })
    .then(response => response.json()) //resposta em json
    .then(data => { //se deu certo
        if(data.success) {
            alert("Solicitação de devolução enviada com sucesso!");
            fecharModalDevolucao();
            carregarComprasUsuario();
        }
    })
    .catch(error => { //caso de erro
        console.error('Erro:', error);
        alert("Erro ao solicitar devolução");
    });
}