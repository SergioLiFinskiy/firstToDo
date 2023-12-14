const firstCanvas = document.querySelector("#firstCanvas");
const secondCanvas = document.querySelector("#secondCanvas");

const myChart1 = new Chart(firstCanvas, {
  type: "line",
  data: {
    labels: [
      "30.10-05.11",
      "06.11-12.11",
      "13.11-19.11",
      "20.11-26.11",
      "27.11-03.12",
      "04.12-10.12",
    ],
    datasets: [
      {
        label: "Баженовская НБ",
        data: [0.7, 0.8, 0.85, 0.63, 0.9, 0.95],
        borderWidth: 3,
      },
      {
        label: "Порог КТГ",
        data: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
        borderWidth: 2,
      },
      {
        label: "Цель КТГ",
        data: [0.85, 0.85, 0.85, 0.85, 0.85, 0.85],
        borderWidth: 2,
      },
      {
        label: "Амцель КТГ",
        data: [1, 1, 1, 1, 1, 1],
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Коэффициент технической готовности",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      subtitle: {
        display: true,
        text: [
          "- процент времени технически готового к эксплуатации оборудования в определенном периоде времени",
        ],
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "КТГ, %",
        },
      },
      x: {
        title: {
          display: true,
          text: "Период",
        },
      },
    },
  },
});

const myChart2 = new Chart(secondCanvas, {
  type: "doughnut",
  data: {
    labels: [
      "Материалы прочие",
      "Услуги по текущему ремонту",
      "ГСМ на собств. нужды",
      "Спец. разрешения",
    ],
    datasets: [
      {
        data: [10, 30, 25, 45],
      },
    ],
  },
});
