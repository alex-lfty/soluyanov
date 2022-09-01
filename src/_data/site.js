module.exports = {
  baseUrl: "https://soluyanov2022.ru",
  title: "Глеб Солуянов",
  description:
    "Кандидат в муниципальные депутаты Москвы по району Измайлово Глеб Солуянов",
  styles: ["fonts", "mvp", "main"],
  programSlides: [1, 2, 3, 4, 5, 6],
  social: {
    telegram: "https://t.me/soluyanovgleb",
    vk: ""
  },
  fundrise: {
    target: {
      value: 70000,
      toString() {
        return this.value;
      },
      valueOf() {
        return this.value;
      },
    },
    current: {
      value: 25549,
      toString() {
        return this.value;
      },
      valueOf() {
        return this.value;
      },
    },
  },
};
