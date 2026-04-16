// Sistema de análisis de narrativas en redes sociales
// Simulación de análisis en tiempo real para el simulador

export interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp';
  content: string;
  author: string;
  timestamp: Date;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  location?: string;
  hashtags: string[];
  mentions: string[];
}

export interface NarrativeAnalysis {
  id: string;
  content: string;
  frequency: number;
  sentiment: number; // -1 to 1
  politicalRelevance: number; // 0 to 1
  platforms: string[];
  trend: 'rising' | 'stable' | 'declining';
  impactScore: number;
  relatedKeywords: string[];
  firstDetected: Date;
  lastUpdated: Date;
}

export interface SegmentImpact {
  segmentId: string;
  impactScore: number; // 0 to 1
  confidence: number; // 0 to 1
  reasons: string[];
}

export class SocialMediaAnalyzer {
  private narratives: Map<string, NarrativeAnalysis> = new Map();
  private posts: SocialMediaPost[] = [];
  
  // Palabras clave por tipología de votante
  private segmentKeywords = {
    'veterano-fiel': ['pensiones', 'sanidad', 'jubilación', 'memoria histórica', 'franco', 'transición'],
    'trabajador-urbano': ['trabajo', 'sindicatos', 'derechos laborales', 'empleo público', 'convenio'],
    'mujer-progresista': ['igualdad', 'feminismo', 'conciliación', 'violencia machista', 'brecha salarial'],
    'joven-precario': ['vivienda', 'alquiler', 'empleo joven', 'precariedad', 'mileurista', 'paro juvenil'],
    'inmigrante-integrado': ['inmigración', 'integración', 'regularización', 'discriminación', 'diversidad'],
    'madre-trabajadora': ['conciliación', 'guarderías', 'ayudas familiares', 'maternidad', 'crianza'],
    'converso-centro': ['moderación', 'centro', 'estabilidad', 'pragmatismo', 'voto útil'],
    'funcionario-descontento': ['función pública', 'recortes', 'privatización', 'servicios públicos'],
    'pensionista-indeciso': ['pensiones', 'copago', 'sanidad', 'servicios sociales', 'mayores'],
    'abstencionista-ocasional': ['política', 'desencanto', 'corrupción', 'todos iguales'],
    'joven-feminista': ['feminismo', 'igualdad', 'derechos reproductivos', 'violencia género'],
    'trabajador-desencantado': ['industria', 'fábrica', 'deslocalización', 'paro', 'crisis'],
    'nuevo-ciudadano': ['homologación', 'títulos', 'integración laboral', 'expatriados'],
    'ecologista-pragmatico': ['medio ambiente', 'sostenibilidad', 'cambio climático', 'energías renovables']
  };

  // Análisis de sentimiento simulado
  private analyzeSentiment(text: string): number {
    const positiveWords = ['bueno', 'excelente', 'genial', 'perfecto', 'increíble', 'fantástico', 'apoyo', 'favor'];
    const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'desastre', 'contra', 'rechazo', 'odio'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) score += 1;
      if (negativeWords.some(nw => word.includes(nw))) score -= 1;
    });
    
    return Math.max(-1, Math.min(1, score / words.length * 10));
  }

  // Detectar relevancia política
  private analyzePoliticalRelevance(text: string): number {
    const politicalKeywords = [
      'psoe', 'pp', 'vox', 'podemos', 'más madrid', 'ciudadanos',
      'sánchez', 'ayuso', 'abascal', 'feijóo', 'iglesias',
      'elecciones', 'voto', 'política', 'gobierno', 'oposición',
      'madrid', 'comunidad', 'municipal', 'autonómico'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    const matches = words.filter(word => 
      politicalKeywords.some(keyword => word.includes(keyword))
    ).length;
    
    return Math.min(1, matches / words.length * 20);
  }

  // Extraer hashtags y menciones
  private extractHashtagsAndMentions(text: string): { hashtags: string[], mentions: string[] } {
    const hashtags = (text.match(/#\w+/g) || []).map(tag => tag.substring(1));
    const mentions = (text.match(/@\w+/g) || []).map(mention => mention.substring(1));
    return { hashtags, mentions };
  }

  // Procesar nuevo post
  public processPost(post: SocialMediaPost): void {
    this.posts.push(post);
    
    // Analizar contenido
    const sentiment = this.analyzeSentiment(post.content);
    const politicalRelevance = this.analyzePoliticalRelevance(post.content);
    
    if (politicalRelevance > 0.3) {
      this.updateNarratives(post, sentiment, politicalRelevance);
    }
  }

  // Actualizar narrativas basadas en nuevos posts
  private updateNarratives(post: SocialMediaPost, sentiment: number, politicalRelevance: number): void {
    // Extraer temas principales del contenido
    const themes = this.extractThemes(post.content);
    
    themes.forEach(theme => {
      const narrativeId = this.generateNarrativeId(theme);
      
      if (this.narratives.has(narrativeId)) {
        // Actualizar narrativa existente
        const narrative = this.narratives.get(narrativeId)!;
        narrative.frequency += 1;
        narrative.sentiment = (narrative.sentiment + sentiment) / 2;
        narrative.politicalRelevance = Math.max(narrative.politicalRelevance, politicalRelevance);
        narrative.lastUpdated = new Date();
        
        if (!narrative.platforms.includes(post.platform)) {
          narrative.platforms.push(post.platform);
        }
      } else {
        // Crear nueva narrativa
        const newNarrative: NarrativeAnalysis = {
          id: narrativeId,
          content: theme,
          frequency: 1,
          sentiment,
          politicalRelevance,
          platforms: [post.platform],
          trend: 'rising',
          impactScore: politicalRelevance * 0.5,
          relatedKeywords: this.extractKeywords(post.content),
          firstDetected: new Date(),
          lastUpdated: new Date()
        };
        
        this.narratives.set(narrativeId, newNarrative);
      }
    });
  }

  // Extraer temas principales
  private extractThemes(content: string): string[] {
    const themes: string[] = [];
    const text = content.toLowerCase();
    
    // Detectar temas por palabras clave
    if (text.includes('vivienda') || text.includes('alquiler') || text.includes('hipoteca')) {
      themes.push('Políticas de vivienda');
    }
    if (text.includes('sanidad') || text.includes('hospital') || text.includes('médico')) {
      themes.push('Sanidad pública');
    }
    if (text.includes('feminismo') || text.includes('igualdad') || text.includes('mujer')) {
      themes.push('Igualdad de género');
    }
    if (text.includes('trabajo') || text.includes('empleo') || text.includes('paro')) {
      themes.push('Empleo y trabajo');
    }
    if (text.includes('pensión') || text.includes('jubilación') || text.includes('mayor')) {
      themes.push('Pensiones y mayores');
    }
    if (text.includes('medio ambiente') || text.includes('clima') || text.includes('sostenible')) {
      themes.push('Medio ambiente');
    }
    if (text.includes('educación') || text.includes('escuela') || text.includes('universidad')) {
      themes.push('Educación');
    }
    
    return themes.length > 0 ? themes : ['Política general'];
  }

  // Extraer palabras clave
  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Filtrar palabras comunes
    const stopWords = ['para', 'con', 'por', 'en', 'de', 'la', 'el', 'y', 'a', 'que', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'no', 'me', 'un', 'una', 'está', 'como', 'pero', 'sus', 'le', 'ya', 'o', 'porque', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas'];
    
    return words.filter(word => !stopWords.includes(word));
  }

  // Generar ID de narrativa
  private generateNarrativeId(theme: string): string {
    return theme.toLowerCase().replace(/\s+/g, '-');
  }

  // Calcular impacto en segmentos
  public calculateSegmentImpact(narrativeId: string): SegmentImpact[] {
    const narrative = this.narratives.get(narrativeId);
    if (!narrative) return [];

    const impacts: SegmentImpact[] = [];
    
    Object.entries(this.segmentKeywords).forEach(([segmentId, keywords]) => {
      const relevantKeywords = narrative.relatedKeywords.filter(keyword =>
        keywords.some(segmentKeyword => 
          keyword.includes(segmentKeyword) || segmentKeyword.includes(keyword)
        )
      );
      
      const impactScore = Math.min(1, 
        (relevantKeywords.length / keywords.length) * narrative.politicalRelevance
      );
      
      if (impactScore > 0.1) {
        impacts.push({
          segmentId,
          impactScore,
          confidence: narrative.frequency > 10 ? 0.8 : 0.5,
          reasons: relevantKeywords
        });
      }
    });
    
    return impacts.sort((a, b) => b.impactScore - a.impactScore);
  }

  // Obtener narrativas activas
  public getActiveNarratives(): NarrativeAnalysis[] {
    return Array.from(this.narratives.values())
      .filter(narrative => narrative.frequency > 5)
      .sort((a, b) => b.frequency - a.frequency);
  }

  // Actualizar tendencias
  public updateTrends(): void {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    this.narratives.forEach(narrative => {
      const recentPosts = this.posts.filter(post => 
        post.timestamp > oneDayAgo && 
        this.extractThemes(post.content).some(theme => 
          this.generateNarrativeId(theme) === narrative.id
        )
      );
      
      const recentFrequency = recentPosts.length;
      const previousFrequency = narrative.frequency - recentFrequency;
      
      if (recentFrequency > previousFrequency * 1.2) {
        narrative.trend = 'rising';
      } else if (recentFrequency < previousFrequency * 0.8) {
        narrative.trend = 'declining';
      } else {
        narrative.trend = 'stable';
      }
    });
  }

  // Simular datos en tiempo real
  public simulateRealTimeData(): void {
    const samplePosts: Partial<SocialMediaPost>[] = [
      {
        platform: 'twitter',
        content: 'Los precios de la vivienda en Madrid son insostenibles para los jóvenes. Necesitamos políticas de vivienda pública ya! #ViviendaDigna #Madrid',
        engagement: { likes: 45, shares: 12, comments: 8 }
      },
      {
        platform: 'instagram',
        content: 'La sanidad pública madrileña necesita más inversión. Los recortes de Ayuso están afectando a todos #SanidadPública',
        engagement: { likes: 78, shares: 23, comments: 15 }
      },
      {
        platform: 'facebook',
        content: 'Como madre trabajadora, necesito más ayudas para la conciliación. Las guarderías públicas son insuficientes',
        engagement: { likes: 34, shares: 19, comments: 22 }
      },
      {
        platform: 'tiktok',
        content: 'POV: Eres joven en Madrid y quieres independizarte pero los alquileres están por las nubes 📈💸 #ViviendaJoven #Madrid',
        engagement: { likes: 156, shares: 89, comments: 34, views: 2340 }
      }
    ];

    samplePosts.forEach((postData, index) => {
      const post: SocialMediaPost = {
        id: `sim-${Date.now()}-${index}`,
        platform: postData.platform as any,
        content: postData.content!,
        author: `user_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        engagement: postData.engagement!,
        hashtags: [],
        mentions: []
      };

      const extracted = this.extractHashtagsAndMentions(post.content);
      post.hashtags = extracted.hashtags;
      post.mentions = extracted.mentions;

      this.processPost(post);
    });

    this.updateTrends();
  }

  // Obtener estadísticas generales
  public getStatistics() {
    const totalPosts = this.posts.length;
    const totalNarratives = this.narratives.size;
    const averageSentiment = Array.from(this.narratives.values())
      .reduce((sum, n) => sum + n.sentiment, 0) / totalNarratives;
    
    const platformDistribution = this.posts.reduce((acc, post) => {
      acc[post.platform] = (acc[post.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPosts,
      totalNarratives,
      averageSentiment,
      platformDistribution,
      lastUpdate: new Date()
    };
  }
}

// Instancia global del analizador
export const socialMediaAnalyzer = new SocialMediaAnalyzer();

// Simular datos iniciales
socialMediaAnalyzer.simulateRealTimeData();