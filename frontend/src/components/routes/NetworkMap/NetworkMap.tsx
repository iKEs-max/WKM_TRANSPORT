import React, { useMemo } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Route } from '@/types/route.types';
import styles from './NetworkMap.module.css';

// Centralized Ghana city coordinates
const GHANA_CITIES: Record<string, [number, number]> = {
  'Accra': [-0.186964, 5.603717],
  'Kumasi': [-1.624430, 6.666600],
  'Tamale': [-0.839300, 9.400789],
  'Takoradi': [-1.755360, 4.884470],
  'Cape Coast': [-1.246600, 5.105350],
  'Sunyani': [-2.326760, 7.339980],
  'Ho': [0.471300, 6.600840],
  'Koforidua': [-0.259130, 6.094460],
  'Wa': [-2.501920, 10.060080],
  'Bolgatanga': [-0.851050, 10.785630],
  'Winneba': [-0.623150, 5.351110],
  'Tarkwa': [-1.984520, 5.305410],
};

interface NetworkMapProps {
  routes: Route[];
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ routes }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // Extract unique cities that have active routes
  const activeCities = useMemo(() => {
    const citiesSet = new Set<string>();
    routes.forEach(r => {
      if (r.status === 'ACTIVE') {
        citiesSet.add(r.departure);
        citiesSet.add(r.destination);
      }
    });
    return Array.from(citiesSet);
  }, [routes]);

  // Generate route lines GeoJSON
  const routeLinesData = useMemo(() => {
    const features = routes
      .filter(r => r.status === 'ACTIVE' && GHANA_CITIES[r.departure] && GHANA_CITIES[r.destination])
      .map(r => ({
        type: 'Feature' as const,
        properties: { id: r.id },
        geometry: {
          type: 'LineString' as const,
          coordinates: [GHANA_CITIES[r.departure], GHANA_CITIES[r.destination]]
        }
      }));

    return {
      type: 'FeatureCollection' as const,
      features
    };
  }, [routes]);

  if (!mapboxToken) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>
          <MapPin size={48} className="text-onukpa-orange opacity-50 mb-4" />
          <h3 className="font-display font-bold text-xl mb-2">Interactive Network Map</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">
            We connect the major educational hubs of Ghana. Currently serving 
            <span className="text-onukpa-blue font-bold"> {activeCities.length} cities </span> 
            with <span className="text-onukpa-orange font-bold">{routes.length} active routes</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {activeCities.map(city => (
              <span key={city} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {city}
              </span>
            ))}
          </div>
          <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl text-xs text-orange-800">
            <strong>Note:</strong> Map visualization requires a VITE_MAPBOX_TOKEN in the environment.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: -1.0232, // Central Ghana
          latitude: 7.9465,
          zoom: 6,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        attributionControl={false}
      >
        {/* Route Lines */}
        <Source id="route-network" type="geojson" data={routeLinesData}>
          <Layer
            id="route-layer"
            type="line"
            paint={{
              'line-color': '#f59e0b',
              'line-width': 2,
              'line-opacity': 0.4,
              'line-dasharray': [2, 1]
            }}
          />
        </Source>

        {/* City Markers */}
        {activeCities.map(city => {
          const coords = GHANA_CITIES[city];
          if (!coords) return null;

          return (
            <Marker key={city} longitude={coords[0]} latitude={coords[1]} anchor="center">
              <div className={styles.marker}>
                <div className={styles.cityLabel}>{city}</div>
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};
