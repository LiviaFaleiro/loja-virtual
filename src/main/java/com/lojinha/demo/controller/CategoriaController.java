package com.lojinha.demo.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lojinha.demo.model.Categoria;

@RestController
@CrossOrigin(origins = "*")
public class CategoriaController {

    private Categoria categoria;
   @PostMapping("categoria/cadastrar")
   public Categoria cadastrar(Categoria categoria) {
        categoria.salvar();
        return categoria;
   }
   
   @GetMapping("categorias")
   public ArrayList<Categoria> visualizar() {
        return Categoria.getAll(); 
   }

   @GetMapping("/categoria/{id}")
   public Categoria getOne(@PathVariable int id){
    if (this.categoria == null) {
        this.categoria = new Categoria();
    }
        this.categoria.setId(id);
        this.categoria.load();

        return this.categoria;
   }

   @PostMapping("/categoria/atualizar")
   public Categoria atualizar(Categoria categoria) {
       categoria.update();

       return categoria;
   }
   
   @PostMapping("/categoria/deletar")
   public Categoria deletar(Categoria categoria) {
       categoria.delete();

       return categoria;
   }

}
