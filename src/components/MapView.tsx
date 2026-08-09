import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Report, Match } from '../types/index.js';
import { MapPin, Filter, Layers, Sparkles } from 'lucide-react';

interface MapViewProps {
  reports?: Report[];
  matches?: Match[];
  onSelectReport: (report: Report) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  reports = [],
  matches = [],
  onSelectReport
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [mapFilter, setMapFilter] = useState<'all' | 'lost' | 'found' | 'matches'>('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Prayagraj / Delhi NCR
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([25.4484, 81.8286], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    const layerGroup = layerGroupRef.current;
    if (layerGroup) {
      layerGroup.clearLayers();

      // Custom Lost Icon
      const lostIcon = L.divIcon({
        className: 'custom-lost-icon',
        html: `<div style="background-color: #ef4444; width: 24px; height: 24px; rounded: 50%; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">L</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      // Custom Found Icon
      const foundIcon = L.divIcon({
        className: 'custom-found-icon',
        html: `<div style="background-color: #10b981; width: 24px; height: 24px; rounded: 50%; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">F</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      // Render reports based on filter
      reports.forEach(r => {
        if (mapFilter === 'lost' && r.type !== 'lost') return;
        if (mapFilter === 'found' && r.type !== 'found') return;

        const icon = r.type === 'lost' ? lostIcon : foundIcon;
        const marker = L.marker([r.location.lat, r.location.lng], { icon });

        // Privacy Radius Circle (1km)
        const circle = L.circle([r.location.lat, r.location.lng], {
          radius: 800,
          color: r.type === 'lost' ? '#f43f5e' : '#10b981',
          fillColor: r.type === 'lost' ? '#f43f5e' : '#10b981',
          fillOpacity: 0.15,
          weight: 1
        });

        const popupContent = `
          <div style="font-family: sans-serif; font-size: 12px; color: #0f172a; padding: 4px;">
            <strong style="color: ${r.type === 'lost' ? '#e11d48' : '#059669'}; font-size: 13px;">
              ${r.type === 'lost' ? '🔴 Lost Item' : '🟢 Found Item'}
            </strong>
            <h4 style="margin: 4px 0; font-size: 14px; font-weight: bold;">${r.title}</h4>
            <p style="margin: 2px 0; color: #475569;">${r.location.landmark || r.location.city}</p>
            <p style="margin: 2px 0; font-[11px]; font-style: italic;">Date: ${r.date} ${r.time}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
        layerGroup.addLayer(marker);
        layerGroup.addLayer(circle);
      });

      // Render Match Vectors if selected
      if (mapFilter === 'matches' || mapFilter === 'all') {
        matches.forEach(m => {
          if (m.lostReport && m.foundReport && m.matchScore >= 70) {
            const latlngs: L.LatLngExpression[] = [
              [m.lostReport.location.lat, m.lostReport.location.lng],
              [m.foundReport.location.lat, m.foundReport.location.lng]
            ];
            const polyline = L.polyline(latlngs, {
              color: '#38bdf8',
              weight: 3,
              dashArray: '6, 6',
              opacity: 0.8
            });
            polyline.bindPopup(`🎯 <strong>${m.matchScore}% AI Match Connection</strong><br/>Distance: ${m.distanceKm} km`);
            layerGroup.addLayer(polyline);
          }
        });
      }
    }
  }, [reports, matches, mapFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">GEOSPATIAL PROXIMITY ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Interactive OpenStreetMap Coverage</h2>
          <p className="text-xs text-slate-400">Showing approximate item loss/found zones and vector match correlations</p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setMapFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mapFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Zones
          </button>
          <button
            onClick={() => setMapFilter('lost')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mapFilter === 'lost' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => setMapFilter('found')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mapFilter === 'found' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Found
          </button>
          <button
            onClick={() => setMapFilter('matches')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mapFilter === 'matches' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Connections
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative h-[550px]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Map Overlay Legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 text-xs space-y-2 text-slate-300 shadow-xl">
          <span className="font-bold text-white text-[11px] block uppercase tracking-wider">Map Legend</span>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 border border-white" />
            <span>Lost Item Zone (Approx)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" />
            <span>Found Item Zone (Approx)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-0.5 bg-cyan-400 border-t border-dashed border-cyan-300" />
            <span>AI Multimodal Match Link</span>
          </div>
        </div>
      </div>

    </div>
  );
};
