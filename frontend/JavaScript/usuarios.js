function renderizarUsuarios() {
    $("#lista-usuarios").html("");
    
    fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(usuarios => {
        usuarios.forEach(usuario => {
            $("#lista-usuarios").append(`
                <tr id="linhaU${usuario.id}">
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email || 'N/A'}</td>
                    <td>${usuario.tipo || 'usuario'}</td>
                    <td>
                        <button onclick="alterarSenhaUsuario(${usuario.id})">Alterar Senha</button>
                        <button onclick="excluirUsuario(${usuario.id})" class="btn-excluir">Excluir</button>
                        <button onclick="editarU(${usuario.id})">Editar</button>
                    </td>
                </tr>
            `);
        });
    });
}

function confirmarExclusaoPerfil() {
    document.getElementById('modal-excluir-perfil').style.display = 'flex';
}

function fecharModalExclusao() {
    document.getElementById('modal-excluir-perfil').style.display = 'none';
}

function excluirPerfil() {
    fetch('http://localhost:8080/usuario/deletar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${usuarioAtual.id}`
    })
    .then(response => response.json())
    .then(data => {
        usuarioAtual = null;
        localStorage.removeItem('usuario');
        window.location.reload();
    })
    .catch(error => {
        alert('Erro ao excluir conta');
    });
}

function excluirUsuario(userId) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        // Delete from backend
        $.post('http://localhost:8080/usuario/deletar', { id: userId }, function() {
            // Delete from frontend array
            const index = usuarios.findIndex(u => u.id === userId);
            if (index !== -1) {
                usuarios.splice(index, 1);
                renderizarUsuarios();
                alert("Usuário excluído com sucesso!");
            }
        });
    }
}

function alterarSenhaUsuario(userId) { //admin muda senha do usuario
    const novaSenha = prompt("Digite a nova senha para o usuário:");
    
    if (novaSenha) {
        fetch(`http://localhost:8080/usuario/alterarSenha?id=${userId}&novaSenha=${novaSenha}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            alert("Senha alterada com sucesso!");
        })
        .catch(error => {
            alert("Erro ao alterar senha");
        });
    }
}

