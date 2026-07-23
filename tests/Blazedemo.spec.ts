import { test } from '@playwright/test';
import { FlightBookingPage } from '../pages/Blazedemo';
test.setTimeout(3000_0000);

test('Book Flight Successfully', async ({ page }) => {

    const flight = new FlightBookingPage(page);

    await flight.navigate();

    await flight.selectCities(
    //'Philadelphia', // Active

    // 'Paris',
    // 'Boston',
    // 'Portland',
     'San Diego',
   //  'Mexico City',
    // 'São Paolo',

  //  'Rome' // Active
  //   'Buenos Aires'
    // 'London'
   //  'Berlin'
     'New York'
    // 'Dublin'
    // 'Cairo'
);

await flight.chooseFlight(
    'Choose This Flight 43 Virgin'
    //'Choose This Flight 234 United'
    //'Choose This Flight 9696 Aer'
    //'Choose This Flight 12 Virgin'
   // 'Choose This Flight 4346'
);
    await flight.fillPassengerDetails({
        name: 'Anin',
        address: 'MG Road',
        city: 'Trivandrum',
        state: 'Kerala',
        zipCode: '695035',
        cardType: 'amex',
        cardNumber: '424242424242',
        month: '10',
        year: '2026',
        nameOnCard: 'Anin Fletcher'
    });

    await flight.purchaseFlight();

    await flight.verifyPurchase();

    await flight.backToHome();
});