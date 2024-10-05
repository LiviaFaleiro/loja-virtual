package com.lojinha.demo.model;

import javax.swing.Spring;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Produto {
    private int id;
    private double valor;
    private String nome;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void insert() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO produto (nome, valor) VALUES (?, ?)";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, this.nome);
            pstmt.setDouble(2, this.valor);

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
            throw new RuntimeException("Falha ao conectar ao banco de dados.");
        }

        Produto produtoExistente = findById(this.id);
        if (produtoExistente == null) {
            throw new RuntimeException("Produto com ID " + this.id + " não encontrado.");
        }


        if (this.nome == null || this.nome.isEmpty()) {
            this.nome = produtoExistente.getNome();
        }
        if (this.valor == 0) { 
            this.valor = produtoExistente.getValor();
        }

        String sql = "UPDATE produto SET nome = ?, valor = ? WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {
            pstmt.setString(1, this.nome);
            pstmt.setDouble(2, this.valor);
            pstmt.setInt(3, this.id);

            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void delete() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        String sql = "DELETE FROM produto WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {
            pstmt.setInt(1, this.id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Produto findById(int id) {
        Produto produto = null;
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        if (dbConn == null) {
            throw new RuntimeException("Falha ao conectar ao banco de dados.");
        }

        String sql = "SELECT id, nome, valor FROM produto WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                produto = new Produto();
                produto.setId(rs.getInt("id"));
                produto.setNome(rs.getString("nome"));
                produto.setValor(rs.getDouble("valor"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return produto;
    }

      public static List<Produto> getAll() {
        List<Produto> produtos = new ArrayList<>();
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();


        String sql = "SELECT id, nome, valor FROM produto";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery();


            while (rs.next()) {
                Produto produto = new Produto();
                produto.setId(rs.getInt("id"));
                produto.setNome(rs.getString("nome"));
                produto.setValor(rs.getDouble("valor"));
                produtos.add(produto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }


        return produtos;
    }
    


}
