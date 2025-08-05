<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import { LineChart, BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, DataZoomComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { VContainer, VRow, VCol, VCard, VBtn, VSelect } from "vuetify/components";
import { fetch_ts_Data } from '@/utils/fetch_data.js';
import { sector_mapping, modeIcons } from '@/utils/style_maps.js';
// import { cm_city_lines } from "@/utils/echart_line.js";
import { cm_city_lines } from "@/utils/echart_line_agg.js";
import GridMapEchart from './GridMapEchart.vue';

// echarts.use([CustomChart]);

use([LineChart, GridComponent, TooltipComponent, LegendComponent, DataZoomComponent, CanvasRenderer, BarChart]);

const props = defineProps({
    csvUrl: { type: String, default: "https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/refs/heads/main/data/summary_time_series/total.csv" },
    mode: { type: String, default: "trend" }, // trend, variation, evolution
    enableSelection: { type: Boolean, default: true },
    showEnableSelection: { type: Boolean, default: false },
    selectedColumns: { type: Array, default: () => ["total", "power", "traffic", "residential_scope1", "industrial", "avation"] },
    unit: { type: String, default: "Mt" },
    comparisonYears: { type: Array, default: () => [] },
    // TODO: the aggregation mode is not developed yet
    aggregationMode: { type: String, default: 5 }, // daily, 10-day, 15-day 
    height: { type: Number, default: 400 },
    enableMap: { type: Boolean, default: false },
    city_name: { type: String, default: "Whole India" }
});

const csvUrl = ref(props.csvUrl);
const chartData = ref([]);
const selectedColumns = ref(props.selectedColumns);
const selectedIndex = ref([]);
const availableColumns = ref(["total", "power", "traffic", "residential_scope1", "residential_scope2", "industrial", "avation", "power_pm25"]);

const chartOptions = ref({});
const mode = ref(props.mode);
const enableSelection = ref(props.enableSelection);
const showEnableSelection = ref(props.showEnableSelection);
const unit = ref(props.unit);
const comparisonYears = ref(props.comparisonYears);
const yearAvailable = ref([]);
const aggregationMode = ref(props.aggregationMode);
const showOption = ref(true);
const enableMap = ref(props.enableMap);
const city_name = ref(props.city_name);
const height = ref(props.height);

const handleYearSelection = (newSelection) => {
    if (mode.value === 'variation' && newSelection.length > 2) {
        // Keep the last 2 selected values
        comparisonYears.value = newSelection.slice(-2);
    } else if (mode.value === 'evolution' && newSelection.length > 3) {
        // Keep the last selected value
        comparisonYears.value = newSelection.slice(-3);
    }
    else {
        comparisonYears.value = newSelection;
    }
};


async function fetchData() {
    const [data, years] = await fetch_ts_Data(csvUrl.value, availableColumns.value, unit.value);
    // console.log(data, years);
    chartData.value = data;
    yearAvailable.value = years;
    updateChart();
}

function updateChart() {
    if (!chartData.value.length || !selectedColumns.value.length) return;
    //  if selectedIndex is not an array, conrvert it to an array
    if (!Array.isArray(selectedIndex.value)) {
        selectedIndex.value = [selectedIndex.value];
    }


    if (selectedIndex.value.length === 0) {
        selectedIndex.value = selectedColumns.value.map((col) => availableColumns.value.indexOf(col));
    }
    else {
        selectedColumns.value = availableColumns.value.filter((col) => selectedIndex.value.includes(availableColumns.value.indexOf(col)));
    }
    let processedData = chartData.value.map(d => ({ ...d }))
    let res = cm_city_lines(
        processedData,
        mode.value,
        unit.value,
        comparisonYears.value,
        selectedColumns.value,
        sector_mapping,
        aggregationMode.value
    )
    // console.log(res);
    chartOptions.value = res;
}

let observer;
const containerRef = ref(null);
const chartRef = ref(null);

watch([selectedIndex, mode, comparisonYears], () => {
    nextTick(() => {
        updateChart();
    });
});

onMounted(async () => {
    await fetchData();
    await nextTick();
    updateChart();

    observer = new ResizeObserver(() => {
        updateChart(); // optional, only if the chart data depends on layout
        if (chartRef.value) {
            chartRef.value.resize(); // <-- this forces ECharts to redraw using correct dimensions
        }
    });
    if (containerRef.value) observer.observe(containerRef.value);
});

onUnmounted(() => {
    if (observer && containerRef.value) {
        observer.unobserve(containerRef.value);
    }
});

</script>

<template>
    <v-container class="px-0 mx-0" style="max-width: none;">
        <!-- Enable Selection Toggle -->
        <!-- <v-row>
            <v-col cols="6">
                <v-checkbox v-if="showEnableSelection" v-model="enableSelection" label="Enable Category Selection">
                </v-checkbox>
            </v-col>
        </v-row> -->

        <v-row class="mx-0">
            <div ref="containerRef" style="width: 100%; padding: 0;">
                <v-chart ref="chartRef" v-if="!enableMap || mode !== 'grid map'" :option="chartOptions"
                    :style="{ height: `${height}px`, width: '100%' }"></v-chart>
                <GridMapEchart v-if="enableMap && mode === 'grid map'" :city_name="city_name" :height="height" />
                <!-- <GridMapMapbox v-if="enableMap && mode === 'grid map'" :city_name="city_name" /> -->

            </div>
        </v-row>

        <!-- <v-row>
            <v-btn v-model="showOption" @click="showOption = !showOption">
                <v-icon>mdi-cog</v-icon>
                Options
            </v-btn>
        </v-row> -->
        <v-row justify="center" class="mt-10" v-if="showOption">
            <!-- Category Selection -->
            <v-chip-group v-model="selectedIndex" :multiple="mode === 'trend'" v-if="enableSelection" filter>
                <v-chip v-for="category in availableColumns" size="x-small" :variant="Array.isArray(selectedIndex)
                    ? selectedIndex.includes(availableColumns.indexOf(category))
                    : selectedIndex === availableColumns.indexOf(category)
                        ? 'primary'
                        : 'outlined'" :key="category" :prepend-icon="sector_mapping[category].Icon"
                    :color="sector_mapping[category].Color">
                    {{ sector_mapping[category].Text }}
                </v-chip>
            </v-chip-group>
        </v-row>

        <v-row justify="center" v-if="showOption">
            <v-col cols="8" align="center" class="mt-2">
                <!-- Mode Selection (Button Toggle) -->
                <v-btn-toggle v-model="mode" divided density="compact">
                    <v-btn
                        v-for="option in (enableMap ? ['trend', 'evolution', 'variation', 'grid map'] : ['trend', 'evolution', 'variation'])"
                        :key="option" :prepend-icon="modeIcons[option]" @click="mode = option"
                        :variant="mode === option ? 'tonal' : 'outlined'" size="x-small">
                        <template v-slot:prepend>
                            <v-icon :color="mode === option ? '#0f3e8a' : 'grey'"></v-icon>
                        </template>
                        <!-- Change text color and font weight -->
                        <span :style="{
                            color: mode === option ? '#0f3e8a' : 'grey',
                            fontWeight: mode === option ? 'bold' : 'normal'
                        }">
                            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
                        </span>
                    </v-btn>
                </v-btn-toggle>
            </v-col>

            <v-col cols="4" align="center" class="mt-2">
                <!-- Year Selection -->
                <v-select v-model="comparisonYears" :items="yearAvailable" label="Year for Comparison" multiple
                    variant="underlined" density="compact" chips color="#0f3e8a"
                    @update:modelValue="handleYearSelection">
                </v-select>
            </v-col>
        </v-row>

    </v-container>
</template>
