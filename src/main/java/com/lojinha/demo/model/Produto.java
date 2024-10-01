package com.lojinha.demo.model;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.swing.Spring;

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
        Connection dbConn = (Connection) c.getConexao();

        String sql = "INSERT INTO produto "+
        "(valor, nome) "+
        "VALUES (?, ?)";

        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);

            pstmt.setDouble(3, this.valor);
            pstmt.setString(2, this.nome);
         

            pstmt.executeUpdate();

    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update() {
        Conexao c = new Conexao();
        Connection dbConn = (Connection) c.getConexao();

        String sql = "UPDATE produto SET valor = ?, nome = ? WHERE id = ?";

        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);

            pstmt.setDouble(3, this.valor);
            pstmt.setString(2, this.nome);
            pstmt.setInt(1, this.id);
         

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


    
}
