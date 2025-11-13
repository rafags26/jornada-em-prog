import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

// Tipos para as missões e timeline
interface Mission {
  id: number;
  title: string;
  category: "frontend" | "logica" | "projeto";
  description: string;
  learnings: string;
}

interface TimelineEvent {
  id: number;
  period: string;
  title: string;
  description: string;
}

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedMissions, setExpandedMissions] = useState<number[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dados das missões (simulando backend)
  const missionsData: Mission[] = [
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

  const timelineData: TimelineEvent[] = [
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

  // Carregar dados (simulando chamada à API)
  useEffect(() => {
    setMissions(missionsData);
    setTimeline(timelineData);
  }, []);

  // Theme toggle com localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Filtrar missões por categoria
  const filteredMissions = selectedCategory === "all" 
    ? missions 
    : missions.filter(m => m.category === selectedCategory);

  // Toggle expand/collapse missão
  const toggleMission = (id: number) => {
    setExpandedMissions(prev => 
      prev.includes(id) 
        ? prev.filter(mId => mId !== id)
        : [...prev, id]
    );
  };

  // Scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {/* Botão Theme Toggle */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 rounded-full shadow-lg"
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 gradient-hero relative overflow-hidden">
        <div className="container max-w-4xl text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Minha Jornada em<br />Programação e Plataformas
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/95 max-w-2xl mx-auto leading-relaxed">
            Este é o registro da minha transformação: de iniciante insegura a desenvolvedora confiante. 
            Aqui você vai encontrar minhas missões, desafios superados e tudo que aprendi ao longo dessa jornada incrível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("missions")}
              className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8"
            >
              Ver Minhas Missões
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("reflections")}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-xl text-lg px-8"
            >
              Minhas Reflexões
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section className="py-20 px-4" id="about">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Sobre Este Portfólio
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              A disciplina de <strong>Programação e Plataformas</strong> foi muito mais do que aprender 
              HTML, CSS e JavaScript. Foi uma jornada de autodescoberta, onde aprendi que sou capaz de 
              criar soluções tecnológicas, resolver problemas complexos e transformar ideias em realidade através do código.
            </p>
            <p>
              No começo do semestre, eu mal sabia o que era uma tag HTML. Olhava para códigos e parecia 
              tudo muito complicado e distante. Tinha medo de errar, de não conseguir acompanhar. 
              Mas algo dentro de mim dizia para insistir, e foi a melhor decisão que tomei.
            </p>
            <p>
              Neste portfólio, você vai encontrar:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Minhas missões mais significativas:</strong> projetos que marcaram minha evolução</li>
              <li><strong>Linha do tempo:</strong> como fui me transformando ao longo do semestre</li>
              <li><strong>Competências desenvolvidas:</strong> técnicas, pessoais e ferramentas que domino</li>
              <li><strong>Reflexões finais:</strong> aprendizados sobre mim mesma e sobre tecnologia</li>
            </ul>
            <p className="italic text-muted-foreground">
              Cada linha de código aqui representa horas de estudo, tentativa e erro, frustrações superadas 
              e pequenas vitórias celebradas. Este é o meu registro de crescimento.
            </p>
          </div>
        </div>
      </section>

      {/* Missões Section */}
      <section className="py-20 px-4 bg-muted/30" id="missions">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Minhas Missões Mais Significativas
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Cada projeto foi um degrau importante na minha evolução. Aqui estão os que mais me marcaram:
          </p>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="transition-smooth"
            >
              Todas as Missões
            </Button>
            <Button
              variant={selectedCategory === "frontend" ? "default" : "outline"}
              onClick={() => setSelectedCategory("frontend")}
              className="transition-smooth"
            >
              Front-end
            </Button>
            <Button
              variant={selectedCategory === "logica" ? "default" : "outline"}
              onClick={() => setSelectedCategory("logica")}
              className="transition-smooth"
            >
              Lógica/JavaScript
            </Button>
            <Button
              variant={selectedCategory === "projeto" ? "default" : "outline"}
              onClick={() => setSelectedCategory("projeto")}
              className="transition-smooth"
            >
              Projeto Final
            </Button>
          </div>

          {/* Cards de Missões */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <Card key={mission.id} className="shadow-card hover:shadow-card-hover transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={mission.category === "projeto" ? "default" : "secondary"}>
                      {mission.category === "frontend" && "Front-end"}
                      {mission.category === "logica" && "Lógica/JS"}
                      {mission.category === "projeto" && "Projeto Final"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{mission.title}</CardTitle>
                  <CardDescription className="text-base">{mission.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {expandedMissions.includes(mission.id) && (
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2 text-primary">O que eu aprendi:</h4>
                      <p className="text-sm leading-relaxed">{mission.learnings}</p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => toggleMission(mission.id)}
                    className="w-full transition-smooth"
                  >
                    {expandedMissions.includes(mission.id) ? (
                      <>
                        Ver menos <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Ver mais <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4" id="timeline">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Linha do Tempo da Minha Evolução
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Como eu fui me transformando ao longo do semestre:
          </p>

          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>

            {/* Eventos */}
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`relative flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Bolinha */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background shadow-lg z-10"></div>

                  {/* Conteúdo */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="shadow-card">
                      <CardHeader>
                        <Badge className="w-fit mb-2" variant="outline">{event.period}</Badge>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="leading-relaxed">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competências Section */}
      <section className="py-20 px-4 bg-muted/30" id="skills">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Competências Desenvolvidas
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Tudo que construí durante essa jornada:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Técnicas */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Competências Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid", "Responsividade", "Git & GitHub", "APIs", "LocalStorage", "DOM Manipulation", "Debugging", "VS Code"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pessoais */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Competências Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Autonomia", "Resiliência", "Resolução de Problemas", "Pensamento Lógico", "Autoconfiança", "Trabalho em Equipe", "Gestão do Tempo", "Busca por Soluções", "Criatividade"].map((skill) => (
                    <Badge key={skill} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ferramentas */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Ferramentas & Plataformas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Lovable", "VS Code", "GitHub", "Figma", "Chrome DevTools", "Stack Overflow", "MDN Docs", "CodePen", "Vercel"].map((tool) => (
                    <Badge key={tool} className="text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reflexões Section */}
      <section className="py-20 px-4" id="reflections">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Reflexões Finais
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            O que essa jornada me ensinou:
          </p>

          <div className="space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Sobre Mim Mesma</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed">
                <p>
                  Descobri que sou muito mais capaz do que imaginava. No início, achava que programação 
                  era algo para "gênios" ou pessoas com um "dom especial". Hoje sei que é sobre persistência, 
                  curiosidade e vontade de aprender.
                </p>
                <p>
                  Aprendi que erro não é fracasso - é parte do processo. Cada bug que resolvi me tornou 
                  mais forte. Cada "Uncaught TypeError" que debugei aumentou minha confiança.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Como Lido com Erros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed">
                <p>
                  No começo, cada erro no console me desesperava. Hoje, vejo erros como mensagens 
                  que o código está me mandando, me guiando para a solução. Aprendi a ler mensagens 
                  de erro, usar o console.log estrategicamente e pesquisar de forma eficiente.
                </p>
                <p>
                  Desenvolvi paciência e método: identificar o problema, isolar o código, testar 
                  hipóteses e, quando necessário, pedir ajuda sem medo.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">O Que Mudou na Minha Visão Sobre Tecnologia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed">
                <p>
                  Antes, eu usava sites e aplicativos sem pensar em como eles funcionavam. Agora, 
                  olho para qualquer interface e penso: "Como será que fizeram isso? Quais tecnologias 
                  usaram? Como é o código por trás?"
                </p>
                <p>
                  Entendi que tecnologia não é mágica - são pessoas escrevendo código, linha por linha, 
                  resolvendo problemas. E agora eu faço parte desse mundo. Essa consciência é 
                  empoderadora.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-primary">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed">
                <p>
                  Esta disciplina foi apenas o começo. Agora quero:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Aprofundar meus conhecimentos em JavaScript e aprender sobre frameworks modernos</li>
                  <li>Criar projetos autorais que resolvam problemas reais</li>
                  <li>Continuar estudando design para criar interfaces ainda mais bonitas e intuitivas</li>
                  <li>Explorar back-end e bancos de dados para criar aplicações completas</li>
                  <li>Manter este portfólio sempre atualizado com meus novos projetos</li>
                  <li>Contribuir com a comunidade de desenvolvedores, assim como fui ajudada</li>
                </ul>
                <p className="font-semibold text-primary">
                  A jornada está só começando, e estou empolgada com tudo que ainda vou aprender e criar!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Vamos Conversar?
          </h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Se você quer saber mais sobre minha jornada, trocar ideias sobre programação, 
            ou apenas bater um papo sobre tecnologia, eu adoraria conversar com você!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8"
              onClick={() => window.location.href = 'mailto:silva.rafagomes05@gmail.com'}
            >
              Entre em Contato
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToTop}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-xl text-lg px-8"
            >
              Voltar ao Topo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container text-center text-muted-foreground">
          <p>Feito com 💖 e muito JavaScript • Programação e Plataformas © 2025</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-xl z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;
