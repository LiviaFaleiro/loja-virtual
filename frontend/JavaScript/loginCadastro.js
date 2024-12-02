// login
function fazerLogin() {
    const usuario = $("#usuario").val();
    const senha = $("#senha").val();

    fetch(`http://localhost:8080/usuarios`)
    .then(response => response.json())
    .then(usuariosBanco => {
        const usuarioEncontrado = usuariosBanco.find(u => u.nome === usuario && u.senha === senha);

        if (usuarioEncontrado) {
            usuarioAtual = {
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                senha: usuarioEncontrado.senha,
                tipo: usuarioEncontrado.tipo || "usuario"
            };
            console.log("Usuario logado:", usuarioAtual); 

            alert(`Bem-vindo, ${usuarioAtual.usuario}`);
            $("#modal-login").hide();
            $("#produtos").show();
            $(".cabecalho").show();

            if (usuarioAtual.tipo === "admin") {
                $("#botaoCarrinho").hide();
                $("#botaoAdm").show();
                $("#botaoPerfil").hide();
                $("#botaoCompras").hide();
                $("#botaoMediaVendas").show();
            } else {
                $("#botaoAdm").hide();
                $("#botaoCarrinho").show();
                $("#botaoPerfil").show();
                $("#botaoCompras").show();
                $("#botaoMediaVendas").hide();

                renderizarCarrinho(); 
            }

            carregarCategoriasParaFiltro();
            renderizarProdutos();
        } else {
            alert("Usuário ou senha inválidos. Por favor, tente novamente.");
            $("#modal-login").show();
            $("#produtos").hide();
            $(".cabecalho").hide();
        }
    });
}


//cadastro
function fazerRegistro() {
    const usuario = $("#usuario-registro").val();
    const senha = $("#senha-registro").val();
    const email = $("#email-registro").val();
    
    if (usuarios.find(u => u.usuario === usuario)) {
        alert("Usuário já existe.");
        return;
    }

    const formData = new FormData();
    formData.append("nome", usuario);
    formData.append("email", email);
    formData.append("senha", senha);
    formData.append("tipo", "usuario");

    fetch("http://localhost:8080/usuario/cadastrar", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        usuarios.push({ 
            id: data.id,
            usuario: usuario,
            email: email,
            senha: senha,
            tipo: "usuario"
        });
        
        alert("Usuário registrado com sucesso. Faça login!");
        $("#modal-registro").hide();
        $("#modal-login").show();
        $("#usuario-registro, #email-registro, #senha-registro").val("");
    })
    .catch(error => {
        alert("Erro ao cadastrar usuário");
    });
}


function alternarModalLogin() {
    $("#modal-login").toggle();
}


function alternarModalRegistro() {
    $("#modal-registro").toggle();
}