package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.DriverManager;


public class Conexao {
    private String banco = "lojinha";
    private String usuario = "root";
    private String senha = "";

    public Connection getConexao(){
        String stringDeConexao = "jdbc:mysql://localhost:3306/" + banco;
        Connection conexao = null;
        try {
             conexao = DriverManager.getConnection(stringDeConexao, usuario, senha);
        } catch (Exception e) {
            System.out.println("Erro ao conectar com o banco de dados");
            e.printStackTrace();
        }
        return conexao;
    }
}

