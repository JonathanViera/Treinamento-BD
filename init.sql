-- ==================================================================
-- SCHEMA: Definição da Estrutura do Banco (DDL)
-- ==================================================================

-- Garante que o banco de dados está criado
CREATE DATABASE IF NOT EXISTS mercado_db;
USE mercado_db;

-- Remove a tabela se ela já existir para evitar conflitos no mapeamento
DROP TABLE IF EXISTS usuarios;

-- Cria a tabela exatamente como o Prisma mapeia
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(191) NOT NULL,
    tipo VARCHAR(191) NOT NULL
);