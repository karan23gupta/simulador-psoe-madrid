'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Users, MapPin } from 'lucide-react';
import { VoterSegment } from '@/types/voter';
import { cn } from '@/lib/utils';

interface VoterSegmentCardProps {
  segment: VoterSegment;
  onClick: () => void;
  isSelected: boolean;
}

export default function VoterSegmentCard({ segment, onClick, isSelected }: VoterSegmentCardProps) {
  const getTrendIcon = (growth: number) => {
    if (growth > 0.02) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (growth < -0.02) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (growth: number) => {
    if (growth > 0.02) return 'text-green-600';
    if (growth < -0.02) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRiskColor = (risk: number) => {
    if (risk > 0.6) return 'bg-red-500';
    if (risk > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStabilityColor = (stability: number) => {
    if (stability > 0.8) return 'bg-green-500';
    if (stability > 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-red-500 shadow-md"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold text-gray-900">
              {segment.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {segment.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {getTrendIcon(segment.trends.growth)}
            <Badge variant="secondary" className="text-xs">
              {segment.sizePercentage}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Persona tipo */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{segment.personaType}</span>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Participación</span>
              <span className="text-xs font-medium">
                {(segment.behavioralProfile.participationRate * 100).toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={segment.behavioralProfile.participationRate * 100} 
              className="h-1.5"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Estabilidad</span>
              <span className="text-xs font-medium">
                {(segment.behavioralProfile.voteStability * 100).toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={segment.behavioralProfile.voteStability * 100} 
              className="h-1.5"
            />
          </div>
        </div>

        {/* Indicadores de riesgo y tendencia */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", getRiskColor(segment.trends.risk))} />
            <span className="text-xs text-gray-600">
              Riesgo: {segment.trends.risk > 0.6 ? 'Alto' : segment.trends.risk > 0.4 ? 'Medio' : 'Bajo'}
            </span>
          </div>
          
          <div className={cn("text-xs font-medium", getTrendColor(segment.trends.growth))}>
            {segment.trends.growth > 0 ? '+' : ''}{(segment.trends.growth * 100).toFixed(1)}%
          </div>
        </div>

        {/* Motivaciones principales (solo las primeras 3) */}
        <div className="flex flex-wrap gap-1">
          {segment.behavioralProfile.motivations.slice(0, 3).map((motivation, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
              {motivation}
            </Badge>
          ))}
          {segment.behavioralProfile.motivations.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500">
              +{segment.behavioralProfile.motivations.length - 3}
            </Badge>
          )}
        </div>

        {/* Ubicación principal */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin className="h-3 w-3" />
          <span>{segment.demographicProfile.location[0]}</span>
        </div>
      </CardContent>
    </Card>
  );
}