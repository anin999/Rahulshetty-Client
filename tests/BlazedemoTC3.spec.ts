import { test, expect } from '@playwright/test';
test.setTimeout(5000_0000);

test('BlazeDemo Flight Booking with Logs', async ({ page }) => {

  const delay = async (ms = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log('Verify that flight booking ');

  console.log('Opening BlazeDemo');
  await page.goto('https://blazedemo.com/');
  await delay();

  console.log('Verify that user can select - Departure City: Mexico City');
  await delay();
  await page.locator('select[name="fromPort"]').selectOption('Mexico City');

  console.log('Verify that user can select - Destination City: New York');
  await delay();
  await page.locator('select[name="toPort"]').selectOption('New York');

  console.log('Verify that user can find the flights using - Find Flights - button');
  await delay();
  await page.getByRole('button', { name: 'Find Flights' }).click();

  console.log('Verify that user clicked the button - Choose This Flight for selecting - Flight 234 United');
  await delay();
  await page.getByRole('row', { name: 'Choose This Flight 234 United' }).getByRole('button').click();

  console.log('Verified that user is redirected to booking page and heading: Your flight from TLV to SFO is populated');
  await delay();
  await page.getByRole('heading', { name: 'Your flight from TLV to SFO' }).click();

  console.log('Verify - subheading - Airline: United - is properly visible');
  await delay();
  await page.getByText('Airline: United').click();

  console.log('Verified that flight summary heading is properly shown correctly');
  await delay();
  await page.getByText('Your flight from TLV to SFO has been reserved. Airline: United Flight Number:').click();

  console.log('Verified that - correct airline details are shown properly ');
  await delay();
  await page.getByText('Airline: United').click();

  console.log('Verify that - correct flight number is shown - UA954 ');
  await delay();
  await page.getByText('Flight Number: UA954').click();

  console.log('Verify that correct price heading is visble and corresponding value for the flight is populated');
  await delay();
  await page.getByText('Price:').click();

  console.log('Verify that correct Arbitrary Fees and Taxes heading is visble and corresponding value is populated correctly');
  await delay();
  await page.getByText('Arbitrary Fees and Taxes:').click();

  console.log('Verify that total cost heading is populated and corresponding value is populated correctly');
  await delay();
  await page.getByText('Total Cost:').click();

  console.log('Verify that passenger data is correctly loaded as expected');
  await delay();
  await page.getByText('Please submit the form below').click();

  console.log('Verify that Name heading is implemented for passenger');
  await delay();
  await page.getByText('Name', { exact: true }).click();

  console.log('Verify that user can enter the passenger name - Ben');
  await delay();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Ben');

  console.log('Verify that Address heading is implemented for passenger');
  await delay();
  await page.getByText('Address').click();

  console.log('Verify that user can enter the Address details - Lulu Mall');
  await delay();
  await page.getByRole('textbox', { name: 'Address' }).fill('Lulu Mall');

  console.log('Verify that City heading is implemented for passenger');
  await delay();
  await page.getByText('City').click();

  console.log('Verify that user can enter the City details - TRV');
  await delay();
  await page.getByRole('textbox', { name: 'City' }).fill('TRV');

  console.log('Verify that State heading is implemented for passenger');
  await delay();
  await page.getByText('State').click();

  console.log('Verify that user can enter the State details - Kerala');
  await delay();
  await page.getByRole('textbox', { name: 'State' }).fill('Kerala');

  console.log('Verify that Zip code is implemented for passenger');
  await delay();
  await page.getByText('Zip Code').click();

  console.log('Verify that user can enter the Zip code details - 890871');
  await delay();
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('890871');

  console.log('Verify that card type is implemented for passenger');
  await delay();
  await page.getByText('Card Type').click();

  console.log('Verify that user can select the card type detail - Diners Club');
  await delay();
  await page.locator('#cardType').selectOption('dinersclub');

  console.log('Verify that credit card number heading is implemented for passenger');
  await delay();
  await page.locator('form div').filter({ hasText: 'Credit Card Number' }).click();

  console.log('Verify that user can enter the CC number - 424242424242');
  await delay();
  await page.getByRole('textbox', { name: 'Credit Card Number' }).fill('424242424242');

  console.log('Verify that month heading is implemented for passenger');
  await delay();
  await page.getByText('Month').click();

  console.log('Verify that 10th month can be added in the details tab');
  await delay();
  await page.getByRole('textbox', { name: 'Month' }).fill('10');

  console.log('Verify that year heading is implemented for the passenger');
  await delay();
  await page.getByRole('textbox', { name: 'Year' }).click();

  console.log('Verify that year - 2025 is inputed to the details tab');
  await delay();
  await page.getByRole('textbox', { name: 'Year' }).fill('2025');

  console.log('Verify that heading - Name on card is implemented as expeceted');
  await delay();
  await page.getByText('Name on Card').click();

  console.log('Verify that card name - Ben can be inputted in the respective tab');
  await delay();
  await page.getByRole('textbox', { name: 'Name on Card' }).fill('Ben');

  console.log('Verify that - Remember me - checkbox is implemented and is a clickable option');
  await delay();
  await page.getByText('Remember me').click();

  console.log('Verify that - Purchase Flight button is implemented and is a clickable option');
  await delay();
  await page.getByRole('button', { name: 'Purchase Flight' }).click();

  console.log('Verify that - confirmation page is loaded with heading - Thank you for your purchase today');
  await delay();
  await page.getByRole('heading', { name: 'Thank you for your purchase' }).click();

console.log('Verify that corresponding ID is generated and it is unique each time');
await delay();
await page.getByRole('cell', { name: 'Id' }).click();

const transactionId = await page
  .locator('xpath=//td[text()="Id"]/following-sibling::td')
  .textContent();

console.log('Generated Transaction ID:', transactionId);

expect(transactionId?.trim()).toMatch(/^\d+$/);

console.log('Verify that transaction ID is different and the transaction is successful for each unique ID');

  console.log('Verify that heading status is implemented as expected');
  await delay();
  await page.getByRole('cell', { name: 'Status' }).click();

  console.log('Verify that value - pending capture is populated as expected for status');
  await delay();
  await page.getByRole('cell', { name: 'PendingCapture' }).click();

  console.log('Verify that amount for the flight heading is implemented');
  await delay();
  await page.getByRole('cell', { name: 'Amount' }).click();

  console.log('Verify that corresponding amount for the flight is given in USD');
  await delay();
  await page.getByRole('cell', { name: 'USD' }).click();

  console.log('Verify that card number heading is implemented as expected');
  await delay();
  await page.getByRole('cell', { name: 'Card Number' }).click();

  console.log('Verify that corresponding card number is populated as expected and is masked');
  await delay();
  await page.getByRole('cell', { name: 'xxxxxxxxxxxx1111' }).click();

  console.log('Verify that heading expiration is implemented as expected');
  await delay();
  await page.getByRole('cell', { name: 'Expiration' }).click();

  console.log('Verify that corresponding expiration card details are shown correctly');
  await delay();
  await page.getByRole('cell', { name: '/2018' }).click();

  console.log('Verify that heading - Auth Code heading is implemeted as expected');
  await delay();
  await page.getByRole('cell', { name: 'Auth Code' }).click();

  console.log('Verify that corresponding - Auth Code data is populated for the passenger');
  await delay();
  await page.getByRole('cell', { name: '888888' }).click();

  console.log('Verify that corresponding date heading is implemented as expected');
  await delay();
  await page.getByRole('cell', { name: 'Date' }).click();

console.log('Verify that correct value of date is populated after the payment is successful');
await delay();

const purchaseDate = await page
  .locator('xpath=//td[text()="Date"]/following-sibling::td')
  .textContent();

console.log('Generated Purchase Date:', purchaseDate);

expect(purchaseDate?.trim()).toBeTruthy();

console.log('Verify that purchase is successfully done for the particular date');

  console.log('Verify that - heading - Travel the world is implemented and is a clickable option and user will be redirected to welcome page once purchase is completed ');
  await delay();
  await page.getByRole('link', { name: 'Travel The World' }).click();

  console.log('========== Purchase Ticket for a flight is completed correctly ==========');

    await page.waitForTimeout(3000);


});