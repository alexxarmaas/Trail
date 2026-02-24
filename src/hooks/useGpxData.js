import { useState, useEffect } from 'react';
import templateGpxUrl from '../assets/iglesia-de-san-bartolome-de-tunte-mirador-pico-de-las-nieves.gpx?url';

export const useGpxData = (targetCenter, targetDistanceKm) => {
    const [points, setPoints] = useState([]);
    const [elevationData, setElevationData] = useState([]);
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndParseGpx = async () => {
            try {
                setLoading(true);
                const response = await fetch(templateGpxUrl);
                const gpxText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(gpxText, 'text/xml');

                // 1. Parse Metadata
                const nameNode = xmlDoc.querySelector('metadata > name');
                const authorNode = xmlDoc.querySelector('metadata > author > name');
                const timeNode = xmlDoc.querySelector('metadata > time');
                
                setMetadata({
                    name: nameNode ? nameNode.textContent : 'Unknown Route',
                    author: authorNode ? authorNode.textContent : 'Unknown Author',
                    time: timeNode ? new Date(timeNode.textContent).toLocaleDateString() : 'Unknown Date'
                });

                // 2. Parse Track Points
                const trkpts = xmlDoc.getElementsByTagName('trkpt');
                const rawPoints = [];
                const rawElevations = [];
                
                let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;

                for (let i = 0; i < trkpts.length; i++) {
                    const lat = parseFloat(trkpts[i].getAttribute('lat'));
                    const lon = parseFloat(trkpts[i].getAttribute('lon'));
                    
                    const eleNode = trkpts[i].getElementsByTagName('ele')[0];
                    const ele = eleNode ? parseFloat(eleNode.textContent) : 0;
                    
                    const timePtNode = trkpts[i].getElementsByTagName('time')[0];
                    const timeStr = timePtNode ? timePtNode.textContent : null;

                    if (!isNaN(lat) && !isNaN(lon)) {
                        rawPoints.push({ lat, lon, ele, time: timeStr });
                        rawElevations.push(ele);
                        
                        // Track bounds for centering
                        if (lat < minLat) minLat = lat;
                        if (lat > maxLat) maxLat = lat;
                        if (lon < minLon) minLon = lon;
                        if (lon > maxLon) maxLon = lon;
                    }
                }

                // 3. Scale and Shift Points Matrix
                const gpxCenterLat = (minLat + maxLat) / 2;
                const gpxCenterLon = (minLon + maxLon) / 2;
                
                // Real GPX file is ~34km
                const distanceRatio = Math.max(5, targetDistanceKm || 34) / 34.0;
                const scale = Math.sqrt(distanceRatio);
                
                // Min/Max Ele for normalizing the elevation profile later
                const minEle = Math.min(...rawElevations);
                const maxEle = Math.max(...rawElevations);
                const eleRange = maxEle - minEle;

                const processedPoints = [];
                const processedElevationData = [];

                // We'll calculate a simple "distance along track" for the chart X-axis
                let distanceAccumulator = 0; 
                
                for (let i = 0; i < rawPoints.length; i++) {
                    const pt = rawPoints[i];
                    
                    // Shifted Coordinates
                    const shiftedLat = targetCenter[0] + ((pt.lat - gpxCenterLat) * scale);
                    const shiftedLon = targetCenter[1] + ((pt.lon - gpxCenterLon) * scale);
                    
                    processedPoints.push([shiftedLat, shiftedLon]);

                    // Accumulate mock distance based on index (simplified)
                    // (Number of points / targetDistance = roughly distance per point)
                    distanceAccumulator = (i / rawPoints.length) * (targetDistanceKm || 34);

                    // Normalize elevation data for chart
                    // Shift the elevation down to start nearer 0, or just pass it raw
                    processedElevationData.push({
                        distance: parseFloat(distanceAccumulator.toFixed(2)),
                        elevation: Math.round(pt.ele), // Raw elevation from GPX
                        scaledElevation: Math.round(((pt.ele - minEle) / eleRange) * 100), // 0-100 scale
                        originalTime: pt.time
                    });
                }

                setPoints(processedPoints);
                setElevationData(processedElevationData);
                
                // 4. Calculate Total Time from Track Points
                let durationStr = 'Unknown Time';
                if (processedElevationData.length > 0) {
                    const firstTime = processedElevationData[0].originalTime;
                    const lastTime = processedElevationData[processedElevationData.length - 1].originalTime;
                    
                    if (firstTime && lastTime) {
                        const start = new Date(firstTime);
                        const end = new Date(lastTime);
                        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                            const diffMs = end - start;
                            const diffHrs = Math.floor(diffMs / 3600000);
                            const diffMins = Math.floor((diffMs % 3600000) / 60000);
                            durationStr = `${diffHrs}h ${diffMins}m`;
                        }
                    }
                }

                // 5. Calculate Real Distance using Haversine Formula
                let calculatedDistance = 0;
                const toRad = (value) => (value * Math.PI) / 180;
                
                for (let i = 0; i < rawPoints.length - 1; i++) {
                    const pt1 = rawPoints[i];
                    const pt2 = rawPoints[i+1];
                    const R = 6371; // Earth's radius in km
                    const dLat = toRad(pt2.lat - pt1.lat);
                    const dLon = toRad(pt2.lon - pt1.lon);
                    const lat1 = toRad(pt1.lat);
                    const lat2 = toRad(pt2.lat);

                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    calculatedDistance += (R * c);
                }
                
                // Append duration and true distance to metadata
                setMetadata(prev => ({
                    ...prev,
                    duration: durationStr,
                    calculatedDistance: calculatedDistance > 0 ? calculatedDistance : targetDistanceKm || 34
                }));
                
                setLoading(false);

            } catch (err) {
                console.error("Error parsing GPX:", err);
                setError(err);
                setLoading(false);
            }
        };

        if (targetCenter && targetCenter.length === 2) {
            fetchAndParseGpx();
        }
    }, [targetCenter[0], targetCenter[1], targetDistanceKm]); // Safe dependency checks

    return { points, elevationData, metadata, loading, error };
};
