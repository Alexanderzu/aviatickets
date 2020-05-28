import "../css/style.css";
import "./plugins/index";
import location from "./store/location";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/ticket"

document.addEventListener("DOMContentLoaded", () => {
    initApp();

    const form = formUI.form;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    async function initApp() {
        await location.init();
        formUI.setAutocompleteData(location.ShortCityesList);
    }

    async function onFormSubmit() {
        const origin = location.getCitiesByCodeKey(formUI.originValue);
        const destination = location.getCitiesByCodeKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;

        const currency = currencyUI.currencyValue;

        console.log(origin, destination, depart_date, return_date)

        await location.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });
        ticketsUI.renderTickets(location.lastSearch)
    }
})