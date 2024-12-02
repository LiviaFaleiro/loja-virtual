package com.lojinha.demo.controller;

import org.springframework.web.bind.annotation.*;
import com.lojinha.demo.model.Carrinho;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
public class CarrinhoController {
    
    @PostMapping("/carrinho/adicionar")
    public Carrinho adicionar(Carrinho novoItem) {
        Carrinho itemExistente = Carrinho.finByUsuario_Produto(novoItem.getUsuario_id(), novoItem.getProduto_id());
        
        if (itemExistente != null) {
            itemExistente.setQuantidade(itemExistente.getQuantidade() + 1);
            itemExistente.updateQuantidade();
            return itemExistente;
        } else {
            novoItem.setQuantidade(1);
            novoItem.salvar();
            return novoItem;
        }
    }
    
    @GetMapping("/carrinho/usuario/{usuarioId}")
    public ArrayList<Carrinho> getCarrinhoUsuario(@PathVariable int usuarioId) {
        return Carrinho.getByUsuario(usuarioId);
    }

@PostMapping("/carrinho/deletar")
public Carrinho deletar(Carrinho carrinho) {
    carrinho.delete();
    return carrinho;
}
}
