
// Função para exibir a tela de finalização de compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    mostrarTela('finalizacao');
});

// Função para processar os dados de finalização
const formFinalizacao = document.getElementById('form-finalizacao');
formFinalizacao.addEventListener('submit', event => {
    event.preventDefault();

    // Coletar os dados do formulário
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const metodoPagamento = document.querySelector('input[name="pagamento"]:checked').value;

    // Exibir mensagem de confirmação
    document.getElementById('mensagem-confirmacao').style.display = 'block';

    // Simular envio e limpar o carrinho
    setTimeout(() => {
        alert(`Pedido enviado!\nEndereço: ${endereco}, ${cidade}, ${cep}\nPagamento: ${metodoPagamento}`);
        mostrarTela('produtos'); // Redirecionar para a tela de produtos
        limparCarrinho(); // Função fictícia para limpar o carrinho
    }, 2000);
});
