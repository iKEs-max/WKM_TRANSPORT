import React, { useMemo } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Bus, MapPin } from 'lucide-react';
import styles from './TrackingMap.module.css';

// Fallback mapping for major Ghanaian cities since we aren't using a geocoding API
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
};

interface TrackingMapProps {
  origin: string;
  destination: string;
  status: string; // 'Scheduled' | 'In Transit' | 'Arrived'
}

export const TrackingMap: React.FC<TrackingMapProps> = ({ origin, destination, status }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // Get coordinates
  const originCoords = GHANA_CITIES[origin] || GHANA_CITIES['Accra'];
  const destCoords = GHANA_CITIES[destination] || GHANA_CITIES['Kumasi'];

  // Calculate current vehicle position based on status
  // In a real app, this would be live GPS coordinates from the vehicle
  const currentCoords = useMemo(() => {
    if (status === 'Arrived') return destCoords;
    if (status === 'Scheduled') return originCoords;
    
    // If 'In Transit', simulate halfway for demonstration purposes
    return [
      (originCoords[0] + destCoords[0]) / 2,
      (originCoords[1] + destCoords[1]) / 2,
    ];
  }, [originCoords, destCoords, status]);

  // Route Line GeoJSON
  const routeData = useMemo(() => ({
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: [originCoords, destCoords]
    }
  }), [originCoords, destCoords]);

  // If no token is provided, render a beautiful placeholder
  if (!mapboxToken) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>
          <MapPin size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <h3>Interactive Map Disabled</h3>
          <p style={{ maxWidth: '400px', marginTop: '0.5rem', opacity: 0.7 }}>
            To view the live tracking map, please add a valid Mapbox Public Token to your environment variables (<code style={{background: 'rgba(0,0,0,0.2)', padding:'2px 4px', borderRadius: '4px'}}>VITE_MAPBOX_TOKEN</code>).
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent:'center' }}>
            <div>
              <div style={{fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6}}>Origin</div>
              <div style={{fontWeight: 600}}>{origin}</div>
            </div>
            <div>
              <div style={{fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6}}>Destination</div>
              <div style={{fontWeight: 600}}>{destination}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate generic bounds for the viewport to fit both markers
  const minLng = Math.min(originCoords[0], destCoords[0]);
  const maxLng = Math.max(originCoords[0], destCoords[0]);
  const minLat = Math.min(originCoords[1], destCoords[1]);
  const maxLat = Math.max(originCoords[1], destCoords[1]);

  return (
    <div className={styles.mapContainer}>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: (minLng + maxLng) / 2,
          latitude: (minLat + maxLat) / 2,
          zoom: 5.5,
          pitch: 30, // Slight 3D tilt for a premium feel
        }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1" // Premium dark mode style
        attributionControl={false}
      >
        {/* Draw Line connecting Origin and Destination */}
        <Source id="route" type="geojson" data={routeData}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': '#4f46e5',
              'line-width': 4,
              'line-dasharray': [2, 2],
              'line-opacity': 0.6
            }}
          />
        </Source>

        {/* Origin Marker */}
        <Marker longitude={originCoords[0]} latitude={originCoords[1]} anchor="center">
          <div className={styles.marker} title={`Origin: ${origin}`}>
            <div style={{ width: 8, height: 8, background: 'white', borderRadius: '50%' }} />
          </div>
        </Marker>

        {/* Destination Marker */}
        <Marker longitude={destCoords[0]} latitude={destCoords[1]} anchor="center">
          <div className={styles.marker} title={`Destination: ${destination}`} style={{ backgroundColor: '#10b981' }}>
            <MapPin size={14} />
          </div>
        </Marker>

        {/* Vehicle (Current Location) Marker */}
        {(status === 'In Transit' || status === 'Arrived') && (
          <Marker longitude={currentCoords[0] as number} latitude={currentCoords[1] as number} anchor="center">
            <div className={styles.pulsingMarker} title={`Current Location`}>
              <Bus size={18} />
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
};
