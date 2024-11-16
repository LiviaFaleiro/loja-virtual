// Função para avaliar o produto
function avaliarProduto(index) {
    const produto = compras[index];
    const avaliacao = prompt(`
Avalie o produto "${produto.nome}":
1. Digite uma nota de 1 a 5.
2. Opcionalmente, insira um comentário (separado por "|").
Exemplo: 5|Produto excelente!
    `);

    if (!avaliacao) return; // Cancelou a avaliação

    const [nota, comentario] = avaliacao.split('|').map(s => s.trim());

    if (!nota || isNaN(nota) || nota < 1 || nota > 5) {
        alert('Por favor, insira uma nota válida de 1 a 5.');
        return;
    }

    produto.avaliacao = {
        nota: parseInt(nota),
        comentario: comentario || 'Sem comentário.'
    };

    alert('Avaliação registrada com sucesso!');
    mostrarCompras(); // Atualizar a lista de compras para mostrar a avaliação
}

