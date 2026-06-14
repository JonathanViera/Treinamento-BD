import express from 'express';
import { db } from './db.js';

const app = express();
const PORT = 3000;

// Middleware necessário para aceitar JSON nas requisições
app.use(express.json());

console.log("🚀 === INICIANDO SERVIDOR DA API (FOCUS) ===\n");


// 1. INSERIR DADOS -> POST (Alinhado com INSERT INTO)
app.post('/usuarios', async (req, res) => {
  try {
    const dados = req.body;
    const dadosEmArray = Array.isArray(dados) ? dados : [dados];

    await db.usuarios.insertMany(dadosEmArray);
    res.status(201).json({ mensagem: "✅ Usuário(s) inserido(s) com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao inserir dados", detalhes: error.message });
  }
});

// 2. LER DADOS -> GET (Alinhado com SELECT)
app.get('/usuarios', async (req, res) => {
  try {
    const lista = await db.usuarios.select();
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao ler dados", detalhes: error.message });
  }
});

// 3. CONTAR DADOS -> GET /count (Alinhado com SELECT COUNT)
app.get('/usuarios/count', async (req, res) => {
  try {
    const total = await db.usuarios.selectCount();
    res.status(200).json({ total_registros: total });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao contar dados", detalhes: error.message });
  }
});

// 4. ATUALIZAR DADOS -> PUT (Alinhado com UPDATE)
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const novosDados = req.body;

    await db.usuarios.update(id, novosDados);
    res.status(200).json({ mensagem: `📝 Usuário com ID ${id} atualizado com sucesso!` });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar dados", detalhes: error.message });
  }
});

// 5. DELETAR DADOS -> DELETE (Alinhado com DELETE FROM)
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.usuarios.deleteFrom(id);
    res.status(200).json({ mensagem: `❌ Usuário com ID ${id} removido com sucesso!` });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar dados", detalhes: error.message });
  }
});

// Liga o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`📡 API da Focus rodando perfeitamente em http://localhost:${PORT}`);
  console.log(`👉 Rotas prontas para testes:`);
  console.log(`   - GET    http://localhost:${PORT}/usuarios        (SELECT)`);
  console.log(`   - GET    http://localhost:${PORT}/usuarios/count  (SELECT COUNT)`);
  console.log(`   - POST   http://localhost:${PORT}/usuarios        (INSERT INTO)`);
  console.log(`   - PUT    http://localhost:${PORT}/usuarios/:id    (UPDATE)`);
  console.log(`   - DELETE http://localhost:${PORT}/usuarios/:id    (DELETE FROM)\n`);
});