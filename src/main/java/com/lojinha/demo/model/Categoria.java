package com.lojinha.demo.model;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

        // Certifique-se de que dbConn não é nulo
        if (dbConn == null) {
            throw new RuntimeException("Falha ao conectar ao banco de dados");
        }

        String sql = "UPDATE categoria SET descricao = ? WHERE id = ?";

        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);

            pstmt.setString(1, this.descricao); // Nome atualizado
            pstmt.setInt(2, this.id); // ID do usuário a ser atualizado

            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected == 0) {
                System.out.println("Nenhum usuário encontrado com o ID: " + this.id);
            } else {
                System.out.println("Usuário atualizado com sucesso.");
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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }
}

