const form = document.querySelector("#homepage-form");

const modalidade = form.querySelector('select[name="modalidade"]');
const area = form.querySelector('select[name="area"]');

modalidade.addEventListener("change", function () {
  location.href = `?modalidade=${this.value}&area=${area.value}`;
});

area.addEventListener("change", function () {
  location.search = `area=${this.value}&modalidade=${modalidade.value}`;
});
