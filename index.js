import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 3000;

// Inicializa o cliente nativo do Prisma
const prisma = new PrismaClient();

// Middleware necessário para aceitar JSON nas requisições
app.use(express.json());

console.log("🚀 === INICIANDO SERVIDOR DA API (FOCUS - PRISMA NATIVO) ===\n");

// ------------------------------------------------------------------
// 1. INSERIR DADOS -> POST (Alinhado com INSERT INTO / createMany)
// ------------------------------------------------------------------
app.post('/usuarios', async (req, res) => {
  try {
    const dados = req.body;
    // Garante que os dados estão em formato de Array para o createMany
    const dadosEmArray = Array.isArray(dados) ? dados : [dados];

    await prisma.usuario.createMany({
      data: dadosEmArray
    });

    res.status(201).json({ mensagem: "✅ Usuário(s) inserido(s) com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao inserir dados", detalhes: error.message });
  }
});

// ------------------------------------------------------------------
// 2. LER DADOS -> GET (Alinhado com SELECT / findMany)
// ------------------------------------------------------------------
app.get('/usuarios', async (req, res) => {
  try {
    const lista = await prisma.usuario.findMany();
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao ler dados", detalhes: error.message });
  }
});

// ------------------------------------------------------------------
// 3. CONTAR DADOS -> GET /count (Alinhado com SELECT COUNT / count)
// ------------------------------------------------------------------
app.get('/usuarios/count', async (req, res) => {
  try {
    const total = await prisma.usuario.count();
    res.status(200).json({ total_registros: total });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao contar dados", detalhes: error.message });
  }
});

// ------------------------------------------------------------------
// 4. ATUALIZAR DADOS -> PUT (Alinhado com UPDATE / update)
// ------------------------------------------------------------------
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const novosDados = req.body;

    await prisma.usuario.update({
      where: { 
        id: Number(id) // O Prisma exige que o ID seja do mesmo tipo do banco (Int)
      },
      data: novosDados
    });

    res.status(200).json({ mensagem: `📝 Usuário com ID ${id} atualizado com sucesso!` });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar dados", detalhes: error.message });
  }
});

// ------------------------------------------------------------------
// 5. DELETAR DADOS -> DELETE (Alinhado com DELETE FROM / delete)
// ------------------------------------------------------------------
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: { 
        id: Number(id) // Converte a string da URL para número inteiro
      }
    });

    res.status(200).json({ mensagem: `❌ Usuário com ID ${id} removido com sucesso!` });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar dados", detalhes: error.message });
  }
});

// Liga o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`📡 API da Focus rodando perfeitamente em http://localhost:${PORT}`);
  console.log(`👉 Rotas prontas para testes:`);
  console.log(`   - GET    http://localhost:${PORT}/usuarios        (SELECT * -> findMany)`);
  console.log(`   - GET    http://localhost:${PORT}/usuarios/count  (SELECT COUNT -> count)`);
  console.log(`   - POST   http://localhost:${PORT}/usuarios        (INSERT INTO -> createMany)`);
  console.log(`   - PUT    http://localhost:${PORT}/usuarios/:id    (UPDATE -> update)`);
  console.log(`   - DELETE http://localhost:${PORT}/usuarios/:id    (DELETE FROM -> delete)\n`);
});