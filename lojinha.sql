-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/12/2024 às 17:28
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

--
-- Despejando dados para a tabela `avaliacao`
--

INSERT INTO `avaliacao` (`id`, `usuario_id`, `nome_usuario`, `produto_id`, `data_avaliacao`, `texto_avaliacao`, `nota`) VALUES
(26, 11, '123', 16, '2024-12-02 13:17:11', 'hahahahaha atendente uma querida, chegou antes do prazo 😍😍', 4),
(37, 22, 'livia', 26, '2024-12-02 15:48:56', 'fsakjfsadfkjsadhf', 2);

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
(1, '12123'),
(2, 'AAA'),
(3, 'filmes');

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
(1, 21),
(1, 26),
(2, 22);

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

--
-- Despejando dados para a tabela `devolucao`
--

INSERT INTO `devolucao` (`id`, `venda_id`, `justificativa`, `status`, `data_solicitacao`, `usuario_id`) VALUES
(1, 33, 'feio demais', 'Devolução Aprovada', '2024-12-01 04:31:25', 11),
(2, 31, 'perdi a vontade', 'Devolução Aprovada', '2024-12-01 04:41:14', 11),
(3, 34, 'chegou quebrado', 'Devolução Recusada', '2024-12-01 05:33:20', 11);

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

--
-- Despejando dados para a tabela `item_venda`
--

INSERT INTO `item_venda` (`id`, `produto_id`, `venda_id`, `valor`, `quantidade`, `devolucao`) VALUES
(3, 16, 53, 0.00, 1, 0),
(5, 16, 55, 18.00, 1, 0),
(6, 16, 56, 18.00, 2, 0),
(7, 16, 57, 18.00, 1, 0),
(8, 26, 58, 15.00, 1, 0),
(9, 16, 59, 18.00, 1, 0),
(10, 16, 60, 18.00, 1, 0),
(11, 26, 61, 15.00, 1, 0),
(12, 26, 62, 15.00, 1, 0);

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

--
-- Despejando dados para a tabela `pedidos_cancelados`
--

INSERT INTO `pedidos_cancelados` (`id`, `venda_id`, `usuario_id`, `data_cancela`, `nome_produto`, `valor_total`) VALUES
(1, 24, 11, '2024-11-30 19:00:47', '123', 18.00),
(2, 23, 11, '2024-11-30 19:08:15', 'coisinha', 20.00),
(3, 22, 11, '2024-11-30 19:16:22', 'coisinha', 72.00),
(4, 25, 11, '2024-11-30 19:19:36', '123', 18.00),
(5, 28, 17, '2024-11-30 22:55:44', 'coisinha', 20.00),
(6, 32, 11, '2024-12-01 01:30:02', 'cateogria pt2', 12.00),
(7, 55, 11, '2024-12-01 20:31:55', '123', 18.00),
(8, 59, 17, '2024-12-02 10:13:32', '123', 18.00),
(9, 58, 17, '2024-12-02 10:15:17', 'maldicao', 15.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `categorias` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id`, `valor`, `nome`, `descricao`, `categorias`) VALUES
(16, 20.00, 'filme ruim', NULL, NULL),
(19, 20.00, 'coisinha', 'nao sei', NULL),
(21, 25.50, 'teste categoroia', 'teste da cateoria', NULL),
(22, 12.00, 'cateogria pt2', 'aaaa por favor funciona', NULL),
(25, 30.00, 'camiesta1', 'aaaaaaaa', NULL),
(26, 15.00, 'maldicao', 'i dont know', NULL);

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
(11, '123', '123', '123', 'usuario'),
(17, 'emilly', 'aaa', '123', 'admin'),
(20, 'helena', 'faleirolivia.s@gmail.com', '1234', 'usuario'),
(21, 'marcia', 'marcia@linda.com', '123', 'usuario'),
(22, 'livia linda', '02150200@aluno.canoas.ifrs.edu.br', '12345', 'usuario');

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

--
-- Despejando dados para a tabela `vendas_usuario`
--

INSERT INTO `vendas_usuario` (`id`, `usuario_id`, `data_venda`, `valor_total`, `status`, `nome_produto`, `quantidade`) VALUES
(22, 11, '2024-11-27 00:00:00', 72.00, 'CANCELADO', 'coisinha', 2),
(23, 11, '2024-11-30 00:00:00', 20.00, 'CANCELADO', 'coisinha', 1),
(24, 11, '2024-11-30 00:00:00', 18.00, 'CANCELADO', '123', 1),
(25, 11, '2024-11-30 00:00:00', 18.00, 'CANCELADO', '123', 1),
(26, 11, '2024-11-30 00:00:00', 18.00, 'Avaliado', '123', 1),
(27, 21, '2024-11-30 00:00:00', 20.00, 'Avaliado', 'coisinha', 1),
(28, 11, '2024-11-30 00:00:00', 20.00, 'CANCELADO', 'coisinha', 1),
(29, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(30, 11, '2024-12-01 00:00:00', 12.00, 'Avaliado', 'cateogria pt2', 1),
(31, 11, '2024-12-01 00:00:00', 15.00, 'Avaliado', 'maldicao', 1),
(32, 11, '2024-12-01 00:00:00', 12.00, 'CANCELADO', 'cateogria pt2', 1),
(33, 11, '2024-12-01 00:00:00', 75.00, 'Avaliado', 'categoria parte 3', 1),
(34, 11, '2024-12-01 00:00:00', 20.00, 'Avaliado', 'coisinha', 1),
(35, 11, '2024-12-01 00:00:00', 25.50, 'Avaliado', 'teste categoroia', 1),
(36, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(37, 11, '2024-12-01 00:00:00', 15.00, 'Avaliado', 'maldicao', 1),
(38, 21, '2024-12-01 00:00:00', 15.00, 'Avaliado', 'maldicao', 1),
(39, 21, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(40, 21, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(41, 21, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(42, 21, '2024-12-01 00:00:00', 20.00, 'Pedido feito', 'coisinha', 1),
(43, 11, '2024-12-01 00:00:00', 15.00, 'Avaliado', 'maldicao', 1),
(44, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(45, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(46, 11, '2024-12-01 00:00:00', 20.00, 'Avaliado', 'coisinha', 1),
(47, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(48, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(49, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(50, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(51, 11, '2024-12-01 00:00:00', 18.00, 'Pedido Entregue', '123', 1),
(52, 11, '2024-12-01 00:00:00', 18.00, 'Pedido Entregue', '123', 1),
(53, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '', 0),
(54, 11, '2024-12-01 00:00:00', 18.00, 'Pedido Entregue', '123', 1),
(55, 11, '2024-12-01 00:00:00', 18.00, 'CANCELADO', '123', 1),
(56, 11, '2024-12-01 00:00:00', 36.00, 'Avaliado', '123', 2),
(57, 11, '2024-12-01 00:00:00', 18.00, 'Avaliado', '123', 1),
(58, 11, '2024-12-02 00:00:00', 15.00, 'CANCELADO', 'maldicao', 1),
(59, 11, '2024-12-02 00:00:00', 18.00, 'CANCELADO', '123', 1),
(60, 11, '2024-12-02 00:00:00', 18.00, 'Avaliado', '123', 1),
(61, 11, '2024-12-02 00:00:00', 15.00, 'Avaliado', 'maldicao', 1),
(62, 22, '2024-12-02 00:00:00', 15.00, 'Avaliado', 'maldicao', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `devolucao`
--
ALTER TABLE `devolucao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `item_venda`
--
ALTER TABLE `item_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `pedidos_cancelados`
--
ALTER TABLE `pedidos_cancelados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `vendas_usuario`
--
ALTER TABLE `vendas_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

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
