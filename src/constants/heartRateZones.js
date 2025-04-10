export const HEART_RATE_ZONES = {
  zone1: {
    name: 'Very Light',
    range: '0-113 BPM',
    description: 'Recovery zone, very light activity',
    color: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgb(75, 192, 192)'
  },
  zone2: {
    name: 'Light',
    range: '113-132 BPM',
    description: 'Light activity, warm-up/cool-down',
    color: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)'
  },
  zone3: {
    name: 'Moderate',
    range: '132-150 BPM',
    description: 'Moderate activity, aerobic training',
    color: 'rgba(255, 206, 86, 0.2)',
    borderColor: 'rgb(255, 206, 86)'
  },
  zone4: {
    name: 'Hard',
    range: '150-169 BPM',
    description: 'Hard activity, anaerobic threshold',
    color: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)'
  },
  zone5: {
    name: 'Maximum',
    range: '169-188 BPM',
    description: 'Maximum effort, sprint training',
    color: 'rgba(153, 102, 255, 0.2)',
    borderColor: 'rgb(153, 102, 255)'
  }
};

export const CHART_TEXTS = {
  title: 'Heart Rate Variability',
  heartRateLabel: 'Heart Rate'
}; 