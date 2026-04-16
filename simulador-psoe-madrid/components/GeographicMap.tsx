'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VoterSegment } from '@/types/voter';

interface GeographicMapProps {
  segments: VoterSegment[];
}

export default function GeographicMap({ segments }: GeographicMapProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Calcular concentración por zona
  const zoneData = segments.reduce((acc, segment) => {
    Object.entries(segment.geographicDistribution).forEach(([zone, percentage]) => {
      if (!acc[zone]) {
        acc[zone] = { total: 0, segments: [] };
      }
      acc[zone].total += percentage * segment.sizePercentage;
      acc[zone].segments.push({
        name: segment.name,
        percentage: percentage * segment.sizePercentage,
        color: getSegmentColor(segment.id)
      });
    });
    return acc;
  }, {} as Record<string, { total: number; segments: Array<{ name: string; percentage: number; color: string }> }>);

  function getSegmentColor(segmentId: string): string {
    const colors: Record<string, string> = {
      'veterano-fiel': '#dc2626',
      'trabajador-urbano': '#ea580c',
      'mujer-progresista': '#d97706',
      'inmigrante-integrado': '#ca8a04',
      'desencantado-izquierdas': '#65a30d',
      'madre-trabajadora': '#16a34a',
      'joven-precario': '#059669',
      'converso-centro': '#0891b2',
      'funcionario-descontento': '#0284c7',
      'pensionista-indeciso': '#2563eb',
      'abstencionista-ocasional': '#7c3aed',
      'joven-feminista': '#9333ea',
      'trabajador-desencantado': '#c026d3',
      'nuevo-ciudadano': '#db2777',
      'ecologista-pragmatico': '#e11d48'
    };
    return colors[segmentId] || '#6b7280';
  }

  const getIntensityColor = (total: number): string => {
    if (total > 15) return 'bg-red-600';
    if (total > 10) return 'bg-red-500';
    if (total > 7) return 'bg-red-400';
    if (total > 5) return 'bg-red-300';
    if (total > 3) return 'bg-red-200';
    return 'bg-red-100';
  };

  const getIntensityText = (total: number): string => {
    if (total > 15) return 'Muy Alta';
    if (total > 10) return 'Alta';
    if (total > 7) return 'Media-Alta';
    if (total > 5) return 'Media';
    if (total > 3) return 'Media-Baja';
    return 'Baja';
  };

  // Zonas principales ordenadas por concentración
  const sortedZones = Object.entries(zoneData)
    .sort(([, a], [, b]) => b.total - a.total)
    .slice(0, 12);

  return (
    <div className="space-y-4">
      {/* Mapa conceptual */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {sortedZones.map(([zone, data]) => (
          <div
            key={zone}
            className={`
              p-3 rounded-lg cursor-pointer transition-all duration-200 border-2
              ${selectedZone === zone ? 'border-red-500 shadow-md' : 'border-transparent hover:border-red-200'}
              ${getIntensityColor(data.total)} text-white
            `}
            onClick={() => setSelectedZone(selectedZone === zone ? null : zone)}
          >
            <div className="text-xs font-medium mb-1">{zone}</div>
            <div className="text-lg font-bold">{data.total.toFixed(1)}%</div>
            <div className="text-xs opacity-90">
              {getIntensityText(data.total)}
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span>Muy Alta (&gt;15%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Alta (10-15%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span>Media-Alta (7-10%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-300 rounded"></div>
          <span>Media (5-7%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span>Media-Baja (3-5%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-100 rounded"></div>
          <span>Baja (&lt;3%)</span>
        </div>
      </div>

      {/* Detalles de zona seleccionada */}
      {selectedZone && zoneData[selectedZone] && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{selectedZone}</CardTitle>
            <CardDescription>
              Concentración total: {zoneData[selectedZone].total.toFixed(1)}% del electorado potencial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="text-sm font-medium mb-2">Tipologías presentes:</h4>
              {zoneData[selectedZone].segments
                .filter(segment => segment.percentage > 0.5)
                .sort((a, b) => b.percentage - a.percentage)
                .map((segment, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-sm">{segment.name.replace('El ', '').replace('La ', '')}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {segment.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumen por zonas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ranking de Concentración</CardTitle>
          <CardDescription>
            Zonas con mayor potencial electoral del PSOE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedZones.slice(0, 8).map(([zone, data], index) => (
              <div key={zone} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {data.total.toFixed(1)}%
                  </Badge>
                  <div className={`px-2 py-1 rounded text-xs text-white ${getIntensityColor(data.total)}`}>
                    {getIntensityText(data.total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}