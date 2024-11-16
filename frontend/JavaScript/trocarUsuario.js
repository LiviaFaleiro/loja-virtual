// Função para trocar de usuário
function trocarUsuario() {
    // Resetar estado atual
    tipoUsuarioLogado = null;
    telaLogin.style.display = 'flex'; // Mostrar tela de login
    conteudoPrincipal.style.display = 'none'; // Ocultar conteúdo principal
    mensagemErro.style.display = 'none'; // Ocultar mensagem de erro
    document.getElementById('usuario').value = ''; // Limpar campo de usuário
    document.getElementById('senha').value = ''; // Limpar campo de senha
}