export const CHART_CONFIG = {
  type: "line",
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  },
};

export const getChartData = (timeData, heartRateData, mockTimeData, mockHeartRateData, zones) => ({
  labels: timeData || mockTimeData,
  datasets: [
    {
      data: heartRateData || mockHeartRateData,
      fill: true,
      tension: 0.1,
    },
  ],
});

export const getChartAnnotations = (zones) => ({
  annotations: Object.entries(zones).reduce((acc, [key, zone]) => ({
    ...acc,
    [key]: {
      type: 'box',
      yMin: zone.min,
      yMax: zone.max,
      backgroundColor: zone.color,
      borderColor: zone.borderColor,
      borderWidth: 1,
    },
  }), {}),
}); 