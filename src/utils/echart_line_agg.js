// Vanilla JavaScript replacements for d3 functions
function groupBy(data, key) {
    const grouped = new Map();
    for (const item of data) {
        const groupKey = item[key];
        if (!grouped.has(groupKey)) {
            grouped.set(groupKey, []);
        }
        grouped.get(groupKey).push(item);
    }
    return grouped;
}

function sum(array, accessor = d => d) {
    return array.reduce((total, item) => total + accessor(item), 0);
}

function formatDate(date, format) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    
    switch (format) {
        case "%m-%d":
            return `${month}-${day}`;
        case "%Y-%m-%d":
            return `${year}-${month}-${day}`;
        default:
            return `${month}-${day}`;
    }
}

// Generate monthly ticks for x-axis
function generateMonthlyTicks(data) {
    if (!data || data.length === 0) return [];
    
    // Get the date range
    const dates = data.map(d => new Date(d.date)).sort((a, b) => a - b);
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    
    // Set to first day of the month for start and end
    const startMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const endMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
    
    const ticks = [];
    const currentDate = new Date(startMonth);
    
    while (currentDate <= endMonth) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        
        // Create tick value (YYYY-MM-DD format)
        const tickValue = `${year}-${month}-01`;
        
        // Create simplified label (YYYY-MM format)
        const tickLabel = `${year}-${month}`;
        
        ticks.push({
            value: tickValue,
            label: tickLabel
        });
        
        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return ticks;
}

function aggregateData(data, groupKeyOrNull, valueKeys, X) {
    let records = [];
    if (groupKeyOrNull) {
        const grouped = groupBy(data, groupKeyOrNull);
        for (const [group, items] of grouped.entries()) {
            items.sort((a, b) => new Date(a.date) - new Date(b.date));
            for (let i = 0; i < items.length; i += X) {
                const chunk = items.slice(i, i + X);
                if (chunk.length === 0) continue;
                const aggregated = { ...chunk[X - 1] };
                valueKeys.forEach(k => {
                    aggregated[k] = sum(chunk, d => +d[k]);
                });
                records.push(aggregated);
            }
        }
    } else {
        const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        for (let i = 0; i < sorted.length; i += X) {
            const chunk = sorted.slice(i, i + X);
            if (chunk.length === 0) continue;
            const aggregated = { ...chunk[X - 1] };
            valueKeys.forEach(k => {
                aggregated[k] = sum(chunk, d => +d[k]);
            });
            records.push(aggregated);
        }
    }
    return records;
}

function preprocessData(data, mode, comparisonYears, aggregationMode, selectedColumns) {
    let years = comparisonYears.length
        ? comparisonYears
        : [...new Set(data.map(d => parseInt(d.year)))];

    if (mode !== "trend") {
        data = data.filter(d => years.includes(parseInt(d.year)));
        data.forEach(d => {
            d.dayOfYear = formatDate(d.date, "%m-%d");
        });
        data = data.filter(d => d.dayOfYear !== "02-29");

        if (aggregationMode && aggregationMode > 0) {
            data = aggregateData(data, "year", selectedColumns, aggregationMode);
            data.forEach(d => {
                d.dayOfYear = formatDate(d.date, "%m-%d");
            });
        }

    } else {
        data.forEach(d => {
            d.dayOfYear = formatDate(d.date, "%Y-%m-%d");
        });

        if (aggregationMode && aggregationMode > 0) {
            data = aggregateData(data, null, selectedColumns, aggregationMode);
        }
    }

    return { data, years };
}


function buildTrendSeries(data, selectedColumns, sector_mapping) {
    return selectedColumns.map(col => ({
        name: col,
        type: "line",
        data: data.map(d => [d.date, d[col].toFixed(2)]),
        emphasis: { focus: "series" },
        itemStyle: { color: sector_mapping[col].Color || "#000" }
    }));
}

function buildEvolutionSeries(data, years, selectedColumns, sector_mapping) {
    if (years.length > 3) years = years.slice(-3);
    const sortedYears = [...years].sort((a, b) => a - b);
    const col = selectedColumns[0];
    const color_transparent = [
        "80", "BF", "FF"
    ]
    const series = sortedYears.map((year, idx) => ({
        name: year.toString(),
        type: "line",
        data: data.filter(d => d.year === String(year)).map(d => [d.dayOfYear, d[col].toFixed(2)]),
        lineStyle: {
            width: [1, 2, 3][idx - (sortedYears.length - 3)] || 1,
            opacity: idx === sortedYears.length - 1 ? 1 : 0.8,
        },
        symbolSize: idx === sortedYears.length - 1 ? 5 : 2,
        itemStyle: {
            color: (sector_mapping[col].Color || "#000") +
                (color_transparent[idx])
        }
    }));

    return { series, legendData: sortedYears.map(y => y.toString()) };
}

function buildVariationSeries(data, years, selectedColumns, sector_mapping) {
    if (years.length > 2) years = years.slice(-2);
    const [olderYear, recentYear] = years.sort((a, b) => a - b);
    const col = selectedColumns[0];

    const olderData = data.filter(d => d.year === String(olderYear));
    const recentData = data.filter(d => d.year === String(recentYear));

    const baseValues = recentData.map((d, i) => Math.min(d[col], olderData[i]?.[col] ?? d[col]));
    const olderValues = olderData.map(d => d[col]);
    const recentValues = recentData.map(d => d[col]);

    const diffValues = olderData.map((d, i) => {
        const recentValue = recentData[i]?.[col] ?? d[col];
        return recentValue - d[col];
    });

    const series = [
        {
            name: recentYear.toString(),
            type: 'line',
            step: 'middle',
            data: recentValues.map(value => value.toFixed(2)),
            symbol: 'none',
            itemStyle: {
                width: 0.25,
                color: sector_mapping[col].Color || "#000"
            }
        },
        {
            name: olderYear.toString(),
            type: 'line',
            step: 'middle',
            data: olderValues.map(value => value.toFixed(2)),
            symbol: 'none',
            itemStyle: {
                width: 0.1,
                color: (sector_mapping[col].Color || "#000") + "80"
            }
        },
        {
            name: "Base",
            type: "bar",
            stack: "Total",
            silent: true,
            itemStyle: { borderColor: "transparent", color: "transparent" },
            emphasis: { itemStyle: { borderColor: "transparent", color: "transparent" } },
            data: baseValues.map(value => value.toFixed(2))
        },
        {
            name: "Increase",
            type: "bar",
            stack: "Total",
            label: { show: false, position: "top" },
            data: diffValues.map(v => v >= 0 ? v.toFixed(2) : "-"),
            itemStyle: { color: "rgba(230, 25, 75, 0.4)" },
            barWidth: "100%",
        },
        {
            name: "Decrease",
            type: "bar",
            stack: "Total",
            label: { show: false, position: "bottom" },
            data: diffValues.map(v => v < 0 ? (-v).toFixed(2) : "-"),
            itemStyle: { color: "rgba(0, 0, 200, 0.4)" },
            barWidth: "100%",
        }
    ];

    return {
        series,
        legendData: [recentYear.toString(), olderYear.toString(), "Base", "Increase", "Decrease"]
    };
}

function cm_city_lines(processedData, mode, unit, comparisonYears, selectedColumns, sector_mapping, aggregationMode) {
    const y_unit = unit;
    const { data, years } = preprocessData(processedData, mode, comparisonYears, aggregationMode, selectedColumns);
    let series = [], legendData = [];

    if (mode === "trend") {
        series = buildTrendSeries(data, selectedColumns, sector_mapping);
        legendData = selectedColumns;
    } else if (mode === "evolution") {
        ({ series, legendData } = buildEvolutionSeries(data, years, selectedColumns, sector_mapping));
    } else if (mode === "variation") {
        ({ series, legendData } = buildVariationSeries(data, years, selectedColumns, sector_mapping));
    }

    return {
        tooltip: { trigger: "axis" },
        legend: { 
            data: legendData,
            top: 5,
            left: 10,
            right: 10
        },
        grid: {
            left: '5%',
            right: '3%',
            top: '15%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: { 
            type: "category", 
            data: [...new Set(data.map(d => d.dayOfYear))],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                margin: 8,
                formatter: function(value) {
                    // Convert YYYY-MM-DD to YYYY-MM format
                    if (value && value.includes('-')) {
                        const parts = value.split('-');
                        if (parts.length >= 2) {
                            return `${parts[0]}-${parts[1]}`;
                        }
                    }
                    return value;
                }
            }
        },
        yAxis: { 
            type: "value", 
            name: `CO₂ Emission (${y_unit})`,
            nameLocation: 'middle',
            nameGap: 30,
            axisLabel: {
                margin: 8
            }
        },
        series,
        dataZoom: [{ type: "inside" }, { type: "slider" }]
    };
}

export { cm_city_lines };
