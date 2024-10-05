package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import java.sql.ResultSet;

public class Usuario {
    private String nome;
    private String email;
    private String senha;
    private int id;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void insert() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, this.nome);
            pstmt.setString(2, this.email);
            pstmt.setString(3, this.senha);
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
    
   
        Usuario usuarioExistente = Usuario.findById(this.id);
        if (usuarioExistente == null) {
            throw new RuntimeException("Usuário com ID " + this.id + " não encontrado.");
        }
    
     
        if (this.nome == null || this.nome.isEmpty()) {
            this.nome = usuarioExistente.getNome();
        }
        if (this.email == null || this.email.isEmpty()) {
            this.email = usuarioExistente.getEmail();
        }
        if (this.senha == null || this.senha.isEmpty()) {
            this.senha = usuarioExistente.getSenha();
        }
    
        String sql = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
    
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
    
            pstmt.setString(1, this.nome);
            pstmt.setString(2, this.email);
            pstmt.setString(3, this.senha);
            pstmt.setInt(4, this.id);
    
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
        Connection dbConn = (Connection) c.getConexao();

        String sql = "DELETE FROM usuario WHERE id = ?";

        try (PreparedStatement pstmt = dbConn.prepareStatement(sql)) {

            pstmt.setInt(1, this.id);

            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static List<Usuario> getAll() {
        List<Usuario> usuarios = new ArrayList<>();
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        String sql = "SELECT id, nome, email, senha FROM usuario";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setNome(rs.getString("nome"));
                usuario.setEmail(rs.getString("email"));
                usuario.setSenha(rs.getString("senha"));
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return usuarios;
    }

   
    public static Usuario findById(int id) {
        Usuario usuario = null; 
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
    
        if (dbConn == null) {
            throw new RuntimeException("Falha ao conectar ao banco de dados.");
        }
    
        String sql = "SELECT id, nome, email, senha FROM usuario WHERE id = ?";
    
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, id); 
    
            ResultSet rs = pstmt.executeQuery();
    
      
            if (rs.next()) {
                usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setNome(rs.getString("nome"));
                usuario.setEmail(rs.getString("email"));
                usuario.setSenha(rs.getString("senha"));
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao buscar usuário por ID.", e);
        }
    
        return usuario;
    }
    

}
