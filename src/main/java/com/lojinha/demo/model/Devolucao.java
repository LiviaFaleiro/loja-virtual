package com.lojinha.demo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class Devolucao {
    private int id;
    private int vendaId;
    private int usuarioId;
    private String justificativa;
    private String status;
    private Date dataSolicitacao;

 

    public int getId() {
        return id;
    }



    public void setId(int id) {
        this.id = id;
    }



    public int getVendaId() {
        return vendaId;
    }



    public void setVendaId(int vendaId) {
        this.vendaId = vendaId;
    }



    public int getUsuarioId() {
        return usuarioId;
    }



    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }



    public String getJustificativa() {
        return justificativa;
    }



    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }



    public String getStatus() {
        return status;
    }



    public void setStatus(String status) {
        this.status = status;
    }



    public Date getDataSolicitacao() {
        return dataSolicitacao;
    }



    public void setDataSolicitacao(Date dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }



    public void salvar() {
        Conexao c = new Conexao();
        Connection dbConn = c.getConexao();
        String sql = "INSERT INTO devolucao (venda_id, usuario_id, justificativa, status) VALUES (?, ?, ?, ?)";

        try {
            PreparedStatement pstmt = dbConn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            pstmt.setInt(1, this.vendaId);
            pstmt.setInt(2, this.usuarioId);
            pstmt.setString(3, this.justificativa);
            pstmt.setString(4, "Pendente");
            pstmt.executeUpdate();
            
            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                this.id = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
