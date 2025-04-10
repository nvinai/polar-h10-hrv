<script>
  // Import Chart.js and its registerables
  // Chart.js modularizes its components, so we need to explicitly register the ones we want to use
  // See: https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
  import { Chart, registerables } from "chart.js";
  import { HEART_RATE_ZONES, CHART_TEXTS } from '../constants/heartRateZones';
  import { mockHeartRateData, mockTimeData } from '../mocks/heartRateData';
  import { CHART_CONFIG, getChartData, getChartAnnotations } from '../config/chart.config';
  import './Variability.scss';
  
  Chart.register(...registerables);

  export let hearRateBeat;
  export let heartRate;

  let ctx;
  let heartRateData = [];
  let timeData = [];
  let startTime;
  let heartRateVariability;
  let canvas;

  /*
   * Heart Rate Zone Calculations
   * References:
   * 1. Fox, S. M., Naughton, J. P., & Haskell, W. L. (1971). Physical activity and the prevention of coronary heart disease. 
   *    Annals of Clinical Research, 3(6), 404-432. (Original 220-age formula)
   * 2. American College of Sports Medicine. (2018). ACSM's Guidelines for Exercise Testing and Prescription (10th ed.).
   *    Wolters Kluwer. (Zone percentages and intensity classifications)
   * 3. American Heart Association. (2021). Target Heart Rates Chart.
   *    https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates
   */
  const age = 32;
  const maxHR = 220 - age; // 188 (Fox et al., 1971)
  const zones = {
    zone1: { min: 0, max: 0.6 * maxHR, ...HEART_RATE_ZONES.zone1 },
    zone2: { min: 0.6 * maxHR, max: 0.7 * maxHR, ...HEART_RATE_ZONES.zone2 },
    zone3: { min: 0.7 * maxHR, max: 0.8 * maxHR, ...HEART_RATE_ZONES.zone3 },
    zone4: { min: 0.8 * maxHR, max: 0.9 * maxHR, ...HEART_RATE_ZONES.zone4 },
    zone5: { min: 0.9 * maxHR, max: maxHR, ...HEART_RATE_ZONES.zone5 }
  };

  function getZoneColor(heartRate) {
    if (heartRate >= zones.zone5.min) return zones.zone5.borderColor;
    if (heartRate >= zones.zone4.min) return zones.zone4.borderColor;
    if (heartRate >= zones.zone3.min) return zones.zone3.borderColor;
    if (heartRate >= zones.zone2.min) return zones.zone2.borderColor;
    return zones.zone1.borderColor;
  }

  function updateHeartRateChart() {
    if (!startTime) startTime = Date.now();
    const timeElapsed = (Date.now() - startTime) / 1000;
    timeData.push(timeElapsed);
    heartRateData.push(heartRate);

    if (!heartRateVariability && canvas) {
      ctx = canvas.getContext("2d");
      
      const chartData = getChartData(timeData, heartRateData, mockTimeData, mockHeartRateData, zones);
      chartData.datasets[0].label = CHART_TEXTS.heartRateLabel;
      chartData.datasets[0].borderColor = heartRateData.map(hr => getZoneColor(hr));
      chartData.datasets[0].backgroundColor = heartRateData.map(hr => {
        if (hr >= zones.zone5.min) return zones.zone5.color;
        if (hr >= zones.zone4.min) return zones.zone4.color;
        if (hr >= zones.zone3.min) return zones.zone3.color;
        if (hr >= zones.zone2.min) return zones.zone2.color;
        return zones.zone1.color;
      });

      const chartOptions = {
        ...CHART_CONFIG.options,
        plugins: {
          ...CHART_CONFIG.options.plugins,
          annotation: getChartAnnotations(zones)
        }
      };

      heartRateVariability = new Chart(ctx, {
        ...CHART_CONFIG,
        data: chartData,
        options: chartOptions
      });
    } else if (heartRateVariability) {
      heartRateVariability.data.labels = timeData;
      heartRateVariability.data.datasets[0].data = heartRateData;
      heartRateVariability.data.datasets[0].borderColor = heartRateData.map(hr => getZoneColor(hr));
      heartRateVariability.data.datasets[0].backgroundColor = heartRateData.map(hr => {
        if (hr >= zones.zone5.min) return zones.zone5.color;
        if (hr >= zones.zone4.min) return zones.zone4.color;
        if (hr >= zones.zone3.min) return zones.zone3.color;
        if (hr >= zones.zone2.min) return zones.zone2.color;
        return zones.zone1.color;
      });
      heartRateVariability.update();
    }
  }

  $: if (hearRateBeat) {
    updateHeartRateChart();
  }
</script>

<div class="content">
  <div class="header">
    <h1>{CHART_TEXTS.title}</h1>
    <div class="zone-legend">
      {#each Object.values(HEART_RATE_ZONES) as zone}
        <div class="zone-item">
          <span class="zone-color" style="background-color: {zone.color}; border-color: {zone.borderColor};"></span>
          <span>Zone {Object.keys(HEART_RATE_ZONES).indexOf(zone.name.toLowerCase().replace(' ', '')) + 1}: {zone.name} ({zone.range})</span>
        </div>
      {/each}
    </div>
    <canvas bind:this={canvas} id="heartRateVariability"></canvas>
  </div>
</div>

<style>
  .zone-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px 0;
  }
  .zone-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .zone-color {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid;
    border-radius: 4px;
  }
</style>
