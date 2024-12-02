package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.lojinha.demo.model.Usuario;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioController {

    private Usuario usuario;

   @PostMapping("usuario/cadastrar")
   public Usuario cadastrar(Usuario usuario) {
        usuario.salvar();
        return usuario;
   }
   
   @GetMapping("usuarios")
   public ArrayList<Usuario> visualizar() {
        return Usuario.getAll(); 
   }

   @GetMapping("/usuario/{id}")
   public Usuario getOne(@PathVariable int id){
    if (this.usuario == null) {
        this.usuario = new Usuario();
    }
        this.usuario.setId(id);
        this.usuario.load();

        return this.usuario;
   }

   @PostMapping("/usuario/atualizar")
   public Usuario atualizar(Usuario usuario) {
       usuario.update();

       return usuario;
   }
   
   @PostMapping("/usuario/deletar")
   public Usuario deletar(Usuario usuario) {
       usuario.delete();

       return usuario;
   }

   @PostMapping("/usuario/alterarSenha") //para admin mudar senha
public Usuario alterarSenha(@RequestParam int id, @RequestParam String novaSenha) {
    Usuario usuario = new Usuario();
    usuario.setId(id);
    usuario.load();
    usuario.setSenha(novaSenha);
    usuario.updateSenha();
    return usuario;
}

}
