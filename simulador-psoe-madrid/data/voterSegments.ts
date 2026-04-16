import { VoterSegment, PersonaType } from '@/types/voter';

export const voterSegments: VoterSegment[] = [
  // BLOQUE I: VOTANTES FIELES Y HABITUALES
  {
    id: 'veterano-fiel',
    name: 'El Veterano Fiel',
    description: 'Votante histórico del PSOE, alta fidelidad partidista',
    personaType: 'Carmen, 68 años, jubilada de Getafe',
    demographicProfile: {
      ageRange: [65, 74],
      gender: 'F',
      education: ['Primaria', 'Secundaria básica'],
      socialClass: ['Media-baja', 'Pensionistas'],
      location: ['Sur metropolitano', 'Barrios obreros tradicionales']
    },
    behavioralProfile: {
      participationRate: 0.85,
      voteStability: 0.95,
      motivations: ['Identidad partidista', 'Memoria histórica', 'Pensiones', 'Sanidad pública'],
      informationChannels: ['Televisión', 'Radio SER', 'El País ocasional', 'Asociaciones vecinales']
    },
    sizePercentage: 15,
    trends: {
      growth: -0.02,
      stability: 0.95,
      risk: 0.15
    },
    geographicDistribution: {
      'Getafe': 0.18,
      'Fuenlabrada': 0.16,
      'Leganés': 0.15,
      'Vallecas': 0.12,
      'Villaverde': 0.11,
      'Usera': 0.10,
      'Otros sur': 0.18
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'trabajador-urbano',
    name: 'El Trabajador Urbano Comprometido',
    description: 'Clase trabajadora con conciencia sindical',
    personaType: 'Miguel, 52 años, funcionario de Correos en Fuenlabrada',
    demographicProfile: {
      ageRange: [45, 64],
      gender: 'Mixed',
      education: ['FP', 'Secundaria completa'],
      socialClass: ['Clase trabajadora', 'Empleados públicos'],
      location: ['Municipios del sur', 'Distritos obreros']
    },
    behavioralProfile: {
      participationRate: 0.78,
      voteStability: 0.82,
      motivations: ['Derechos laborales', 'Estado del bienestar', 'Políticas redistributivas'],
      informationChannels: ['Radio SER', 'Facebook', 'Twitter', 'Sindicatos']
    },
    sizePercentage: 12,
    trends: {
      growth: -0.01,
      stability: 0.82,
      risk: 0.25
    },
    geographicDistribution: {
      'Fuenlabrada': 0.20,
      'Getafe': 0.18,
      'Leganés': 0.16,
      'Móstoles': 0.14,
      'Alcorcón': 0.12,
      'Madrid Sur': 0.20
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'mujer-progresista',
    name: 'La Mujer Progresista Militante',
    description: 'Profesional comprometida con la igualdad de género',
    personaType: 'Laura, 42 años, profesora de instituto en Madrid',
    demographicProfile: {
      ageRange: [35, 55],
      gender: 'F',
      education: ['Universitaria', 'FP superior'],
      socialClass: ['Media', 'Profesionales'],
      location: ['Distritos centrales', 'Sur de Madrid', 'Municipios diversos']
    },
    behavioralProfile: {
      participationRate: 0.88,
      voteStability: 0.75,
      motivations: ['Igualdad de género', 'Derechos reproductivos', 'Conciliación', 'Valores progresistas'],
      informationChannels: ['Twitter', 'Instagram', 'elDiario.es', 'Público', 'Manifestaciones']
    },
    sizePercentage: 10,
    trends: {
      growth: 0.03,
      stability: 0.75,
      risk: 0.20
    },
    geographicDistribution: {
      'Madrid Centro': 0.25,
      'Madrid Sur': 0.20,
      'Getafe': 0.12,
      'Alcalá de Henares': 0.10,
      'Torrejón': 0.08,
      'Otros': 0.25
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'inmigrante-integrado',
    name: 'El Inmigrante Integrado',
    description: 'Población inmigrante nacionalizada con estabilidad laboral',
    personaType: 'Fatima, 38 años, marroquí nacionalizada, trabaja en limpieza',
    demographicProfile: {
      ageRange: [30, 50],
      gender: 'Mixed',
      education: ['Secundaria', 'Variable'],
      socialClass: ['Trabajadora', 'Servicios'],
      location: ['Sur metropolitano', 'Distritos diversos']
    },
    behavioralProfile: {
      participationRate: 0.70,
      voteStability: 0.68,
      motivations: ['Integración', 'Servicios sociales', 'Anti-discriminación', 'Regularización'],
      informationChannels: ['WhatsApp', 'Televisión árabe/latina', 'Comunidades de origen']
    },
    sizePercentage: 8,
    trends: {
      growth: 0.05,
      stability: 0.68,
      risk: 0.30
    },
    geographicDistribution: {
      'Leganés': 0.18,
      'Fuenlabrada': 0.16,
      'Madrid Centro': 0.15,
      'Getafe': 0.14,
      'Alcorcón': 0.12,
      'Otros': 0.25
    },
    lastUpdated: new Date('2024-01-15')
  },

  // BLOQUE II: VOTANTES POTENCIALES Y RECUPERABLES
  {
    id: 'desencantado-izquierdas',
    name: 'El Desencantado de Izquierdas',
    description: 'Ex-votante PSOE que migró a otras opciones de izquierda',
    personaType: 'David, 36 años, periodista freelance en Lavapiés',
    demographicProfile: {
      ageRange: [30, 50],
      gender: 'Mixed',
      education: ['Universitaria'],
      socialClass: ['Media', 'Profesionales precarios'],
      location: ['Madrid capital', 'Municipios metropolitanos']
    },
    behavioralProfile: {
      participationRate: 0.82,
      voteStability: 0.35,
      motivations: ['Transformación social', 'Políticas progresistas', 'Anti-establishment'],
      informationChannels: ['Medios alternativos', 'Twitter', 'Podcasts', 'Redes sociales']
    },
    sizePercentage: 8,
    trends: {
      growth: 0.02,
      stability: 0.35,
      risk: 0.65
    },
    geographicDistribution: {
      'Madrid Centro': 0.35,
      'Madrid Norte': 0.15,
      'Alcalá de Henares': 0.12,
      'Getafe': 0.10,
      'Otros': 0.28
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'madre-trabajadora',
    name: 'La Madre Trabajadora Agobiada',
    description: 'Madre con empleos precarios, centrada en políticas familiares',
    personaType: 'Cristina, 33 años, enfermera en Móstoles, madre soltera',
    demographicProfile: {
      ageRange: [28, 45],
      gender: 'F',
      education: ['FP', 'Universitaria'],
      socialClass: ['Media-baja', 'Empleos precarios'],
      location: ['Periferia metropolitana', 'Municipios familiares']
    },
    behavioralProfile: {
      participationRate: 0.55,
      voteStability: 0.45,
      motivations: ['Conciliación', 'Ayudas crianza', 'Educación infantil', 'Estabilidad económica'],
      informationChannels: ['WhatsApp madres', 'Redes sociales', 'Colegios', 'Centros salud']
    },
    sizePercentage: 7,
    trends: {
      growth: 0.04,
      stability: 0.45,
      risk: 0.40
    },
    geographicDistribution: {
      'Móstoles': 0.18,
      'Fuenlabrada': 0.16,
      'Leganés': 0.15,
      'Alcorcón': 0.14,
      'Getafe': 0.12,
      'Otros': 0.25
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'joven-precario',
    name: 'El Joven Precario Politizado',
    description: 'Joven universitario con empleo temporal, preocupado por vivienda',
    personaType: 'Adrián, 26 años, graduado en Comunicación, startup en Malasaña',
    demographicProfile: {
      ageRange: [22, 35],
      gender: 'Mixed',
      education: ['Universitaria', 'FP superior'],
      socialClass: ['Precaria', 'Empleos temporales'],
      location: ['Madrid capital', 'Municipios universitarios']
    },
    behavioralProfile: {
      participationRate: 0.60,
      voteStability: 0.30,
      motivations: ['Vivienda', 'Empleo estable', 'Medio ambiente', 'Cambio generacional'],
      informationChannels: ['TikTok', 'Instagram', 'Podcasts', 'YouTube', 'Twitter']
    },
    sizePercentage: 6,
    trends: {
      growth: 0.03,
      stability: 0.30,
      risk: 0.70
    },
    geographicDistribution: {
      'Madrid Centro': 0.40,
      'Madrid Norte': 0.20,
      'Alcalá de Henares': 0.15,
      'Getafe': 0.10,
      'Otros': 0.15
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'converso-centro',
    name: 'El Converso del Centro',
    description: 'Ex-votante de centro que migra al PSOE por pragmatismo',
    personaType: 'Carlos, 48 años, arquitecto autónomo en Chamberí',
    demographicProfile: {
      ageRange: [40, 65],
      gender: 'Mixed',
      education: ['Universitaria'],
      socialClass: ['Media-alta', 'Profesionales liberales'],
      location: ['Distritos centrales', 'Municipios prósperos']
    },
    behavioralProfile: {
      participationRate: 0.85,
      voteStability: 0.40,
      motivations: ['Voto útil', 'Estabilidad', 'Anti-extrema derecha', 'Pragmatismo'],
      informationChannels: ['El País', 'El Mundo', 'Podcasts', 'LinkedIn']
    },
    sizePercentage: 5,
    trends: {
      growth: 0.06,
      stability: 0.40,
      risk: 0.45
    },
    geographicDistribution: {
      'Madrid Centro': 0.45,
      'Madrid Norte': 0.25,
      'Pozuelo': 0.10,
      'Las Rozas': 0.08,
      'Otros': 0.12
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'funcionario-descontento',
    name: 'El Funcionario Descontento',
    description: 'Empleado público preocupado por recortes y privatizaciones',
    personaType: 'Ana, 44 años, profesora de primaria en Alcorcón',
    demographicProfile: {
      ageRange: [35, 55],
      gender: 'Mixed',
      education: ['Universitaria', 'FP superior'],
      socialClass: ['Media', 'Empleados públicos'],
      location: ['Toda la Comunidad de Madrid']
    },
    behavioralProfile: {
      participationRate: 0.80,
      voteStability: 0.55,
      motivations: ['Empleo público', 'Condiciones laborales', 'Anti-privatización', 'Estado bienestar'],
      informationChannels: ['Sindicatos', 'Medios educativos', 'WhatsApp profesional']
    },
    sizePercentage: 4,
    trends: {
      growth: 0.02,
      stability: 0.55,
      risk: 0.35
    },
    geographicDistribution: {
      'Madrid': 0.30,
      'Alcorcón': 0.12,
      'Móstoles': 0.11,
      'Getafe': 0.10,
      'Fuenlabrada': 0.09,
      'Otros': 0.28
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'pensionista-indeciso',
    name: 'El Pensionista Indeciso',
    description: 'Jubilado que oscila entre PP y PSOE según políticas sociales',
    personaType: 'Antonio, 72 años, jubilado de la construcción en Parla',
    demographicProfile: {
      ageRange: [65, 85],
      gender: 'Mixed',
      education: ['Primaria', 'Secundaria básica'],
      socialClass: ['Media-baja', 'Pensiones bajas'],
      location: ['Municipios diversos', 'Periferia']
    },
    behavioralProfile: {
      participationRate: 0.82,
      voteStability: 0.35,
      motivations: ['Pensiones', 'Sanidad', 'Servicios mayores', 'Estabilidad económica'],
      informationChannels: ['Televisión', 'Radio', 'Centros mayores', 'Familia']
    },
    sizePercentage: 5,
    trends: {
      growth: 0.01,
      stability: 0.35,
      risk: 0.50
    },
    geographicDistribution: {
      'Parla': 0.15,
      'Móstoles': 0.14,
      'Alcorcón': 0.13,
      'Getafe': 0.12,
      'Madrid periferia': 0.20,
      'Otros': 0.26
    },
    lastUpdated: new Date('2024-01-15')
  },

  // BLOQUE III: VOTANTES OCASIONALES Y MOVILIZABLES
  {
    id: 'abstencionista-ocasional',
    name: 'El Abstencionista Ocasional',
    description: 'Voto reactivo en momentos de alta polarización',
    personaType: 'Javier, 34 años, repartidor de Glovo en Vallecas',
    demographicProfile: {
      ageRange: [25, 45],
      gender: 'M',
      education: ['Secundaria', 'FP'],
      socialClass: ['Media-baja', 'Empleos precarios'],
      location: ['Periferia sur', 'Barrios populares']
    },
    behavioralProfile: {
      participationRate: 0.35,
      voteStability: 0.25,
      motivations: ['Anti-derecha', 'Descontento general', 'Movilización puntual'],
      informationChannels: ['Memes', 'Conversaciones', 'Redes sociales ocasional']
    },
    sizePercentage: 6,
    trends: {
      growth: 0.01,
      stability: 0.25,
      risk: 0.75
    },
    geographicDistribution: {
      'Vallecas': 0.20,
      'Villaverde': 0.18,
      'Usera': 0.16,
      'Carabanchel': 0.15,
      'San Blas': 0.12,
      'Otros': 0.19
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'joven-feminista',
    name: 'La Joven Feminista Desmovilizada',
    description: 'Estudiante o recién graduada, activa en redes feministas',
    personaType: 'Lucía, 23 años, estudiante de Psicología en Alcalá',
    demographicProfile: {
      ageRange: [18, 30],
      gender: 'F',
      education: ['Universitaria en curso', 'Recién graduada'],
      socialClass: ['Precaria', 'Estudiantes'],
      location: ['Madrid capital', 'Municipios universitarios']
    },
    behavioralProfile: {
      participationRate: 0.45,
      voteStability: 0.30,
      motivations: ['Igualdad género', 'Derechos reproductivos', 'Violencia machista'],
      informationChannels: ['Instagram', 'TikTok feminista', 'Twitter', 'Universidades']
    },
    sizePercentage: 4,
    trends: {
      growth: 0.04,
      stability: 0.30,
      risk: 0.60
    },
    geographicDistribution: {
      'Madrid Centro': 0.30,
      'Alcalá de Henares': 0.20,
      'Getafe': 0.15,
      'Madrid Norte': 0.15,
      'Otros': 0.20
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'trabajador-desencantado',
    name: 'El Trabajador Desencantado del Sur',
    description: 'Ex-votante del cinturón rojo, nostálgico del pasado industrial',
    personaType: 'Roberto, 46 años, operario logística en Getafe',
    demographicProfile: {
      ageRange: [35, 55],
      gender: 'M',
      education: ['Secundaria', 'FP'],
      socialClass: ['Trabajadora', 'Empleos industriales'],
      location: ['Cinturón sur metropolitano']
    },
    behavioralProfile: {
      participationRate: 0.60,
      voteStability: 0.40,
      motivations: ['Empleo industrial', 'Condiciones laborales', 'Anti-gentrificación'],
      informationChannels: ['Radio', 'Conversaciones trabajo', 'Facebook ocasional']
    },
    sizePercentage: 5,
    trends: {
      growth: -0.01,
      stability: 0.40,
      risk: 0.55
    },
    geographicDistribution: {
      'Getafe': 0.25,
      'Fuenlabrada': 0.20,
      'Leganés': 0.18,
      'Móstoles': 0.15,
      'Alcorcón': 0.12,
      'Otros': 0.10
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'nuevo-ciudadano',
    name: 'El Nuevo Ciudadano Indeciso',
    description: 'Inmigrante cualificado en proceso de integración',
    personaType: 'Elena, 32 años, médica venezolana en Alcobendas',
    demographicProfile: {
      ageRange: [25, 45],
      gender: 'Mixed',
      education: ['Universitaria', 'Profesionales cualificados'],
      socialClass: ['Media', 'En proceso integración'],
      location: ['Madrid capital', 'Municipios diversos']
    },
    behavioralProfile: {
      participationRate: 0.65,
      voteStability: 0.35,
      motivations: ['Integración', 'Homologación títulos', 'Estabilidad institucional'],
      informationChannels: ['Medios digitales', 'Redes expatriados', 'Asociaciones profesionales']
    },
    sizePercentage: 3,
    trends: {
      growth: 0.07,
      stability: 0.35,
      risk: 0.45
    },
    geographicDistribution: {
      'Madrid Centro': 0.25,
      'Madrid Norte': 0.20,
      'Alcobendas': 0.15,
      'Pozuelo': 0.12,
      'Getafe': 0.10,
      'Otros': 0.18
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'ecologista-pragmatico',
    name: 'El Ecologista Pragmático',
    description: 'Profesional técnico preocupado por políticas ambientales',
    personaType: 'Marcos, 38 años, ingeniero ambiental en Pozuelo',
    demographicProfile: {
      ageRange: [30, 50],
      gender: 'Mixed',
      education: ['Universitaria'],
      socialClass: ['Media', 'Profesionales técnicos'],
      location: ['Madrid capital', 'Municipios conciencia ambiental']
    },
    behavioralProfile: {
      participationRate: 0.78,
      voteStability: 0.45,
      motivations: ['Medio ambiente', 'Transición energética', 'Movilidad sostenible'],
      informationChannels: ['Medios especializados', 'LinkedIn', 'Revistas técnicas']
    },
    sizePercentage: 2,
    trends: {
      growth: 0.05,
      stability: 0.45,
      risk: 0.40
    },
    geographicDistribution: {
      'Madrid Centro': 0.30,
      'Pozuelo': 0.20,
      'Las Rozas': 0.15,
      'Madrid Norte': 0.15,
      'Alcobendas': 0.10,
      'Otros': 0.10
    },
    lastUpdated: new Date('2024-01-15')
  }
];

export const personaTypes: PersonaType[] = [
  {
    id: 'carmen-veterana',
    name: 'Carmen',
    age: 68,
    occupation: 'Jubilada (ex-trabajadora textil)',
    location: 'Getafe',
    description: 'Vota al PSOE desde la Transición. Participa en asociaciones de vecinos. Principal preocupación: pensiones y sanidad pública.',
    informationSources: ['Telecinco', 'La Sexta', 'El País ocasional', 'Asociaciones vecinales'],
    keyMotivations: ['Pensiones', 'Sanidad pública', 'Memoria histórica', 'Identidad socialista'],
    votingHistory: ['PSOE desde 1977', 'Nunca ha cambiado'],
    likelihood: 0.95
  },
  {
    id: 'miguel-trabajador',
    name: 'Miguel',
    age: 52,
    occupation: 'Funcionario de Correos',
    location: 'Fuenlabrada',
    description: 'Afiliado a CCOO. Preocupado por estabilidad laboral y educación pública para sus hijos.',
    informationSources: ['Radio SER', 'Facebook', 'Twitter', 'Información sindical'],
    keyMotivations: ['Derechos laborales', 'Educación pública', 'Estado del bienestar'],
    votingHistory: ['PSOE habitual', 'Ocasional abstención en crisis'],
    likelihood: 0.82
  },
  {
    id: 'laura-progresista',
    name: 'Laura',
    age: 42,
    occupation: 'Profesora de instituto',
    location: 'Madrid',
    description: 'Madre de dos hijos. Muy activa en Twitter e Instagram. Participa en manifestaciones feministas.',
    informationSources: ['Twitter', 'Instagram', 'elDiario.es', 'Público'],
    keyMotivations: ['Igualdad de género', 'Educación', 'Conciliación', 'Derechos reproductivos'],
    votingHistory: ['PSOE desde 2008', 'Considera otras opciones de izquierda'],
    likelihood: 0.75
  },
  {
    id: 'adrian-joven',
    name: 'Adrián',
    age: 26,
    occupation: 'Graduado en Comunicación (startup)',
    location: 'Malasaña, Madrid',
    description: 'Vive en piso compartido. Votó PSOE por primera vez en 2023. Le preocupa el acceso a la vivienda.',
    informationSources: ['TikTok', 'Instagram', 'Podcasts', 'YouTube'],
    keyMotivations: ['Vivienda', 'Empleo estable', 'Cambio generacional', 'Medio ambiente'],
    votingHistory: ['Abstención hasta 2023', 'Primera vez PSOE'],
    likelihood: 0.60
  },
  {
    id: 'fatima-inmigrante',
    name: 'Fatima',
    age: 38,
    occupation: 'Trabajadora de limpieza',
    location: 'Leganés',
    description: 'Marroquí nacionalizada. Vive con su familia. Vota PSOE por políticas sociales y contra discriminación.',
    informationSources: ['WhatsApp', 'Televisión árabe', 'Televisión española', 'Comunidad'],
    keyMotivations: ['Integración', 'Servicios sociales', 'Anti-discriminación', 'Familia'],
    votingHistory: ['PSOE desde nacionalización', 'Voto estratégico'],
    likelihood: 0.70
  }
];