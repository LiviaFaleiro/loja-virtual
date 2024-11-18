function renderizarUsuarios() {
    $("#lista-usuarios").html("");
    
    usuarios.forEach(usuario => {
        $("#lista-usuarios").append(`
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.email || 'N/A'}</td>
                <td>${usuario.tipo}</td>
                <td>
                    <button onclick="alterarSenhaUsuario(${usuario.id})">Alterar Senha</button>
                    <button onclick="excluirUsuario(${usuario.id})" class="btn-excluir">Excluir</button>
                </td>
            </tr>
        `);
    });
}
function excluirUsuario(userId) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        const index = usuarios.findIndex(u => u.id === userId);
        if (index !== -1) {
            usuarios.splice(index, 1);
            renderizarUsuarios();
            alert("Usuário excluído com sucesso!");
        }
    }
}


function alterarSenhaUsuario(userId) {
    const usuario = usuarios.find(u => u.id === userId);
    const novaSenha = prompt(`Digite a nova senha para o usuário ${usuario.usuario}:`);
    
    if (novaSenha) {
        if (usuario) {
            usuario.senha = novaSenha;
            alert(`Senha alterada com sucesso para o usuário ${usuario.usuario}`);
        }
    }
}