package com.lojinha.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lojinha.demo.model.Venda;
import com.lojinha.demo.model.Carrinho;
import com.lojinha.demo.model.Conexao;
import com.lojinha.demo.model.ItemVenda;
import com.lojinha.demo.model.Produto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class VendaController {
    
    @PostMapping("/venda/finalizar")
public Venda finalizarCompra(@RequestBody Venda venda) {
    ArrayList<Carrinho> itensCarrinho = Carrinho.getByUsuario(venda.getUsuario_id());
    
    if (!itensCarrinho.isEmpty()) {
        Carrinho primeiroItem = itensCarrinho.get(0);
        Produto produto = Produto.getById(primeiroItem.getProduto_id());
        venda.setNome_produto(produto.getNome());
        venda.setQuantidade(primeiroItem.getQuantidade());
        venda.setProduto_id(produto.getId());
    }
    
    venda.salvar();  // Save venda first to get its ID
    
    for (Carrinho item : itensCarrinho) {
        ItemVenda itemVenda = new ItemVenda();
        Produto produtoItem = Produto.getById(item.getProduto_id());
        itemVenda.setProduto_id(item.getProduto_id());
        itemVenda.setVenda_id(venda.getId());  // Now we have the venda ID
        itemVenda.setValor(produtoItem.getValor());
        itemVenda.setQuantidade(item.getQuantidade());
        itemVenda.setDevolucao(false);
        itemVenda.salvar();
        item.delete();
    }
    
    return venda;
}


    @GetMapping("/vendas/usuario/{id}")
public List<Venda> getVendasByUsuario(@PathVariable int id) {
    return Venda.getByUsuario(id);
}

@PostMapping("/vendas/cancelar/{id}")
public ResponseEntity<?> cancelarPedido(@PathVariable int id, @RequestBody Map<String, Integer> body) { //pega o id do pedido
    try { 
        Venda venda = new Venda(); //cria objeto novo venda
        venda.setId(id); //seta id do pedido
        venda.load(); //carrega os dados da venda
        
        if ("CANCELADO".equals(venda.getStatus())) { //checa se o pedido já está cancelado
            return ResponseEntity.badRequest().body(Map.of("tudo certo", false, "message", "Pedido já está cancelado")); //retorna erro
        }
        
        venda.setStatus("CANCELADO"); //seta status da venda para cancelado
        venda.update(); //faz update no banco com a graça de deus
        
        String sql = "INSERT INTO pedidos_cancelados (venda_id, usuario_id, nome_produto, valor_total) VALUES (?, ?, ?, ?)"; //insert em pedidos_cancelados 
        
        try (Connection conn = new Conexao().getConexao();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.setInt(2, body.get("usuario_id"));
            stmt.setString(3, venda.getNome_produto());
            stmt.setDouble(4, venda.getValor_total());
            stmt.executeUpdate();
            
            return ResponseEntity.ok().body(Map.of("tudo certo gracas a deus", true));
        }
    } catch (Exception e) { //se erro
        e.printStackTrace();
        return ResponseEntity.status(500).body( "Erro ao processar cancelamento");
    }
}

@GetMapping("/vendas/todas") //getAll de toodas as vendas 
public List<Venda> getAllVendas() {
    return Venda.getAll();
}

@PostMapping("/vendas/enviar/{id}") //enviar pedido tipo
public ResponseEntity<?> enviarPedido(@PathVariable int id) {
    try {
        Venda venda = new Venda(); //nova instancia da venda
        venda.setId(id);
        venda.load(); //carrega os dados da venda com base na id
        venda.setStatus("Produto Enviado"); //faz o update do status da venda/compra/pedido 
        venda.update();
        return ResponseEntity.ok().body(Map.of("tudo certo", true)); //retorna um json com a mensagem de que tudo certo
    } catch (Exception e) { //se der erro, retorna um json com a mensagem de erro
        e.printStackTrace(); //imprime o erro no console
        return ResponseEntity.status(500).body("Erro enviar"); //retorna um json com a mensagem de erro
    }
}
 
@PostMapping("/vendas/confirmar/{id}")  //confirmar entrega
public ResponseEntity<?> confirmarEntrrga(@PathVariable int id) {
    try { 
        Venda venda = new Venda(); //nova instancia da venda
        venda.setId(id); 
        venda.load(); //carrega os dados da venda com base na id
        venda.setStatus("Pedido Entregue"); //faz o update do status da venda
        venda.update(); //faz o update no banco de dados
        return ResponseEntity.ok().body(Map.of("tudo certo", true)); 
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Erro confirmar");
    }
}

@PostMapping("/vendas/devolucao/{id}") //solicitar devolução
@CrossOrigin(origins = "*")
public ResponseEntity<?> solicitarDevolucao(@PathVariable int id, @RequestBody Map<String, String> body) {
    try {
        Venda venda = new Venda(); //nova instancia da venda
        venda.setId(id);
        venda.load();
        venda.setStatus("Devolução Solicitada"); //faz o update do status da venda
        venda.update();

        String sql = "INSERT INTO devolucao (venda_id, usuario_id, justificativa, status) VALUES (?, ?, ?, ?)"; //insert em devolucao
        
        try (Connection conn = new Conexao().getConexao(); //conexao com o banco de dados
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.setInt(2, Integer.parseInt(body.get("usuario_id")));
            stmt.setString(3, body.get("justificativa")); //seta a justificativa da devolucao
            stmt.setString(4, "Pendente"); //seta o status da devolucao como pendente
            stmt.executeUpdate();
            
            return ResponseEntity.ok().body(Map.of("success", true));
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("success", false, "error", e.getMessage()));
    }
}
@GetMapping("/devolucoes") //pega todas as devolucoes
public List<Map<String, Object>> getDevolucoes() {
    Conexao c = new Conexao();
    List<Map<String, Object>> devolucoes = new ArrayList<>();  //cria uma lista para as devolucoes
    
    String sql = "SELECT d.*, v.valor_total FROM devolucao d " + 
                 "JOIN vendas_usuario v ON d.venda_id = v.id"; //pega todas as devolucoes
                 
    try (Connection conn = c.getConexao();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) { //loop para pegar todos os dados da devolucao
            Map<String, Object> devolucao = new HashMap<>(); //cria um mapa para cada devolucao
            devolucao.put("id", rs.getInt("id")); //pega o id da devolucao
            devolucao.put("usuario_id", rs.getInt("usuario_id")); //pega o id do usuario
            devolucao.put("venda_id", rs.getInt("venda_id")); //pega o id da venda
            devolucao.put("justificativa", rs.getString("justificativa")); //pega a justificativa
            devolucao.put("status", rs.getString("status")); //pega o status
            devolucao.put("data_solicitacao", rs.getTimestamp("data_solicitacao")); //pega a data da solicitacao
            devolucao.put("valor_total", rs.getDouble("valor_total")); //pega o valor total
            devolucoes.add(devolucao); //adiciona a devolucao no mapa
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return devolucoes;
}

@PostMapping("/vendas/aprovarD/{id}")   //aprovar devolucao
public ResponseEntity<?> aprovarDevolucao(@PathVariable int id) { //id da devolucao
    try {
        Connection conn = new Conexao().getConexao(); //conexao com o banco de dados
        
        // Get venda_id
        String sqlGetVendaId = "SELECT venda_id FROM devolucao WHERE id = ?";
        PreparedStatement stmt = conn.prepareStatement(sqlGetVendaId); //prepara a consulta
        stmt.setInt(1, id); //seta o valor do parametro
        ResultSet rs = stmt.executeQuery(); //executa a consulta
        
        if (rs.next()) { //se tiver resultado
            int vendaId = rs.getInt("venda_id"); //pega o id da venda
            
            // Update devolucao status
            stmt = conn.prepareStatement("UPDATE devolucao SET status = 'Devolução Aprovada' WHERE id = ?"); //prepara a consulta
            stmt.setInt(1, id); //seta o valor do parametro
            stmt.executeUpdate(); //executa a consulta
            
            // Update venda status
            stmt = conn.prepareStatement("UPDATE vendas_usuario SET status = 'Devolução Aprovada' WHERE id = ?"); //prepara a consulta
            stmt.setInt(1, vendaId); //seta o valor do parametro
            stmt.executeUpdate(); //executa a consulta  
        }
        
        return ResponseEntity.ok().body(Map.of("success", true)); //retorna um json com a mensagem de sucesso
    } catch (Exception e) { //se der erro
        e.printStackTrace(); //imprime o erro
        return ResponseEntity.status(500).body("Erro ao aprovar devolução"); //retorna um json com a mensagem de erro
    }
}

@PostMapping("/vendas/recusarD/{id}")  
public ResponseEntity<?> recusarDevolucao(@PathVariable int id) {
    try {
        Connection conn = new Conexao().getConexao();
        
        // Get venda_id
        String sqlGetVendaId = "SELECT venda_id FROM devolucao WHERE id = ?";
        PreparedStatement stmt = conn.prepareStatement(sqlGetVendaId);
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();
        
        if (rs.next()) {
            int vendaId = rs.getInt("venda_id");
            
            // Update devolucao status
            stmt = conn.prepareStatement("UPDATE devolucao SET status = 'Devolução Recusada' WHERE id = ?");
            stmt.setInt(1, id);
            stmt.executeUpdate();
            
            // Update venda status
            stmt = conn.prepareStatement("UPDATE vendas_usuario SET status = 'Devolução Recusada' WHERE id = ?");
            stmt.setInt(1, vendaId);
            stmt.executeUpdate();
        }
        
        return ResponseEntity.ok().body(Map.of("success", true));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Erro ao recusar devolução");
    }
}
@PostMapping("/vendas/atualizarStatus/{id}")
public ResponseEntity<?> atualizarStatusVenda(@PathVariable int id, @RequestBody Map<String, String> body) {
    try {
        Venda venda = new Venda();
        venda.setId(id);
        venda.load();
        venda.setStatus(body.get("status"));
        venda.update();
        return ResponseEntity.ok().body(Map.of("success", true));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("success", false, "error", e.getMessage()));
    }
}
@GetMapping("/item-venda/{vendaId}")
public ResponseEntity<ItemVenda> getItemVenda(@PathVariable int vendaId) {
    System.out.println("Fetching ItemVenda for vendaId: " + vendaId);
    ItemVenda itemVenda = ItemVenda.getByVendaId(vendaId);
    System.out.println("Found ItemVenda: " + itemVenda);
    return ResponseEntity.ok(itemVenda);
}



}