<template>
    <div ref="chart" 
    :style="{ height: `${height}px`, width: '100%' }"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onUnmounted } from 'vue';
import { loadMapData } from '@/utils/fetch_data';

const chart = ref(null);
let mapChart = null;

const props = defineProps({
    csvUrl: { type: String, default: "" },
    height: { type: Number, default: 400 },
    city_name: { type: String, default: "Whole India" },
    columnName: { type: String, default: "total_co2" }
});

// Choose the city and column
const city = ref(props.city_name);
const columnName = ref(props.columnName);

onMounted(async () => {
    if (chart.value) {
        mapChart = echarts.init(chart.value);
        
        try {
            let geojson, data;
            
            // Check if this is brick kiln data (GeoJSON format)
            if (props.csvUrl.includes('brick_kiln')) {
                // Load brick kiln data directly as GeoJSON
                const response = await fetch(props.csvUrl);
                geojson = await response.json();
                
                // Process the data for ECharts - ensure each feature has a unique name
                geojson.features.forEach((feature, index) => {
                    // Ensure each feature has a unique name property for ECharts
                    feature.properties.name = feature.properties.id || feature.properties.index || `brick_kiln_${index}`;
                });
                
                // Create data array with individual entries for each grid cell
                data = geojson.features.map(feature => ({
                    name: feature.properties.name,
                    value: feature.properties.CO2 || feature.properties[columnName.value] || 0
                }));

                console.log(data)
                
                // Register the map
                echarts.registerMap('BrickKilnGrid', geojson);
            } else {
                // Load regular city data
                const result = await loadMapData(city.value, columnName.value);
                geojson = result.geojson;
                data = result.data;
                console.log(data)
                
                // Register the GeoJSON as map
                echarts.registerMap(`${city.value}Grid`, geojson);
            }

            // Set chart options
            const option = {
                title: {
                    text: props.csvUrl.includes('brick_kiln') ? '' : `${city.value} Grid - ${columnName.value}`,
                    left: 'center',
                    top: 10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: params => {
                        if (isNaN(params.value)) return '';
                        return `${params.name}: ${params.value.toFixed(1)}`;
                    }
                },
                visualMap: {
                    min: Math.min(...data.map(d => d.value)),
                    max: Math.max(...data.map(d => d.value)),
                    left: 'left',
                    bottom: '0%',
                    text: ['High', 'Low'],
                    inRange: {
                        color: ['#e0f3f8',
                            '#abd9e9',
                            '#74add1',
                            '#4575b4',
                            '#2c4880', // darker
                            '#162343'  // darkest
                        ]
                    },
                    calculable: true
                },
                series: [
                    {
                        name: props.csvUrl.includes('brick_kiln') ? 'Brick Kiln Grid' : `${city.value} Grid`,
                        type: 'map',
                        map: props.csvUrl.includes('brick_kiln') ? 'BrickKilnGrid' : `${city.value}Grid`,
                        roam: true,
                        itemStyle: {
                            borderColor: 'rgba(50, 50, 50, 0.1)',
                            borderWidth: 0.2
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        },
                        data
                    }
                ]
            };
            mapChart.setOption(option);
        } catch (error) {
            console.error('Error loading map data:', error);
        }
    }
});

onUnmounted(() => {
    if (mapChart) {
        mapChart.dispose();
        mapChart = null;
    }
});
</script>