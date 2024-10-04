package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.lojinha.demo.model.Usuario;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class UsuarioController {

    @PostMapping("/usuario/criar")
    public Usuario create(Usuario usuario) {

        usuario.insert();
        return usuario;

    }

    @PostMapping("/usuario/mudar")
    public Usuario mudar(Usuario usuario) {
        usuario.update();
        return usuario;
    }

    @PostMapping("/usuario/excluir")
    public Usuario exclui(Usuario usuario) {
        usuario.delete();
        return usuario;
    }

    @GetMapping("/usuario/pegar")
    public List<Usuario> getAllUsuarios() {
        return Usuario.getAll();
    }

}
