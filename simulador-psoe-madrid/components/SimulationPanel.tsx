'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  MapPin,
  Users,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { VoterSegment, SimulationParameters, SimulationResults } from '@/types/voter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SimulationPanelProps {
  segments: VoterSegment[];
  onRunSimulation: (parameters: SimulationParameters) => void;
  results: SimulationResults | null;
  isSimulating: boolean;
}

export default function SimulationPanel({ segments, onRunSimulation, results, isSimulating }: SimulationPanelProps) {
  const [parameters, setParameters] = useState<SimulationParameters>({
    economicContext: 0,
    politicalContext: 0,
    campaignIntensity: 0.5,
    externalEvents: [],
    segmentAdjustments: {},
    socialMediaImpact: 0.3
  });

  const handleParameterChange = (key: keyof SimulationParameters, value: any) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSegmentAdjustment = (segmentId: string, adjustment: number) => {
    setParameters(prev => ({
      ...prev,
      segmentAdjustments: {
        ...prev.segmentAdjustments,
        [segmentId]: adjustment
      }
    }));
  };

  const resetParameters = () => {
    setParameters({
      economicContext: 0,
      politicalContext: 0,
      campaignIntensity: 0.5,
      externalEvents: [],
      segmentAdjustments: {},
      socialMediaImpact: 0.3
    });
  };

  const runSimulation = () => {
    onRunSimulation(parameters);
  };

  // Preparar datos para gráficos
  const segmentContributionData = results ? segments.map(segment => ({
    name: segment.name.replace('El ', '').replace('La ', ''),
    contribution: (results.segmentContributions[segment.id] || 0) * 100,
    baseline: segment.sizePercentage
  })) : [];

  const geographicData = results ? Object.entries(results.geographicResults).map(([zone, share]) => ({
    zone,
    share: share * 100
  })) : [];

  const scenarioData = results ? [
    { scenario: 'Pesimista', value: results.scenarios.pessimistic * 100 },
    { scenario: 'Realista', value: results.scenarios.realistic * 100 },
    { scenario: 'Optimista', value: results.scenarios.optimistic * 100 }
  ] : [];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de parámetros */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Parámetros de Simulación
              </CardTitle>
              <CardDescription>
                Ajusta las variables para simular diferentes escenarios electorales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contexto económico */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Contexto Económico
                </label>
                <Slider
                  value={[parameters.economicContext]}
                  onValueChange={(value) => handleParameterChange('economicContext', value[0])}
                  min={-1}
                  max={1}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Crisis (-1)</span>
                  <span>Neutral (0)</span>
                  <span>Bonanza (+1)</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Actual: {parameters.economicContext > 0 ? 'Favorable' : parameters.economicContext < 0 ? 'Desfavorable' : 'Neutral'} 
                  ({parameters.economicContext.toFixed(1)})
                </p>
              </div>

              {/* Contexto político */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Contexto Político
                </label>
                <Slider
                  value={[parameters.politicalContext]}
                  onValueChange={(value) => handleParameterChange('politicalContext', value[0])}
                  min={-1}
                  max={1}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Adverso (-1)</span>
                  <span>Neutral (0)</span>
                  <span>Favorable (+1)</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Actual: {parameters.politicalContext > 0 ? 'Favorable' : parameters.politicalContext < 0 ? 'Adverso' : 'Neutral'} 
                  ({parameters.politicalContext.toFixed(1)})
                </p>
              </div>

              {/* Intensidad de campaña */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Intensidad de Campaña
                </label>
                <Slider
                  value={[parameters.campaignIntensity]}
                  onValueChange={(value) => handleParameterChange('campaignIntensity', value[0])}
                  min={0}
                  max={1}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Baja (0)</span>
                  <span>Media (0.5)</span>
                  <span>Alta (1)</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Actual: {parameters.campaignIntensity > 0.7 ? 'Alta' : parameters.campaignIntensity > 0.3 ? 'Media' : 'Baja'} 
                  ({(parameters.campaignIntensity * 100).toFixed(0)}%)
                </p>
              </div>

              {/* Impacto redes sociales */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Impacto Redes Sociales
                </label>
                <Slider
                  value={[parameters.socialMediaImpact]}
                  onValueChange={(value) => handleParameterChange('socialMediaImpact', value[0])}
                  min={0}
                  max={1}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Mínimo (0)</span>
                  <span>Medio (0.5)</span>
                  <span>Máximo (1)</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Actual: {(parameters.socialMediaImpact * 100).toFixed(0)}% de impacto
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={runSimulation} 
                  disabled={isSimulating}
                  className="flex-1"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Simulando...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Ejecutar
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetParameters}
                  disabled={isSimulating}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ajustes por segmento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ajustes por Tipología</CardTitle>
              <CardDescription className="text-sm">
                Modifica el comportamiento esperado de cada segmento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {segments.slice(0, 8).map((segment) => (
                <div key={segment.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">
                      {segment.name.replace('El ', '').replace('La ', '')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {parameters.segmentAdjustments[segment.id] ? 
                        (parameters.segmentAdjustments[segment.id] > 0 ? '+' : '') + 
                        (parameters.segmentAdjustments[segment.id] * 100).toFixed(0) + '%' 
                        : '0%'
                      }
                    </span>
                  </div>
                  <Slider
                    value={[parameters.segmentAdjustments[segment.id] || 0]}
                    onValueChange={(value) => handleSegmentAdjustment(segment.id, value[0])}
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    className="h-1"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 space-y-4">
          {results ? (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="segments">Por Tipología</TabsTrigger>
                <TabsTrigger value="geographic">Geográfico</TabsTrigger>
              </TabsList>

              {/* Resumen general */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Cuota de Voto Esperada</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        {(results.voteShare * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-gray-600">
                        vs 18.2% en 2023
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Participación Esperada</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        {(results.expectedTurnout * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-gray-600">
                        del electorado potencial
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Confianza</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {(results.confidence * 100).toFixed(0)}%
                      </div>
                      <p className="text-xs text-gray-600">
                        nivel de certidumbre
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Escenarios */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Escenarios Proyectados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={scenarioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="scenario" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Cuota de voto']} />
                        <Bar dataKey="value" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Por tipología */}
              <TabsContent value="segments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contribución por Tipología</CardTitle>
                    <CardDescription>
                      Comparación entre línea base y proyección
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={segmentContributionData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} />
                        <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Contribución']} />
                        <Bar dataKey="baseline" fill="#e5e7eb" name="Línea base" />
                        <Bar dataKey="contribution" fill="#ef4444" name="Proyección" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Geográfico */}
              <TabsContent value="geographic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Distribución Geográfica</CardTitle>
                    <CardDescription>
                      Cuota de voto esperada por zona
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={geographicData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ zone, share }) => `${zone}: ${share.toFixed(1)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="share"
                          >
                            {geographicData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Cuota de voto']} />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="space-y-3">
                        {geographicData.map((item, index) => (
                          <div key={item.zone} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                              <span className="text-sm font-medium">{item.zone}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.share.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="h-96">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No hay resultados de simulación</p>
                  <p className="text-sm text-gray-500">
                    Ajusta los parámetros y ejecuta una simulación para ver los resultados
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}