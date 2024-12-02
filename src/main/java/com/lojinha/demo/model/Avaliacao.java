package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Avaliacao {
    private int id;
    private int usuario_id;
    private String nome_usuario;
    private int produto_id;
    private LocalDateTime data_avaliacao;
    private String texto_avaliacao;
    private int nota;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getUsuario_id() {
        return usuario_id;
    }
    public void setUsuario_id(int usuario_id) {
        this.usuario_id = usuario_id;
    }
    public String getNome_usuario() {
        return nome_usuario;
    }
    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }
   public int getProduto_id() {
        return produto_id;
    }
    public void setProduto_id(int produto_id) {
        this.produto_id = produto_id;
    }
    public LocalDateTime getData_avaliacao() {
        return data_avaliacao;
    }
    public void setData_avaliacao(LocalDateTime data_avaliacao) {
        this.data_avaliacao = data_avaliacao;
    }
    public String getTexto_avaliacao() {
        return texto_avaliacao;
    }
    public void setTexto_avaliacao(String texto_avaliacao) {
        this.texto_avaliacao = texto_avaliacao;
    }
    public int getNota() {
        return nota;
    }
    public void setNota(int nota) {
        this.nota = nota;
    }

    public void criar() {
        String sql = "INSERT INTO avaliacao (usuario_id, nome_usuario, produto_id, data_avaliacao, texto_avaliacao, nota) VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = new Conexao().getConexao();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setInt(1, this.usuario_id);
            stmt.setString(2, this.nome_usuario);
            stmt.setInt(3, this.produto_id);
            stmt.setTimestamp(4, Timestamp.valueOf(this.data_avaliacao));
            stmt.setString(5, this.texto_avaliacao);
            stmt.setInt(6, this.nota);
            
            stmt.executeUpdate();
            
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                this.id = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public static List<Avaliacao> buscarPorProduto(int produtoId) {
        List<Avaliacao> avaliacoes = new ArrayList<>();
        String sql = "SELECT * FROM avaliacao WHERE produto_id = ?";

        
        try (Connection conn = new Conexao().getConexao();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, produtoId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                Avaliacao avaliacao = new Avaliacao();
                avaliacao.setId(rs.getInt("id"));
                avaliacao.setUsuario_id(rs.getInt("usuario_id"));
                avaliacao.setNome_usuario(rs.getString("nome_usuario"));
                avaliacao.setProduto_id(rs.getInt("produto_id"));
                avaliacao.setData_avaliacao(rs.getTimestamp("data_avaliacao").toLocalDateTime());
                avaliacao.setTexto_avaliacao(rs.getString("texto_avaliacao"));
                avaliacao.setNota(rs.getInt("nota"));
                avaliacoes.add(avaliacao);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return avaliacoes;
    }
    
    public void update() {  
        String sql = "UPDATE avaliacao SET data_avaliacao = ?, texto_avaliacao = ?, nota = ? WHERE id = ?";

        try (Connection dbConn = new Conexao().getConexao();
             PreparedStatement ps = dbConn.prepareStatement(sql)) {
            
            ps.setTimestamp(1, Timestamp.valueOf(this.data_avaliacao));
            ps.setString(2, this.texto_avaliacao);
            ps.setInt(3, this.nota);
            ps.setInt(4, this.id);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static Avaliacao buscarPorId(int id) {
        String sql = "SELECT * FROM avaliacao WHERE id = ?";
        
        try (Connection conn = new Conexao().getConexao();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                Avaliacao avaliacao = new Avaliacao();
                avaliacao.setId(rs.getInt("id"));
                avaliacao.setUsuario_id(rs.getInt("usuario_id"));
                avaliacao.setNome_usuario(rs.getString("nome_usuario"));
                avaliacao.setProduto_id(rs.getInt("produto_id"));
                avaliacao.setData_avaliacao(rs.getTimestamp("data_avaliacao").toLocalDateTime());
                avaliacao.setTexto_avaliacao(rs.getString("texto_avaliacao"));
                avaliacao.setNota(rs.getInt("nota"));
                return avaliacao;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static void excluir(int id) {
        String sql = "DELETE FROM avaliacao WHERE id = ?";//cria conexao com o banco
        try (Connection conn = new Conexao().getConexao(); //tenta executar o sqL
             PreparedStatement stmt = conn.prepareStatement(sql)) {  //PREVINE SQL INJECTION
            stmt.setInt(1, id); //define o parametro ? do sql
            stmt.executeUpdate(); //executa o excluit
        } catch (SQLException e) { //se der erro
            e.printStackTrace(); //printa o erro
        }
    }
    
}
