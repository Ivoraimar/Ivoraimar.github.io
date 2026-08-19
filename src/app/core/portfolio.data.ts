import { Language, LocalizedText, Project } from './models/portfolio.models';

const localized = (en: string, es: string): LocalizedText => ({ en, es });

export const LINKS = {
  github: 'https://github.com/Ivoraimar',
  linkedin: 'https://www.linkedin.com/in/ivo-raimondi-7a2a5b292/',
  thesisRepository:
    'https://github.com/Ivoraimar/Evaluation-of-Live-Migration-Strategies-at-the-Edge',
  thesisPdf: 'documents/live-migration-thesis.pdf',
} as const;

export const FEATURED_PROJECT: Project = {
  title: 'Oakestra',
  eyebrow: localized(
    'Open-source · Maintainer & software developer',
    'Open source · Software developer y maintainer',
  ),
  description: localized(
    'An open-source orchestration framework for deploying containerized workloads across the edge–cloud continuum.',
    'Un framework open source para desplegar y orquestar workloads containerizados a lo largo del continuo edge–cloud.',
  ),
  highlights: [
    localized(
      'Angular dashboard features and focused UX improvements',
      'Nuevas funcionalidades y mejoras de UX en el dashboard de Angular',
    ),
    localized('Python backend services and API endpoints', 'Servicios backend y endpoints en Python'),
    localized('Technical documentation with Hugo', 'Documentación técnica con Hugo'),
    localized(
      'Deployment and infrastructure contributions',
      'Trabajo en despliegues e infraestructura',
    ),
  ],
  technologies: ['Angular', 'Python', 'Hugo', 'Edge'],
  theme: 'oakestra',
  links: [
    {
      label: localized('Visit the Oakestra website', 'Visitar la web de Oakestra'),
      url: 'https://www.oakestra.io/',
    },
  ],
};

export const SELECTED_PROJECTS: readonly Project[] = [
  {
    title: 'Truco Beasts',
    eyebrow: localized(
      'Team project · University of Seville',
      'Proyecto en equipo · Universidad de Sevilla',
    ),
    description: localized(
      'A team-built web application translating the rules and competitive systems of the Argentine card game Truco into a full-stack product.',
      'Una aplicación full-stack desarrollada en equipo que lleva el Truco argentino a la web, con sus reglas, partidas y sistema competitivo.',
    ),
    highlights: [
      localized('Game rules and match flow', 'Lógica del juego y flujo de partidas'),
      localized('Authentication and roles', 'Autenticación y gestión de roles'),
      localized('Achievements and rankings', 'Sistema de logros y ranking'),
    ],
    technologies: ['Spring Boot', 'React', 'REST APIs'],
    theme: 'truco',
    links: [
      {
        label: localized('Watch the project presentation', 'Ver la presentación del proyecto'),
        url: 'https://youtu.be/8pZN1toYo1A?si=9ez5VFqF5EfuZvXy',
      },
    ],
  },
  {
    title: 'IoT Rover',
    eyebrow: localized(
      'Team project · Practical course at TUM',
      'Proyecto en equipo · Curso práctico de TUM',
    ),
    description: localized(
      'A team-built connected rover joining constrained hardware, messaging, backend services, and a dashboard into one observable edge system.',
      'Un rover conectado que integra Raspberry Pi, ESP32, mensajería MQTT, servicios backend y un dashboard en un único sistema edge.',
    ),
    highlights: [
      localized(
        'Raspberry Pi 5 and ESP32 communication',
        'Comunicación entre Raspberry Pi 5 y ESP32',
      ),
      localized('MQTT and cloud pipeline', 'Pipeline de datos con MQTT y servicios cloud'),
      localized('Media streaming and telemetry', 'Streaming de vídeo y telemetría'),
    ],
    technologies: ['Raspberry Pi', 'ESP32', 'MQTT', 'Edge'],
    theme: 'rover',
    links: [
      {
        label: localized('Explore the team repositories', 'Ver los repositorios del equipo'),
        url: 'https://github.com/orgs/TUM-Edge-IoT/repositories',
      },
    ],
  },
  {
    title: 'Lunar Lander',
    eyebrow: localized(
      'Two-person team · University of Seville',
      'Proyecto en equipo · Universidad de Sevilla',
    ),
    description: localized(
      'A Deep Q-Network implementation developed by a two-person team to explore how an agent learns a stable landing policy through training and evaluation.',
      'Un proyecto de dos personas en el que implementamos una Deep Q-Network para entrenar y evaluar una política de aterrizaje estable.',
    ),
    highlights: [
      localized('DQN implementation', 'Implementación de DQN'),
      localized('Training workflow', 'Pipeline de entrenamiento'),
      localized('Policy evaluation', 'Evaluación de la política aprendida'),
    ],
    technologies: ['Python', 'PyTorch', 'DQN'],
    theme: 'lander',
    links: [
      {
        label: localized('View the GitHub repository', 'Ver el repositorio en GitHub'),
        url: 'https://github.com/Ivoraimar/Lunar-Lander-DQN',
      },
    ],
  },
];

export const PORTFOLIO_COPY = {
  en: {
    skip: 'Skip to main content',
    homeLabel: 'Ivo Raimondi — home',
    navLabel: 'Primary navigation',
    languageLabel: 'Choose language',
    languageNames: { en: 'English', es: 'Spanish' },
    nav: { work: 'Work', thesis: 'Thesis', projects: 'Projects', contact: 'Contact' },
    hero: {
      role: 'Software Engineer',
      positioning:
        'I build useful, dependable software—from user-facing products to distributed systems at the edge.',
      workAction: 'View selected work',
      scroll: 'Scroll to the work',
    },
    featured: {
      eyebrow: 'Featured work',
      title: 'Engineering at the edge',
      identityCaption: 'Lightweight orchestration across the edge–cloud continuum',
    },
    thesis: {
      eyebrow: 'Bachelor’s thesis',
      sectionTitle: 'Live migration, measured',
      contextLabel: 'Research · Edge systems',
      title: 'Evaluation of Live Migration Strategies at the Edge',
      institution:
        'Completed at the Technical University of Munich in the context of the Chair of Connected Mobility.',
      description:
        'A practical evaluation of cold, pre-copy, and post-copy migration under constrained and intermittent network conditions—measuring the trade-offs that matter in real edge environments.',
      metricsLabel: 'Evaluation metrics',
      metrics: [
        { name: 'Downtime', description: 'Service interruption' },
        { name: 'Total time', description: 'End-to-end migration' },
        { name: 'Transfer size', description: 'Network cost' },
        { name: 'Resource use', description: 'System overhead' },
      ],
      technologiesLabel: 'Technologies',
      pdfAction: 'Read the thesis PDF',
      repositoryAction: 'Explore the thesis repository',
      coverAlt: 'Cover of Evaluation of Live Migration Strategies at the Edge by Ivo Raimondi',
    },
    projects: { eyebrow: 'Selected projects', title: 'Built to learn, built to work' },
    projectLabels: {
      highlights: 'Project highlights',
      technologies: 'Technologies',
      opensNewTab: '(opens in a new tab)',
    },
    context: {
      eyebrow: 'A little context',
      title: 'From foundations to distributed systems.',
      description:
        'A bachelor’s degree in Software Engineering from the University of Seville, Erasmus studies in Informatics at TUM, and software development and maintainer work with the Chair of Connected Mobility and Oakestra.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Have an interesting project in mind?',
      description:
        'I’m always happy to talk about engineering roles, open-source work, or research collaborations.',
      githubAction: 'Find me on GitHub',
      linkedinAction: 'Connect on LinkedIn',
    },
    footer: { credit: 'Designed and built by Ivo Raimondi.', backToTop: 'Back to top' },
  },
  es: {
    skip: 'Saltar al contenido principal',
    homeLabel: 'Ivo Raimondi — inicio',
    navLabel: 'Navegación principal',
    languageLabel: 'Seleccionar idioma',
    languageNames: { en: 'Inglés', es: 'Español' },
    nav: { work: 'Experiencia', thesis: 'TFG', projects: 'Proyectos', contact: 'Contacto' },
    hero: {
      role: 'Ingeniero de software',
      positioning:
        'Desarrollo software útil y fiable, desde interfaces de usuario hasta sistemas distribuidos en el edge.',
      workAction: 'Ver mi trabajo',
      scroll: 'Sigue bajando',
    },
    featured: {
      eyebrow: 'Proyecto destacado',
      title: 'Ingeniería para el edge',
      identityCaption: 'Orquestación ligera de workloads en el continuo edge–cloud',
    },
    thesis: {
      eyebrow: 'Trabajo de fin de grado',
      sectionTitle: 'Migración en vivo bajo la lupa',
      contextLabel: 'Investigación · Edge computing',
      title: 'Evaluation of Live Migration Strategies at the Edge',
      institution:
        'Hice este TFG durante mi Erasmus en TUM, dentro de la Chair of Connected Mobility.',
      description:
        'Un estudio experimental de las estrategias cold, pre-copy y post-copy en redes limitadas o intermitentes, centrado en los trade-offs que realmente importan en entornos edge.',
      metricsLabel: 'Qué medí',
      metrics: [
        { name: 'Downtime', description: 'Interrupción del servicio' },
        { name: 'Tiempo total', description: 'Migración end-to-end' },
        { name: 'Datos transferidos', description: 'Coste de red' },
        { name: 'Uso de recursos', description: 'Carga sobre el sistema' },
      ],
      technologiesLabel: 'Tecnologías',
      pdfAction: 'Leer el TFG en PDF',
      repositoryAction: 'Ver el repositorio del TFG',
      coverAlt: 'Portada del TFG Evaluation of Live Migration Strategies at the Edge, de Ivo Raimondi',
    },
    projects: { eyebrow: 'Otros proyectos', title: 'Aprender construyendo' },
    projectLabels: {
      highlights: 'Puntos clave',
      technologies: 'Stack',
      opensNewTab: '(se abre en una pestaña nueva)',
    },
    context: {
      eyebrow: 'Sobre mí',
      title: 'Del desarrollo de software a los sistemas distribuidos.',
      description:
        'Estudié Ingeniería del Software en la Universidad de Sevilla y cursé mi Erasmus en TUM. Allí hice mi TFG y trabajé como developer y maintainer en la Chair of Connected Mobility, contribuyendo a Oakestra.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Tenés algo interesante entre manos?',
      description:
        'Si querés hablar de oportunidades en ingeniería, proyectos open source o colaboraciones de investigación, escribime.',
      githubAction: 'Ver mi GitHub',
      linkedinAction: 'Hablemos en LinkedIn',
    },
    footer: { credit: 'Diseñado y desarrollado por Ivo Raimondi.', backToTop: 'Volver arriba' },
  },
} as const satisfies Record<Language, object>;
