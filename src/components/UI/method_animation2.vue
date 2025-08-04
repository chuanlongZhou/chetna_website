<template>
    <div class="mb-10">
        <!-- Dark Blue Banner with Title -->
        <div class="goal-banner" :class="{ 'animate-in': bannerVisible }" ref="goalBanner">
            <h2 class="goal-title">CHETNA Methodology</h2>
        </div>
    </div>


    <v-container fluid class="pa-10">
        <!-- Toggle Button -->
        <!-- <div class="text-center mb-6">
            <v-btn color="primary" @click="toggleLayout" :loading="isTransitioning" class="mb-4">
                {{ isExpanded ? 'Collapse Layout' : 'Expand Layout' }}
            </v-btn>
        </div> -->

        <div ref="layout" class="flow-layout">
            <v-row>
                <!-- Column 1 -->
                <v-col cols="3" class="d-flex flex-column justify-space-between">
                    <v-card ref="card1" class="col1-card px-4 py-1 d-flex align-center text-center" color="#c95d26"
                        dark :class="{ 'animate-in': card1Visible }">
                        <div class="d-flex align-center">
                            <v-img src="/src/assets/icons/icon1.png" width="35" height="35" class="mr-4"></v-img>
                            <span>Open-Source Data</span>
                        </div>
                    </v-card>
                    <v-card ref="card2" class="col1-card px-4 d-flex align-center text-center"
                        color="deep-purple accent-3" dark :class="{ 'animate-in': card2Visible }">
                        <div class="d-flex align-center">
                            <v-img src="/src/assets/icons/icon2.png" width="35" height="35" class="mr-4"></v-img>
                            <span>Machine Learning</span>
                        </div>
                    </v-card>
                    <v-card ref="card3" class="col1-card px-4 d-flex align-center" color="#2e5ae8" dark :class="{ 'animate-in': card3Visible }">
                        <div class="d-flex align-center">
                            <v-img src="/src/assets/icons/icon3.png" width="35" height="35" class="mr-4"></v-img>
                            <span>Physical Network Model</span>
                        </div>
                    </v-card>
                    <v-card ref="card4" class="col1-card px-4 d-flex align-center text-center" color="#429106" dark :class="{ 'animate-in': card4Visible }">
                        <div class="d-flex align-center">
                            <v-img src="/src/assets/icons/icon4.png" width="35" height="35" class="mr-4"></v-img>
                            <span>Satellite Imagery</span>
                        </div>
                    </v-card>
                </v-col>

                <!-- Column 2: SVG Layer -->
                <v-col :cols="col2Width" class="position-relative">
                    <svg v-if="ready" ref="svgContainer" class="arrow-layer" :width="svgWidth" :height="svgHeight">
                        <defs>
                            <marker v-for="(arrow, i) in arrows.filter(a => a.svg !== 'svg2')" :key="'marker1-' + i"
                                :id="'arrowhead-' + i" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                                <polygon points="0 0, 6 2, 0 4" :fill="arrow.color || 'black'" />
                            </marker>
                        </defs>
                        <path v-for="(arrow, i) in arrows.filter(a => a.svg !== 'svg2')" :key="'arrow1-' + i"
                            :d="getElbowPath(arrow, 'svg1')" :stroke="arrow.color || 'black'"
                            :stroke-width="arrow.width || 2" fill="none" :marker-end="'url(#arrowhead-' + i + ')'"
                            :class="{ 'line-hidden': !showLines, 'arrow-animate-in': arrowsVisible }" />
                        <circle v-for="(arrow, i) in arrows.filter(a => a.svg !== 'svg2')" :key="'start-circle1-' + i"
                            :cx="getAnchor(arrow.from, arrow.fromY, 'svg1', arrow.fromX).x"
                            :cy="getAnchor(arrow.from, arrow.fromY, 'svg1', arrow.fromX).y" r="5" fill="#dbdbdb"
                            :stroke="arrow.color || 'black'" :stroke-width="2" :class="{ 'line-hidden': !showLines, 'arrow-animate-in': arrowsVisible }" />
                        <circle v-for="(arrow, i) in arrows.filter(a => a.svg !== 'svg2')" :key="'end-circle1-' + i"
                            :cx="getAnchor(arrow.to, arrow.toY, 'svg1', arrow.toX).x"
                            :cy="getAnchor(arrow.to, arrow.toY, 'svg1', arrow.toX).y" r="3" fill="#dbdbdb"
                            :stroke="arrow.color || 'black'" :stroke-width="2" :class="{ 'line-hidden': !showLines, 'arrow-animate-in': arrowsVisible }" />
                    </svg>
                </v-col>

                <!-- Column 3 -->
                <v-col cols="2" class="d-flex flex-column justify-center">
                    <v-card ref="cardA" class="mb-8 pa-2 d-flex align-center justify-center text-center" color="#F2AA84"
                        dark :class="{ 'animate-in': cardAVisible }">
                        <div class="d-flex align-center text-center">
                            <span>Accurate <br> "Gap Filling"</span>
                        </div>
                    </v-card>
                    <v-card ref="cardB" class="mb-8 pa-2 d-flex align-center justify-center text-center" color="#96DCF8"
                        dark :class="{ 'animate-in': cardBVisible }">
                        <div class="d-flex align-center text-center">
                            <span>Sophisticated <br> Downscaling</span>
                        </div>
                    </v-card>
                    <v-card ref="cardC" class="pa-2 d-flex align-center justify-center text-center" color="#B4E5A2"
                        dark :class="{ 'animate-in': cardCVisible }">
                        <div class="d-flex align-center text-center">
                            <div class="d-flex align-center">
                                <span>Near-Real Time <br> Activity Proxy</span>
                            </div>
                        </div>
                    </v-card>
                </v-col>

                <!-- Column 4: SVG Layer -->
                <v-col :cols="col4Width" class="d-flex flex-column justify-center align-center">
                    <svg v-if="ready" ref="svgContainer2" class="arrow-layer" :width="svgWidth2" :height="svgHeight2"
                    style="z-index: 0;">
                        <defs>
                            <marker v-for="(arrow, i) in arrows.filter(a => a.svg === 'svg2')" :key="'marker2-' + i"
                                :id="'arrowhead2-' + i" markerWidth="10" markerHeight="7" refX="5.5" refY="2"
                                orient="auto">
                                <polygon points="0 0, 6 2, 0 4" :fill="arrow.color || 'black'" />
                            </marker>
                        </defs>
                        <path v-for="(arrow, i) in arrows.filter(a => a.svg === 'svg2')" :key="'arrow2-' + i"
                            :d="getElbowPath(arrow, 'svg2')" :stroke="arrow.color || 'black'"
                            :stroke-width="arrow.width || 2" fill="none" 
                            :marker-end="'url(#arrowhead2-' + i + ')'"
                            :class="{ 'line-hidden': !showLines, 'arrow-animate-in': arrows2Visible }" />
                    </svg>
                    <v-card ref="cardX" class="col5-card mb-8 pa-1 d-flex align-center justify-center text-center"
                        color="#FF6B35" dark :class="{ 'animate-in': cardXVisible }">
                        <div class="d-flex align-center">
                            <span>Data Gap</span>
                        </div>
                    </v-card>
                    <v-card ref="cardY" class="col5-card mb-8 pa-1 d-flex align-center justify-center text-center"
                        color="#2196F3" dark :class="{ 'animate-in': cardYVisible }">
                        <div class="d-flex align-center">
                            <span>High Spatial Resolution</span>
                        </div>
                    </v-card>
                    <v-card ref="cardZ" class="col5-card pa-1 d-flex align-center justify-center text-center"
                        color="#4CAF50" dark :class="{ 'animate-in': cardZVisible }">
                        <div class="d-flex align-center">
                            <span>Low Latency</span>
                        </div>
                    </v-card>

                </v-col>

                <!-- Column 5 -->
                <v-col :cols="col5Width" class="d-flex flex-column justify-center">
                    <v-row>
                        <v-col cols="1" class="pa-0 pr-2">

                            <svg width="50" height="550" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0, 60) scale(1, 0.9)">
                                    <path d="M0 250 A 20 20,0,0,0,20 230 L 20 20 A 20 20,0,0,1,40 5" stroke="#424242"
                                        stroke-width="3" fill="transparent" />
                                    <path d="m0 250 A 20 20,0,0,1,20 270 L 20 480 A 20 20,0,0,0,40 495" stroke="#424242"
                                        stroke-width="3" fill="transparent" />
                                </g>

                            </svg>
                        </v-col>
                        <!-- First Column: 4 circular cards with text outside -->
                        <v-col cols="5" class="d-flex flex-column justify-top">
                            <div class="text-center text-overline mb-3 font-weight-bold mx-3"
                                style="border-bottom: 2px solid #1E324F;" :class="{ 'animate-in': sectorTitleVisible }">
                                Site-level
                            </div>
                            <div class="mb-4 d-flex flex-column align-center" :class="{ 'animate-in': sector1Visible }" @click="handleSectorClick('power')" style="cursor: pointer;">
                                <div
                                    class="sector-card-circle mb-2 d-flex align-center justify-center bg-yellow-darken-2 flash-effect">
                                    <v-img src="/src/assets/icons/sector1.png" width="40" height="40"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Power</span>
                            </div>
                            <div class="mb-4 d-flex flex-column align-center" :class="{ 'animate-in': sector2Visible }" @click="handleSectorClick('industry')" style="cursor: pointer;">
                                <div
                                    class="sector-card-circle mb-2 d-flex align-center justify-center bg-grey-darken-2">
                                    <v-img src="/src/assets/icons/sector2.png" width="40" height="40"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Large Industry</span>
                            </div>
                            <div class="mb-4 d-flex flex-column align-center" :class="{ 'animate-in': sector3Visible }" @click="handleSectorClick('industry')" style="cursor: pointer;">
                                <div
                                    class="sector-card-circle mb-2 d-flex align-center justify-center bg-blue-grey-lighten-2">
                                    <v-img src="/src/assets/icons/sector3.png" width="40" height="40"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Small Industry</span>
                            </div>
                            <div class="d-flex flex-column align-center" :class="{ 'animate-in': sector6Visible }" @click="handleSectorClick('aviation')" style="cursor: pointer;">
                                <div
                                    class="sector-card-circle mb-2 d-flex align-center justify-center bg-teal-darken-2">
                                    <v-img src="/src/assets/icons/sector6.png" width="40" height="40"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Aviation</span>
                            </div>
                        </v-col>

                        <!-- Second Column: 2 normal cards with text outside -->
                        <v-col cols="6" class="d-flex flex-column justify-top">
                            <div class="text-center text-overline mb-3 font-weight-bold mx-4"
                                style="border-bottom: 2px solid #1E324F;" :class="{ 'animate-in': gridTitleVisible }">
                                Gridded Map
                            </div>
                            <div class="mb-4 d-flex flex-column align-center" :class="{ 'animate-in': sector4Visible }" @click="handleSectorClick('residential')" style="cursor: pointer;">
                                <div
                                    class="sector-card-rect mb-2 d-flex align-center justify-center bg-purple-lighten-2">
                                    <v-img src="/src/assets/icons/sector4.png" width="50" height="50"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Residential Scope-1</span>
                            </div>
                            <div class="mb-4 d-flex flex-column align-center" :class="{ 'animate-in': sector7Visible }" @click="handleSectorClick('residential')" style="cursor: pointer;">
                                <div
                                    class="sector-card-rect mb-2 d-flex align-center justify-center bg-deep-purple-lighten-4">
                                    <v-img src="/src/assets/icons/sector7.png" width="50" height="50"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Residential Scope-2</span>
                            </div>
                            <div class="d-flex flex-column align-center" :class="{ 'animate-in': sector5Visible }" @click="handleSectorClick('traffic')" style="cursor: pointer;">
                                <div class="sector-card-rect mb-2 d-flex align-center justify-center bg-green-darken-1">
                                    <v-img src="/src/assets/icons/sector5.png" width="50" height="50"></v-img>
                                </div>
                                <span class="text-center sector-card-text">Ground Transport</span>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <div ref="clickHint" class="text-right pr-4 text-overline font-weight-bold text-blue-darken-4 click-hint-flash"
            style="font-size: 1rem !important;" :class="{ 'animate-in': clickHintVisible }">
            ↑ Click for Sectoral Details ↑
        </div>

    </v-container>

    <!-- Method Popup Component -->
    <MethodPopup
      v-model="showMethodPopup"
      :title="currentMethodData?.title || 'Method Details'"
      :cards="currentMethodData?.cards || []"
      :image-path="currentMethodData?.imagePath || ''"
      :references="currentMethodData?.references || []"
      :ref-links="currentMethodData?.refLinks || []"
      :header-color="currentMethodData?.headerColor || '#1E324F'"
      :title-text-color="currentMethodData?.titleTextColor || 'white'"
    />
</template>

<script setup>
import { onMounted, ref, nextTick, computed, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import MethodPopup from './MethodPopup.vue'

const layout = ref(null)
const svgContainer = ref(null)
const svgContainer2 = ref(null)
const goalBanner = ref(null)

// Store and popup management
const appStore = useAppStore()
const showMethodPopup = ref(false)
const currentMethodData = ref(null)

const card1 = ref(null), card2 = ref(null), card3 = ref(null), card4 = ref(null)
const cardA = ref(null), cardB = ref(null), cardC = ref(null)
const cardX = ref(null), cardY = ref(null), cardZ = ref(null)
const sector1 = ref(null), sector2 = ref(null), sector3 = ref(null), sector4 = ref(null), sector5 = ref(null), sector6 = ref(null)
const clickHint = ref(null)

const ready = ref(false)
const isExpanded = ref(false)
const isTransitioning = ref(false)
const showLines = ref(true)

// Animation visibility states
const bannerVisible = ref(false)
const card1Visible = ref(false)
const card2Visible = ref(false)
const card3Visible = ref(false)
const card4Visible = ref(false)
const cardAVisible = ref(false)
const cardBVisible = ref(false)
const cardCVisible = ref(false)
const cardXVisible = ref(false)
const cardYVisible = ref(false)
const cardZVisible = ref(false)
const arrowsVisible = ref(false)
const arrows2Visible = ref(false)
const sectorTitleVisible = ref(false)
const gridTitleVisible = ref(false)
const sector1Visible = ref(false)
const sector2Visible = ref(false)
const sector3Visible = ref(false)
const sector4Visible = ref(false)
const sector5Visible = ref(false)
const sector6Visible = ref(false)
const sector7Visible = ref(false)
const clickHintVisible = ref(false)

// Dynamic column widths
const col2Width = computed(() => isExpanded.value ? 2 : 1)
const col4Width = computed(() => isExpanded.value ? 3 : 2)
const col5Width = computed(() => isExpanded.value ? 2 : 4)

const svgWidth = computed(() => svgContainer.value?.offsetWidth || 100)
const svgHeight = computed(() => svgContainer.value?.offsetHeight || 100)
const svgWidth2 = computed(() => svgContainer2.value?.offsetWidth || 50)
const svgHeight2 = computed(() => svgContainer2.value?.offsetHeight || 100)

let observer = null

// Helper function to safely observe an element
const observeElement = (element, observer) => {
    if (!element) return false

    // Handle both Vue component refs and direct DOM elements
    const domElement = element.$el || element

    if (domElement && domElement instanceof Element) {
        observer.observe(domElement)
        return true
    }

    return false
}

const arrows = [
    { from: card1, to: cardA, fromX: 1, fromY: 0.25, toX: 0, toY: 0.25, breakX: 0.8, color: '#b8550f', width: 2.5 },
    { from: card1, to: cardB, fromX: 1, fromY: 0.75, toX: 0, toY: 0.25, breakX: 0.65, color: '#b8550f', width: 2.5 },
    { from: card2, to: cardA, fromX: 1, fromY: 0.25, toX: 0, toY: 0.75, breakX: 0.55, color: '#5d2a80', width: 2.5 },
    { from: card2, to: cardB, fromX: 1, fromY: 0.5, toX: 0, toY: 0.5, breakX: 0.45, color: '#5d2a80', width: 2.5 },
    { from: card2, to: cardC, fromX: 1, fromY: 0.75, toX: 0, toY: 0.25, breakX: 0.35, color: '#5d2a80', width: 2.5 },
    { from: card3, to: cardB, fromX: 1, fromY: 0.25, toX: 0, toY: 0.75, breakX: 0.75, color: '#18215c', width: 2.5 },
    { from: card4, to: cardC, fromX: 1, fromY: 0.25, toX: 0, toY: 0.75, breakX: 0.35, color: '#205c18', width: 2.5 },
    { from: cardA, to: cardX, fromX: 1, fromY: 0.5, toX: 0, toY: 0.5, breakX: 0.05, color: '#3b3b3b', width: 3, svg: 'svg2' },
    { from: cardB, to: cardY, fromX: 1, fromY: 0.5, toX: 0, toY: 0.5, breakX: 0.05, color: '#3b3b3b', width: 3, svg: 'svg2' },
    { from: cardC, to: cardZ, fromX: 1, fromY: 0.5, toX: 0, toY: 0.5, breakX: 0.05, color: '#3b3b3b', width: 3, svg: 'svg2' },
]

function getAnchorPointOnCard(el, svgElement, horizontal = 0.5, vertical = 0.5) {
    const elBox = el.getBoundingClientRect()
    const svgBox = svgElement.getBoundingClientRect()
    return {
        x: elBox.left + elBox.width * horizontal - svgBox.left,
        y: elBox.top + elBox.height * vertical - svgBox.top
    }
}

function getAnchor(elRef, yRatio = 0.5, whichSvg = 'svg1', xRatio = 0.5) {
    if (!elRef.value || !elRef.value.$el) return { x: 0, y: 0 }
    const svgEl = whichSvg === 'svg2' ? svgContainer2.value : svgContainer.value
    if (!svgEl) return { x: 0, y: 0 }
    return getAnchorPointOnCard(elRef.value.$el, svgEl, xRatio, yRatio)
}

function getElbowPath(arrow, whichSvg) {
    const start = getAnchor(arrow.from, arrow.fromY, whichSvg, arrow.fromX)
    const end = getAnchor(arrow.to, arrow.toY, whichSvg, arrow.toX)
    const svgEl = whichSvg === 'svg2' ? svgContainer2.value : svgContainer.value

    // Get the column width by finding the parent column element
    const columnEl = svgEl?.closest('.v-col')
    const columnWidth = columnEl?.offsetWidth || svgEl?.offsetWidth || 0

    // Calculate break point relative to the column width
    const breakPoint = columnWidth * (arrow.breakX ?? 0.5)

    // Convert to SVG coordinates by adding the SVG's left offset
    const svgBox = svgEl?.getBoundingClientRect()
    const columnBox = columnEl?.getBoundingClientRect()
    const svgOffset = svgBox ? (columnBox?.left || 0) - svgBox.left : 0
    const midX = breakPoint + svgOffset

    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`
}

async function toggleLayout() {
    if (isTransitioning.value) return

    isTransitioning.value = true

    // Step 1: Hide all lines immediately
    showLines.value = false

    // Step 2: Wait a bit for lines to fade out
    await new Promise(resolve => setTimeout(resolve, 150))

    // Step 3: Change layout state
    isExpanded.value = !isExpanded.value

    // Step 4: Wait for cards to move
    await nextTick()

    // Step 5: Force a reflow to ensure the new layout is applied
    if (layout.value) {
        layout.value.offsetHeight
    }

    // Step 6: Wait for card transitions to complete
    await new Promise(resolve => setTimeout(resolve, 300))

    // Step 7: Show lines with wipe animation
    showLines.value = true

    // Step 8: Wait for line animation to complete
    setTimeout(() => {
        isTransitioning.value = false
    }, 400)
}

/**
 * Handles sector card clicks to show method popup
 * @param {string} sector - The sector name (power, traffic, residential, etc.)
 */
function handleSectorClick(sector) {
  console.log('handleSectorClick called with sector:', sector)
  const methodData = appStore.getMethodPopup(sector)
  console.log('methodData:', methodData)
  if (methodData) {
    currentMethodData.value = methodData
    showMethodPopup.value = true
    console.log('Popup should be visible now')
  } else {
    console.log('No method data found for sector:', sector)
  }
}

onMounted(async () => {
    // Wait for next tick to ensure DOM elements are ready
    await nextTick()
    
    // Test the store and function
    console.log('Testing store and function...')
    console.log('appStore:', appStore)
    console.log('handleSectorClick function:', typeof handleSectorClick)
    console.log('Power method data:', appStore.getMethodPopup('power'))

    // Create Intersection Observer to detect when elements come into view
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target
            const isIntersecting = entry.isIntersecting

            // Determine which element is being observed and update its visibility
            if (element === (goalBanner.value?.$el || goalBanner.value)) {
                bannerVisible.value = isIntersecting
            } else if (element === (card1.value?.$el || card1.value)) {
                card1Visible.value = isIntersecting
            } else if (element === (card2.value?.$el || card2.value)) {
                card2Visible.value = isIntersecting
            } else if (element === (card3.value?.$el || card3.value)) {
                card3Visible.value = isIntersecting
            } else if (element === (card4.value?.$el || card4.value)) {
                card4Visible.value = isIntersecting
            } else if (element === (cardA.value?.$el || cardA.value)) {
                cardAVisible.value = isIntersecting
            } else if (element === (cardB.value?.$el || cardB.value)) {
                cardBVisible.value = isIntersecting
            } else if (element === (cardC.value?.$el || cardC.value)) {
                cardCVisible.value = isIntersecting
            } else if (element === (cardX.value?.$el || cardX.value)) {
                cardXVisible.value = isIntersecting
            } else if (element === (cardY.value?.$el || cardY.value)) {
                cardYVisible.value = isIntersecting
            } else if (element === (cardZ.value?.$el || cardZ.value)) {
                cardZVisible.value = isIntersecting
            } else if (element === (svgContainer.value || svgContainer.value?.$el)) {
                arrowsVisible.value = isIntersecting
            } else if (element === (svgContainer2.value || svgContainer2.value?.$el)) {
                arrows2Visible.value = isIntersecting
            } else if (element.classList.contains('d-flex') && element.classList.contains('flex-column') && element.classList.contains('align-center')) {
                // Individual sector card animations
                const index = Array.from(element.parentElement.children).indexOf(element)
                if (index === 0) sector1Visible.value = isIntersecting
                else if (index === 1) sector2Visible.value = isIntersecting
                else if (index === 2) sector3Visible.value = isIntersecting
                else if (index === 3) sector6Visible.value = isIntersecting
                else if (index === 4) sector4Visible.value = isIntersecting
                else if (index === 5) sector7Visible.value = isIntersecting
                else if (index === 6) sector5Visible.value = isIntersecting
            } else if (element.classList.contains('text-overline') && element.classList.contains('text-center')) {
                // Individual title animations
                if (element.textContent.includes('Site-level')) {
                    sectorTitleVisible.value = isIntersecting
                } else if (element.textContent.includes('Gridded Map')) {
                    gridTitleVisible.value = isIntersecting
                }
            } else if (element === (clickHint.value?.$el || clickHint.value)) {
                // Click hint animation
                clickHintVisible.value = isIntersecting
            } else if (element.classList.contains('text-right') && element.classList.contains('text-overline')) {
                // Click hint animation (fallback)
                clickHintVisible.value = isIntersecting
            } else if (element === (layout.value || layout.value?.$el)) {
                // When layout comes into view, trigger all sector animations
                if (isIntersecting) {
                    sectorTitleVisible.value = true
                    gridTitleVisible.value = true
                    sector1Visible.value = true
                    sector2Visible.value = true
                    sector3Visible.value = true
                    sector4Visible.value = true
                    sector5Visible.value = true
                    sector6Visible.value = true
                    sector7Visible.value = true
                    clickHintVisible.value = true
                } else {
                    // Reverse animations when leaving view
                    sectorTitleVisible.value = false
                    gridTitleVisible.value = false
                    sector1Visible.value = false
                    sector2Visible.value = false
                    sector3Visible.value = false
                    sector4Visible.value = false
                    sector5Visible.value = false
                    sector6Visible.value = false
                    sector7Visible.value = false
                    clickHintVisible.value = false
                }
            }
        })
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '30px 0px -30px 0px' // 30px buffer before showing/hiding elements
    })

    // Start observing all elements with proper error handling
    const elementsToObserve = [
        { ref: goalBanner.value, class: null },
        { ref: card1.value, class: null },
        { ref: card2.value, class: null },
        { ref: card3.value, class: null },
        { ref: card4.value, class: null },
        { ref: cardA.value, class: null },
        { ref: cardB.value, class: null },
        { ref: cardC.value, class: null },
        { ref: cardX.value, class: null },
        { ref: cardY.value, class: null },
        { ref: cardZ.value, class: null },
        { ref: svgContainer.value, class: null },
        { ref: svgContainer2.value, class: null },
        { ref: clickHint.value, class: null }
    ]

    elementsToObserve.forEach(({ ref, class: className }) => {
        try {
            if (ref) {
                observeElement(ref, observer)
            }
        } catch (error) {
            console.warn('Element could not be observed:', error)
        }
    })

    // Also observe the layout container to trigger sector animations
    try {
        if (layout.value) {
            observeElement(layout.value, observer)
        }
    } catch (error) {
        console.warn('Layout element could not be observed:', error)
    }

    // Observe individual sector elements for individual animations
    setTimeout(() => {
        const sectorElements = document.querySelectorAll('.d-flex.flex-column.align-center, .text-center.text-overline')
        sectorElements.forEach((element, index) => {
            try {
                observer.observe(element)
            } catch (error) {
                console.warn('Sector element could not be observed:', error)
            }
        })
    }, 100)

    // Check if all card elements are ready for SVG
    const allReady = [
        card1, card2, card3, card4,
        cardA, cardB, cardC, cardX, cardY, cardZ,
        // sector1, sector2, sector3, sector4, sector5, sector6
    ].every(ref => ref.value && ref.value.$el)

    if (allReady) {
        ready.value = true
    }

})

onUnmounted(() => {
    // Clean up observer
    if (observer) {
        observer.disconnect()
    }

})
</script>

<style scoped>
.goal-banner {
    padding: 1rem 0;
    text-align: left;
    border-bottom: 2px solid #1E324F;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.8s ease-out;
}

.goal-banner.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.goal-title {
    font-weight: 700;
    color: #1E324F;
    margin: 0;
    letter-spacing: 2px;
}

/* Card animations */
.col1-card {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease-out;
}

.col1-card.animate-in {
    opacity: 1;
    transform: translateX(0);
}

/* Stagger the card animations */
.col1-card:nth-child(1) { transition-delay: 0.2s; }
.col1-card:nth-child(2) { transition-delay: 0.3s; }
.col1-card:nth-child(3) { transition-delay: 0.4s; }
.col1-card:nth-child(4) { transition-delay: 0.5s; }

/* Middle column cards */
.col5-card {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease-out;
}

.col5-card.animate-in {
    opacity: 1;
    transform: translateX(0);
}

.col5-card:nth-child(1) { transition-delay: 0.6s; }
.col5-card:nth-child(2) { transition-delay: 0.7s; }
.col5-card:nth-child(3) { transition-delay: 0.8s; }

/* Cards A, B, C animations - enter from top */
.v-card[ref="cardA"],
.v-card[ref="cardB"],
.v-card[ref="cardC"] {
    opacity: 0;
    transform: translateY(-30px);
    transition: all 0.8s ease-out;
}

.v-card[ref="cardA"].animate-in,
.v-card[ref="cardB"].animate-in,
.v-card[ref="cardC"].animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Stagger the middle cards animations */
.v-card[ref="cardA"] { transition-delay: 0.4s; }
.v-card[ref="cardB"] { transition-delay: 0.5s; }
.v-card[ref="cardC"] { transition-delay: 0.6s; }

/* Sector cards animations */
.sector-card-circle,
.sector-card-rect {
    opacity: 0;
    transform: translateX(30px) scale(0.8);
    transition: all 0.8s ease-out;
}

/* Animated state - when parent has animate-in */
.d-flex.flex-column.align-center.animate-in .sector-card-circle,
.d-flex.flex-column.align-center.animate-in .sector-card-rect {
    opacity: 1;
    transform: translateX(0) scale(1);
}

/* Stagger sector animations - using the correct structure */
.d-flex.flex-column.align-center:nth-child(1) { transition-delay: 1.0s; }
.d-flex.flex-column.align-center:nth-child(2) { transition-delay: 1.1s; }
.d-flex.flex-column.align-center:nth-child(3) { transition-delay: 1.2s; }
.d-flex.flex-column.align-center:nth-child(4) { transition-delay: 1.3s; }

/* For the second column (gridded map) - different delays for visual flow */
.d-flex.flex-column.align-center:nth-child(1) { transition-delay: 1.2s; }
.d-flex.flex-column.align-center:nth-child(2) { transition-delay: 1.3s; }
.d-flex.flex-column.align-center:nth-child(3) { transition-delay: 1.4s; }

/* Title animations */
.text-overline {
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.7s ease-out;
}

.text-overline.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Stagger title animations */
.text-overline:nth-child(1) { transition-delay: 0.5s; }
.text-overline:nth-child(2) { transition-delay: 0.6s; }

/* Arrow animations */
.arrow-layer path,
.arrow-layer circle {
    opacity: 0;
    transition: all 1.0s ease-out;
}

.arrow-layer path.arrow-animate-in,
.arrow-layer circle.arrow-animate-in {
    opacity: 1;
}

/* Click hint animation */
.text-overline.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Specific animation for click hint - enters from bottom */
.text-right.text-overline.font-weight-bold.text-blue-darken-4 {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;
}

.text-right.text-overline.font-weight-bold.text-blue-darken-4.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Alternative selector for click hint */
div[class*="text-right"][class*="text-overline"] {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;
}

div[class*="text-right"][class*="text-overline"].animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Flash effect for click hint */
.click-hint-flash {
    animation: clickHintFlash 3s infinite;
}

.click-hint-flash:hover {
    animation: none;
    color: #2196F3;
    text-shadow: 0 0 2px rgba(5, 57, 100, 0.6), 0 0 5px rgba(10, 7, 118, 0.4);
}

@keyframes clickHintFlash {
    0%, 100% {
        color: #1565C0;
        text-shadow: none;
    }
    50% {
        color: #2196F3;
        text-shadow: 0 0 2px rgba(5, 57, 100, 0.6), 0 0 5px rgba(10, 7, 118, 0.4);
    }
}

.flow-layout {
    position: relative;
    height: 600px;
    padding: 0;
    margin: 0;
}

.arrow-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: visible;
}

.position-relative {
    position: relative;
}

.col5 {
    border-left: 4px solid #153550;
    border-radius: 15px;
}

.col1-card {
    height: 80px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.col5-card {
    font-size: 1rem;
    font-weight: 600;
    width: 120px;
    transition: all 0.3s ease;
}

.left-align-content {
    justify-content: flex-start !important;
}

.sector-card {
    height: 80px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.sector-card-circle {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.3s ease;
    margin: 0 auto;
    background-color: var(--v-primary-base);
}

.sector-card-rect {
    height: 120px;
    width: 50%;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    background-color: var(--v-primary-base);
}

.sector-card-text {
    font-size: 1rem;
    font-weight: 300;
    transition: all 0.3s ease;
}

/* Add smooth transitions for column changes */
.v-col {
    transition: all 0.3s ease;
}

/* Line visibility and wipe animation */
.line-hidden {
    opacity: 0;
    transition: opacity 0.15s ease;
}

.arrow-layer path:not(.line-hidden) {
    opacity: 1;
    transition: opacity 0.4s ease, d 0.3s ease;
}

.arrow-layer circle:not(.line-hidden) {
    opacity: 1;
    transition: opacity 0.4s ease, cx 0.3s ease, cy 0.3s ease;
}

/* Wipe animation for lines */
.arrow-layer path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: wipeIn 0.4s ease forwards;
}

@keyframes wipeIn {
    to {
        stroke-dashoffset: 0;
    }
}

/* Flash effect for Power card */
.flash-effect {
    animation: flash 2s infinite;
}

.flash-effect:hover {
    animation: none;
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.8), 0 0 25px rgba(255, 193, 7, 0.6);
}

@keyframes flash {
    0%, 100% {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    50% {
        box-shadow: 0 0 15px rgba(2255, 193, 7, 0.8), 0 0 30px rgba(255, 193, 7, 0.6);
    }
}

/* Pointer cursor for all icon cards on hover */
.sector-card-circle:hover,
.sector-card-rect:hover {
    cursor: pointer;
    transform: scale(1.05) translateY(-5px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Enhanced hover effects for sector cards */
.sector-card-circle:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.15);
}

.sector-card-rect:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.15);
}
</style>