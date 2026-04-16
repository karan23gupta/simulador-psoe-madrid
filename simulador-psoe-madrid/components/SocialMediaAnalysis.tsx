'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  MessageCircle, 
  Heart, 
  Share2, 
  AlertTriangle,
  RefreshCw,
  Eye,
  Users,
  Hash,
  Calendar
} from 'lucide-react';
import { VoterSegment, SocialNarrative } from '@/types/voter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface SocialMediaAnalysisProps {
  segments: VoterSegment[];
}

// Datos simulados de narrativas sociales
const mockNarratives: SocialNarrative[] = [
  {
    id: '1',
    content: 'Políticas de vivienda para jóvenes',
    platforms: ['Twitter', 'Instagram', 'TikTok'],
    frequency: 1250,
    sentimentScore: 0.3,
    politicalRelevance: 0.85,
    impactOnSegments: {
      'joven-precario': 0.8,
      'joven-feminista': 0.6,
      'madre-trabajadora': 0.4,
      'nuevo-ciudadano': 0.3
    },
    trend: 'rising',
    firstDetected: new Date('2024-01-10'),
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '2',
    content: 'Defensa de la sanidad pública',
    platforms: ['Facebook', 'Twitter', 'WhatsApp'],
    frequency: 980,
    sentimentScore: 0.7,
    politicalRelevance: 0.9,
    impactOnSegments: {
      'veterano-fiel': 0.9,
      'trabajador-urbano': 0.8,
      'pensionista-indeciso': 0.7,
      'funcionario-descontento': 0.6
    },
    trend: 'stable',
    firstDetected: new Date('2024-01-05'),
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '3',
    content: 'Igualdad de género y feminismo',
    platforms: ['Instagram', 'TikTok', 'Twitter'],
    frequency: 850,
    sentimentScore: 0.6,
    politicalRelevance: 0.75,
    impactOnSegments: {
      'mujer-progresista': 0.9,
      'joven-feminista': 0.85,
      'madre-trabajadora': 0.5,
      'joven-precario': 0.3
    },
    trend: 'rising',
    firstDetected: new Date('2024-01-08'),
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '4',
    content: 'Crisis económica y empleo',
    platforms: ['Twitter', 'Facebook', 'LinkedIn'],
    frequency: 720,
    sentimentScore: -0.2,
    politicalRelevance: 0.8,
    impactOnSegments: {
      'trabajador-desencantado': 0.8,
      'abstencionista-ocasional': 0.6,
      'joven-precario': 0.7,
      'madre-trabajadora': 0.5
    },
    trend: 'declining',
    firstDetected: new Date('2024-01-01'),
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '5',
    content: 'Políticas ambientales y sostenibilidad',
    platforms: ['Instagram', 'Twitter', 'LinkedIn'],
    frequency: 420,
    sentimentScore: 0.4,
    politicalRelevance: 0.6,
    impactOnSegments: {
      'ecologista-pragmatico': 0.9,
      'joven-precario': 0.4,
      'converso-centro': 0.3,
      'nuevo-ciudadano': 0.2
    },
    trend: 'rising',
    firstDetected: new Date('2024-01-12'),
    lastUpdated: new Date('2024-01-15')
  }
];

// Datos simulados de evolución temporal
const mockTrendData = [
  { date: '2024-01-01', vivienda: 800, sanidad: 1100, feminismo: 600, economia: 950, ambiente: 200 },
  { date: '2024-01-03', vivienda: 850, sanidad: 1050, feminismo: 650, economia: 900, ambiente: 250 },
  { date: '2024-01-05', vivienda: 920, sanidad: 980, feminismo: 700, economia: 850, ambiente: 280 },
  { date: '2024-01-07', vivienda: 1000, sanidad: 990, feminismo: 750, economia: 800, ambiente: 320 },
  { date: '2024-01-09', vivienda: 1100, sanidad: 985, feminismo: 800, economia: 750, ambiente: 350 },
  { date: '2024-01-11', vivienda: 1180, sanidad: 980, feminismo: 830, economia: 720, ambiente: 380 },
  { date: '2024-01-13', vivienda: 1220, sanidad: 980, feminismo: 845, economia: 720, ambiente: 400 },
  { date: '2024-01-15', vivienda: 1250, sanidad: 980, feminismo: 850, economia: 720, ambiente: 420 }
];

// Datos de plataformas
const platformData = [
  { platform: 'Twitter', mentions: 2800, sentiment: 0.2, engagement: 0.65 },
  { platform: 'Instagram', mentions: 1900, sentiment: 0.4, engagement: 0.78 },
  { platform: 'Facebook', mentions: 1600, sentiment: 0.3, engagement: 0.45 },
  { platform: 'TikTok', mentions: 1200, sentiment: 0.5, engagement: 0.82 },
  { platform: 'LinkedIn', mentions: 400, sentiment: 0.1, engagement: 0.35 },
  { platform: 'WhatsApp', mentions: 800, sentiment: 0.6, engagement: 0.9 }
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function SocialMediaAnalysis({ segments }: SocialMediaAnalysisProps) {
  const [selectedNarrative, setSelectedNarrative] = useState<SocialNarrative | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const updateAnalysis = async () => {
    setIsUpdating(true);
    // Simular actualización
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdate(new Date());
    setIsUpdating(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.4) return 'text-green-600';
    if (sentiment > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentBg = (sentiment: number) => {
    if (sentiment > 0.4) return 'bg-green-100';
    if (sentiment > 0) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header con métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Menciones Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNarratives.reduce((sum, n) => sum + n.frequency, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Narrativas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNarratives.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockNarratives.filter(n => n.trend === 'rising').length} en crecimiento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Sentimiento Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{((mockNarratives.reduce((sum, n) => sum + n.sentimentScore, 0) / mockNarratives.length) * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tendencia positiva
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Última Actualización
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {formatDate(lastUpdate)}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={updateAnalysis}
              disabled={isUpdating}
              className="mt-2 w-full"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Actualizar
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="narratives" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="narratives">Narrativas</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="platforms">Plataformas</TabsTrigger>
          <TabsTrigger value="impact">Impacto</TabsTrigger>
        </TabsList>

        {/* Narrativas principales */}
        <TabsContent value="narratives" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {mockNarratives.map((narrative) => (
                <Card 
                  key={narrative.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedNarrative?.id === narrative.id ? 'ring-2 ring-red-500' : ''
                  }`}
                  onClick={() => setSelectedNarrative(narrative)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold">
                        {narrative.content}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(narrative.trend)}
                        <Badge variant="secondary">
                          {narrative.frequency}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded text-xs ${getSentimentBg(narrative.sentimentScore)} ${getSentimentColor(narrative.sentimentScore)}`}>
                          {narrative.sentimentScore > 0 ? 'Positivo' : narrative.sentimentScore < 0 ? 'Negativo' : 'Neutral'}
                        </div>
                        <span className="text-xs text-gray-600">
                          Relevancia: {(narrative.politicalRelevance * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {narrative.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Panel de detalles */}
            <div>
              {selectedNarrative ? (
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedNarrative.content}</CardTitle>
                    <CardDescription>
                      Análisis detallado de la narrativa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-1">Frecuencia</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedNarrative.frequency}
                        </div>
                        <div className="text-xs text-gray-600">menciones</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Sentimiento</div>
                        <div className={`text-2xl font-bold ${getSentimentColor(selectedNarrative.sentimentScore)}`}>
                          {selectedNarrative.sentimentScore > 0 ? '+' : ''}{(selectedNarrative.sentimentScore * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-gray-600">
                          {selectedNarrative.sentimentScore > 0 ? 'positivo' : selectedNarrative.sentimentScore < 0 ? 'negativo' : 'neutral'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Relevancia Política</div>
                      <Progress value={selectedNarrative.politicalRelevance * 100} className="h-2" />
                      <div className="text-xs text-gray-600 mt-1">
                        {(selectedNarrative.politicalRelevance * 100).toFixed(0)}% relevante para el PSOE
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Impacto por Tipología</div>
                      <div className="space-y-2">
                        {Object.entries(selectedNarrative.impactOnSegments)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 5)
                          .map(([segmentId, impact]) => {
                            const segment = segments.find(s => s.id === segmentId);
                            return (
                              <div key={segmentId} className="flex items-center justify-between">
                                <span className="text-xs">
                                  {segment?.name.replace('El ', '').replace('La ', '') || segmentId}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Progress value={impact * 100} className="h-1 w-16" />
                                  <span className="text-xs text-gray-600 w-8">
                                    {(impact * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Plataformas</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedNarrative.platforms.map((platform) => (
                          <Badge key={platform} variant="secondary">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              ) : (
                <Card className="sticky top-4">
                  <CardContent className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground text-center">
                      Selecciona una narrativa para ver los detalles
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tendencias temporales */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Narrativas (Últimos 15 días)</CardTitle>
              <CardDescription>
                Frecuencia de menciones por tema a lo largo del tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="vivienda" stroke="#ef4444" name="Vivienda" strokeWidth={2} />
                  <Line type="monotone" dataKey="sanidad" stroke="#3b82f6" name="Sanidad" strokeWidth={2} />
                  <Line type="monotone" dataKey="feminismo" stroke="#8b5cf6" name="Feminismo" strokeWidth={2} />
                  <Line type="monotone" dataKey="economia" stroke="#f97316" name="Economía" strokeWidth={2} />
                  <Line type="monotone" dataKey="ambiente" stroke="#22c55e" name="Ambiente" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Análisis por plataformas */}
        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Menciones por Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mentions" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement por Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformData.map((platform, index) => (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{platform.platform}</span>
                        <span className="text-sm text-gray-600">
                          {(platform.engagement * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={platform.engagement * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{platform.mentions} menciones</span>
                        <span className={getSentimentColor(platform.sentiment)}>
                          Sentimiento: {platform.sentiment > 0 ? '+' : ''}{(platform.sentiment * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Impacto en tipologías */}
        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Impacto de Narrativas en Tipologías de Votantes</CardTitle>
              <CardDescription>
                Cómo las narrativas sociales afectan a cada segmento del electorado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segments.slice(0, 10).map((segment) => {
                  const totalImpact = mockNarratives.reduce((sum, narrative) => 
                    sum + (narrative.impactOnSegments[segment.id] || 0), 0
                  ) / mockNarratives.length;
                  
                  return (
                    <div key={segment.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {segment.name.replace('El ', '').replace('La ', '')}
                        </span>
                        <span className="text-sm text-gray-600">
                          {(totalImpact * 100).toFixed(0)}% impacto promedio
                        </span>
                      </div>
                      <Progress value={totalImpact * 100} className="h-2" />
                      <div className="flex gap-2 text-xs">
                        {mockNarratives
                          .filter(n => (n.impactOnSegments[segment.id] || 0) > 0.3)
                          .slice(0, 3)
                          .map((narrative) => (
                            <Badge key={narrative.id} variant="outline" className="text-xs">
                              {narrative.content.split(' ').slice(0, 2).join(' ')}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}