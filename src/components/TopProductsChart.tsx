"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useTheme } from "next-themes";

const TopProductsChart = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [
      { product: "Product A", value: 85 },
      { product: "Product B", value: 65 },
      { product: "Product C", value: 60 },
      { product: "Product D", value: 50 },
      { product: "Product E", value: 45 },
      { product: "Product F", value: 35 },
    ];

    const margin = { top: 30, right: 30, bottom: 10, left: 80 };
    const width = chartRef.current.clientWidth;
    const height = 300;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);

    // Y Scale
    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.product))
      .range([0, innerHeight])
      .padding(0.4);

    // Grid lines (vertical)
    const xAxisGrid = d3.axisTop(xScale).tickSize(-innerHeight).tickFormat(null);
    
    g.append("g")
      .attr("class", "grid-lines opacity-10 dark:opacity-20 stroke-gray-500")
      .call(xAxisGrid)
      .select(".domain").remove();
      
    // Style dashed lines
    g.selectAll(".tick line").attr("stroke-dasharray", "4,4");

    // X Axis Text
    g.selectAll(".tick text").attr("dy", -10).attr("class", "text-xs text-gray-500 dark:text-gray-400");

    // Y Axis (Product names)
    const yAxis = d3.axisLeft(yScale).tickSize(0);
    g.append("g")
      .call(yAxis)
      .attr("class", "text-sm text-gray-500 dark:text-gray-400 font-medium")
      .select(".domain").remove();

    // Bars
    // Color varies by theme: Pinkish in light, Dark Blue in dark
    const barColor = theme === "dark" ? "#293047" : "#ffe4e6"; 

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(d.product)!)
      .attr("height", yScale.bandwidth())
      .attr("x", 0)
      .attr("width", (d) => xScale(d.value))
      .attr("fill", barColor)
      .attr("rx", 2); // Rounded corners

  }, [theme]);

  return <svg ref={chartRef} className="w-full h-[300px] overflow-visible" />;
};

export default TopProductsChart;