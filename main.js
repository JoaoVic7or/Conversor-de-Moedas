const sel_from = document.getElementById('sel_from')
const sel_to = document.getElementById('sel_to')
const valor = document.getElementById('value')
const valor1 = document.querySelector('.valor1');
const valor2 = document.querySelector('.valor2');

//criar options nos selects
const currencies = [
    { value: 'BRL', label:'BRL'},
    { value: 'USD', label: 'USD'},
    { value: 'EUR', label: 'EUR'},
    { value: 'GBP', label: 'GBP'},
];
currencies.forEach((currency) =>{
    const optionsFrom = document.createElement('option')
    const optionsTo = document.createElement('option')

    optionsFrom.value = currency.value;
    optionsFrom.text = currency.label;
    optionsTo.value = currency.value;
    optionsTo.text = currency.label;

    sel_from.add(optionsFrom)
    sel_to.add(optionsTo)
    if (currency.value === 'USD') {
        optionsTo.selected = true; 
    }
})
//API
async function getCotacao() {
    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${sel_from.value}-${sel_to.value}`);
        const moedas = sel_from.value + sel_to.value;
        const data = await response.json();
        const result = Number(data[moedas].bid).toFixed(2) * valor1.value;
        valor2.value = result.toFixed(2);
    } catch (error) {
        console.log(error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    valor1.addEventListener("input", getCotacao);
    valor2.addEventListener("input", async () => {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${sel_to.value}-${sel_from.value}`);
        const moedas = sel_to.value + sel_from.value;
        const data = await response.json();
        const result = Number(data[moedas].bid).toFixed(2) * valor2.value;
        valor1.value = result.toFixed(2);
    });
    sel_from.addEventListener("change", getCotacao);
    sel_to.addEventListener("change", async () => {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${sel_to.value}-${sel_from.value}`);
        const moedas = sel_to.value + sel_from.value;
        const data = await response.json();
        const result = Number(data[moedas].bid).toFixed(2) * valor2.value;
        valor1.value = result.toFixed(2);
    });
});
//inverter moedas
const syncButton = document.querySelector('.icone');
syncButton.addEventListener('click', () => {
    invertCotacao();
});
function invertCotacao() {
    const temp = sel_from.value;
    sel_from.value = sel_to.value;
    sel_to.value = temp;
    getCotacao()
}