<template>
  <v-col cols="12" md="6">
    <div class="d-flex flex-column h-100">
      <!-- Project Title -->
      <div class="text-left mb-4">
        <h3 class="text-h6 font-weight-thin mb-2 ml-15">A PROJECT LED BY</h3>
      </div>

      <!-- Team Logos -->
      <div class="mb-4">
        <v-row dense>
          <v-col cols="4" class="text-center mb-2">
            <a href="https://www.lsce.ipsl.fr/" target="_blank" class="logo-link">
              <img src="@/assets/logo/lsce.png" alt="LSCE Logo" class="team-logo" style=" max-height: 45px;" />
            </a>
          </v-col>
          <v-col cols="4" class="text-center mb-2">
            <a href="https://www.iitb.ac.in/" target="_blank" class="logo-link">
              <img src="@/assets/logo/iit.png" alt="IIT Logo" class="team-logo" style=" max-height: 45px;" />
            </a>
          </v-col>
          <v-col cols="4" class="text-center mb-2">
            <a href="https://www.nexqt.com/" target="_blank" class="logo-link">
              <img src="@/assets/logo/nexqt.png" alt="NexQT Logo" class="team-logo" style=" max-height: 45px;" />
            </a>
          </v-col>
          <v-col cols="4" class="text-center mb-2">
            <a href="https://www.uni-muenster.de/en/" target="_blank" class="logo-link">
              <img src="@/assets/logo/Munster.png" alt="Munster Logo" class="team-logo" style=" max-height: 45px;" />
            </a>
          </v-col>
          <v-col cols="4" class="text-center mb-2">
            <a href="https://www.tsinghua.edu.cn/en/" target="_blank" class="logo-link">
              <img src="@/assets/logo/th.png" alt="Tsinghua University Logo" class="team-logo"
                style=" max-height: 45px;" />
            </a>
          </v-col>
          <v-col cols="" class="text-center mb-2">
            <a href="https://www.worldbank.org/en/home" target="_blank" class="logo-link">
              <img src="@/assets/logo/worldbank.png" alt="World Bank Logo" class="team-logo"
                style=" max-height: 35px;" />
            </a>
          </v-col>
          <v-col cols="12" class="text-center mb-2">
            <a href="https://www.granthamfoundation.org/" target="_blank" class="logo-link">
              <img src="@/assets/logo/grantham-foundation-h-ko.png" alt="Grantham Foundation Logo" class="team-logo"
                style="max-height: 45px;" />
            </a>
          </v-col>
        </v-row>
      </div>



      <!-- Designer Credit -->
      <div class="mt-auto text-center designer-section">
        <v-divider class="mx-auto mb-4" style="max-width: 700px; background-color: rgba(255,255,255,0.5);"></v-divider>
        <div class="d-flex align-center justify-center">
          <span class="text-body-2 mr-2">DESIGNED BY</span>
          <a href="https://defve1988.github.io/" target="_blank"
            class="text-body-2 font-weight-light text-decoration-none designer-link">
            DEFVE@LSCE
          </a>
          <v-icon color="white" class="ml-1 jellyfish-icon">mdi-jellyfish</v-icon>
        </div>
      </div>
    </div>
  </v-col>
</template>

<script setup>
/**
 * FooterColumn3 component - Project info, team logos, and designer credit
 */
</script>

<style scoped>
.team-logo {
  filter: brightness(0) invert(1);
  /* Convert logos to white */
  transition: all 0.3s ease;
  opacity: 1;
  background-color: transparent;
  object-fit: contain;
}

.logo-link:hover .team-logo {
  opacity: 0.75;
  transform: scale(1.05);
}

.logo-link {
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  padding: 4px;
}

.logo-link:hover {
  transform: translateY(-2px);
}

/* Designer section hover effects */
.designer-section {
  transition: all 0.3s ease;
}

.designer-link {
  color: #b7b6b6 !important;
  transition: all 0.3s ease;
}

.designer-link:visited {
  color: #b7b6b6 !important;
}

.designer-link:hover {
  color: #299367 !important;
}

.designer-section:hover .designer-link {
  color: #299367 !important;
}

.designer-section:hover .jellyfish-icon {
  color: #299367 !important;
  transform: scaleX(-1);
  transition: all 0.3s ease;
}


/* Responsive adjustments */
@media (max-width: 768px) {
  .team-logo {
    max-width: 60px !important;
    max-height: 30px !important;
  }
}
</style>