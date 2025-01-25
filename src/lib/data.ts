import { About } from '@/types/About'
import { Education } from '@/types/Education'
import { Experience } from '@/types/Experience'
import { Project } from '@/types/Project'
import { Skills } from '@/types/Skill'

export const about: About = {
  name: 'Robson H. Rodrigues',
  title: 'Desenvolvedor Web',
  description:
    'Olá, sou Robson, Desenvolvedor Web de Jundiaí - SP, Brasil. Com experiência em desenvolvimento web e mobile, foco em aplicações escaláveis e otimizadas. Conhecimentos em',
  email: 'robhenrod@gmail.com',
  address: 'Jundiaí - São Paulo / Brasil',
  social: {
    github: 'https://github.com/Robson16',
    gitlab: 'https://gitlab.com/Robson16',
    linkedin: 'https://www.linkedin.com/in/robson-h-rodrigues-93341746/',
  },
  features: [
    {
      title: 'Desenvolvimento Web e Mobile',
      description:
        'Criação de aplicações web e mobile responsivas e escaláveis, utilizando tecnologias modernas para garantir alta performance, segurança e uma excelente experiência do usuário.',
      icon: {
        family: 'io5',
        name: 'IoCodeSlashOutline',
        color: '#059669',
      },
    },
    {
      title: 'API e Banco de Dados',
      description:
        'Desenvolvimento de APIs eficientes e bem estruturadas, garantindo integração fluida entre sistemas. Trabalho com bancos de dados relacionais e não relacionais, com foco em otimização e escalabilidade.',
      icon: {
        family: 'go',
        name: 'GoDatabase',
        color: '#9333EA',
      },
    },
    {
      title: 'Boas Práticas e Performance',
      description:
        'Aplicação de princípios como SOLID, TDD e DDD para garantir código limpo e sustentável. Implementação de estratégias para otimizar a performance das aplicações, seguindo as melhores práticas do mercado.',
      icon: {
        family: 'pi',
        name: 'PiLightningLight',
        color: '#CA8A04',
      },
    },
  ],
}

export const skills: Skills = {
  technical: [
    { name: 'JavaScript', value: 90 },
    { name: 'TypeScript', value: 80 },
    { name: 'ReactJS', value: 70 },
    { name: 'NodeJS', value: 75 },
    { name: 'PHP', value: 80 },
    { name: 'WordPress', value: 90 },
    { name: 'Java', value: 40 },
  ],
  professional: [
    { name: 'Resolução de Problemas', value: 90 },
    { name: 'Trabalho em Equipe', value: 80 },
    { name: 'Gerenciamento de Projetos', value: 86 },
    { name: 'Autodidatismo', value: 90 },
  ],
}

export const projects: Project[] = [
  {
    id: 1,
    featured: true,
    featuredImage: {
      title: 'DF Checker',
      src: '/projects/dfchecker.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'DF Checker',
    subheading: 'Inteligente e confiável',
    description:
      'Tema personalizado para WordPress, desenvolvido para o **DF Checker**, uma empresa que oferece serviços ágeis e confiáveis de background checks, utilizando sistemas integrados e capacidades analíticas. Foi construído utilizando tecnologias como WordPress, SASS, Node.js, Webpack e Babel, garantindo um código eficiente para estilização e funcionalidade.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
    url: 'https://dfchecker.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 2,
    featured: false,
    featuredImage: {
      title: 'Micro Plant',
      src: '/projects/microplant.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Micro Plant',
    subheading: 'Soluções em próteses com excelência',
    description:
      'Desenvolvimento de um tema WordPress personalizado para a Micro Plant, uma empresa líder na fabricação de componentes para próteses sobre implantes desde 2004. O site reflete os valores de inovação, qualidade e integridade da marca, proporcionando uma plataforma funcional e otimizada para atender aos profissionais da saúde. Utilizando SASS, Node.js e Gulp, o projeto oferece alto desempenho e flexibilidade.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Gulp'],
    url: 'https://www.microplant.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 3,
    featured: true,
    featuredImage: {
      title: 'Tucan Travel',
      src: '/projects/tucantravel.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Tucan',
    subheading: 'Explorando o mundo com estilo',
    description:
      'Desenvolvimento de um tema WordPress personalizado para a Tucan Travel, focado em criar uma experiência visual moderna e funcional para uma agência de viagens. O projeto utilizou SASS, Node.js, Webpack e Babel para garantir um site otimizado e com uma navegação fluida.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
  },
  {
    id: 4,
    featured: false,
    featuredImage: {
      title: 'Smile Lovers',
      src: '/projects/smilelovers.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Smile Lovers',
    subheading: 'Cuidando de sorrisos com tecnologia',
    description:
      'Desenvolvimento de um tema WordPress personalizado para a Smile Lovers, uma clínica odontológica que alia tecnologia avançada e acolhimento em seus serviços. O site foi projetado para refletir a missão da empresa: transformar a experiência odontológica em algo mais humano e confortável, criando um ambiente convidativo e moderno. Construído com SASS, Node.js, Webpack e Babel, o projeto entrega alta performance e flexibilidade.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
    url: 'https://www.smilelovers.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 5,
    featured: false,
    featuredImage: {
      title: 'Lux Energia',
      src: '/projects/luxenergia.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Lux Energia',
    subheading: 'Nossa energia é nosso diferencial',
    description:
      'Desenvolvimento de um tema WordPress personalizado e um plugin exclusivo para a Lux Energia. O tema reflete a expertise da empresa em economia energética, enquanto o plugin adiciona um bloco interativo de cálculo de CO2 ao site. Utilizando tecnologias como SASS, Node.js, React.js, Webpack, Styled Components e Babel, o projeto combina performance otimizada com uma experiência de usuário moderna.',
    technologies: [
      'WordPress',
      'SASS',
      'Node.js',
      'React.js',
      'Webpack',
      'Styled Components',
      'Babel',
    ],
  },
  {
    id: 6,
    featured: true,
    featuredImage: {
      title: 'Grupo Planta',
      src: '/projects/grupoplanta.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Grupo Planta',
    subheading: 'Sustentabilidade em cada linha de código',
    description:
      'Desenvolvimento de um WordPress Block Theme para o Grupo Planta, referência em inovação e alimentos plant-based. Este tipo de tema utiliza o editor de blocos do WordPress (Gutenberg) para oferecer personalização completa e flexível de todas as partes do site. Construído com SASS, Node.js, Webpack e Babel, o projeto combina design moderno, alta performance e alinhamento com os valores sustentáveis do grupo.',
    technologies: [
      'WordPress Block Theme',
      'SASS',
      'Node.js',
      'Webpack',
      'Babel',
    ],
  },
  {
    id: 7,
    featured: false,
    featuredImage: {
      title: 'Menu Planta',
      src: '/projects/menuplanta.jpg',
      width: 1200,
      height: 800,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Menu Planta',
    subheading: 'Expandindo o plant-based pelo mundo',
    description:
      'Desenvolvimento de um site para o Menu Planta, utilizando o mesmo WordPress Block Theme flexível criado para o Grupo Planta. A plataforma B2B de food service oferece produtos 100% vegetais para estabelecimentos alimentícios, promovendo opções inclusivas e sustentáveis. O site reflete a missão de expandir a gastronomia vegana, adaptando-se a diferentes culturas e mercados internacionais, com foco em cidades como São Paulo, Nova Iorque, Londres, Miami, Amsterdam e Tel Aviv.',
    technologies: [
      'WordPress Block Theme',
      'SASS',
      'Node.js',
      'Webpack',
      'Babel',
      'React.js',
      'Styled Components',
    ],
  },
  {
    id: 8,
    featured: false,
    featuredImage: {
      title: 'Higi Mulher',
      src: '/projects/higimulher.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Higi Mulher',
    subheading: 'Saúde íntima feminina sem tabus',
    description:
      'Este é um tema personalizado para WordPress, desenvolvido para a Higi Mulher, uma marca dedicada à saúde íntima feminina. A proposta é promover diálogos significativos sobre o cuidado íntimo, empoderando as mulheres e respeitando a diversidade. O projeto utiliza tecnologias como WordPress, SASS, Node.js, Webpack e Babel para garantir um código limpo, organizado e otimizado, oferecendo o melhor para as usuárias.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
    url: 'https://higimulher.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 9,
    featured: true,
    featuredImage: {
      title: 'Castello Ruspoli',
      src: '/projects/castelloruspoli.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Castello Ruspoli',
    subheading: 'Elegante e otimizado',
    description:
      'Um tema personalizado para WordPress, desenvolvido para o site do histórico Castello Ruspoli, um castelo com origens que remontam a 847. Utiliza tecnologias como WordPress, SASS para estilização, Node.js para a automação de tarefas, Webpack para empacotamento de módulos e Babel para a transpilação de JavaScript, visando garantir um código otimizado e eficiente tanto para a parte visual quanto para a funcionalidade.',
    technologies: [
      'WordPress',
      'WooCommerce',
      'SASS',
      'Node.js',
      'Webpack',
      'Babel',
    ],
    url: 'https://castelloruspoli.com/',
    urlLabel: 'Visitar site',
  },
  {
    id: 10,
    featured: false,
    featuredImage: {
      title: 'BMG Seguros',
      src: '/projects/bmgseguros.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'BMG Seguros',
    subheading: 'Inovação e segurança no mercado de seguros',
    description:
      'Desenvolvimento de um tema WordPress personalizado para a BMG Seguros, uma seguradora brasileira especializada em Seguro Garantia e P&C. O site foi projetado para refletir a cultura de inovação e excelência da empresa, oferecendo uma interface moderna e funcional para clientes e parceiros. O projeto utilizou SASS, Node.js, Webpack e Babel, garantindo alta performance e flexibilidade.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
    url: 'https://bmgseguros.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 11,
    featured: false,
    featuredImage: {
      title: 'Triar',
      src: '/projects/triar.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Triar',
    subheading: 'Conectando eficiência e qualidade',
    description:
      'Desenvolvimento de um tema WordPress personalizado para a Triar, uma empresa referência na comercialização de componentes elétricos industriais. O site reflete a sinergia e flexibilidade da empresa, com foco em apresentar produtos de qualidade e informações claras para os clientes. Utilizando SASS, Node.js, Webpack e Babel, o projeto entrega alta performance e um design moderno e funcional.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
    url: 'https://grupotriar.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 12,
    featured: false,
    featuredImage: {
      title: 'Baby Dufy',
      src: '/projects/babydufy.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Baby Dufy',
    subheading: 'E-commerce com amor e qualidade',
    description:
      'Desenvolvimento de um tema WordPress personalizado para o e-commerce Baby Dufy, focado em produtos de alta qualidade para bebês. O site foi projetado para criar uma experiência de compra intuitiva e acolhedora, utilizando WooCommerce para gestão de produtos e vendas. Com tecnologias como SASS, Node.js, Webpack e Babel, o projeto entrega alta performance e um design pensado para encantar os clientes.',
    technologies: [
      'WordPress',
      'WooCommerce',
      'SASS',
      'Node.js',
      'Webpack',
      'Babel',
    ],
    url: 'http://babydufy.com.br/',
    urlLabel: 'Visitar site',
  },
  {
    id: 13,
    featured: false,
    featuredImage: {
      title: 'Agência B&B',
      src: '/projects/agenciabeb.jpg',
      width: 1200,
      height: 900,
    },
    gallery: [],
    category: 'WordPress',
    heading: 'Agência B&B',
    subheading: 'Criatividade e inovação em cada projeto',
    description:
      'Desenvolvimento de um tema WordPress personalizado para a Agência B&B, uma agência de publicidade onde tive a oportunidade de criar diversos trabalhos significativos. O site foi projetado para refletir a essência criativa e dinâmica da agência, com foco em destacar o portfólio e facilitar a conexão com clientes. Utilizando tecnologias como SASS, Node.js, Webpack e Babel, o projeto combina um design limpo e funcionalidade otimizada.',
    technologies: ['WordPress', 'SASS', 'Node.js', 'Webpack', 'Babel'],
    url: 'http://www.agenciabeb.com.br/',
    urlLabel: 'Visitar site',
    repositories: [
      {
        type: 'Tema',
        platform: 'GitLab',
        url: 'https://gitlab.com/Robson16/agenciabeb',
      },
      {
        type: 'Plugin',
        platform: 'GitLab',
        url: 'https://gitlab.com/Robson16/agenciabeb-cpt',
      },
    ],
  },
]

export const experiences: Experience[] = [
  {
    title: 'Auxiliar de Informática',
    company: 'MEQSO GROUP',
    location: 'Jundiaí, SP',
    period: {
      start: 'Julho de 2024',
      end: 'Janeiro de 2025',
    },
    responsibilities: [
      'Suporte técnico aos usuários e manutenção de sistemas de TI.',
      'Manutenção preventiva e corretiva de hardware.',
      'Gerenciamento da infraestrutura de rede.',
    ],
  },
  {
    title: 'Desenvolvedor Front-End',
    company: 'Agência B&B',
    location: 'São Paulo, SP',
    period: {
      start: 'Setembro de 2021',
      end: 'Janeiro de 2024',
    },
    responsibilities: [
      'Desenvolvimento e manutenção de sites e landing pages.',
      'Codificação de temas e plugins personalizados em WordPress.',
      'Implementação de soluções responsivas e otimizadas para SEO.',
    ],
  },
  {
    title: 'Desenvolvedor Front-End',
    company: 'Vollup Creative Agency',
    location: 'São Paulo, SP',
    period: {
      start: 'Janeiro de 2021',
      end: 'Setembro de 2021',
    },
    responsibilities: [
      'Desenvolvimento de sites personalizados em WordPress.',
      'Criação de interfaces de usuário intuitivas.',
      'Manutenção contínua de plataformas.',
    ],
  },
  {
    title: 'Analista de Sistema',
    company: 'Agência io!',
    location: 'Jundiai, SP',
    period: {
      start: 'Novembro de 2020',
      end: 'Dezembro de 2020',
    },
    responsibilities: [
      'Contratação temporária para suporte web.',
      'Suporte técnico a múltiplos clientes e seus websites.',
      'Manutenção e otimização de plataformas CMS, com foco em WordPress',
    ],
  },
  {
    title: 'Desenvolvedor Web',
    company: 'Stratesign Publicidade Propaganda',
    location: 'Jundiaí, SP',
    period: {
      start: 'Março de 2019',
      end: 'Dezembro de 2019',
    },
    responsibilities: [
      'Desenvolvimento de sites e blogs para o setor imobiliário.',
      'Integração de sistemas de gestão de propriedades.',
      'Otimização para SEO e manutenção contínua.',
    ],
  },
  {
    title: 'Designer Web',
    company: 'AD-ONE Marketing Digital',
    location: 'Jundiaí, SP',
    period: {
      start: 'Julho de 2018',
      end: 'Janeiro de 2019',
    },
    responsibilities: [
      'Design e desenvolvimento de páginas institucionais.',
      'Criação de layouts funcionais e atraentes.',
      'Implementação de práticas de SEO.',
    ],
  },
  {
    title: 'Consultor de Sistemas',
    company: 'Grupo IV2',
    location: 'Jundiaí, SP',
    period: {
      start: 'Setembro de 2017',
      end: 'Fevereiro de 2018',
    },
    responsibilities: [
      'Desenvolvimento de soluções em JavaScript e AngularJS.',
      'Análise de requisitos e personalização de sistemas.',
      'Integração de sistemas e otimização de processos internos.',
    ],
  },
  {
    title: 'Designer Web',
    company: 'Agência Jundiaí - Internet, Marketing, Propaganda e Comunicação',
    location: 'Jundiaí, SP',
    period: {
      start: 'Maio de 2017',
      end: 'Junho de 2017',
    },
    responsibilities: [
      'Desenvolvimento de páginas web para pequenos negócios.',
      'Criação de layouts com foco na experiência do usuário.',
      'Implementação de soluções de gestão de conteúdo.',
    ],
  },
  {
    title: 'Vendedor',
    company: 'EletroNote',
    location: 'Jundiaí, SP',
    period: {
      start: 'Abril de 2015',
      end: 'Maio de 2017',
    },
    responsibilities: [
      'Venda de acessórios e computadores.',
      'Atendimento personalizado aos clientes.',
      'Manutenção de estoque e organização de vitrines.',
    ],
  },
  {
    title: 'Técnico de Infraestrutura Jr',
    company: 'Capgemini',
    location: 'Jundiaí, SP',
    period: {
      start: 'Março de 2014',
      end: 'Janeiro de 2015',
    },
    responsibilities: [
      'Instalação e configuração de equipamentos.',
      'Monitoramento de redes e suporte a usuários.',
      'Colaboração com a equipe de sistemas para manter a infraestrutura funcionando.',
    ],
  },
  {
    title: 'Suporte de TI',
    company: 'Centro de Estudos Britânicos de Jundiaí Ltda',
    location: 'Jundiaí, SP',
    period: {
      start: 'Março de 2013',
      end: 'Fevereiro de 2014',
    },
    responsibilities: [
      'Manutenção de redes e suporte a usuários.',
      'Configuração e manutenção de micros.',
      'Auxílio na implementação de campanhas de e-mail marketing.',
    ],
  },
  {
    title: 'Analista de Suporte',
    company: 'PCTec Soluções',
    location: 'Jundiaí, SP',
    period: {
      start: 'Fevereiro de 2013',
      end: 'Fevereiro de 2013',
    },
    responsibilities: [
      'Participação em projeto de rollout.',
      'Instalação e configuração de novos sistemas.',
      'Migração de dados e suporte pós-implantação.',
    ],
  },
  {
    title: 'Técnico de Suporte',
    company: 'GZ Sistemas',
    location: 'Jundiaí, SP',
    period: {
      start: 'Outubro de 2012',
      end: 'Janeiro de 2013',
    },
    responsibilities: [
      'Suporte telefônico a sistemas comercializados.',
      'Auxílio aos clientes na resolução de problemas técnicos.',
    ],
  },
  {
    title: 'Técnico de Informática',
    company: 'Note Express Comércio e Serviços de Informática',
    location: 'Jundiaí, SP',
    period: {
      start: 'Outubro de 2009',
      end: 'Março de 2012',
    },
    responsibilities: [
      'Manutenção e venda de computadores e acessórios.',
      'Diagnóstico e reparo de hardware, instalação de software.',
      'Atendimento ao cliente e soluções personalizadas.',
    ],
  },
]

export const education: Education[] = [
  {
    title: 'Análise de Sistemas',
    institution:
      'Fatec Jundiaí - Faculdade de Tecnologia - Deputado Ary Fossen',
    period: {
      start: 'Julho de 2024',
      end: 'Atualmente',
    },
    description:
      'Análise, projeto, documentação, teste, implantação e manutenção de sistemas computacionais, com foco em linguagens de programação, metodologias de projetos e garantia da qualidade e segurança dos sistemas.',
  },
  {
    title: 'Informática para Internet',
    institution: 'Etec Vasco Antônio Venchiarutti',
    period: {
      start: 'Julho de 2015',
      end: 'Dezembro de 2016',
    },
    description:
      'Desenvolvimento de aplicativos web e móveis, com foco em programação, design, banco de dados, marketing digital e empreendedorismo.',
  },
  {
    title: 'Gestão da Informação',
    institution:
      'Fatec Jundiaí - Faculdade de Tecnologia - Deputado Ary Fossen',
    period: {
      start: 'Janeiro de 2010',
      end: 'Dezembro de 2012',
    },
    description:
      'Gestão dos recursos de infraestrutura e sistemas informatizados, com ênfase em administração de banco de dados, níveis de serviço, e a utilização estratégica dos sistemas de informação nas organizações.',
  },
]
