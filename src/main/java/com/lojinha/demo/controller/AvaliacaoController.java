package com.lojinha.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lojinha.demo.model.Avaliacao;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AvaliacaoController {

@PostMapping("/vendas/avaliar/{id}")
public ResponseEntity<?> avaliarProduto(@PathVariable int id, @RequestBody Avaliacao avaliacao) {
    try {
        avaliacao.setData_avaliacao(LocalDateTime.now());
        avaliacao.criar();
        return ResponseEntity.ok().body(Map.of("success", true));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("success", false, "error", e.getMessage()));
    }
}

    
@GetMapping("/avaliacoes/{produtoId}")
public List<Avaliacao> getAvaliacoesProduto(@PathVariable int produtoId) {
    try {
        List<Avaliacao> avaliacoes = Avaliacao.buscarPorProduto(produtoId);
        System.out.println("Found reviews: " + avaliacoes.size());
        return avaliacoes;
    } catch (Exception e) {
        e.printStackTrace();
        return new ArrayList<>();
    }
}
@PostMapping("/avaliacao/atualizar")
public ResponseEntity<?> atualizarAvaliacao(@RequestBody Avaliacao avaliacao) {
    try {
        avaliacao.setData_avaliacao(LocalDateTime.now());
        avaliacao.update();
        return ResponseEntity.ok().body(Map.of("success", true, "id_produto", avaliacao.getProduto_id()));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("success", false));
    }
}

@DeleteMapping("/avaliacao/excluir/{id}") 
public ResponseEntity<?> excluirAvaliacao(@PathVariable int id) { //pega o id da avaliação
    try {
        Avaliacao.excluir(id); //invoca o metodo excluir do avaliacao.java
        return ResponseEntity.ok().body(Map.of("success", true)); //se der certo retorna http  200 ok sucesso = true
    } catch (Exception e) { //se der errado retorna 500 erro
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("success", false)); //flase erro
    }
}



}