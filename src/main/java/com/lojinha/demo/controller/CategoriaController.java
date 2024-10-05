package com.lojinha.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lojinha.demo.model.Categoria;

@RestController
public class CategoriaController {

    @PostMapping("/categoria/criar")
    public Categoria cadastrar(Categoria categoria) {
        categoria.insert();
        return categoria;
    }

    @PostMapping("/categoria/atualizar")
    public Categoria atualizar(Categoria categoria) {
        categoria.update();
        return categoria;
    }

    @PostMapping("/categoria/excluir")
    public Categoria excluir(Categoria categoria) {
        categoria.delete();
        return categoria;
    }

    @GetMapping("/categoria/pegar")
    public List<Categoria> getAllCategoria() {
        return Categoria.getAll();
    }
}
