"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from "recharts";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock Data Sets
const networkLatencyData = [
  { time: "00:00", latency: 45, bandwidth: 120 },
  { time: "04:00", latency: 22, bandwidth: 230 },
  { time: "08:00", latency: 89, bandwidth: 90 },
  { time: "12:00", latency: 150, bandwidth: 45 },
  { time: "16:00", latency: 30, bandwidth: 210 },
  { time: "20:00", latency: 60, bandwidth: 180 },
  { time: "24:00", latency: 40, bandwidth: 140 },
];

const cyberwareSalesData = [
  { region: "Neo-Tokyo", neuroProsthetics: 4000, opticalImplants: 2400 },
  { region: "Night City", neuroProsthetics: 3000, opticalImplants: 1398 },
  { region: "Berlin", neuroProsthetics: 2000, opticalImplants: 9800 },
  { region: "Hong Kong", neuroProsthetics: 2780, opticalImplants: 3908 },
  { region: "London", neuroProsthetics: 1890, opticalImplants: 4800 },
  { region: "San Francisco", neuroProsthetics: 2390, opticalImplants: 3800 },
];

const securityThreatsData = [
  { subject: "DDoS", A: 120, B: 110, fullMark: 150 },
  { subject: "Phishing", A: 98, B: 130, fullMark: 150 },
  { subject: "Malware", A: 86, B: 130, fullMark: 150 },
  { subject: "Intrusion", A: 99, B: 100, fullMark: 150 },
  { subject: "Data Leak", A: 85, B: 90, fullMark: 150 },
  { subject: "Insider", A: 65, B: 85, fullMark: 150 },
];

export default function DataVisualizationPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-[var(--accent)] hover:text-[var(--primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
            Data Visualization
          </h1>
          <p className="text-[var(--foreground)] opacity-80 max-w-2xl text-lg">
            A demonstration of interactive, animated data representation.
            Built with Recharts to seamlessly integrate with the dynamic theme engine.
          </p>
        </motion.div>

        {/* Grid Layout (Bento Box style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--primary)]/20 p-6 rounded-2xl shadow-xl hover:border-[var(--primary)]/50 transition-colors col-span-1 lg:col-span-2"
          >
            <h2 className="text-xl font-bold mb-6 text-[var(--foreground)]">Global Network Latency & Bandwidth</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networkLatencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--primary)" opacity={0.1} />
                  <XAxis dataKey="time" stroke="var(--foreground)" opacity={0.7} />
                  <YAxis stroke="var(--foreground)" opacity={0.7} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--primary)',
                      color: 'var(--foreground)'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="latency" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="bandwidth" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--accent)]/20 p-6 rounded-2xl shadow-xl hover:border-[var(--accent)]/50 transition-colors"
          >
            <h2 className="text-xl font-bold mb-6 text-[var(--foreground)]">Cyberware Regional Sales</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cyberwareSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--accent)" opacity={0.1} />
                  <XAxis dataKey="region" stroke="var(--foreground)" opacity={0.7} />
                  <YAxis stroke="var(--foreground)" opacity={0.7} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--accent)',
                      color: 'var(--foreground)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="neuroProsthetics" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="opticalImplants" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--primary)]/20 p-6 rounded-2xl shadow-xl hover:border-[var(--primary)]/50 transition-colors flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-bold mb-2 text-[var(--foreground)] w-full text-left">Corporate Security Threats</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securityThreatsData}>
                  <PolarGrid stroke="var(--foreground)" opacity={0.2} />
                  <PolarAngleAxis dataKey="subject" stroke="var(--foreground)" opacity={0.8} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="var(--foreground)" opacity={0.5} />
                  <Radar name="MegaCorp Alpha" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                  <Radar name="SysTech Beta" dataKey="B" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.4} />
                  <Legend />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--primary)',
                      color: 'var(--foreground)'
                    }} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
