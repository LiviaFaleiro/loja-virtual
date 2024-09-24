package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.lojinha.demo.model.Usuario;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UsuarioController {
   
    @PostMapping("/usuario")
    public Usuario cadastrar(Usuario usuario){
        usuario.insert();
        return usuario;

    }
}
