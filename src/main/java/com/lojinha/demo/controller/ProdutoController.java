package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lojinha.demo.model.Produto;

@RestController
public class ProdutoController {
    @PostMapping("/produto")
    public Produto cadastrar(Produto produto){
        produto.insert();
        return produto;

    }
}
