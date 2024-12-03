-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/12/2024 às 17:47
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `lojinha`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacao`
--

CREATE TABLE `avaliacao` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `nome_usuario` varchar(255) NOT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `data_avaliacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `texto_avaliacao` text DEFAULT NULL,
  `nota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinho`
--

CREATE TABLE `carrinho` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`id`, `nome`) VALUES
(10, 'professor(a)');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria_produto`
--

CREATE TABLE `categoria_produto` (
  `categoria_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria_produto`
--

INSERT INTO `categoria_produto` (`categoria_id`, `produto_id`) VALUES
(10, 90);

-- --------------------------------------------------------

--
-- Estrutura para tabela `devolucao`
--

CREATE TABLE `devolucao` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `justificativa` text NOT NULL,
  `status` varchar(50) DEFAULT 'PENDENTE',
  `data_solicitacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_venda`
--

CREATE TABLE `item_venda` (
  `id` int(11) NOT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `venda_id` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `devolucao` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos_cancelados`
--

CREATE TABLE `pedidos_cancelados` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `data_cancela` datetime DEFAULT current_timestamp(),
  `nome_produto` varchar(100) DEFAULT NULL,
  `valor_total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id`, `valor`, `nome`, `descricao`, `categoria_id`) VALUES
(90, 50000000.00, 'carla balestro', 'muito boa', 10);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `tipo`) VALUES
(17, 'emilly', 'aaa', '123', 'admin'),
(27, 'Márcio Bigolin', 'marcio@bigoolin.com', 'marcio', 'usuario');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas_usuario`
--

CREATE TABLE `vendas_usuario` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `data_venda` datetime DEFAULT NULL,
  `valor_total` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pendente',
  `nome_produto` varchar(255) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda_item`
--

CREATE TABLE `venda_item` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) DEFAULT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `valor_unitario` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `id_produto` (`produto_id`);

--
-- Índices de tabela `carrinho`
--
ALTER TABLE `carrinho`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `categoria_produto`
--
ALTER TABLE `categoria_produto`
  ADD PRIMARY KEY (`categoria_id`,`produto_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- Índices de tabela `devolucao`
--
ALTER TABLE `devolucao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `item_venda`
--
ALTER TABLE `item_venda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produto_id` (`produto_id`),
  ADD KEY `venda_id` (`venda_id`);

--
-- Índices de tabela `pedidos_cancelados`
--
ALTER TABLE `pedidos_cancelados`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `vendas_usuario`
--
ALTER TABLE `vendas_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `venda_item`
--
ALTER TABLE `venda_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`),
  ADD KEY `produto_id` (`produto_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `devolucao`
--
ALTER TABLE `devolucao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `item_venda`
--
ALTER TABLE `item_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `pedidos_cancelados`
--
ALTER TABLE `pedidos_cancelados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `vendas_usuario`
--
ALTER TABLE `vendas_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de tabela `venda_item`
--
ALTER TABLE `venda_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `avaliacao_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`);

--
-- Restrições para tabelas `carrinho`
--
ALTER TABLE `carrinho`
  ADD CONSTRAINT `carrinho_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `carrinho_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`);

--
-- Restrições para tabelas `categoria_produto`
--
ALTER TABLE `categoria_produto`
  ADD CONSTRAINT `categoria_produto_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `categoria_produto_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `devolucao`
--
ALTER TABLE `devolucao`
  ADD CONSTRAINT `devolucao_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas_usuario` (`id`),
  ADD CONSTRAINT `devolucao_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `item_venda`
--
ALTER TABLE `item_venda`
  ADD CONSTRAINT `item_venda_ibfk_1` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`),
  ADD CONSTRAINT `item_venda_ibfk_2` FOREIGN KEY (`venda_id`) REFERENCES `vendas_usuario` (`id`);

--
-- Restrições para tabelas `vendas_usuario`
--
ALTER TABLE `vendas_usuario`
  ADD CONSTRAINT `vendas_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `venda_item`
--
ALTER TABLE `venda_item`
  ADD CONSTRAINT `venda_item_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas_usuario` (`id`),
  ADD CONSTRAINT `venda_item_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
