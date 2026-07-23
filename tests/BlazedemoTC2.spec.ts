import { test } from '@playwright/test';
test.setTimeout(3000_0000);

test('BlazeDemo Flight Search with Logs', async ({ page }) => {

  const delay = async (ms = 3000) => {
    await page.waitForTimeout(ms);
  };

  console.log('Test Case Execution');

  console.log('Verify that - website URL is correctly loaded');
  await page.goto('https://blazedemo.com/');
  await delay();

  console.log('Verify - Heading: Choose your departure city is clicked');
  await delay();
  await page.getByRole('heading', { name: 'Choose your departure city:' }).click();

  console.log('Verify particular departure location is selected and is clickable: Portland');
  await delay();
  await page.locator('select[name="fromPort"]').selectOption('Portland');

  console.log('Verify - Heading: Choose your destination city is clicked');
  await delay();
  await page.getByRole('heading', { name: 'Choose your destination city:' }).click();

  console.log('Verify particular departure location is selected and is clickable: Berlin');
  await delay();
  await page.locator('select[name="toPort"]').selectOption('Berlin');

  console.log('Verified that - Find Flights Button is visible and is clicked');
  await delay();
  await page.getByRole('button', { name: 'Find Flights' }).click();

  console.log('Verified that - corresponding heading is populated correctly - Flights from Portland to Berlin');
  await delay();
  await page.getByRole('heading', { name: 'Flights from Portland to' }).click();

  console.log('Verified Heading "Choose" is implemented');
  await delay();
  await page.getByRole('cell', { name: 'Choose', exact: true }).click();

  console.log('Verified Heading "Flight No" is implemented');
  await delay();
  await page.getByRole('cell', { name: 'Flight #' }).click();

  console.log('Verified Heading "Airline" is implemented');
  await delay();
  await page.getByRole('cell', { name: 'Airline', exact: true }).click();

  console.log('Verifeied that - Heading - Departs: Portland is implemented');
  await delay();
  await page.getByRole('cell', { name: 'Departs: Portland' }).click();

  console.log('Verified that - Heading - Arrives: Berlin is implemeted');
  await delay();
  await page.getByRole('cell', { name: 'Arrives: Berlin' }).click();

  console.log('Verified that heading - Price is implemented');
  await delay();
  await page.getByRole('cell', { name: 'Price' }).click();

  console.log('Verified that corresponding flight no. is clicked properly');
  await delay();
  await page.getByRole('cell', { name: '43', exact: true }).click();

  console.log('Verified that corresponding - Airline: Virgin America is clickable');
  await delay();
  await page.getByRole('cell', { name: 'Virgin America' }).first().click();

  console.log('Verified that corresponding departure time is shown correctly - Time: 1:43 AM');
  await delay();
  await page.getByRole('cell', { name: '1:43 AM' }).click();

  console.log('Verified that corresponding arrival time is shown correctly - Time: 9:45 PM');
  await delay();
  await page.getByRole('cell', { name: '9:45 PM' }).click();

  console.log('Verified that corresponding price is shown correctly - Price: $472.56');
  await delay();
  await page.getByRole('cell', { name: '$472.56' }).click();

  console.log('Verified that clickable button - Choose This Flight - is implemented properly');
  await delay();
  await page
    .getByRole('row', { name: 'Choose This Flight 43 Virgin' })
    .getByRole('button')
    .click();

  console.log('== Verified that flight selection is completed without any error ==');
});