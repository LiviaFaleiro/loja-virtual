package com.lojinha.demo.model;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CategoriaProduto {
    private int categoriaId;
    private int produtoId;

    public int getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(int categoriaId) {
        this.categoriaId = categoriaId;
    }

    public int getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(int produtoId) {
        this.produtoId = produtoId;
    }

    public void salvar() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO categoria_produto (categoria_id, produto_id) VALUES (?, ?)";
    
        try {
            dbConn.setAutoCommit(false);
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, this.categoriaId);
            pstmt.setInt(2, this.produtoId);
            pstmt.executeUpdate();
            dbConn.commit();
            
            System.out.println("Categoria_produto saved successfully - categoria_id: " + this.categoriaId + ", produto_id: " + this.produtoId);
        } catch (SQLException e) {
            System.err.println("Erro ao inserir no categoria_produto:");
            e.printStackTrace();
            try {
                dbConn.rollback();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        } finally {
            try {
                dbConn.setAutoCommit(true);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
}
