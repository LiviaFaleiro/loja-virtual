package com.lojinha.demo.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lojinha.demo.model.CategoriaProduto;
import com.lojinha.demo.model.Produto;

@RestController
@CrossOrigin(origins = "*")

public class ProdutoController {

  private Produto produto;
  
  @PostMapping("produto/cadastrar")
  public Produto cadastrar(@RequestParam("nome") String nome,
                          @RequestParam("valor") double valor,
                          @RequestParam("descricao") String descricao,
                          @RequestParam("categoria_id") int categoriaId) {
      Produto produto = new Produto();
      produto.setNome(nome);
      produto.setValor(valor);
      produto.setDescricao(descricao);
      produto.setCategoriaId(categoriaId);
      produto.salvar();
  
      // Create and save the categoria_produto relationship
      CategoriaProduto categoriaProduto = new CategoriaProduto();
      categoriaProduto.setCategoriaId(categoriaId);
      categoriaProduto.setProdutoId(produto.getId());
      categoriaProduto.salvar();
  
      produto.loadCategorias();
      return produto;
  }
  
  
   @GetMapping("produtos")
   public ArrayList<Produto> visualizar() {
        return Produto.getAll(); 
   }

   @GetMapping("/produto/{id}")
   public Produto getOne(@PathVariable int id){
    if (this.produto == null) {
        this.produto = new Produto();
    }
        this.produto.setId(id);
        this.produto.load();

        return this.produto;
   }

   @GetMapping("/produto/completo/{id}")
    public Produto getOneCompleto(@PathVariable int id) {
        Produto prod = new Produto();
        prod.setId(id);        
        prod.load();
        prod.loadCategorias();
        return prod;
    }

    @PostMapping("/produto/atualizar")
    public Produto atualizar(@RequestParam("id") int id,
                            @RequestParam("nome") String nome,
                            @RequestParam("valor") double valor,
                            @RequestParam("descricao") String descricao,
                            @RequestParam("categoria_id") int categoriaId) {
        Produto produto = new Produto();
        produto.setId(id);
        produto.setNome(nome);
        produto.setValor(valor);
        produto.setDescricao(descricao);
        produto.setCategoriaId(categoriaId);
        produto.update();
        return produto;
    }
    
    
    @PostMapping("/produto/deletar")
    public Produto deletar(@RequestParam("id") int id) {
        System.out.println("Deleting product with ID: " + id);
        Produto produto = new Produto();
        produto.setId(id);
        produto.delete();
        return produto;
    }
    
  


}
