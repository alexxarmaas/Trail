import React, { useMemo, useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Mountain, MapPin } from 'lucide-react';
import L from 'leaflet';
import { useGpxData } from '../hooks/useGpxData';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a custom icon for the runner
const runnerIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse" style="margin-left: 4px; margin-top: 4px;"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12], // Center the 24x24 container over the coord
});

// Calculate map bounds strictly based on given coordinates
const MapBounds = ({ positions }) => {
  const map = useMap();
  React.useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, positions]);
  return null;
};
// Map base locations to famous trails if they match, else default to Chamonix
const getLocationBase = (locationName) => {
    if (!locationName) return [45.9237, 6.8694];
    const loc = locationName.toLowerCase();
    if (loc.includes('chamonix')) return [45.9237, 6.8694]; // Mont Blanc / UTMB
    if (loc.includes('bagà') || loc.includes('pirineu')) return [42.2530, 1.8622]; // Cadi-Moixero
    if (loc.includes('zegama')) return [42.9754, -2.2907]; // Basque country
    if (loc.includes('palma') || loc.includes('transvulcania')) return [28.6833, -17.7667]; // Canary Islands
    if (loc.includes('canazei') || loc.includes('dolomyths')) return [46.4764, 11.7709]; // Dolomites
    if (loc.includes('valais') || loc.includes('sierre')) return [46.1983, 7.5348]; // Swiss Alps
    if (loc.includes('tirajana')) return [27.9250, -15.5786]; // Gran Canaria
    return [45.9237, 6.8694]; // Default to Chamonix
};

const RouteMap = ({ location, distance }) => {
    const center = useMemo(() => getLocationBase(location), [location]);
    const distVal = distance ? parseFloat(distance.toString().replace(/[^0-9.]/g, '')) : 42;
    
    // Use the robust GPX hook
    const { points: trackPositions, loading, metadata } = useGpxData(center, distVal);

    // Runner Animation State
    const [runnerPosIndex, setRunnerPosIndex] = useState(0);
    const animationSpeed = 20; // Lower is faster
    const timeoutRef = useRef(null);

    // Runner Animation Loop
    useEffect(() => {
        if (!trackPositions || trackPositions.length === 0) return;

        const animate = () => {
            setRunnerPosIndex(prev => {
                if (prev >= trackPositions.length - 1) return 0;
                return prev + 5; 
            });
            timeoutRef.current = setTimeout(animate, animationSpeed);
        };
        animate();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [trackPositions, animationSpeed]);

    if (loading || trackPositions.length === 0) {
        return (
            <div className="h-64 md:h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Mountain className="w-8 h-8 text-primary animate-bounce mb-2" />
                    <span className="text-gray-400 font-medium">Parsing GPS Trajectory...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-64 md:h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden flex items-center justify-center">
            <MapContainer 
                center={center} 
                zoom={11} 
                scrollWheelZoom={false} 
                className="w-full h-full z-10"
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                />
                <MapBounds positions={trackPositions} />
                
                {/* The Main Trail */}
                <Polyline 
                    positions={trackPositions} 
                    color="#f97316" // Orange/Primary color
                    weight={5}
                    opacity={0.7}
                />

                {/* Start Marker */}
                <Marker position={trackPositions[0]}>
                    <Popup>
                        <div className="font-bold text-gray-900">Start</div>
                        <div className="text-xs text-gray-500">{location}</div>
                    </Popup>
                </Marker>

                {/* Finish Marker */}
                <Marker position={trackPositions[trackPositions.length - 1]}>
                    <Popup>
                        <div className="font-bold text-gray-900">Finish</div>
                        <div className="text-xs text-gray-500">{location}</div>
                    </Popup>
                </Marker>

                {/* Simulated Highest Peak Checkpoint (Halfway) */}
                <Marker position={trackPositions[Math.floor(trackPositions.length / 2)]}>
                    <Popup>
                        <div className="font-bold flex items-center gap-1 text-gray-900">
                            <Mountain size={14} className="text-primary" /> Summit Checkpoint
                        </div>
                    </Popup>
                </Marker>
                
                {/* The Animated Runner Simulation! */}
                {trackPositions.length > 0 && runnerPosIndex < trackPositions.length && (
                    <Marker position={trackPositions[runnerPosIndex]} icon={runnerIcon}>
                        <Popup>Live Tracking Simulation</Popup>
                    </Marker>
                )}
            </MapContainer>
            
            <div className="absolute top-2 right-2 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> Live Tracking
                </div>
                <div className="flex flex-col gap-0.5 opacity-80 text-[10px] text-right mt-1">
                    <span>{metadata?.calculatedDistance ? Math.round(metadata.calculatedDistance) : distVal}km</span>
                    {metadata?.duration && <span>{metadata.duration}</span>}
                </div>
            </div>
        </div>
    );
};

export default RouteMap;
