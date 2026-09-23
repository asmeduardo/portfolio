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
  status: z.enum(["Publicado", "Privado", "Em desenvolvimento"]),
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
});

const portfolioSchema = z.object({
  siteUrl: z.string().url(),
  name: z.string().min(1),
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
  projects: z.array(projectSchema).min(1),
});

export type ProjectCase = z.infer<typeof projectSchema>;

export const portfolio = portfolioSchema.parse({
  siteUrl: "https://eduardomelo.dev",
  name: "Eduardo Melo",
  role: "Engenheiro de Software | Java & Spring Boot | Backend, APIs REST e React",
  location: "Minas Gerais, Brasil",
  email: "eduardo.melo01992@gmail.com",
  introduction:
    "Desenvolvo aplicações web com foco em backend Java, segurança, testes e entrega contínua. Também construo interfaces em React para acompanhar o produto de ponta a ponta.",
  about: [
    "Sou bacharel em Sistemas de Informação e tenho mais de dois anos de experiência no desenvolvimento, na implantação e na manutenção de aplicações web para órgãos públicos.",
    "Atuo da modelagem dos dados à entrega em produção. No backend, trabalho com Java, Spring Boot, APIs REST e bancos relacionais. No frontend, uso React e TypeScript para integrar jornadas completas com clareza e acessibilidade.",
    "Procuro oportunidades como Engenheiro de Software, Desenvolvedor Backend Java ou Desenvolvedor Full Stack com predominância de Java, nos níveis júnior ou pleno inicial.",
  ],
  social: {
    github: "https://github.com/asmeduardo",
    linkedin: "https://www.linkedin.com/in/meloeduardo92",
  },
  impact: [
    { value: "2+ anos", label: "de experiência em aplicações web" },
    { value: "10 mil+", label: "downloads em produto publicado" },
    { value: "72,28 → 89,64", label: "evolução real na avaliação SUS" },
  ],
  skills: [
    {
      group: "Backend",
      items: [
        "Java 17/21",
        "Spring Boot",
        "Spring MVC",
        "Spring Data JPA",
        "Spring Security",
      ],
    },
    {
      group: "APIs e dados",
      items: [
        "REST",
        "HTTP/JSON",
        "PostgreSQL",
        "SQL",
        "JPA/Hibernate",
        "OAuth 2.0",
        "JWT",
      ],
    },
    {
      group: "Qualidade e entrega",
      items: [
        "JUnit 5",
        "Mockito",
        "Testcontainers",
        "Docker",
        "CI/CD",
        "Maven",
        "Linux",
      ],
    },
    {
      group: "Frontend complementar",
      items: ["React", "TypeScript", "HTML", "CSS", "Acessibilidade"],
    },
  ],
  experience: [
    {
      organization: "ECOTRES",
      role: "Desenvolvedor Full Stack — estágio",
      period: "out/2025 — abr/2026",
      description:
        "Desenvolvimento de plataformas web que digitalizaram processos de capacitação e rotinas operacionais.",
      highlights: [
        "Desenvolvi a plataforma EcoSelo para capacitação on-line e emissão de certificados.",
        "Criei um sistema de gestão de frota que substituiu planilhas impressas no arquivamento, no agendamento e no início das viagens.",
        "Implantei aplicações em servidores Linux com Docker, CI/CD e testes automatizados.",
      ],
    },
    {
      organization: "Prefeitura Municipal de Ouro Branco",
      role: "Desenvolvedor Full Stack — estágio",
      period: "mai/2023 — mai/2025",
      description:
        "Manutenção e evolução do SIGA, sistema usado por cidadãos e pela administração municipal.",
      highlights: [
        "Implementei controles de autorização que impediram o acesso a registros pertencentes a outros usuários.",
        "Entreguei o módulo IPTU Verde, ativação de contas por e-mail e interfaces responsivas.",
        "Automatizei a implantação da aplicação em um servidor VPS Linux.",
      ],
    },
  ],
  education: [
    {
      institution: "Instituto Federal de Minas Gerais — IFMG",
      course: "Bacharelado em Sistemas de Informação",
      period: "mai/2021 — jan/2026",
    },
    {
      institution: "DevSuperior",
      course: "Java Spring Profissional",
      period: "nov/2024 — jun/2025",
    },
  ],
  projects: [
    {
      slug: "calculo-psicrometrico",
      title: "Calculo Psicrometrico",
      eyebrow: "Produto Android publicado",
      summary:
        "Redesenho e reescrita da interface de um aplicativo técnico usado no agronegócio e em processos industriais.",
      status: "Publicado",
      featured: true,
      metrics: [
        { value: "10 mil+", label: "downloads na Google Play" },
        { value: "+17,36", label: "pontos na escala SUS" },
        { value: "89,64", label: "avaliação final de usabilidade" },
      ],
      technologies: [
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
        "Participei do redesenho e da reescrita da interface sob orientação do professor Saulo Henrique Cabral Silva.",
        "O trabalho conciliou requisitos técnicos, organização visual e avaliação estruturada de usabilidade.",
      ],
      decisions: [
        "As mudanças foram avaliadas com a System Usability Scale para que a evolução da experiência não dependesse apenas de percepção subjetiva.",
        "O código permanece privado por acordo de confidencialidade e proteção de propriedade intelectual; o case usa somente evidências públicas.",
      ],
      results: [
        "A pontuação média da System Usability Scale aumentou de 72,28 para 89,64, alcançando a faixa excelente.",
        "O aplicativo mantém mais de 10 mil downloads na Google Play.",
      ],
      links: [
        {
          label: "Ver na Google Play",
          href: "https://play.google.com/store/apps/details?id=ifmg.grapsidroid&hl=pt_BR",
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
      featured: true,
      metrics: [],
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
        "Desenvolvi a plataforma EcoSelo para capacitação on-line e emissão de certificados.",
        "Criei um sistema de gestão de frota e projetei soluções internas para controle patrimonial e atividades do aterro sanitário.",
      ],
      decisions: [
        "Os fluxos foram modelados a partir das rotinas reais de cada equipe para centralizar dados sem perder a rastreabilidade operacional.",
        "A entrega incluiu implantação em Linux, containers, CI/CD e testes automatizados.",
      ],
      results: [
        "A capacitação passou a ser oferecida on-line, eliminando a necessidade de deslocamento para realizar os cursos.",
        "O sistema de frota substituiu planilhas impressas no arquivamento, no agendamento e no início das viagens.",
      ],
      links: [],
    },
    {
      slug: "vigoru",
      title: "VigorU",
      eyebrow: "Produto privado em construção",
      summary:
        "Plataforma de treino com marketplace, acompanhamento profissional e experiências web e mobile integradas.",
      status: "Em desenvolvimento",
      featured: true,
      metrics: [],
      technologies: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "React",
        "TypeScript",
        "Flutter",
      ],
      problem: [
        "O produto organiza a prescrição, o registro e o acompanhamento de treinos entre clientes e profissionais.",
      ],
      contribution: [
        "Desenvolvo o backend, a aplicação web e a integração com a experiência móvel de um produto multilíngue.",
      ],
      decisions: [
        "A arquitetura mantém responsabilidades claras entre backend, web e aplicativo, com contratos explícitos entre as interfaces.",
        "O case permanece em alto nível enquanto o produto não é lançado, sem expor código, dados ou estratégia interna.",
      ],
      results: [
        "O desenvolvimento permanece ativo; resultados de uso serão publicados somente quando houver evidências verificáveis.",
      ],
      links: [],
    },
    {
      slug: "radar-de-vagas",
      title: "Radar de Vagas",
      eyebrow: "Automação e rastreabilidade",
      summary:
        "Plataforma privada para descobrir oportunidades, avaliar aderência e acompanhar candidaturas com evidências.",
      status: "Em desenvolvimento",
      featured: true,
      metrics: [],
      technologies: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "React",
        "TypeScript",
        "Playwright",
        "CI/CD",
      ],
      problem: [
        "A busca distribuída em diversas fontes torna difícil acompanhar oportunidades, decisões e estados de candidatura.",
      ],
      contribution: [
        "Desenvolvo a modelagem de domínio, o backend, a interface e os fluxos automatizados de descoberta e acompanhamento.",
      ],
      decisions: [
        "Cada candidatura possui estado, próxima ação e evidência; um envio só é confirmado quando o portal apresenta um estado terminal verificável.",
        "Dados pessoais, sessões autenticadas, regras operacionais e código do produto permanecem privados.",
      ],
      results: [
        "O produto está em evolução contínua; o portfólio descreve a engenharia sem divulgar dados pessoais ou prometer resultados não confirmados.",
      ],
      links: [],
    },
  ],
});

export function getProject(slug: string): ProjectCase | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}
