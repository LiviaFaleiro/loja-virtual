function editarPerfil() {
    document.getElementById('produtos').style.display = 'none';
    document.getElementById('perfil-usuario').style.display = 'block';
    
    // Pre-fill the form with current user data
    document.getElementById('nome-usuario').value = usuarioAtual.usuario;
    document.getElementById('email-usuario').value = usuarioAtual.email || '';
}

function atualizarPerfil() {
    const novoNome = document.getElementById('nome-usuario').value;
    const novoEmail = document.getElementById('email-usuario').value;
    const senhaAtual = document.getElementById('senha-atual').value;
    const novaSenha = document.getElementById('nova-senha').value;

    if (senhaAtual === usuarioAtual.senha) {
        usuarioAtual.usuario = novoNome;
        usuarioAtual.email = novoEmail;
        if (novaSenha) {
            usuarioAtual.senha = novaSenha;
        }
        alert('Perfil atualizado com sucesso!');
        voltar();
    } else {
        alert('Senha atual incorreta!');
    }
}