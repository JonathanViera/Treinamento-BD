import { PrismaClient } from '@prisma/client';

// Cria a instância nativa do Prisma
const prisma = new PrismaClient();

async function rodarSimulacaoMercado() {
  console.log("==================================================================");
  console.log("🛒 SIMULAÇÃO: LISTA DE COMPRAS DE MERCADO ");
  console.log("==================================================================\n");

  try {
    // ------------------------------------------------------------------
    // 1. ADICIONANDO ITENS À LISTA -> [INSERT INTO]
    // ------------------------------------------------------------------
    console.log("➕ 1. [INSERT INTO] Adicionando itens ao carrinho de compras...");

    await prisma.usuario.createMany({
      data: [
        { nome: "Arroz Integral 5kg", tipo: "Alimento Limpo" },
        { nome: "Feijão Preto 1kg", tipo: "Alimento Limpo" },
        { nome: "Açaí Colorido Unitário", tipo: "Sobremesa" },
        { nome: "Detergente de Coco", tipo: "Limpeza" }
      ]
    });
    console.log("✅ Itens adicionados com sucesso!\n");

    // ------------------------------------------------------------------
    // 2. EXIBINDO O CARRINHO -> [SELECT]
    // ------------------------------------------------------------------
    console.log("🔍 2. [SELECT] Visualizando todos os produtos dentro do carrinho:");
    let carrinho = await prisma.usuario.findMany();
    console.table(carrinho);
    console.log("");

    if (carrinho.length > 0) {
      const idItem = carrinho[0].id;
      const nomeItemAntigo = carrinho[0].nome;

      // ------------------------------------------------------------------
      // 3. ATUALIZANDO UM ITEM -> [UPDATE]
      // ------------------------------------------------------------------
      console.log(`📝 3. [UPDATE] Trocando o item "${nomeItemAntigo}" por uma versão Premium...`);
      await prisma.usuario.update({
        where: { id: idItem },
        data: { 
          nome: "Arroz Tipo 1 (Premiumizado)",
          tipo: "Alimento Top" 
        }
      });
      console.log("✅ Item updated na lista!");
      
      console.log("🔍 [SELECT] Checando o carrinho atualizado:");
      carrinho = await prisma.usuario.findMany();
      console.table(carrinho);
      console.log("");

      // ------------------------------------------------------------------
      // 4. REMOVENDO UM ITEM -> [DELETE FROM]
      // ------------------------------------------------------------------
      console.log(`❌ 4. [DELETE FROM] Desistiu de levar o item de ID ${idItem}. Removendo da lista...`);
      await prisma.usuario.delete({
        where: { id: idItem }
      });
      console.log("✅ Item removido da lista de compras!");


      console.log("\n📋 [SELECT] Estado final do carrinho:");
      console.table(await prisma.usuario.findMany());
    }

  } catch (error) {
    console.error("🚨 Erro durante as compras:", error.message);
  } finally {
    // Encerra a conexão nativa com o banco
    await prisma.$disconnect();
    console.log("\n🏁 ==================================================================");
    console.log("   LISTA DE MERCADO FINALIZADA COM SUCESSO!");
    console.log("==================================================================");
  }
}

rodarSimulacaoMercado();