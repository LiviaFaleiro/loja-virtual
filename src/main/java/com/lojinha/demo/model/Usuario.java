package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Usuario {
    private String nome;
    private String email;
    private String senha;

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void insert() {
        Conexao c = new Conexao();
        Connection dbConn = (Connection) c.getConexao();

        String sql = "INSERT INTO usuario "+
        "(nome, email, senha) "+
        "VALUES (?, ?, ?)";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);

            pstmt.setString(1, this.nome);
            pstmt.setString(2, this.email);
            pstmt.setString(3, this.senha);

            pstmt.executeUpdate();

    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
}
