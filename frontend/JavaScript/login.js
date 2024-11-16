// Função para verificar login
function verificarLogin(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;

    const usuarioValido = usuarios.find(
        u => u.usuario === usuarioInput && u.senha === senhaInput
    );

    if (usuarioValido) {
        tipoUsuarioLogado = usuarioValido.tipo;
        telaLogin.style.display = 'none';
        conteudoPrincipal.style.display = 'block';

        // Verificar permissões
        if (tipoUsuarioLogado === 'normal') {
            botaoCadastrar.style.display = 'none'; // Mostrar botão de cadastro
            botaoMinhasCompras.style.display = 'inline-block'; // Mostrar "Minhas Compras"
            botaoMeuCarrinho.style.display = 'inline-block'; // Mostrar "Meu Carrinho"
        } else {
            botaoCadastrar.style.display = 'inline-block'; // Mostrar botão de cadastro
            botaoMinhasCompras.style.display = 'none'; // Ocultar "Minhas Compras"
            botaoMeuCarrinho.style.display = 'none'; // Ocultar "Meu Carrinho"
        }

        mostrarTela('produtos'); // Exibir a tela de produtos por padrão
    } else {
        mensagemErro.style.display = 'block';
        verProdutos.style.display = 'none';
    }
}
formLogin.addEventListener('submit', verificarLogin);