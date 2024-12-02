package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lojinha.demo.model.CategoriaProduto;

@RestController
@CrossOrigin(origins = "*")
public class CategoriaProdutoController {
@PostMapping("/categoria-produto/cadastrar")
    public CategoriaProduto cadastrar(@RequestParam("categoria_id") int categoriaId,
                                    @RequestParam("produto_id") int produtoId) {
        CategoriaProduto categoriaProduto = new CategoriaProduto();
        categoriaProduto.setCategoriaId(categoriaId);
        categoriaProduto.setProdutoId(produtoId);
        categoriaProduto.salvar();
        return categoriaProduto;
    }
}
