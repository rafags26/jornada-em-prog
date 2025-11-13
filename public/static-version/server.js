/* ========================================
   BACKEND - NODE.JS + EXPRESS
   Servidor para o Portfolio
   ======================================== */

// Importação dos módulos necessários
const express = require('express');
const cors = require('cors');
const path = require('path');

// Criação da aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES
// ============================================

// Habilita CORS para permitir requisições do frontend
app.use(cors());

// Parse de JSON no body das requisições
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS do frontend)
app.use(express.static(path.join(__dirname)));

// Middleware de logging básico
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ============================================
// DADOS SIMULADOS (EM MEMÓRIA)
// Em uma aplicação real, isso viria de um banco de dados
// ============================================

/**
 * Array de missões do portfolio
 * Simula uma tabela de banco de dados
 */
const missoes = [
    {
        id: 1,
        title: "Primeira Landing Page",
        category: "frontend",
        description: "Minha primeira página web completa, onde aprendi a estruturar HTML e estilizar com CSS. Foi desafiador no início, mas gratificante ver o resultado final.",
        learnings: "Aprendi a usar flexbox para layouts responsivos, a importância da semântica HTML, e como organizar meu código CSS de forma mais eficiente. Também descobri o poder das media queries para tornar sites mobile-friendly."
    },
    {
        id: 2,
        title: "Calculadora Interativa",
        category: "logica",
        description: "Desenvolvimento de uma calculadora funcional usando JavaScript puro. Este projeto me desafiou a pensar em lógica de programação de forma mais profunda.",
        learnings: "Entendi melhor como funcionam eventos em JavaScript, manipulação do DOM, e como estruturar funções para resolver problemas complexos. Aprendi também sobre tratamento de erros e validação de entrada de dados."
    },
    {
        id: 3,
        title: "Sistema de Tarefas",
        category: "logica",
        description: "Criação de um gerenciador de tarefas com funcionalidades de adicionar, editar e remover itens. Usei localStorage para persistência de dados.",
        learnings: "Aprendi a trabalhar com arrays e objetos em JavaScript, manipular dados complexos, e usar localStorage para salvar informações no navegador. Também pratiquei muito lógica de programação e organização de código."
    },
    {
        id: 4,
        title: "Portfolio Responsivo",
        category: "frontend",
        description: "Desenvolvimento de um portfolio pessoal totalmente responsivo, usando Grid e Flexbox. Foi meu primeiro projeto 'real' que poderia mostrar para outras pessoas.",
        learnings: "Dominei CSS Grid e Flexbox, aprendi sobre design responsivo de verdade, e entendi a importância de pensar mobile-first. Também aprendi sobre otimização de imagens e performance web."
    },
    {
        id: 5,
        title: "Projeto Final Integrado",
        category: "projeto",
        description: "Projeto final que integrou tudo que aprendi: HTML, CSS, JavaScript, consumo de API, e deploy. Foi o projeto mais completo e desafiador do semestre.",
        learnings: "Integrei todos os conhecimentos adquiridos, aprendi a consumir APIs externas com fetch, trabalhar com dados assíncronos, fazer deploy de aplicações, e principalmente: aprendi a debugar e resolver problemas de forma autônoma. Este projeto me mostrou que sou capaz de criar aplicações web completas."
    },
    {
        id: 6,
        title: "Jogo da Memória",
        category: "logica",
        description: "Desenvolvimento de um jogo da memória interativo, com sistema de pontuação e níveis de dificuldade. Foi super divertido e desafiador ao mesmo tempo!",
        learnings: "Aprendi sobre algoritmos de embaralhamento, lógica de jogos, manipulação avançada do DOM, e como criar experiências interativas envolventes. Também pratiquei muito programação orientada a eventos."
    }
];

/**
 * Array de eventos da timeline
 * Simula uma tabela de banco de dados
 */
const timeline = [
    {
        id: 1,
        period: "Início do Semestre",
        title: "Descobrindo um novo mundo",
        description: "No começo, eu me sentia completamente perdida. Tudo era novo: HTML, CSS, a própria lógica de como a web funciona. Tinha muita insegurança, mas também uma curiosidade enorme. Cada tag HTML que funcionava era uma pequena vitória."
    },
    {
        id: 2,
        period: "Primeiras Entregas",
        title: "Pequenas conquistas, grande evolução",
        description: "As primeiras missões foram difíceis, não vou mentir. Passei horas tentando centralizar uma div, debugando erros de CSS. Mas cada entrega me dava mais confiança. Comecei a perceber que conseguia criar coisas bonitas e funcionais."
    },
    {
        id: 3,
        period: "Metade do Semestre",
        title: "A virada de chave",
        description: "Foi nesse momento que tudo começou a fazer sentido. JavaScript deixou de ser um bicho de sete cabeças e virou uma ferramenta poderosa nas minhas mãos. Comecei a pensar como programadora, a visualizar soluções antes mesmo de escrever o código."
    },
    {
        id: 4,
        period: "Preparação para o Final",
        title: "Confiança e autonomia",
        description: "Aqui eu já me sentia muito mais segura. Conseguia debugar meus próprios erros, pesquisar soluções, e até ajudar colegas. A sensação de autonomia foi incrível. Percebi que não precisava decorar tudo, mas sim entender a lógica por trás."
    },
    {
        id: 5,
        period: "Projeto Final",
        title: "O momento de mostrar tudo que aprendi",
        description: "O projeto final foi desafiador, mas também foi onde tudo se consolidou. Consegui aplicar tudo que aprendi de forma integrada. Foi emocionante ver o projeto ganhar vida e funcionar. Me senti orgulhosa de ter chegado até aqui."
    }
];

// ============================================
// ROTAS DA API
// ============================================

/**
 * Rota raiz - Retorna informações sobre a API
 */
app.get('/api', (req, res) => {
    res.json({
        message: 'API do Portfolio - Programação e Plataformas',
        version: '1.0.0',
        endpoints: {
            missoes: '/api/missoes',
            timeline: '/api/timeline'
        }
    });
});

/**
 * GET /api/missoes
 * Retorna todas as missões do portfolio
 * Opcionalmente pode filtrar por categoria usando query param
 * Exemplo: /api/missoes?category=frontend
 */
app.get('/api/missoes', (req, res) => {
    try {
        const { category } = req.query;
        
        // Se houver filtro de categoria, retorna apenas as missões dessa categoria
        if (category) {
            const filteredMissoes = missoes.filter(m => m.category === category);
            return res.json({
                success: true,
                count: filteredMissoes.length,
                data: filteredMissoes
            });
        }
        
        // Retorna todas as missões
        res.json({
            success: true,
            count: missoes.length,
            data: missoes
        });
    } catch (error) {
        console.error('Erro ao buscar missões:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar missões',
            error: error.message
        });
    }
});

/**
 * GET /api/missoes/:id
 * Retorna uma missão específica pelo ID
 */
app.get('/api/missoes/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const missao = missoes.find(m => m.id === id);
        
        if (!missao) {
            return res.status(404).json({
                success: false,
                message: 'Missão não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: missao
        });
    } catch (error) {
        console.error('Erro ao buscar missão:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar missão',
            error: error.message
        });
    }
});

/**
 * GET /api/timeline
 * Retorna todos os eventos da linha do tempo
 */
app.get('/api/timeline', (req, res) => {
    try {
        res.json({
            success: true,
            count: timeline.length,
            data: timeline
        });
    } catch (error) {
        console.error('Erro ao buscar timeline:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar timeline',
            error: error.message
        });
    }
});

/**
 * GET /api/timeline/:id
 * Retorna um evento específico da timeline pelo ID
 */
app.get('/api/timeline/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const event = timeline.find(t => t.id === id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error('Erro ao buscar evento:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar evento',
            error: error.message
        });
    }
});

// ============================================
// TRATAMENTO DE ERROS 404
// ============================================

/**
 * Middleware para rotas não encontradas
 * Deve ser o último middleware registrado
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.url
    });
});

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================

/**
 * Inicia o servidor na porta especificada
 */
app.listen(PORT, () => {
    console.log('===========================================');
    console.log('🚀 Servidor iniciado com sucesso!');
    console.log(`📡 Porta: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('===========================================');
    console.log('\n📚 Rotas disponíveis:');
    console.log(`   GET http://localhost:${PORT}/api`);
    console.log(`   GET http://localhost:${PORT}/api/missoes`);
    console.log(`   GET http://localhost:${PORT}/api/missoes/:id`);
    console.log(`   GET http://localhost:${PORT}/api/timeline`);
    console.log(`   GET http://localhost:${PORT}/api/timeline/:id`);
    console.log('\n💡 Exemplos de filtro:');
    console.log(`   GET http://localhost:${PORT}/api/missoes?category=frontend`);
    console.log(`   GET http://localhost:${PORT}/api/missoes?category=logica`);
    console.log(`   GET http://localhost:${PORT}/api/missoes?category=projeto`);
    console.log('\n✨ Pronto para uso!\n');
});

// ============================================
// TRATAMENTO DE ERROS NÃO CAPTURADOS
// ============================================

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});
