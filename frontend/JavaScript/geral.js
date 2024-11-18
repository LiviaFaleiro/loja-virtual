
const usuarios = [
    { usuario: "admin", senha: "123", tipo: "admin" },
];

const produtos = [];
let carrinho = []; 
var usuarioAtual = usuarioEncontrado;
var usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

function trocarUsuario(){
    $("#modal-login").show(); 
    $("#produtos").hide();
    $(".cabecalho").hide(); 
    $("#painel-admin").hide(); 
}

function verCarrinho(){ 
    document.getElementById('carrinho').style.display = 'block'
    $("#produtos").hide();
    $("#perfil-usuario").hide();
    $("#painel-admin").hide();
}

function telaPrincipal(){
     document.getElementById('carrinho').style.display = 'none'
     document.getElementById('produtos').style.display = 'block'
     $("#painel-admin").hide();
     $("#perfil-usuario").hide();
}





function painelPerfil(){
    $("#produtos").hide();
    $("#perfil-usuario").show();
}

function painelAdm(){
    $("#painel-admin").show();
    $("#produtos").hide();
    $("#carrinho").hide();
    renderizarUsuarios(); // Add this line
}


function voltar(){
    document.getElementById('perfil-usuario').style.display = 'none';
    document.getElementById('produtos').style.display = 'block';
    $("#painel-admin").hide();
    $("#carrinho").hide();
}

function login() {
    $("#modal-login").show();
    $("#modal-registro").hide();


}
function cadastro() {
    $("#modal-login").hide();
    $("#modal-registro").show();
}

