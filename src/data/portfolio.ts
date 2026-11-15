import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  eyebrow: z.string().min(1),
  summary: z.string().min(30),
  status: z.enum(["Publicado", "Lançado", "Privado", "Em desenvolvimento"]),
  /** Product state and code visibility are independent: a launched product can keep its code private. */
  privateCode: z.boolean(),
  featured: z.boolean(),
  metrics: z.array(
    z.object({ value: z.string().min(1), label: z.string().min(1) }),
  ),
  technologies: z.array(z.string().min(1)).min(1),
  problem: z.array(z.string().min(20)).min(1),
  contribution: z.array(z.string().min(20)).min(1),
  decisions: z.array(z.string().min(20)).min(1),
  results: z.array(z.string().min(20)).min(1),
  links: z.array(linkSchema),
  galleryLayout: z.enum(["mobile", "desktop"]),
  gallery: z.array(
    z.object({
      src: z.string().startsWith("/projetos/"),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      alt: z.string().min(20),
      title: z.string().min(1),
      caption: z.string().min(20),
    }),
  ),
  reviewScreenshots: z
    .array(
      z.object({
        src: z.string().startsWith("/projetos/"),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        alt: z.string().min(20),
        caption: z.string().min(20),
      }),
    )
    .optional(),
});

const portfolioSchema = z.object({
  siteUrl: z.string().url(),
  name: z.string().min(1),
  title: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  introduction: z.string().min(30),
  about: z.array(z.string().min(30)).min(1),
  social: z.object({ github: z.string().url(), linkedin: z.string().url() }),
  impact: z.array(
    z.object({ value: z.string().min(1), label: z.string().min(1) }),
  ),
  skills: z.array(
    z.object({ group: z.string().min(1), items: z.array(z.string()).min(1) }),
  ),
  experience: z.array(
    z.object({
      organization: z.string().min(1),
      role: z.string().min(1),
      period: z.string().min(1),
      description: z.string().min(30),
      highlights: z.array(z.string().min(20)).min(1),
    }),
  ),
  education: z.array(
    z.object({
      institution: z.string().min(1),
      course: z.string().min(1),
      period: z.string().min(1),
    }),
  ),
  learning: z.object({
    courses: z.object({
      completed: z.array(z.object({ title: z.string(), provider: z.string() })),
      current: z.array(z.object({ title: z.string(), provider: z.string() })),
    }),
    books: z.object({
      completed: z.array(
        z.object({
          title: z.string(),
          author: z.string(),
          href: z.string().url(),
          cover: z.string().startsWith("/livros/"),
        }),
      ),
      current: z.array(
        z.object({
          title: z.string(),
          author: z.string(),
          href: z.string().url(),
          cover: z.string().startsWith("/livros/"),
        }),
      ),
    }),
  }),
  projects: z.array(projectSchema).min(1),
});

export type ProjectCase = z.infer<typeof projectSchema>;

export const portfolio = portfolioSchema.parse({
  siteUrl: "https://eduardomelo.dev",
  name: "Eduardo de Melo",
  title: "Desenvolvedor de Software",
  role: "Desenvolvedor de Software | Java, Spring Boot e APIs REST",
  location: "Ouro Branco, MG",
  email: "eduardo.melo01992@gmail.com",
  introduction:
    "Desenvolvo aplicações web com foco em backend Java, segurança, testes e entrega contínua. Também construo interfaces em React para acompanhar o produto de ponta a ponta.",
  about: [
    "Sou bacharel em Sistemas de Informação, com cerca de 3 anos de experiência em desenvolvimento no setor público e como cofundador de um SaaS próprio.",
    "Atuo da modelagem dos dados à entrega em produção. No backend, trabalho com Java, Spring Boot, APIs REST e bancos relacionais. No frontend, uso React e TypeScript para integrar jornadas completas com clareza e acessibilidade.",
    "Procuro oportunidades como Desenvolvedor de Software, Desenvolvedor Backend Java ou Desenvolvedor Full Stack com predominância de Java, nos níveis júnior ou pleno.",
  ],
  social: {
    github: "https://github.com/asmeduardo",
    linkedin: "https://www.linkedin.com/in/meloeduardo92",
  },
  impact: [
    { value: "≈3 anos", label: "de experiência em desenvolvimento" },
    { value: "10 mil+", label: "downloads na Google Play" },
    {
      value: "≈3,6 mil",
      label:
        "dispositivos ativos mensalmente no Cálculo Psicrométrico (jul/2025)",
    },
    { value: "72,28 → 89,64", label: "evolução real na avaliação SUS" },
  ],
  skills: [
    {
      group: "Backend e APIs",
      items: [
        "Java 21/25",
        "Spring Boot",
        "Spring MVC",
        "Spring Data JPA",
        "Spring Security",
        "Hibernate",
        "REST",
        "Kafka",
        "OAuth 2.0",
        "JWT",
      ],
    },
    {
      group: "Dados e testes",
      items: [
        "PostgreSQL",
        "MySQL",
        "SQL",
        "JUnit 5",
        "Mockito",
        "Testcontainers",
        "Vitest",
        "Playwright",
      ],
    },
    {
      group: "Frontend, nuvem e entrega",
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Capacitor",
        "Maven",
        "Git/GitHub",
        "Docker",
        "AWS",
        "CI/CD",
        "Linux",
        "VPS",
      ],
    },
    { group: "Observabilidade", items: ["Grafana", "Sentry", "Better Stack"] },
    {
      group: "IA no desenvolvimento",
      items: [
        "Claude Code",
        "Codex",
        "APIs de LLM (OpenAI)",
        "Saídas estruturadas",
      ],
    },
  ],
  experience: [
    {
      organization: "Vigoru",
      role: "Cofundador e Desenvolvedor",
      period: "abr/2026 — atual",
      description:
        "SaaS de treinamento lançado na web, Android e iOS, com gestão de alunos, treinos, nutrição, agenda, pagamentos e vitrine de personais.",
      highlights: [
        "Cofundei e desenvolvo o Vigoru, SaaS de treinamento recém-lançado na web, Android e iOS.",
        "Liderei a arquitetura e desenvolvi as APIs REST com Java 21, Spring Boot e PostgreSQL; construí a aplicação multiplataforma em React, TypeScript e Capacitor.",
        "Implementei testes automatizados com JUnit, Mockito, Testcontainers, Vitest e Playwright; implantação com Docker em VPS Linux e monitoramento com Grafana, Sentry e Better Stack.",
      ],
    },
    {
      organization: "ECOTRES (consórcio público)",
      role: "Desenvolvedor Full Stack — estágio",
      period: "out/2025 — abr/2026",
      description:
        "Desenvolvimento de plataformas web que digitalizaram capacitação, frota, patrimônio e operação do aterro sanitário.",
      highlights: [
        "Criei o EcoSelo, portal de cursos on-line com certificado digital automático, que substituiu turmas presenciais que levavam semanas; 27 empresas certificadas na fase inicial.",
        "Desenvolvi o EcoFrota, sistema web mobile de agendamento e registro de viagens que substituiu planilhas e controle em papel, com checklist semanal por fotos e relatórios de combustível, quilometragem, destinos e uso da frota.",
        "Automatizei o cadastro patrimonial com descrições geradas por IA e consulta por código de barras.",
        "Digitalizei as pesagens do aterro, eliminando ~10 viagens mensais (~240 km) para levar tickets à sede, com economia estimada de R$ 150/mês em combustível.",
        "Substituí o deploy manual por FTP (~30 min por publicação) por CI/CD com Docker e testes automatizados em Linux, com publicação automática a cada push.",
      ],
    },
    {
      organization: "Prefeitura Municipal de Ouro Branco",
      role: "Desenvolvedor Full Stack — estágio",
      period: "mai/2023 — mai/2025",
      description:
        "Manutenção e evolução do SIGA, sistema multi-tenant de gestão ambiental usado por cidadãos e servidores.",
      highlights: [
        "Mantive e evoluí o SIGA, sistema multi-tenant de gestão ambiental (PHP, MySQL e JavaScript) em produção em Ouro Branco, com mais de 500 acessos mensais a processos ambientais e tributários.",
        "Criei o módulo IPTU Verde (projeto vencedor do processo seletivo do estágio), que levou para o on-line os pedidos de desconto de até 10% no IPTU por práticas sustentáveis; mais de 320 requerimentos realizados.",
        "Identifiquei e corrigi uma vulnerabilidade crítica de IDOR/BOLA que expunha requerimentos de outros cidadãos pela troca do ID na URL, aplicando verificação de autorização no servidor e permissões de visualização e edição (RBAC).",
      ],
    },
  ],
  education: [
    {
      institution: "Instituto Federal de Minas Gerais — IFMG",
      course: "Bacharelado em Sistemas de Informação",
      period: "mai/2021 — jan/2026",
    },
  ],
  learning: {
    courses: {
      completed: [
        { title: "Java Spring Profissional", provider: "DevSuperior" },
        {
          title: "The Complete JavaScript Course",
          provider: "Udemy · Jonas Schmedtmann",
        },
      ],
      current: [],
    },
    books: {
      completed: [
        {
          title: "Código Limpo",
          author: "Robert C. Martin",
          href: "https://www.amazon.com.br/s?k=9788576082675",
          cover: "/livros/codigo-limpo.jpg",
        },
        {
          title: "Arquitetura Limpa",
          author: "Robert C. Martin",
          href: "https://www.amazon.com.br/s?k=9788550804606",
          cover: "/livros/arquitetura-limpa.jpg",
        },
        {
          title: "Refatoração",
          author: "Martin Fowler",
          href: "https://www.amazon.com.br/s?k=9788575227244",
          cover: "/livros/refatoracao.jpg",
        },
        {
          title: "Domain-Driven Design",
          author: "Eric Evans",
          href: "https://www.amazon.com.br/s?k=9788550800653",
          cover: "/livros/domain-driven-design.jpg",
        },
        {
          title: "Padrões de Projeto",
          author: "Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides",
          href: "https://www.amazon.com.br/s?k=9788573076103",
          cover: "/livros/padroes-de-projeto.jpg",
        },
        {
          title: "O Programador Pragmático",
          author: "Andrew Hunt e David Thomas",
          href: "https://www.amazon.com.br/s?k=9788582606872",
          cover: "/livros/programador-pragmatico.jpg",
        },
      ],
      current: [],
    },
  },
  projects: [
    {
      slug: "calculo-psicrometrico",
      title: "Cálculo Psicrométrico",
      eyebrow: "TCC · App Android em Java publicado",
      summary:
        "Modernização em Java de um aplicativo Android técnico usado no agronegócio e em processos industriais.",
      status: "Publicado",
      privateCode: true,
      featured: true,
      metrics: [
        { value: "10 mil+", label: "downloads na Google Play" },
        { value: "4,6", label: "nota na Google Play" },
        {
          value: "≈3,6 mil",
          label: "dispositivos ativos mensalmente (julho de 2025)",
        },
        { value: "+17,36", label: "pontos na escala SUS" },
        { value: "89,64", label: "avaliação final de usabilidade" },
      ],
      technologies: [
        "Java",
        "Android",
        "UX",
        "System Usability Scale",
        "Pesquisa com usuários",
      ],
      problem: [
        "Profissionais e estudantes precisavam calcular propriedades psicrométricas do ar em uma experiência móvel clara e confiável.",
        "A interface existente exigia uma revisão que reduzisse atritos sem comprometer o caráter técnico do produto.",
      ],
      contribution: [
        "Modernizei em Java o app Android de cálculo psicrométrico criado pelo professor Saulo Henrique Cabral Silva em 2018, sob a orientação dele, como trabalho de conclusão de curso.",
        "As mudanças partiram de avaliações da loja e da literatura técnica e conciliaram requisitos técnicos, organização visual e avaliação estruturada de usabilidade.",
      ],
      decisions: [
        "As mudanças foram avaliadas com a System Usability Scale para que a evolução da experiência não dependesse apenas de percepção subjetiva.",
        "O código permanece privado por acordo de confidencialidade e proteção de propriedade intelectual; o case usa somente evidências públicas.",
      ],
      results: [
        "A pontuação média da System Usability Scale aumentou de 72,28 para 89,64, alcançando a faixa excelente.",
        "Em julho de 2025, o artigo do projeto registrou cerca de 3.600 dispositivos ativos. Essa medida não equivale a usuários ativos mensais.",
        "O aplicativo mantém mais de 10 mil downloads e nota 4,6 na Google Play.",
      ],
      links: [
        {
          label: "Ver na Google Play",
          href: "https://play.google.com/store/apps/details?id=ifmg.grapsidroid&hl=pt_BR",
        },
        {
          label: "Ler o artigo no IFMG",
          href: "https://www.ifmg.edu.br/ourobranco/nossos-cursos/graduacao-6/anais_do_v_wsi_2025_compressed.pdf",
        },
      ],
      galleryLayout: "mobile",
      gallery: [
        {
          src: "/projetos/calculo-psicrometrico/inicio-google-play.jpg",
          width: 956,
          height: 1920,
          alt: "Tela inicial do aplicativo Cálculo Psicrométrico com acesso aos cálculos e simulações.",
          title: "Visão inicial",
          caption: "Tela inicial publicada na Google Play.",
        },
        {
          src: "/projetos/calculo-psicrometrico/ponto-estado-google-play.jpg",
          width: 956,
          height: 1920,
          alt: "Formulário do aplicativo para calcular propriedades do ar a partir dos dados de entrada.",
          title: "Ponto de estado",
          caption: "Entrada de parâmetros publicada na Google Play.",
        },
        {
          src: "/projetos/calculo-psicrometrico/simulacao-google-play.jpg",
          width: 956,
          height: 1920,
          alt: "Tela de simulação de processos do aplicativo Cálculo Psicrométrico.",
          title: "Simulação de processos",
          caption: "Fluxo de simulação publicado na Google Play.",
        },
      ],
      reviewScreenshots: [
        {
          src: "/projetos/calculo-psicrometrico/avaliacao-julho-2025.png",
          width: 1312,
          height: 358,
          alt: "Avaliação de cinco estrelas publicada na Google Play em 24 de julho de 2025.",
          caption:
            "Julho de 2025: avaliação publicada após a medição de usabilidade relatada no artigo.",
        },
        {
          src: "/projetos/calculo-psicrometrico/avaliacao-maio-2024.png",
          width: 1312,
          height: 358,
          alt: "Avaliação de cinco estrelas da Google Play que relata o uso do aplicativo no trabalho.",
          caption:
            "Maio de 2024: relato de uso profissional, anterior à avaliação do redesenho.",
        },
        {
          src: "/projetos/calculo-psicrometrico/avaliacao-abril-2024.png",
          width: 1312,
          height: 436,
          alt: "Avaliação de quatro estrelas da Google Play sobre o uso prático do aplicativo para ar-condicionado.",
          caption:
            "Abril de 2024: comentário sobre a praticidade do aplicativo, anterior ao redesenho.",
        },
      ],
    },
    {
      slug: "sistemas-ecotres",
      title: "Sistemas da ECOTRES",
      eyebrow: "Digitalização de processos",
      summary:
        "Conjunto de plataformas internas para capacitação, frota, patrimônio e operação de aterro sanitário.",
      status: "Privado",
      privateCode: true,
      featured: true,
      metrics: [
        {
          value: "27",
          label: "empresas certificadas pelo EcoSelo na fase inicial",
        },
        {
          value: "~240 km",
          label: "por mês deixaram de ser percorridos com tickets do aterro",
        },
        { value: "R$ 150/mês", label: "de economia estimada em combustível" },
        {
          value: "~30 min → push",
          label: "deploy manual por FTP trocado por CI/CD",
        },
      ],
      technologies: [
        "Aplicações web",
        "Docker",
        "CI/CD",
        "Linux",
        "Testes automatizados",
      ],
      problem: [
        "Cursos presenciais e rotinas apoiadas em planilhas impressas criavam deslocamentos, retrabalho e informação fragmentada.",
      ],
      contribution: [
        "Criei o EcoSelo, portal de cursos on-line com certificado digital automático.",
        "Desenvolvi o EcoFrota, para agendamento e registro de viagens com checklist semanal por fotos e relatórios de uso da frota.",
        "Automatizei o cadastro patrimonial com descrições geradas por IA e consulta por código de barras, e digitalizei as pesagens do aterro.",
      ],
      decisions: [
        "Os fluxos foram modelados a partir das rotinas reais de cada equipe para centralizar dados sem perder a rastreabilidade operacional.",
        "A entrega incluiu implantação em Linux, containers, CI/CD e testes automatizados.",
      ],
      results: [
        "A capacitação passou a ser on-line, substituindo turmas presenciais que levavam semanas; 27 empresas foram certificadas na fase inicial.",
        "O EcoFrota substituiu planilhas e controle em papel, eliminando registros esquecidos e perdidos.",
        "A digitalização das pesagens eliminou ~10 viagens mensais (~240 km) até a sede, com economia estimada de R$ 150/mês em combustível.",
        "Cada push passou a publicar automaticamente após os testes, no lugar de ~30 minutos de deploy manual por FTP.",
      ],
      links: [],
      galleryLayout: "desktop",
      gallery: [
        {
          src: "/projetos/ecotres/aterro-demonstracao.png",
          width: 1672,
          height: 941,
          alt: "Painel demonstrativo do aterro, com indicadores de operação e gráficos de permanência.",
          title: "Operação do aterro",
          caption:
            "Indicadores e gráficos para acompanhar os registros e o tempo de permanência. Os números são fictícios.",
        },
        {
          src: "/projetos/ecotres/frota-demonstracao.png",
          width: 1640,
          height: 959,
          alt: "Painel demonstrativo do sistema de frota, com indicadores de viagens e veículos.",
          title: "Gestão de frota",
          caption:
            "Painel com indicadores de viagens e disponibilidade da frota. Os dados exibidos são fictícios.",
        },
        {
          src: "/projetos/ecotres/ecoselo-demonstracao.png",
          width: 1474,
          height: 1067,
          alt: "Tela demonstrativa dos módulos de treinamento e do progresso na plataforma EcoSelo.",
          title: "Capacitação no EcoSelo",
          caption:
            "Trilha de treinamento com módulos e atividades. O progresso exibido é fictício.",
        },
        {
          src: "/projetos/ecotres/patrimonio-cadastro.png",
          width: 1253,
          height: 865,
          alt: "Primeira etapa do cadastro de patrimônio, com área para envio de imagens.",
          title: "Cadastro patrimonial",
          caption:
            "Etapa de envio de imagens no cadastro de patrimônio, sem registros internos expostos.",
        },
      ],
    },
    {
      slug: "vigoru",
      title: "Vigoru",
      eyebrow: "SaaS lançado · código privado",
      summary:
        "SaaS de treinamento lançado na web, Android e iOS, com gestão de alunos, treinos, nutrição, agenda, pagamentos e vitrine de personais.",
      status: "Lançado",
      privateCode: true,
      featured: true,
      metrics: [],
      technologies: [
        "Java 21",
        "Spring Boot",
        "PostgreSQL",
        "React",
        "TypeScript",
        "Capacitor",
        "JUnit",
        "Mockito",
        "Testcontainers",
        "Vitest",
        "Playwright",
        "Docker",
        "Grafana",
        "Sentry",
        "Better Stack",
      ],
      problem: [
        "Personal trainers precisam organizar alunos, treinos, nutrição, agenda e cobranças em um único lugar, acessível no computador e no celular.",
      ],
      contribution: [
        "Cofundei e desenvolvo o Vigoru, com gestão de alunos, treinos, nutrição, agenda, pagamentos e vitrine de personais.",
        "Liderei a arquitetura e desenvolvi as APIs REST com Java 21, Spring Boot e PostgreSQL; construí a aplicação multiplataforma em React, TypeScript e Capacitor.",
        "Implementei testes automatizados com JUnit, Mockito, Testcontainers, Vitest e Playwright.",
      ],
      decisions: [
        "Uma única aplicação em React e TypeScript, empacotada com Capacitor, atende web, Android e iOS.",
        "A implantação usa Docker em VPS Linux, com monitoramento por Grafana, Sentry e Better Stack.",
        "O case não expõe código, dados de clientes nem estratégia interna do produto.",
      ],
      results: [
        "Produto lançado na web, Android e iOS; métricas de uso serão publicadas somente quando houver evidências verificáveis.",
      ],
      links: [{ label: "Conhecer o Vigoru", href: "https://vigoru.fit" }],
      galleryLayout: "desktop",
      gallery: [],
    },
  ],
});

export function getProject(slug: string): ProjectCase | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}
