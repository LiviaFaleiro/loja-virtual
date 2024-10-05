package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Categoria {
    private int id;
    private String descricao;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void insert() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO categoria (descricao) VALUES (?)";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, this.descricao);

            pstmt.executeUpdate();
            ResultSet generatedKeys = pstmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                this.id = generatedKeys.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
    
        if (dbConn == null) {
            throw new RuntimeException("Falha ao conectar ao banco de dados");
        }
    
 
        Categoria categoriaExistente = findById(this.id);
        if (categoriaExistente == null) {
            throw new RuntimeException("Categoria com ID " + this.id + " não encontrada.");
        }
    

        if (this.descricao == null || this.descricao.isEmpty()) {
            this.descricao = categoriaExistente.getDescricao(); // Mantém o valor atual
        }
    
        String sql = "UPDATE categoria SET descricao = ? WHERE id = ?";
    
        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {
            pstmt.setString(1, this.descricao);
            pstmt.setInt(2, this.id);
    
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected == 0) {
                System.out.println("Nenhuma categoria encontrada com o ID: " + this.id);
            } else {
                System.out.println("Categoria atualizada com sucesso.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    

    public void delete() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        String sql = "DELETE FROM categoria WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {
            pstmt.setInt(1, this.id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static List<Categoria> getAll() {
        List<Categoria> categorias = new ArrayList<>();
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        
        String sql = "SELECT id, descricao FROM categoria";
        
        try (PreparedStatement pstmt = dbConn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                Categoria categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setDescricao(rs.getString("descricao"));
                categorias.add(categoria);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return categorias;
    }

    public static Categoria findById(int id) {
        Categoria categoria = null;
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        if (dbConn == null) {
            throw new RuntimeException("Falha ao conectar ao banco de dados.");
        }

        String sql = "SELECT id, descricao FROM categoria WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setDescricao(rs.getString("descricao"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return categoria;
    }
}
