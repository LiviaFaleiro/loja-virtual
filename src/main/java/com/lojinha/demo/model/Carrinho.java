package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Carrinho {
    private int id;
    private int usuario_id;
    private int produto_id;
    private int quantidade;
    private double valor;
    
    public double getValor() {
        return valor;
    }
    
    public void setValor(double valor) {
        this.valor = valor;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getUsuario_id() { return usuario_id; }
    public void setUsuario_id(int usuario_id) { this.usuario_id = usuario_id; }
    
    public int getProduto_id() { return produto_id; }
    public void setProduto_id(int produto_id) { this.produto_id = produto_id; }
    
    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }

    public void salvar() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)";

        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setInt(1, this.usuario_id);
            pstmt.setInt(2, this.produto_id);
            pstmt.setInt(3, this.quantidade);
            pstmt.executeUpdate();
            
            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                this.id = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static ArrayList<Carrinho> getByUsuario(int usuarioId) {
        ArrayList<Carrinho> itensCarrinho = new ArrayList<>();
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        
        String sql = "SELECT * FROM carrinho WHERE usuario_id = ?";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, usuarioId);
            ResultSet rs = pstmt.executeQuery();
            
            while(rs.next()) {
                Carrinho item = new Carrinho();
                item.setId(rs.getInt("id"));
                item.setUsuario_id(rs.getInt("usuario_id"));
                item.setProduto_id(rs.getInt("produto_id"));
                item.setQuantidade(rs.getInt("quantidade"));
                itensCarrinho.add(item);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return itensCarrinho;
    }

    public static Carrinho finByUsuario_Produto(int usuarioId, int produtoId) {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "SELECT * FROM carrinho WHERE usuario_id = ? AND produto_id = ?";
        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, usuarioId);
            pstmt.setInt(2, produtoId);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                Carrinho item = new Carrinho();
                item.setId(rs.getInt("id"));
                item.setUsuario_id(rs.getInt("usuario_id"));
                item.setProduto_id(rs.getInt("produto_id"));
                item.setQuantidade(rs.getInt("quantidade"));
                return item;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public void updateQuantidade() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "UPDATE carrinho SET quantidade = ? WHERE id = ?";
        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, this.quantidade);
            pstmt.setInt(2, this.id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    

public void delete() {
    Conexao c = new Conexao();
    Connection dbConn = c.getConexao();
    String sql = "DELETE FROM carrinho WHERE id = ?";
    
    try {
        PreparedStatement pstmt = dbConn.prepareStatement(sql);
        pstmt.setInt(1, this.id);
        pstmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
    }
}

}
