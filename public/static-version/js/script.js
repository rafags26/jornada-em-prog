/* ========================================
   PROGRAMAÇÃO E PLATAFORMAS - PORTFOLIO
   Script Principal
   ======================================== */

// ============================================
// 1. TEMA DARK/LIGHT MODE
// ============================================

/**
 * Função para alternar entre tema claro e escuro
 * Salva a preferência no localStorage
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Alterna a classe no body
    body.classList.toggle('dark-mode');
    
    // Salva no localStorage
    localStorage.setItem('theme', newTheme);
}

/**
 * Carrega o tema salvo no localStorage ao iniciar
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Se houver tema salvo e for dark, aplica
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// ============================================
// 2. FILTRO DE MISSÕES
// ============================================

/**
 * Filtra as missões por categoria
 * @param {string} category - Categoria para filtrar ('all', 'frontend', 'logica', 'projeto')
 */
function filterMissions(category) {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Atualiza botão ativo
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
}

/**
 * Configura os event listeners dos botões de filtro
 */
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterMissions(category);
        });
    });
}

// ============================================
// 3. EXPANDIR/RECOLHER MISSÕES
// ============================================

/**
 * Alterna entre mostrar/esconder os aprendizados de uma missão
 * @param {number} missionId - ID da missão
 */
function toggleMission(missionId) {
    const learningsDiv = document.querySelector(`#learnings-${missionId}`);
    const toggleBtn = document.querySelector(`#toggle-${missionId}`);
    
    learningsDiv.classList.toggle('show');
    
    // Atualiza texto do botão
    if (learningsDiv.classList.contains('show')) {
        toggleBtn.innerHTML = 'Ver menos ▲';
    } else {
        toggleBtn.innerHTML = 'Ver mais ▼';
    }
}

// ============================================
// 4. SCROLL SUAVE E SCROLL TO TOP
// ============================================

/**
 * Mostra/esconde o botão de scroll to top baseado na posição da página
 */
function handleScrollTopButton() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

/**
 * Rola suavemente para o topo da página
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// 5. BUSCAR DADOS DO BACKEND (SIMULADO)
// ============================================

/**
 * Busca as missões da API (simulado com dados locais)
 * Em produção, isso faria um fetch para http://localhost:3000/api/missoes
 */
async function fetchMissions() {
    // Simulando dados que viriam do backend
    const missions = [
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
    
    return missions;
}

/**
 * Busca a timeline da API (simulado com dados locais)
 * Em produção, isso faria um fetch para http://localhost:3000/api/timeline
 */
async function fetchTimeline() {
    // Simulando dados que viriam do backend
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
    
    return timeline;
}

// ============================================
// 6. RENDERIZAR MISSÕES E TIMELINE
// ============================================

/**
 * Renderiza os cards de missões no DOM
 * @param {Array} missions - Array de objetos de missões
 */
function renderMissions(missions) {
    const container = document.getElementById('missions-container');
    
    missions.forEach(mission => {
        const categoryLabel = {
            'frontend': 'Front-end',
            'logica': 'Lógica/JS',
            'projeto': 'Projeto Final'
        };
        
        const card = document.createElement('div');
        card.className = 'mission-card';
        card.dataset.category = mission.category;
        
        card.innerHTML = `
            <span class="mission-badge">${categoryLabel[mission.category]}</span>
            <h3>${mission.title}</h3>
            <p>${mission.description}</p>
            
            <div id="learnings-${mission.id}" class="mission-learnings">
                <h4>O que eu aprendi:</h4>
                <p>${mission.learnings}</p>
            </div>
            
            <button id="toggle-${mission.id}" class="toggle-btn" onclick="toggleMission(${mission.id})">
                Ver mais ▼
            </button>
        `;
        
        container.appendChild(card);
    });
}

/**
 * Renderiza os itens da timeline no DOM
 * @param {Array} timeline - Array de objetos de eventos da timeline
 */
function renderTimeline(timeline) {
    const container = document.getElementById('timeline-container');
    
    timeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        item.innerHTML = `
            <div class="timeline-card">
                <span class="timeline-badge">${event.period}</span>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// ============================================
// 7. INICIALIZAÇÃO
// ============================================

/**
 * Função principal de inicialização
 * Executa quando o DOM estiver completamente carregado
 */
async function init() {
    // Carrega o tema salvo
    loadTheme();
    
    // Configura event listener do botão de tema
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Configura event listener do scroll
    window.addEventListener('scroll', handleScrollTopButton);
    
    // Configura event listener do botão scroll to top
    const scrollTopBtn = document.getElementById('scroll-top');
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Busca e renderiza as missões
    const missions = await fetchMissions();
    renderMissions(missions);
    
    // Busca e renderiza a timeline
    const timeline = await fetchTimeline();
    renderTimeline(timeline);
    
    // Configura os filtros de missões
    setupFilters();
    
    console.log('✅ Portfolio inicializado com sucesso!');
}

// Executa a inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Expõe a função toggleMission globalmente para os event handlers inline
window.toggleMission = toggleMission;
