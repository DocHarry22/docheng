"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ecoNodes as nodes,
  ecoConnections as connections,
  ecoCategories,
  type EcoNode,
} from "@/lib/ecosystem-data";
import SectionHeader from "./SectionHeader";

function getNode(id: string): EcoNode {
  return nodes.find((n) => n.id === id)!;
}

export default function EcosystemMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeNode = hoveredNode || selectedNode;

  const activeConnections = useMemo(() => {
    if (!activeNode) return new Set<number>();
    const indices = new Set<number>();
    connections.forEach((conn, i) => {
      if (conn.from === activeNode || conn.to === activeNode) {
        indices.add(i);
      }
    });
    return indices;
  }, [activeNode]);

  const connectedNodes = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const ids = new Set<string>();
    ids.add(activeNode);
    connections.forEach((conn) => {
      if (conn.from === activeNode) ids.add(conn.to);
      if (conn.to === activeNode) ids.add(conn.from);
    });
    return ids;
  }, [activeNode]);

  const selectedDetails = activeNode ? getNode(activeNode) : null;

  return (
    <section id="ecosystem" className="relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-310 px-6 sm:px-8 lg:px-16">
        <SectionHeader
          label="Connected Intelligence"
          labelColor="text-brand-orange"
          title="How the Ecosystem Connects"
          description="Every product feeds into a unified intelligence layer. Data flows between tools to create a seamless experience across learning, work, and career development."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Info panel - refined */}
          <AnimatePresence mode="wait">
            {selectedDetails && (
              <motion.div
                key={selectedDetails.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 z-20 glass-card rounded-xl px-5 py-3.5 text-center max-w-xs pointer-events-none"
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: selectedDetails.color }}
                >
                  {selectedDetails.label.replace("\n", " ")}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {selectedDetails.description}
                </p>
                <p className="text-[10px] text-text-muted mt-2 uppercase tracking-wider">
                  {selectedDetails.category}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full" style={{ paddingBottom: "70%" }}>
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Interactive ecosystem map showing how DoCHEng products connect"
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Connection lines */}
                {connections.map((conn, i) => {
                  const from = getNode(conn.from);
                  const to = getNode(conn.to);
                  const isActive = activeConnections.has(i);
                  const isDimmed = activeNode && !isActive;
                  const midX = (from.x + to.x) / 2;
                  const midY = (from.y + to.y) / 2;

                  return (
                    <g key={i}>
                      <motion.line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isActive ? "url(#lineGradActive)" : "url(#lineGrad)"}
                        strokeWidth={isActive ? 0.25 : 0.15}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: isDimmed ? 0.15 : 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.08 }}
                      />
                      {/* Data flow label on active connections */}
                      {isActive && (
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <rect
                            x={midX - conn.label.length * 0.35}
                            y={midY - 1.2}
                            width={conn.label.length * 0.7}
                            height={2.4}
                            rx={1}
                            fill="#111227"
                            stroke="#1E1F3B"
                            strokeWidth={0.1}
                          />
                          <text
                            x={midX}
                            y={midY + 0.3}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#60A5FA"
                            fontSize={1.2}
                            fontWeight="500"
                            fontFamily="system-ui, sans-serif"
                          >
                            {conn.label}
                          </text>
                        </motion.g>
                      )}
                      {/* Animated data flow pulse on active connections */}
                      {isActive && (
                        <circle r={0.4} fill="#60A5FA" opacity={0.8}>
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={`M${from.x},${from.y} L${to.x},${to.y}`}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                  const isCore = node.id === "core";
                  const r = isCore ? 4.5 : 3;
                  const isHovered = activeNode === node.id;
                  const isDimmed =
                    activeNode && !connectedNodes.has(node.id);

                  return (
                    <motion.g
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedNode((prev) =>
                          prev === node.id ? null : node.id
                        )
                      }
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${node.label.replace("\n", " ")} - ${node.description}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedNode((prev) =>
                            prev === node.id ? null : node.id
                          );
                        }
                      }}
                    >
                      {/* Glow circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r * (isHovered ? 2.2 : 1.8)}
                        fill={node.color}
                        opacity={isHovered ? 0.12 : isDimmed ? 0.02 : 0.05}
                        filter="url(#glow)"
                        style={{
                          transition: "opacity 0.3s, r 0.3s",
                        }}
                      />
                      {/* Background circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r}
                        fill="#111227"
                        stroke={node.color}
                        strokeWidth={isHovered ? 0.4 : isCore ? 0.3 : 0.2}
                        opacity={isDimmed ? 0.3 : 0.9}
                        style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
                      />
                      {/* Ring pulse on hover */}
                      {isHovered && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r + 0.5}
                          fill="none"
                          stroke={node.color}
                          strokeWidth={0.15}
                          opacity={0.4}
                        >
                          <animate
                            attributeName="r"
                            from={String(r + 0.3)}
                            to={String(r + 2)}
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.4"
                            to="0"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      {/* Label */}
                      {node.label.split("\n").map((line, li) => (
                        <text
                          key={li}
                          x={node.x}
                          y={
                            node.y +
                            (li - (node.label.split("\n").length - 1) / 2) * 1.8
                          }
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={
                            isDimmed
                              ? "#475569"
                              : isCore || isHovered
                              ? node.color
                              : "#94A3B8"
                          }
                          fontSize={isCore ? 1.8 : 1.4}
                          fontWeight={isCore || isHovered ? "700" : "500"}
                          fontFamily="system-ui, sans-serif"
                          style={{ transition: "fill 0.3s" }}
                        >
                          {line}
                        </text>
                      ))}
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Legend and instruction - refined */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted leading-relaxed text-center sm:text-left">
              {activeNode
                ? "Click again to deselect. Hover to preview connections."
                : "Click or hover on a node to explore data flow and connections."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {ecoCategories.map(
                (cat) => {
                  const catNode = nodes.find((n) => n.category === cat);
                  return (
                    <span
                      key={cat}
                      className="flex items-center gap-1.5 text-[11px] text-text-muted"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: catNode?.color || "#64748B",
                        }}
                      />
                      {cat}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
