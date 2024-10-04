package com.lojinha.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lojinha.demo.model.Produto;

@RestController
public class ProdutoController {

    @PostMapping("/produto/criar")
    public Produto cadastrar(Produto produto) {
        produto.insert();
        return produto;
    }

    @PostMapping("/produto/atualizar")
    public Produto atualizar(Produto produto) {
        // O método update agora atualizará apenas os campos fornecidos
        produto.update();
        return produto;
    }

    @PostMapping("/produto/excluir")
    public Produto excluir(Produto produto) {
        produto.delete();
        return produto;
    }

    @GetMapping("/produto/pegar")
    public List<Produto> getAllProduto() {
        return Produto.getAll();
    }
}
