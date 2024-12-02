package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemVenda {
    private int id;
    private int produto_id;
    private int venda_id;
    private double valor;
    private int quantidade;
    private boolean devolucao;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getProduto_id() { return produto_id; }
    public void setProduto_id(int produto_id) { this.produto_id = produto_id; }
    
    public int getVenda_id() { return venda_id; }
    public void setVenda_id(int venda_id) { this.venda_id = venda_id; }
    
    public double getValor() { return valor; }
    public void setValor(double valor) { this.valor = valor; }
    
    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    
    public boolean isDevolucao() { return devolucao; }
    public void setDevolucao(boolean devolucao) { this.devolucao = devolucao; }

    public void salvar() {
        String sql = "INSERT INTO item_venda (produto_id, venda_id, valor, quantidade, devolucao) VALUES (?, ?, ?, ?, ?)";
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setInt(1, this.produto_id);
            pstmt.setInt(2, this.venda_id);
            pstmt.setDouble(3, this.valor);
            pstmt.setInt(4, this.quantidade);
            pstmt.setBoolean(5, this.devolucao);
            pstmt.executeUpdate();
            
            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                this.id = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static ItemVenda getByVendaId(int vendaId) {
        String sql = "SELECT * FROM item_venda WHERE venda_id = ?";
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, vendaId);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                ItemVenda itemVenda = new ItemVenda();
                itemVenda.setId(rs.getInt("id"));
                itemVenda.setProduto_id(rs.getInt("produto_id"));
                itemVenda.setVenda_id(rs.getInt("venda_id"));
                itemVenda.setValor(rs.getDouble("valor"));
                itemVenda.setQuantidade(rs.getInt("quantidade"));
                itemVenda.setDevolucao(rs.getBoolean("devolucao"));
                return itemVenda;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    

    
}
