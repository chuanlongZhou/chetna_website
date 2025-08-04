<template>
    <div>
        <!-- Dark Blue Banner with Title -->
        <div class="goal-banner" :class="{ 'animate-in': bannerVisible }" ref="goalBanner">
            <h2 class="goal-title">CHETNA Goal</h2>
        </div>

        <div class="content-container">
            <!-- Step 1 Row -->
            <v-row 
                :class="{ 'animate-in': row1Visible }" 
                class="animation-row" 
                data-delay="0"
                ref="row1"
            >
                <v-col cols="12" md="4" class="method-column">
                    <div class="method-container mt-10">
                        <div class="method-step step-1">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <div class="step-title">City-wise Emission Modeling</div>
                            </div>
                        </div>
                        <div class="step-arrow">
                            <v-icon color="mediumBlue" size="24">mdi-arrow-down-bold</v-icon>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="8" class="description-column">
                    <div class="step-description">
                        <p class="goal-text">
                            Deal with <span class="highlight-orange">Data Gap</span>, Provide
                            <span class="highlight-green">Low Latency</span> and
                            <span class="highlight-blue">High Spatial Resolution</span> estimates of CO2 emissions,
                            air pollutant emissions and energy use for 100+ Indian urban areas & pave the way for
                            other developing country cities.
                        </p>
                    </div>
                </v-col>
            </v-row>

            <!-- Step 2 Row -->
            <v-row 
                :class="{ 'animate-in': row2Visible }" 
                class="animation-row" 
                data-delay="1"
                ref="row2"
            >
                <v-col cols="12" md="4" class="method-column">
                    <div class="method-container">
                        <div class="method-step step-2">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <div class="step-title">Public Available Data</div>
                            </div>
                        </div>
                        <div class="step-arrow">
                            <v-icon color="mediumBlue" size="24">mdi-arrow-down-bold</v-icon>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="8" class="description-column">
                    <div class="step-description">
                        <p class="step-text">
                            All of data will be publicly available on the project website, facilitating the data
                            uptake by various stakeholders including <strong>policymakers</strong>, and
                            <strong>research communities</strong>.
                        </p>
                    </div>
                </v-col>
            </v-row>

            <!-- Step 3 Row -->
            <v-row 
                :class="{ 'animate-in': row3Visible }" 
                class="animation-row" 
                data-delay="2"
                ref="row3"
            >
                <v-col cols="12" md="4" class="method-column">
                    <div class="method-container">
                        <div class="method-step step-3 mb-3">
                            <div class="step-number step-title2">3</div>
                            <div class="step-content">
                                <div class="step-title2">Scenario Analysis</div>
                            </div>
                        </div>
                        <div class="step-arrow mb-8">
                            <v-icon color="mediumBlue" size="24">mdi-arrow-down-bold</v-icon>
                        </div>
                        <div class="method-container">
                        <div class="method-step step-4">
                            <div class="step-number step-title2">4</div>
                            <div class="step-content">
                                <div class="step-title2">Mitigation Policy</div>
                            </div>
                        </div>

                    </div>
                    </div>
                </v-col>
                <v-col cols="12" md="8" class="description-column">
                    <div class="step-description">
                        <ul class="step-list">
                            <li>Analyze urban carbon reduction scenarios to assess air quality co-benefits.</li>
                            <li>Evaluate mitigation scenarios on targets at city, regional, and national levels.</li>
                            <li>Scalable applications in other developing countries.</li>
                            <li>Enable informed, data-driven policy decisions.</li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const goalBanner = ref(null)
const row1 = ref(null)
const row2 = ref(null)
const row3 = ref(null)

const bannerVisible = ref(false)
const row1Visible = ref(false)
const row2Visible = ref(false)
const row3Visible = ref(false)

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

onMounted(async () => {
    // Wait for next tick to ensure DOM elements are ready
    await nextTick()
    
    // Create Intersection Observer to detect when elements come into view
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target
            const isIntersecting = entry.isIntersecting
            
            // Determine which element is being observed and update its visibility
            if (element === (goalBanner.value?.$el || goalBanner.value)) {
                bannerVisible.value = isIntersecting
            } else if (element === (row1.value?.$el || row1.value)) {
                row1Visible.value = isIntersecting
            } else if (element === (row2.value?.$el || row2.value)) {
                row2Visible.value = isIntersecting
            } else if (element === (row3.value?.$el || row3.value)) {
                row3Visible.value = isIntersecting
            }
        })
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is fully in view
    })

    // Start observing all elements with proper error handling
    try {
        observeElement(goalBanner.value, observer)
        observeElement(row1.value, observer)
        observeElement(row2.value, observer)
        observeElement(row3.value, observer)
    } catch (error) {
        console.warn('Some elements could not be observed:', error)
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

.content-container {
    padding: 3rem 2rem;
}

.animation-row {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.animation-row.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Apply staggered delays based on data-delay attribute */
.animation-row[data-delay="0"] {
    transition-delay: 0.2s;
}

.animation-row[data-delay="1"] {
    transition-delay: 0.6s;
}

.animation-row[data-delay="2"] {
    transition-delay: 1s;
}

.method-column {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.method-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.method-step {
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    border-radius: 12px;
    width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
}

.method-step:hover {
    transform: translateY(-2px);
}

.step-number {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
    margin-right: 1rem;
}

.step-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
}

.step-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
}

.step-title2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1E324F;
}

.step-arrow {
    margin-top: 1rem;
    text-align: center;
}

.step-1 {
    background: #143F6A;
}

.step-2 {
    background: #1F5FA0;
}

.step-3 {
    background: #7EB2E6;
}

.step-4 {
    background: #D4E5F7;
}

.description-column {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
}

.step-description {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border-left: 3px solid #426B8D;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    width: 100%;
}

.step-description:hover {
    background: rgba(255, 255, 255, 0.08);
}

.step-text {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
}

.step-list {
    margin: 0;
    padding-left: 1.5rem;
}

.step-list li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

.goal-text {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
}

/* Highlight styles */
.highlight-orange {
    background-color: #FF6B35;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
}

.highlight-green {
    background-color: #4CAF50;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
}

.highlight-blue {
    background-color: #2196F3;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
}

/* Responsive design */
@media (max-width: 960px) {
    .content-container {
        padding: 2rem 1rem;
    }

    .method-step {
        min-width: 250px;
        padding: 1rem 1.5rem;
    }

    .step-title {
        font-size: 1rem;
    }

    .goal-text {
        font-size: 1rem;
    }
}

@media (max-width: 600px) {
    .method-step {
        min-width: 200px;
    }

    .step-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .step-arrow {
        margin-left: 0;
        align-self: center;
    }

    .description-column {
        padding: 1rem;
    }
}
</style>
