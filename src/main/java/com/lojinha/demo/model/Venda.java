package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date; //calendariooooooooooooooooo viu marcio?
import java.util.List;
import java.sql.Statement;


public class Venda {
    private int id;
    private int usuario_id;
    private Date data_venda;
    private double valor_total;
    private String status;
    private String nome_produto;
    private int quantidade;
    private int produto_id;

public int getProduto_id() {
    return produto_id;
}

public void setProduto_id(int produto_id) {
    this.produto_id = produto_id;
}


    public String getNome_produto() {
        return nome_produto;
    }
    
    public void setNome_produto(String nome_produto) {
        this.nome_produto = nome_produto;
    }
    
    public int getQuantidade() {
        return quantidade;
    }
    
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(int usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Date getData_venda() {
        return data_venda;
    }

    public void setData_venda(Date data_venda) {
        this.data_venda = data_venda;
    }

    public double getValor_total() {
        return valor_total;
    }

    public void setValor_total(double valor_total) {
        this.valor_total = valor_total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void salvar() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO vendas_usuario (usuario_id, data_venda, valor_total, status, nome_produto, quantidade) VALUES (?, ?, ?, ?, ?, ?)";
    
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setInt(1, this.usuario_id);
            pstmt.setDate(2, new java.sql.Date(this.data_venda.getTime()));
            pstmt.setDouble(3, this.valor_total);
            pstmt.setString(4, this.status);
            pstmt.setString(5, this.nome_produto);
            pstmt.setInt(6, this.quantidade);
            pstmt.executeUpdate();
            
            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                this.id = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    
    public static List<Venda> getByUsuario(int usuarioId) {
        List<Venda> vendas = new ArrayList<>();
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        
        String sql = "SELECT * FROM vendas_usuario WHERE usuario_id = ?";
        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, usuarioId);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                Venda venda = new Venda();
                venda.setId(rs.getInt("id"));
                venda.setUsuario_id(rs.getInt("usuario_id"));
                venda.setData_venda(rs.getDate("data_venda"));
                venda.setValor_total(rs.getDouble("valor_total"));
                venda.setStatus(rs.getString("status"));
                venda.setNome_produto(rs.getString("nome_produto"));
                venda.setQuantidade(rs.getInt("quantidade"));
                vendas.add(venda);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return vendas;
    }

    public void load() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "SELECT * FROM vendas_usuario WHERE id = ?";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, this.id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                this.setUsuario_id(rs.getInt("usuario_id"));
                this.setData_venda(rs.getDate("data_venda"));
                this.setValor_total(rs.getDouble("valor_total"));
                this.setStatus(rs.getString("status"));
                this.setNome_produto(rs.getString("nome_produto"));
                this.setQuantidade(rs.getInt("quantidade"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void update() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "UPDATE vendas_usuario SET status = ? WHERE id = ?";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setString(1, this.status);
            pstmt.setInt(2, this.id);
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected == 0) {
                throw new SQLException("Venda não encontrada para atualização");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao atualizar status da venda");
        }
    }

    public static List<Venda> getAll() {
        List<Venda> vendas = new ArrayList<>();
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        
        String sql = "SELECT * FROM vendas_usuario";
        
        try {
            Statement st = (Statement) dbConn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()) {
                Venda venda = new Venda();
                venda.setId(rs.getInt("id"));
                venda.setUsuario_id(rs.getInt("usuario_id"));
                venda.setData_venda(rs.getDate("data_venda"));
                venda.setValor_total(rs.getDouble("valor_total"));
                venda.setStatus(rs.getString("status"));
                venda.setNome_produto(rs.getString("nome_produto"));
                venda.setQuantidade(rs.getInt("quantidade"));
                vendas.add(venda);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vendas;
    }
    
    
}
