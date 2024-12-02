const usuarios = [
   
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
    $("#carrinho").hide();
    $("#modal-compras").hide();
    $("#perfil-usuario").hide();
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
    carregarCategoriasParaFiltro();
}

function painelPerfil(){
    $("#produtos").hide();
    $("#perfil-usuario").show();
}

function painelAdm() {
    $("#painel-admin").show();
    $("#produtos").hide();
    $("#carrinho").hide();
    renderizarUsuarios();
    renderizarCategorias();
    renderizarProdutosAdmin();
    atualizarSelectCategorias();
    mostrarEstatisticasVendas();
    carregarDevolucoes();
}

function voltar(){
    document.getElementById('perfil-usuario').style.display = 'none';
    document.getElementById('produtos').style.display = 'block';
    $("#painel-admin").hide();
    $("#carrinho").hide();
    $("#modal-compras").hide();
    $("#modal-ver-avaliacoes").hide();
}

function login() {
    $("#modal-login").show();
    $("#modal-registro").hide();
    $("#carrinho").hide();
    $("#modal-compras").hide();


}
function cadastro() {
    $("#modal-login").hide();
    $("#modal-registro").show();
}
function minhasCompras(){
    $("#produtos").hide();
    $("#perfil-usuario").hide();
    $("#carrinho").hide();
    $("#modal-compras").show();
    carregarComprasUsuario();

}

function solicitarDevolucao(vendaId) {
    $("#venda-id-devolucao").val(vendaId);
    $("#modal-devolucao").show();
}

function fecharModalDevolucao() {
    $("#modal-devolucao").hide();
    $("#justificativa-devolucao").val('');
}