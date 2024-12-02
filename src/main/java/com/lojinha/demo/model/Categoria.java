package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Categoria {

    private int id;
    private String nome;
    private ArrayList<Produto> produtos;

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

    public ArrayList<Produto> getProdutos() {
        if (this.produtos == null) {
       
        }
        return produtos;
    }

    public void setProdutos(ArrayList<Produto> produtos) {
        this.produtos = produtos;
    }

    public void salvar() {
        Conexao c = new Conexao();
        Connection dbCon = c.getConexao();

        String sql = "INSERT INTO categoria (nome) VALUES (?)";

        try {
            PreparedStatement stmt = dbCon.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, this.getNome());
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                this.id = rs.getInt(1);
            }

          
            for (Produto produto : this.produtos) {
        
                String sqlInsertCategoriaProduto = "INSERT INTO categoria_produto (categoria_id, produto_id) VALUES (?, ?)";
                PreparedStatement stmtCategoriaProduto = dbCon.prepareStatement(sqlInsertCategoriaProduto);
                stmtCategoriaProduto.setInt(1, this.id); // id da categoria
                stmtCategoriaProduto.setInt(2, produto.getId()); // id do produto
                stmtCategoriaProduto.executeUpdate();
            }

        } catch (Exception e) {
            System.out.println("Problema na inserção de uma Categoria");
            e.printStackTrace();
        }
    }

    public void update() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
    
        String sql = "UPDATE categoria SET nome = ? WHERE id = ?";
    
        try {
            PreparedStatement ps = dbConn.prepareStatement(sql);
            ps.setString(1, this.nome);
            ps.setInt(2, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    

    public void delete() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();

        String sql = "DELETE FROM categoria WHERE id = ?";
        try {
            PreparedStatement ps = dbConn.prepareStatement(sql);
            ps.setInt(1, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

   

    public void load() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "SELECT * FROM produto WHERE id = ?";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, this.id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                this.setNome(rs.getString("nome"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static ArrayList<Categoria> getAll() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        ArrayList<Categoria> categorias = new ArrayList<>();

        String sql = "SELECT * FROM categoria";
        try {
            Statement st = dbConn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Categoria categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setNome(rs.getString("nome"));
                categorias.add(categoria);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return categorias;
    }

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", nome=" + nome + "]";
    }

}

