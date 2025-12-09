"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useTheme } from "next-themes";

const SalesChart = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    // 1. Data Mock (Mimicking the curves in your image)
    const points = 12;
    const data = Array.from({ length: points }, (_, i) => ({
      x: i,
      current: 4000 + Math.random() * 5000 + Math.sin(i) * 2000,
      target: 3000 + Math.random() * 4000 + Math.sin(i - 1) * 1500,
      forecast: 2000 + Math.random() * 3000 + Math.sin(i - 2) * 1000,
    }));

    // 2. Setup Dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = chartRef.current.clientWidth;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous render
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 3. Scales
    const xScale = d3.scaleLinear().domain([0, points - 1]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 10000]).range([innerHeight, 0]);

    // 4. Grid Lines (Dashed)
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

    const startTime = new Date();
    startTime.setHours(5, 30, 0, 0);

    const xLabels = Array.from({ length: points }, (_, i) => {
      const d = new Date(startTime);
      d.setMinutes(startTime.getMinutes() + i * 15); // 15-minute steps
      return d3.timeFormat("%-I:%M")(d); // 5:30, 5:45, 6:00 ...
    });

    // Bottom axis, using the same xScale
    const xAxis = d3.axisBottom(xScale)
      .tickValues(d3.range(points))       // 0..points-1
      .tickSize(0)                        // no extra tick lines (grid already drawn)
      .tickPadding(10)
      .tickFormat((_, i) => xLabels[i] ?? "");

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "text-xs text-gray-500 dark:text-gray-400")
      .call(xAxis)
      .select(".domain")
      .remove();

    // Style grid lines specifically to be dashed
    g.selectAll(".tick line").attr("stroke-dasharray", "4,4");

    // 5. Axes Text
    const yAxis = d3.axisLeft(yScale).ticks(5);
    g.append("g")
      .call(yAxis)
      .attr("class", "text-xs text-gray-500 dark:text-gray-400")
      .select(".domain").remove();

    // 6. Generators & Gradients
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

    createGradient("gradCurrent", "#10b981"); // Green
    createGradient("gradTarget", "#3b82f6");  // Blue
    createGradient("gradForecast", "#8b5cf6"); // Purple

    const areaGenerator = (key: "current" | "target" | "forecast") => d3.area<typeof data[0]>()
      .x(d => xScale(d.x))
      .y0(innerHeight)
      .y1(d => yScale(d[key]))
      .curve(d3.curveMonotoneX);

    const lineGenerator = (key: "current" | "target" | "forecast") => d3.line<typeof data[0]>()
      .x(d => xScale(d.x))
      .y(d => yScale(d[key]))
      .curve(d3.curveMonotoneX);

    // 7. Draw Layers (Forecast -> Target -> Current)
    const layers = [
      { key: "forecast", color: "#8b5cf6", grad: "url(#gradForecast)" },
      { key: "target", color: "#3b82f6", grad: "url(#gradTarget)" },
      { key: "current", color: "#10b981", grad: "url(#gradCurrent)" },
    ] as const;

    layers.forEach(({ key, color, grad }) => {
      // Area
      g.append("path")
        .datum(data)
        .attr("fill", grad)
        .attr("d", areaGenerator(key));

      // Line
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", lineGenerator(key));

      // Add a dot at a random peak to match UI
      const peakIndex = 8;
      g.append("circle")
        .attr("cx", xScale(data[peakIndex].x))
        .attr("cy", yScale(data[peakIndex][key]))
        .attr("r", 4)
        .attr("fill", "#fff")
        .attr("stroke", color)
        .attr("stroke-width", 2);
    });

  }, [theme]); // Re-render on theme change

  return <svg ref={chartRef} className="w-full h-[400px] overflow-visible" />;
};

export default SalesChart;