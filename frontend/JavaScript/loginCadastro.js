// login
function fazerLogin() {
    const usuario = $("#usuario").val();
    const senha = $("#senha").val();
    $("#produtos").show(); 
    $(".cabecalho").show(); 

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha); 

    if (usuarioEncontrado) {
        usuarioAtual = usuarioEncontrado;
        alert(`Bem-vindo, ${usuarioAtual.usuario}`);
        $("#modal-login").hide();

        if (usuarioAtual.tipo === "admin") {
            $("#botaoCarrinho").hide();
            $("#botaoAdm").show();
            $("#botaoPerfil").hide(); 
        } else {
            $("#botaoAdm").hide();
            $("#botaoCarrinho").show();
            $("#botaoPerfil").show(); 
        }

        carregarCategoriasParaFiltro();
        renderizarProdutos();
    } else {
        alert("Usuário ou senha inválidos. Por favor, tente novamente.");
        $("#modal-login").show();
        $("#produtos").hide(); 
        $(".cabecalho").hide(); 
    }
}


//cadastro
function fazerRegistro() {
    $("#modal-login").show(); 

    const usuario = $("#usuario-registro").val();
    const senha = $("#senha-registro").val();
    const novoId = usuarios.length + 1; // Generate new ID

    if (usuarios.find(u => u.usuario === usuario)) {
        alert("Usuário já existe.");
        return;
    }

    usuarios.push({ 
        id: novoId,
        usuario, 
        senha, 
        tipo: "usuario" 
    });
    
    alert("Usuário registrado com sucesso. Faça login!");
    $("#modal-registro").hide();
}


function alternarModalLogin() {
    $("#modal-login").toggle();
}


function alternarModalRegistro() {
    $("#modal-registro").toggle();
}