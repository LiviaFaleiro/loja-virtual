package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.lojinha.demo.model.Usuario;

import java.util.HashMap;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UsuarioController {
    @PostMapping("/usuario")
    public  Usuario create(Usuario usuario){
       
        usuario.insert();
        return usuario;

    }

    @PostMapping("/usuario/update")
    public Usuario update(Usuario usuario) {
        
        usuario.update();
        return usuario;
    }
    

}
