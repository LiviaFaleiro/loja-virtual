let usuarios = [];
        
$.get("http://localhost:8080/usuario/pegar", geraTabela);



//Função que popula gera ou modifca a tabela
function geraTabela(retorno){
    usuarios = retorno; //Hospedes é uma variavel global
    (new DataTable('#tabelao')).destroy();

    $("#tabela").html(""); //Limpa a tabela

    for(let i in retorno){
        $("#tabela").append(`<tr>
                                <td>${retorno[i].nome}</td>
                                <td>${retorno[i].email}</td>
                                 <td>${retorno[i].senha}</td>
                                <td>
                                    <button
                                        onclick="editar(${retorno[i].id})"
                                    >Editar</button> 
                                    <button 
                                        onclick="excluir(${retorno[i].id})">
                                        Apagar
                                    </button>
                                </td>
                            </tr>`);
    }
    new DataTable('#tabelao')
}
function editar(usuario){
    $(`#nome`).val(usuarios[usuario].nome);
    $(`#email`).val(usuarios[usuario].email);
    $(`#senha`).val(usuarios[usuario].senha);

    $(`#id`).val(usuarios[usuario].id);

    $("#enviar").hide();
    $("#editar").show();
}

function editarFim(){  

    let dados = $("#cadastro").serialize(); //Trnsforma um formulario em objeto
        //$.post(arg1, arg2, arg3) //arg1 = url, arg2 = dados, arg3 = função de retorno
        $.post(
                "http://localhost:8080/usuario/mudar", 
                dados, 
                geraTabela
            )
    $("#enviar").show();
    $("#editar").hide();

    $(`#nome`).val("");
    $(`#email`).val("");
    $(`#senha`).val("");

 }

    function cadastrar(){

        let dados = $("#cadastro").serialize(); //Trnsforma um formulario em objeto
        //$.post(arg1, arg2, arg3) //arg1 = url, arg2 = dados, arg3 = função de retorno
        $.post(
                "http://localhost:8080/usuario/criar", 
                dados, 
                geraTabela
            )
            $(`#nome`).val("");
            $(`#email`).val("");
            $(`#senha`).val("");
    }

    function excluir(id){
        $.post(
                "http://localhost:8080/usuario/excluir", 
                {"id":id}, 
                geraTabela
            )

    }


function usuario(){
    document.querySelector('.usuario').style.display="block"
    document.querySelector('.inicio').style.display="none"
}
