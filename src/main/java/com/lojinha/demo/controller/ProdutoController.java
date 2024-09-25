package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProdutoController {
    @PostMapping("/produto")
    public Produto cadastrar(Produto produto){
        produto.insert();
        return produto;

    }
}
