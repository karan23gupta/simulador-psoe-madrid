# Arquitectura del Simulador Interactivo de Electorado PSOE Madrid

## Visión General del Sistema

El simulador es una aplicación web interactiva que permite analizar, visualizar y reconfigurar las tipologías de votantes del PSOE en la Comunidad de Madrid, con capacidad de actualización automática basada en análisis de narrativas en redes sociales.

## Arquitectura Técnica

### Frontend (React + TypeScript)
```
src/
├── components/
│   ├── Dashboard/
│   │   ├── MainDashboard.tsx
│   │   ├── VoterSegments.tsx
│   │   ├── GeographicMap.tsx
│   │   └── TrendAnalysis.tsx
│   ├── Simulator/
│   │   ├── VoterTypeSelector.tsx
│   │   ├── ScenarioBuilder.tsx
│   │   ├── ParameterControls.tsx
│   │   └── ResultsVisualization.tsx
│   ├── Analytics/
│   │   ├── SocialMediaAnalysis.tsx
│   │   ├── NarrativeTracker.tsx
│   │   └── SentimentAnalysis.tsx
│   └── Common/
│       ├── Charts/
│       ├── Filters/
│       └── Layout/
├── hooks/
│   ├── useVoterData.ts
│   ├── useSocialAnalysis.ts
│   └── useSimulation.ts
├── services/
│   ├── api.ts
│   ├── socialMedia.ts
│   └── analytics.ts
└── types/
    ├── voter.ts
    ├── simulation.ts
    └── analytics.ts
```

### Backend (Node.js + Express + TypeScript)
```
src/
├── controllers/
│   ├── voterController.ts
│   ├── simulationController.ts
│   ├── socialMediaController.ts
│   └── analyticsController.ts
├── services/
│   ├── voterAnalysisService.ts
│   ├── socialMediaService.ts
│   ├── narrativeAnalysisService.ts
│   └── predictionService.ts
├── models/
│   ├── VoterSegment.ts
│   ├── Simulation.ts
│   ├── SocialPost.ts
│   └── Narrative.ts
├── utils/
│   ├── dataProcessor.ts
│   ├── mlAlgorithms.ts
│   └── validators.ts
└── integrations/
    ├── twitterAPI.ts
    ├── facebookAPI.ts
    ├── instagramAPI.ts
    └── telegramAPI.ts
```

### Base de Datos (PostgreSQL + Redis)
```sql
-- Esquema principal
CREATE TABLE voter_segments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    demographic_profile JSONB,
    behavioral_profile JSONB,
    geographic_distribution JSONB,
    size_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE simulations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parameters JSONB,
    results JSONB,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE social_posts (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50),
    post_id VARCHAR(255),
    content TEXT,
    author VARCHAR(255),
    engagement_metrics JSONB,
    sentiment_score DECIMAL(3,2),
    political_relevance DECIMAL(3,2),
    extracted_narratives JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE narratives (
    id SERIAL PRIMARY KEY,
    content TEXT,
    frequency INTEGER DEFAULT 1,
    sentiment_trend JSONB,
    impact_score DECIMAL(5,2),
    related_segments JSONB,
    first_detected TIMESTAMP DEFAULT NOW(),
    last_updated TIMESTAMP DEFAULT NOW()
);
```

## Componentes Principales

### 1. Dashboard Principal
**Funcionalidades:**
- Vista general de las 15 tipologías de votantes
- Distribución geográfica interactiva
- Métricas clave de cada segmento
- Tendencias temporales

**Tecnologías:**
- React + D3.js para visualizaciones
- Mapbox GL JS para mapas interactivos
- Chart.js para gráficos estadísticos

### 2. Simulador de Escenarios
**Funcionalidades:**
- Configuración de parámetros electorales
- Simulación de cambios en tipologías
- Predicción de resultados electorales
- Análisis de sensibilidad

**Algoritmos:**
- Modelos de regresión logística
- Análisis de Monte Carlo
- Machine Learning para predicciones

### 3. Analizador de Narrativas Sociales
**Funcionalidades:**
- Monitoreo en tiempo real de redes sociales
- Detección de narrativas emergentes
- Análisis de sentimiento político
- Correlación con tipologías de votantes

**APIs Integradas:**
- Twitter API v2
- Facebook Graph API
- Instagram Basic Display API
- Telegram Bot API
- YouTube Data API

### 4. Sistema de Actualización Automática
**Funcionalidades:**
- Recolección automática de datos
- Procesamiento de narrativas
- Actualización de perfiles de votantes
- Alertas de cambios significativos

## Modelos de Datos

### VoterSegment
```typescript
interface VoterSegment {
  id: string;
  name: string;
  description: string;
  demographicProfile: {
    ageRange: [number, number];
    gender: 'M' | 'F' | 'Mixed';
    education: string[];
    socialClass: string[];
    location: string[];
  };
  behavioralProfile: {
    participationRate: number;
    voteStability: number;
    motivations: string[];
    informationChannels: string[];
  };
  sizePercentage: number;
  trends: {
    growth: number;
    stability: number;
    risk: number;
  };
  lastUpdated: Date;
}
```

### Simulation
```typescript
interface Simulation {
  id: string;
  name: string;
  parameters: {
    economicContext: number;
    politicalContext: number;
    campaignIntensity: number;
    externalEvents: string[];
    segmentAdjustments: Record<string, number>;
  };
  results: {
    expectedTurnout: number;
    voteShare: number;
    segmentContributions: Record<string, number>;
    confidence: number;
  };
  createdAt: Date;
}
```

### SocialNarrative
```typescript
interface SocialNarrative {
  id: string;
  content: string;
  platforms: string[];
  frequency: number;
  sentimentScore: number;
  politicalRelevance: number;
  impactOnSegments: Record<string, number>;
  trend: 'rising' | 'stable' | 'declining';
  firstDetected: Date;
  lastUpdated: Date;
}
```

## Algoritmos de Análisis

### 1. Análisis de Sentimiento
```python
# Procesamiento de texto con NLP
def analyze_sentiment(text: str) -> float:
    # Limpieza y preprocesamiento
    cleaned_text = preprocess_text(text)
    
    # Análisis con modelo preentrenado
    sentiment = sentiment_model.predict(cleaned_text)
    
    # Ajuste para contexto político español
    adjusted_sentiment = adjust_for_spanish_politics(sentiment)
    
    return adjusted_sentiment

# Detección de narrativas políticas
def extract_political_narratives(posts: List[str]) -> List[Narrative]:
    # Clustering de contenido similar
    clusters = cluster_similar_content(posts)
    
    # Extracción de temas principales
    narratives = []
    for cluster in clusters:
        topic = extract_main_topic(cluster)
        frequency = len(cluster)
        sentiment = analyze_cluster_sentiment(cluster)
        
        narratives.append(Narrative(
            content=topic,
            frequency=frequency,
            sentiment=sentiment
        ))
    
    return narratives
```

### 2. Predicción de Comportamiento Electoral
```python
# Modelo de predicción de voto
class VotingBehaviorPredictor:
    def __init__(self):
        self.model = load_trained_model()
        self.segment_weights = load_segment_weights()
    
    def predict_turnout(self, segment: VoterSegment, context: dict) -> float:
        features = self.extract_features(segment, context)
        base_turnout = self.model.predict_turnout(features)
        
        # Ajustes por narrativas sociales
        narrative_impact = self.calculate_narrative_impact(segment)
        adjusted_turnout = base_turnout * (1 + narrative_impact)
        
        return min(1.0, max(0.0, adjusted_turnout))
    
    def predict_vote_share(self, segments: List[VoterSegment], context: dict) -> float:
        total_votes = 0
        total_eligible = 0
        
        for segment in segments:
            turnout = self.predict_turnout(segment, context)
            vote_probability = self.predict_psoe_vote_probability(segment, context)
            
            segment_votes = segment.size * turnout * vote_probability
            total_votes += segment_votes
            total_eligible += segment.size * turnout
        
        return total_votes / total_eligible if total_eligible > 0 else 0
```

### 3. Detección de Cambios en Tipologías
```python
# Monitor de cambios en segmentos
class SegmentChangeDetector:
    def __init__(self):
        self.baseline_profiles = load_baseline_profiles()
        self.change_threshold = 0.05  # 5% de cambio significativo
    
    def detect_changes(self, current_data: dict) -> List[Change]:
        changes = []
        
        for segment_id, current_profile in current_data.items():
            baseline = self.baseline_profiles[segment_id]
            
            # Comparar métricas clave
            for metric, current_value in current_profile.items():
                baseline_value = baseline.get(metric, 0)
                change_rate = abs(current_value - baseline_value) / baseline_value
                
                if change_rate > self.change_threshold:
                    changes.append(Change(
                        segment_id=segment_id,
                        metric=metric,
                        old_value=baseline_value,
                        new_value=current_value,
                        change_rate=change_rate
                    ))
        
        return changes
```

## APIs y Endpoints

### Voter Segments API
```typescript
// GET /api/segments
// Obtener todas las tipologías de votantes
app.get('/api/segments', async (req, res) => {
  const segments = await voterService.getAllSegments();
  res.json(segments);
});

// GET /api/segments/:id
// Obtener tipología específica
app.get('/api/segments/:id', async (req, res) => {
  const segment = await voterService.getSegmentById(req.params.id);
  res.json(segment);
});

// PUT /api/segments/:id
// Actualizar tipología
app.put('/api/segments/:id', async (req, res) => {
  const updated = await voterService.updateSegment(req.params.id, req.body);
  res.json(updated);
});
```

### Simulation API
```typescript
// POST /api/simulations
// Crear nueva simulación
app.post('/api/simulations', async (req, res) => {
  const simulation = await simulationService.createSimulation(req.body);
  res.json(simulation);
});

// GET /api/simulations/:id/results
// Obtener resultados de simulación
app.get('/api/simulations/:id/results', async (req, res) => {
  const results = await simulationService.getResults(req.params.id);
  res.json(results);
});
```

### Social Media API
```typescript
// GET /api/social/narratives
// Obtener narrativas actuales
app.get('/api/social/narratives', async (req, res) => {
  const narratives = await socialMediaService.getCurrentNarratives();
  res.json(narratives);
});

// POST /api/social/analyze
// Analizar nuevo contenido
app.post('/api/social/analyze', async (req, res) => {
  const analysis = await socialMediaService.analyzeContent(req.body.content);
  res.json(analysis);
});
```

## Configuración de Despliegue

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/psoe_simulator
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
  
  postgres:
    image: postgres:14
    environment:
      - POSTGRES_DB=psoe_simulator
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7
    volumes:
      - redis_data:/data
  
  worker:
    build: ./backend
    command: npm run worker
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/psoe_simulator
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
```

### Variables de Entorno
```env
# API Keys para redes sociales
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
FACEBOOK_ACCESS_TOKEN=your_facebook_token
INSTAGRAM_ACCESS_TOKEN=your_instagram_token

# Configuración de base de datos
DATABASE_URL=postgresql://user:pass@localhost:5432/psoe_simulator
REDIS_URL=redis://localhost:6379

# Configuración de análisis
ML_MODEL_PATH=./models/voting_predictor.pkl
SENTIMENT_MODEL_PATH=./models/sentiment_analyzer.pkl

# Configuración de actualización
UPDATE_INTERVAL_MINUTES=30
NARRATIVE_ANALYSIS_INTERVAL_HOURS=6
```

## Seguridad y Privacidad

### Medidas de Seguridad
1. **Autenticación JWT** para acceso a la aplicación
2. **Rate limiting** en APIs públicas
3. **Validación de entrada** en todos los endpoints
4. **Encriptación** de datos sensibles
5. **Logs de auditoría** para cambios importantes

### Privacidad de Datos
1. **Anonimización** de datos personales
2. **Agregación** de métricas individuales
3. **Cumplimiento GDPR** en recolección de datos
4. **Políticas de retención** de datos temporales

## Monitoreo y Alertas

### Métricas Clave
- Tiempo de respuesta de APIs
- Precisión de predicciones
- Volumen de datos procesados
- Errores en análisis de redes sociales

### Alertas Automáticas
- Cambios significativos en tipologías (>5%)
- Narrativas virales detectadas
- Errores en recolección de datos
- Anomalías en patrones de voto

Esta arquitectura proporciona una base sólida para el simulador interactivo, permitiendo análisis en tiempo real y actualizaciones automáticas basadas en el monitoreo de narrativas en redes sociales.