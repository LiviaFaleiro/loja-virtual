package com.lojinha.demo;

import java.sql.Connection;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.lojinha.demo.model.Conexao;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) throws Exception {
        Conexao c = new Conexao();
        Connection con = c.getConexao();

	}

}
