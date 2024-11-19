
function atualizarEstatisticasVendas() {
    if (!isAdmin) return; // Only show for admin users
    
    $("#estatisticas-vendas").html("");
    const estatisticas = {};
    
    vendas.forEach(venda => {
        venda.itens.forEach(item => {
            if (!estatisticas[item.id]) {
                estatisticas[item.id] = {
                    nome: item.nome,
                    quantidadeVendida: 0,
                    compradores: new Set()
                };
            }
            estatisticas[item.id].quantidadeVendida += item.quantidade;
            estatisticas[item.id].compradores.add(venda.usuario.nome);
        });
    });
    
    Object.values(estatisticas).forEach(stat => {
        $("#estatisticas-vendas").append(`
            <tr>
                <td>${stat.nome}</td>
                <td>${stat.quantidadeVendida}</td>
                <td>${Array.from(stat.compradores).join(', ')}</td>
            </tr>
        `);
    });
}

function mostrarEstatisticasVendas() {
    $("#estatisticas-vendas").empty();
    
    const resumoVendas = {};
    
    vendas.forEach(venda => {
        venda.itens.forEach(item => {
            const key = item.id;
            if (!resumoVendas[key]) {
                resumoVendas[key] = {
                    id: item.id,
                    nome: item.nome,
                    totalVendido: 0,
                    compradores: new Set()
                };
            }
            resumoVendas[key].totalVendido += item.quantidade;
            resumoVendas[key].compradores.add(venda.nomeCliente);
        });
    });
    
    Object.values(resumoVendas).forEach(produto => {
        $("#estatisticas-vendas").append(`
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.totalVendido}</td>
                <td>${Array.from(produto.compradores).join(', ')}</td>
            </tr>
        `);
    });
}
//hhahahaha não sei como isso vai funcionar com o banco de dados 