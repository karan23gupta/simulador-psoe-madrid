'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  BarChart3, 
  Settings,
  Play,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { voterSegments, personaTypes } from '@/data/voterSegments';
import { VoterSegment, SimulationParameters, SimulationResults } from '@/types/voter';
import VoterSegmentCard from '@/components/VoterSegmentCard';
import SimulationPanel from '@/components/SimulationPanel';
import GeographicMap from '@/components/GeographicMap';
import SocialMediaAnalysis from '@/components/SocialMediaAnalysis';

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<VoterSegment | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResults | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Calcular métricas generales
  const totalPotentialVoters = voterSegments.reduce((sum, segment) => sum + segment.sizePercentage, 0);
  const averageParticipation = voterSegments.reduce((sum, segment) => 
    sum + (segment.behavioralProfile.participationRate * segment.sizePercentage), 0) / totalPotentialVoters;
  const averageStability = voterSegments.reduce((sum, segment) => 
    sum + (segment.behavioralProfile.voteStability * segment.sizePercentage), 0) / totalPotentialVoters;

  // Segmentos por bloque
  const fielesHabituales = voterSegments.filter(s => 
    ['veterano-fiel', 'trabajador-urbano', 'mujer-progresista', 'inmigrante-integrado'].includes(s.id)
  );
  const potencialesRecuperables = voterSegments.filter(s => 
    ['desencantado-izquierdas', 'madre-trabajadora', 'joven-precario', 'converso-centro', 'funcionario-descontento', 'pensionista-indeciso'].includes(s.id)
  );
  const ocasionalesMovilizables = voterSegments.filter(s => 
    ['abstencionista-ocasional', 'joven-feminista', 'trabajador-desencantado', 'nuevo-ciudadano', 'ecologista-pragmatico'].includes(s.id)
  );

  const runSimulation = async (parameters: SimulationParameters) => {
    setIsSimulating(true);
    
    // Simular procesamiento (en una implementación real, esto sería una llamada a la API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calcular resultados simulados basados en parámetros
    const baseVoteShare = 0.182; // 18.2% resultado real 2023
    const contextAdjustment = (parameters.economicContext + parameters.politicalContext) * 0.05;
    const campaignBoost = parameters.campaignIntensity * 0.03;
    const socialMediaImpact = parameters.socialMediaImpact * 0.02;
    
    const adjustedVoteShare = Math.max(0.1, Math.min(0.35, 
      baseVoteShare + contextAdjustment + campaignBoost + socialMediaImpact
    ));
    
    const results: SimulationResults = {
      expectedTurnout: averageParticipation + (parameters.campaignIntensity * 0.1),
      voteShare: adjustedVoteShare,
      segmentContributions: voterSegments.reduce((acc, segment) => {
        const adjustment = parameters.segmentAdjustments[segment.id] || 0;
        acc[segment.id] = (segment.sizePercentage / 100) * (1 + adjustment);
        return acc;
      }, {} as Record<string, number>),
      confidence: 0.75 + (parameters.campaignIntensity * 0.2),
      geographicResults: {
        'Madrid Capital': adjustedVoteShare * 0.9,
        'Sur Metropolitano': adjustedVoteShare * 1.3,
        'Norte Metropolitano': adjustedVoteShare * 0.7,
        'Este Metropolitano': adjustedVoteShare * 0.8,
        'Oeste Metropolitano': adjustedVoteShare * 0.6
      },
      scenarios: {
        optimistic: adjustedVoteShare * 1.2,
        realistic: adjustedVoteShare,
        pessimistic: adjustedVoteShare * 0.8
      }
    };
    
    setSimulationResults(results);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Simulador Electoral PSOE Madrid
          </h1>
          <p className="text-lg text-gray-600">
            Análisis interactivo del electorado potencial del PSOE en la Comunidad de Madrid
          </p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Electorado Potencial</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPotentialVoters}%</div>
              <p className="text-xs text-muted-foreground">
                15 tipologías identificadas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participación Media</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(averageParticipation * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Ponderada por tamaño de segmento
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estabilidad Media</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(averageStability * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Fidelidad de voto promedio
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hoy</div>
              <p className="text-xs text-muted-foreground">
                Análisis de narrativas activo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="segments">Tipologías</TabsTrigger>
            <TabsTrigger value="simulation">Simulador</TabsTrigger>
            <TabsTrigger value="social">Narrativas Sociales</TabsTrigger>
          </TabsList>

          {/* Vista General */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribución por bloques */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Bloques Electorales</CardTitle>
                  <CardDescription>
                    Segmentación estratégica del electorado potencial
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Fieles y Habituales</span>
                      <span className="text-sm text-muted-foreground">
                        {fielesHabituales.reduce((sum, s) => sum + s.sizePercentage, 0)}%
                      </span>
                    </div>
                    <Progress 
                      value={fielesHabituales.reduce((sum, s) => sum + s.sizePercentage, 0)} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Potenciales y Recuperables</span>
                      <span className="text-sm text-muted-foreground">
                        {potencialesRecuperables.reduce((sum, s) => sum + s.sizePercentage, 0)}%
                      </span>
                    </div>
                    <Progress 
                      value={potencialesRecuperables.reduce((sum, s) => sum + s.sizePercentage, 0)} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Ocasionales y Movilizables</span>
                      <span className="text-sm text-muted-foreground">
                        {ocasionalesMovilizables.reduce((sum, s) => sum + s.sizePercentage, 0)}%
                      </span>
                    </div>
                    <Progress 
                      value={ocasionalesMovilizables.reduce((sum, s) => sum + s.sizePercentage, 0)} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Mapa geográfico */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución Geográfica</CardTitle>
                  <CardDescription>
                    Concentración del electorado por zonas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GeographicMap segments={voterSegments} />
                </CardContent>
              </Card>
            </div>

            {/* Alertas y tendencias */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Alertas y Tendencias Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                    <TrendingDown className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        Erosión en el Cinturón Rojo
                      </p>
                      <p className="text-xs text-amber-700">
                        Detectada caída del 15% en participación en municipios del sur metropolitano
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Crecimiento en Nuevos Ciudadanos
                      </p>
                      <p className="text-xs text-green-700">
                        Aumento del 7% en intención de voto entre población inmigrante cualificada
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <RefreshCw className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Narrativa Emergente: Vivienda
                      </p>
                      <p className="text-xs text-blue-700">
                        Incremento del 40% en menciones sobre políticas de vivienda en redes sociales
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tipologías detalladas */}
          <TabsContent value="segments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de segmentos */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-700">
                    Bloque I: Fieles y Habituales ({fielesHabituales.reduce((sum, s) => sum + s.sizePercentage, 0)}%)
                  </h3>
                  <div className="grid gap-4">
                    {fielesHabituales.map((segment) => (
                      <VoterSegmentCard
                        key={segment.id}
                        segment={segment}
                        onClick={() => setSelectedSegment(segment)}
                        isSelected={selectedSegment?.id === segment.id}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-orange-700">
                    Bloque II: Potenciales y Recuperables ({potencialesRecuperables.reduce((sum, s) => sum + s.sizePercentage, 0)}%)
                  </h3>
                  <div className="grid gap-4">
                    {potencialesRecuperables.map((segment) => (
                      <VoterSegmentCard
                        key={segment.id}
                        segment={segment}
                        onClick={() => setSelectedSegment(segment)}
                        isSelected={selectedSegment?.id === segment.id}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-yellow-700">
                    Bloque III: Ocasionales y Movilizables ({ocasionalesMovilizables.reduce((sum, s) => sum + s.sizePercentage, 0)}%)
                  </h3>
                  <div className="grid gap-4">
                    {ocasionalesMovilizables.map((segment) => (
                      <VoterSegmentCard
                        key={segment.id}
                        segment={segment}
                        onClick={() => setSelectedSegment(segment)}
                        isSelected={selectedSegment?.id === segment.id}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel de detalles */}
              <div className="lg:col-span-1">
                {selectedSegment ? (
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="text-lg">{selectedSegment.name}</CardTitle>
                      <CardDescription>{selectedSegment.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Persona Tipo</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedSegment.personaType}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Perfil Demográfico</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Edad:</strong> {selectedSegment.demographicProfile.ageRange[0]}-{selectedSegment.demographicProfile.ageRange[1]} años</p>
                          <p><strong>Género:</strong> {selectedSegment.demographicProfile.gender === 'Mixed' ? 'Mixto' : selectedSegment.demographicProfile.gender}</p>
                          <p><strong>Educación:</strong> {selectedSegment.demographicProfile.education.join(', ')}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Comportamiento Electoral</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Participación</span>
                              <span>{(selectedSegment.behavioralProfile.participationRate * 100).toFixed(0)}%</span>
                            </div>
                            <Progress value={selectedSegment.behavioralProfile.participationRate * 100} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Estabilidad</span>
                              <span>{(selectedSegment.behavioralProfile.voteStability * 100).toFixed(0)}%</span>
                            </div>
                            <Progress value={selectedSegment.behavioralProfile.voteStability * 100} className="h-1" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Motivaciones Principales</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedSegment.behavioralProfile.motivations.slice(0, 4).map((motivation, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {motivation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Canales de Información</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedSegment.behavioralProfile.informationChannels.slice(0, 3).map((channel, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {channel}
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
                        Selecciona una tipología para ver los detalles
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Simulador */}
          <TabsContent value="simulation">
            <SimulationPanel 
              segments={voterSegments}
              onRunSimulation={runSimulation}
              results={simulationResults}
              isSimulating={isSimulating}
            />
          </TabsContent>

          {/* Análisis de redes sociales */}
          <TabsContent value="social">
            <SocialMediaAnalysis segments={voterSegments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}