<template>
  <v-row justify="center" class="mt-6 mb-5">
    <v-col cols="12" md="9">
      <v-card class="text-center" elevation="2" style="background-color: #1d466b;">
        <v-card-text>
          <h2 class="text-h4 font-weight-bold mb-4" style="color: #FFFFFF;">
            Download CHETNA Emission Dataset
          </h2>
          <p class="text-body-1 mb-6" style="color: #FFFFFF;">
            Access comprehensive emission data for Indian cities with time series and gridded map data.
          </p>
          
          <v-row justify="center" class="mb-4">
            <v-col cols="12" md="6">
              <v-select 
                v-model="selectedCity" 
                :items="allCityNames" 
                label="Select City" 
                density="compact"
                class="mx-1 primary"
                variant="solo"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="selectedType" 
                :items="datasetTypes" 
                label="Select Data Type" 
                density="compact"
                class="mx-1"
                variant="solo"
              ></v-select>
            </v-col>
          </v-row>
          
          <v-btn 
            :disabled="!selectedType || !selectedCity" 
            color="highlight" 
            size="large" 
            variant="elevated" 
            class="mt-1 mb-3"
            @click="downloadDataset"
            :loading="downloading"
          >
            <v-icon left>mdi-download</v-icon>
            {{ downloading ? 'Downloading...' : 'Download Dataset' }}
          </v-btn>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

// Reactive data
const selectedType = ref("Time Series Data");
const selectedCity = ref("Total");
const downloading = ref(false);

// Configuration
const baseUrl = "https://raw.githubusercontent.com/chuanlongZhou/indian_100_data/main/data/";
const datasetTypes = ["Time Series Data", "Gridded Map Data"];

const allCityNames = [
  'Total', 'Delhi', 'Mumbai', 'Bengaluru', 'Ghaziabad', 'Faridabad',
  'Kolkata', 'Hyderabad', 'Chennai', 'Noida', 'Ahmedabad', 'Pune',
  'Lucknow', 'Jaipur', 'Surat', 'Patna', 'Kanpur', 'Aligarh',
  'Indore', 'Vadodara', 'Dhanbad', 'Raipur', 'Moradabad', 'Agra',
  'Gwalior', 'Varanashi', 'Kota', 'Meerut', 'Bareilly', 'Amritsar',
  'Bhopal', 'Bhilainagar', 'Rajkot', 'Jamshedpur', 'Muzaffarpur',
  'Kochi', 'Chandigarh', 'Aurangabad', 'Jabalpur',
  'Thiruvananthapuram', 'Ranchi', 'Ludhiana', 'Cuttack', 'Madurai',
  'Gaya', 'Nashik', 'Warangal', 'Srinagar', 'Tiruppur', 'Coimbatore',
  'Jammu', 'Mysuru', 'Erode', 'Jalandhar', 'Jodhpur', 'Solapur',
  'Guwahati', 'Firozabad', 'Jhansi', 'Sangli-Miraj-Kupwad',
  'Dehradun', 'Kolhapur', 'Nellore', 'Kurnool', 'Amravati',
  'Mangaluru', 'Guntur', 'Ujjain', 'Korba', 'Jalgaon', 'Patiala',
  'Silchar', 'Dewas', 'Imphal', 'Udaipur', 'Shivamogga', 'Itanagar',
  'Alwar', 'Agartala', 'Nagpur', 'Gangtok', 'Sagar', 'Shimla',
  'Visakhapatnam', 'Panaji', 'Gurugram', 'Kohima', 'Tiruchirapalli',
  'Vijayawada', 'Hubballi-Dharwad', 'Bhubaneshwar', 'Mangalore',
  'Aizawl', 'Jalpaiguri', 'Thoothukkudi', 'Durgapur', 'Raurkela',
  'Shillong', 'Nalgonda'
];

/**
 * Function to trigger the dataset download
 */
const downloadDataset = async () => {
  if (!selectedType.value || !selectedCity.value) return;

  downloading.value = true;

  try {
    const folder = selectedType.value === "Time Series Data" ? "summary_time_series" : "summary_grid";
    var fileName = `${selectedCity.value.replace(" ", "_")}.csv`; // File format assumed to be CSV
    if (fileName === "Total.csv") {
      fileName = "total.csv";
    }
    const fileUrl = `${baseUrl}${folder}/${fileName}`;

    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("File not found or unavailable.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    // You could add a toast notification here for better UX
  } finally {
    downloading.value = false;
  }
};
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style> 