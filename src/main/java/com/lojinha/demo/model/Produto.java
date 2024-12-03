package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Produto {
    private int id;
    private double valor;
    private String nome;
    private ArrayList<Categoria> categorias = null;
    private String descricao;
    private int categoriaId;

    public int getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(int categoriaId) {
        this.categoriaId = categoriaId;
    }

    

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
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
        Connection dbCon = c.getConexao();
    
        String sql = "INSERT INTO produto (valor, nome, descricao, categoria_id) VALUES (?, ?, ?, ?)";
    
        try {
            PreparedStatement stmt = dbCon.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setDouble(1, this.valor);
            stmt.setString(2, this.nome);
            stmt.setString(3, this.descricao);
            stmt.setInt(4, this.categoriaId);
            stmt.executeUpdate();
    
            ResultSet rs = stmt.getGeneratedKeys();
            if(rs.next()) {
                this.id = rs.getInt(1);
                
                // Insert into categoria_produto with explicit transaction
                dbCon.setAutoCommit(false);
                String catSql = "INSERT INTO categoria_produto (categoria_id, produto_id) VALUES (?, ?)";
                PreparedStatement catStmt = dbCon.prepareStatement(catSql);
                catStmt.setInt(1, this.categoriaId);
                catStmt.setInt(2, this.id);
                catStmt.executeUpdate();
                dbCon.commit();
            }
        } catch(Exception e) {
            System.out.println("Erro ao inserir produto: " + e.getMessage());
            e.printStackTrace();
        }
    }

    
    public void update() {  
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
    
        String sql = "UPDATE produto SET valor = ?, nome = ?, descricao = ?, categoria_id = ? WHERE id = ?";
    
        try {
            PreparedStatement ps = dbConn.prepareStatement(sql);
            ps.setDouble(1, this.valor);
            ps.setString(2, this.nome);
            ps.setString(3, this.descricao);
            ps.setInt(4, this.categoriaId);
            ps.setInt(5, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void delete() {   
        Conexao c = new Conexao();
        Connection dbConn = null;
        try {
            dbConn = c.getConexao();
            dbConn.setAutoCommit(false);
            
            // First delete from categoria_produto
            String sqlCategoria = "DELETE FROM categoria_produto WHERE produto_id = ?";
            PreparedStatement psCategoria = dbConn.prepareStatement(sqlCategoria);
            psCategoria.setInt(1, this.id);
            psCategoria.executeUpdate();
    
            // Then delete from produto
            String sqlProduto = "DELETE FROM produto WHERE id = ?";
            PreparedStatement psProduto = dbConn.prepareStatement(sqlProduto);
            psProduto.setInt(1, this.id);
            psProduto.executeUpdate();
    
            dbConn.commit();
        } catch (SQLException e) {
            if (dbConn != null) {
                try {
                    dbConn.rollback();
                } catch (SQLException se) {
                    se.printStackTrace();
                }
            }
            throw new RuntimeException("Error deleting product: " + e.getMessage());
        } finally {
            if (dbConn != null) {
                try {
                    dbConn.close();
                } catch (SQLException se) {
                    se.printStackTrace();
                }
            }
        }
    }
    
    
   
    public ArrayList<Categoria> getCategorias() {
        if(this.categorias == null){//n+1
            this.loadCategorias();
         }
        return categorias;
    }

    public void setCategorias(ArrayList<Categoria> categorias) {
        this.categorias = categorias;
    }


    public void loadCategorias() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "SELECT c.id, c.nome FROM categoria_produto cp, categoria c WHERE cp.produto_id = ? AND cp.categoria_id = c.id";
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, this.id);  // id do produto
            ResultSet rs = pstmt.executeQuery();
            ArrayList<Categoria> categorias = new ArrayList<Categoria>();
            while (rs.next()) {
                Categoria categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setNome(rs.getString("nome"));
                categorias.add(categoria);
            }
           
            this.setCategorias(categorias);
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
            pstmt.setInt(1, this.id);  // define o ID do produto
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                // Carregar os dados do produto
                this.setNome(rs.getString("nome"));
                this.setDescricao(rs.getString("descricao"));
                this.setValor(rs.getDouble("valor"));
            }
    
            // Após carregar os dados do produto, carregar as categorias associadas
            this.loadCategorias();  // Chama o método para carregar as categorias do produto
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static ArrayList<Produto> getAll(){
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        ArrayList<Produto> produtos = new ArrayList<>();
    
        String sql = "SELECT * FROM produto";
        try {
            Statement st = dbConn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                Produto produto = new Produto();
                produto.setId(rs.getInt("id"));
                produto.setValor(rs.getDouble("valor"));
                produto.setNome(rs.getString("nome"));
                produto.setDescricao(rs.getString("descricao")); 
                produto.setCategoriaId(rs.getInt("categoria_id"));
                produtos.add(produto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return produtos;
    }
    
    public static Produto getById(int id) {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "SELECT * FROM produto WHERE id = ?";
        
        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql);
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                Produto produto = new Produto();
                produto.setId(rs.getInt("id"));
                produto.setNome(rs.getString("nome"));
                produto.setValor(rs.getDouble("valor"));
                produto.setDescricao(rs.getString("descricao"));
                return produto;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override //omg metodo toString
    public String toString() {
        return "Produto [id=" + id + ", nome=" + nome + "valor=" + nome +"descricao=" + descricao +  "]";
    }

}
