"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useTheme } from "next-themes";
import useResizeObserver from "@/hooks/useResizeObserver";

const SalesChart = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  const { theme } = useTheme();

  useEffect(() => {
    if (!svgRef.current || !dimensions) return;

    // 1. Data Mock
    const points = 12;
    const data = Array.from({ length: points }, (_, i) => ({
      x: i,
      current: 4000 + Math.random() * 5000 + Math.sin(i) * 2000,
      target: 3000 + Math.random() * 4000 + Math.sin(i - 1) * 1500,
      forecast: 2000 + Math.random() * 3000 + Math.sin(i - 2) * 1000,
    }));

    // 2. Setup Dimensions based on ResizeObserver
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = dimensions.width;
    const height = dimensions.height; // Use container height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Don't draw if too small
    if (innerWidth <= 0 || innerHeight <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 3. Scales
    const xScale = d3.scaleLinear().domain([0, points - 1]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 10000]).range([innerHeight, 0]);

    // 4. Grid Lines
    const yAxisGrid = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => "").ticks(5);
    const xAxisGrid = d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(() => "").ticks(points);

    g.append("g")
      .attr("class", "grid-lines opacity-10 dark:opacity-20 stroke-gray-500")
      .call(yAxisGrid)
      .select(".domain").remove();

    g.append("g")
      .attr("class", "grid-lines opacity-10 dark:opacity-20 stroke-gray-500")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxisGrid)
      .select(".domain").remove();

    // Style dashes
    g.selectAll(".tick line").attr("stroke-dasharray", "4,4");

    // X Axis Labels
    const startTime = new Date();
    startTime.setHours(5, 30, 0, 0);
    const xLabels = Array.from({ length: points }, (_, i) => {
      const d = new Date(startTime);
      d.setMinutes(startTime.getMinutes() + i * 15);
      return d3.timeFormat("%-I:%M")(d);
    });

    const xAxis = d3.axisBottom(xScale)
      .tickValues(d3.range(points))
      .tickSize(0)
      .tickPadding(10)
      .tickFormat((_, i) => xLabels[i] ?? "");

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "text-xs text-gray-500 dark:text-gray-400")
      .call(xAxis)
      .select(".domain").remove();

    // Y Axis Labels
    const yAxis = d3.axisLeft(yScale).ticks(5);
    g.append("g")
      .call(yAxis)
      .attr("class", "text-xs text-gray-500 dark:text-gray-400")
      .select(".domain").remove();

    // Gradients
    const createGradient = (id: string, color: string) => {
      const defs = svg.append("defs");
      const gradient = defs.append("linearGradient")
        .attr("id", id)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
      gradient.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 0.3);
      gradient.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0);
    };

    createGradient("gradCurrent", "#10b981");
    createGradient("gradTarget", "#3b82f6");
    createGradient("gradForecast", "#8b5cf6");

    const areaGenerator = (key: "current" | "target" | "forecast") => d3.area<typeof data[0]>()
      .x(d => xScale(d.x))
      .y0(innerHeight)
      .y1(d => yScale(d[key]))
      .curve(d3.curveMonotoneX);

    const lineGenerator = (key: "current" | "target" | "forecast") => d3.line<typeof data[0]>()
      .x(d => xScale(d.x))
      .y(d => yScale(d[key]))
      .curve(d3.curveMonotoneX);

    // Layers
    const layers = [
      { key: "forecast", color: "#8b5cf6", grad: "url(#gradForecast)" },
      { key: "target", color: "#3b82f6", grad: "url(#gradTarget)" },
      { key: "current", color: "#10b981", grad: "url(#gradCurrent)" },
    ] as const;

    layers.forEach(({ key, color, grad }) => {
      g.append("path").datum(data).attr("fill", grad).attr("d", areaGenerator(key));
      g.append("path").datum(data).attr("fill", "none").attr("stroke", color).attr("stroke-width", 2).attr("d", lineGenerator(key));
      
      const peakIndex = 8;
      g.append("circle")
        .attr("cx", xScale(data[peakIndex].x))
        .attr("cy", yScale(data[peakIndex][key]))
        .attr("r", 4)
        .attr("fill", "#fff")
        .attr("stroke", color)
        .attr("stroke-width", 2);
    });

  }, [theme, dimensions]); 

  // Wrapper div takes 100% size, SVG fills it
  return (
    <div ref={wrapperRef} className="w-full h-[350px] relative">
      <svg ref={svgRef} className="w-full h-full overflow-visible" />
    </div>
  );
};

export default SalesChart;