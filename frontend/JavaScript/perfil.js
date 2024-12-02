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
    const novaSenha = document.getElementById('senha-atual').value;

    const formData = new FormData();
    formData.append("id", usuarioAtual.id);
    formData.append("nome", novoNome);
    formData.append("email", novoEmail);
    formData.append("senha", novaSenha);

    fetch("http://localhost:8080/usuario/atualizar", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Update local user object
        usuarioAtual.usuario = novoNome;
        usuarioAtual.email = novoEmail;
        usuarioAtual.senha = novaSenha;
        
        alert('Perfil atualizado com sucesso!');
        voltar();
    })
    .catch(error => {
        alert("Erro ao atualizar perfil");
    });
}
