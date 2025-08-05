import * as d3 from "d3";

function preprocessData(data, mode, comparisonYears) {
    let years = comparisonYears.length
        ? comparisonYears
        : [...new Set(data.map(d => parseInt(d.year)))];

    if (mode !== "trend") {
        data = data.filter(d => years.includes(parseInt(d.year)));
        data.forEach(d => d.dayOfYear = d3.timeFormat("%m-%d")(new Date(d.date)));
        data = data.filter(d => d.dayOfYear !== "02-29");
    } else {
        data.forEach(d => d.dayOfYear = d3.timeFormat("%Y-%m-%d")(new Date(d.date)));
    }

    return { data, years };
}

function buildTrendSeries(data, selectedColumns, sector_mapping) {
    return selectedColumns.map(col => ({
        name: col,
        type: "line",
        data: data.map(d => [d.date, d[col]]),
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
        data: data.filter(d => d.year === String(year)).map(d => [d.dayOfYear, d[col]]),
        lineStyle: {
            width: [1, 2, 3][idx - (sortedYears.length - 3)] || 1,
            opacity: idx === sortedYears.length - 1 ? 1 : 0.8,
        },
        symbolSize: idx === sortedYears.length - 1 ? 6 : 3,
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
            data: recentValues,
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
            data: olderValues,
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
            data: baseValues
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

function cm_city_lines(processedData, mode, unit, comparisonYears, selectedColumns, sector_mapping) {
    const y_unit = unit;

    const { data, years } = preprocessData(processedData, mode, comparisonYears);
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
        legend: { data: legendData },
        xAxis: { type: "category", data: [...new Set(data.map(d => d.dayOfYear))] },
        yAxis: { type: "value", name: `CO₂ Emission (${y_unit})` },
        series,
        dataZoom: [{ type: "inside" }, { type: "slider" }]
    };
}

export { cm_city_lines };
