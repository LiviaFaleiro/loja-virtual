package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.ArrayList;
import java.sql.ResultSet;

public class Usuario {
    private int id;
    private String nome;
    private String email;
    private String senha;
    private String tipo;

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void salvar() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";

        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, this.nome);
            pstmt.setString(2, this.email);
            pstmt.setString(3, this.senha);
            pstmt.setString(4, this.tipo); // Certifique-se de ter o atributo 'tipo' na classe Usuario

            pstmt.executeUpdate();
            ResultSet generatedKeys = pstmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                this.id = generatedKeys.getInt(1);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao inserir no banco de dados:");
            System.err.println("Mensagem de erro: " + e.getMessage());
            System.err.println("SQL State: " + e.getSQLState());
            System.err.println("Código de erro: " + e.getErrorCode());
            e.printStackTrace();
        }
        
    }


    public void update(){  
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        String sql = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";

        try {
            PreparedStatement  ps = dbConn.prepareStatement(sql);
            ps.setString(1, this.nome);
            ps.setString(2, this.email);
            ps.setString(3, this.senha);
            ps.setInt(4, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void delete(){   
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        String sql = "DELETE FROM usuario WHERE id = ?";
        try {
            PreparedStatement  ps = dbConn.prepareStatement(sql);
            ps.setInt(1, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void load(){
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "SELECT * FROM usuario WHERE id = ?";
        try {
            PreparedStatement  ps = dbConn.prepareStatement(sql);
            ps.setInt(1, this.id);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                this.nome = rs.getString("nome");
                this.email = rs.getString("email");
                this.senha = rs.getString("senha");
                this.tipo = rs.getString("tipo");

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static ArrayList<Usuario> getAll(){
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        ArrayList<Usuario> usuarios = new ArrayList<>();
    
        String sql = "SELECT * FROM usuario";
        try {
            Statement st = dbConn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                Usuario usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setNome(rs.getString("nome"));
                usuario.setEmail(rs.getString("email"));
                usuario.setSenha(rs.getString("senha"));
                usuario.setTipo(rs.getString("tipo")); // Configura o tipo
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }
    

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", nome=" + nome + "email=" + email + "senha=" + senha + "]";
    }

    public void updateSenha() { // atualiza senha (admin)
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "UPDATE usuario SET senha = ? WHERE id = ?";
        
        try {
            PreparedStatement ps = dbConn.prepareStatement(sql);
            ps.setString(1, this.senha);
            ps.setInt(2, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
}
