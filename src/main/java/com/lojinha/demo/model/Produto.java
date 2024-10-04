package com.lojinha.demo.model;

import javax.swing.Spring;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
        } catch (SQLException e)

        {
            e.printStackTrace();
        }
    }

    public void update() {
        Conexao c = new Conexao();
        Connection dbConn = (Connection) c.getConexao();

        String sql = "UPDATE produto SET valor = ?, nome = ? WHERE id = ?";

        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);

            pstmt.setDouble(1, this.valor);
            pstmt.setString(2, this.nome);
            pstmt.setInt(3, this.id);

            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void delete() {
        Conexao c = new Conexao();
        Connection dbConn = (Connection) c.getConexao();

        String sql = "DELETE FROM produto WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {

            pstmt.setInt(1, this.id);

            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static List<Produto> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }
}

