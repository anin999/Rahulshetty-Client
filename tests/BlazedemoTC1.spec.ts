import { test, expect } from '@playwright/test';
test.setTimeout(5000_0000);

test('Verify Home Page Elements', async ({ page }) => {

  // Human delay function
  const delay = async () => {
    await page.waitForTimeout(3000);
  };

  console.log('Launching BlazeDemo website...');
  await page.goto('https://blazedemo.com/index.php');
  await delay();

  // Verify website loaded
  await expect(page).toHaveURL('https://blazedemo.com/index.php');
  console.log('Website URL loaded correctly.');
  await delay();

  await expect(page).toHaveTitle(/BlazeDemo/i);
  console.log('Page URL - Blazedemo is correctly loaded');
  await delay();

  // Verify Navigation Bar
  await expect(page.getByRole('link', { name: 'Travel The World' })).toBeVisible();
  console.log('"Travel The World" link is visible and is clickable.');
  await delay();

  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  console.log('"Home" link is visible and is clickable.');
  await delay();

  // Verify Main Heading
  await expect(
    page.getByRole('heading', { name: 'Welcome to the Simple Travel Agency!' })
  ).toBeVisible();
  console.log('Main heading is visible - Welcome to the Simple Travel Agency!.');
  await delay();

  // Verify Description
  await expect(
    page.getByText('The is a sample site you can test with BlazeMeter!')
  ).toBeVisible();
  console.log('Sub text is visible - The is a sample site you can test with BlazeMeter!.');
  await delay();

  // Verify Destination of the Week Link
  await expect(
    page.getByRole('link', { name: 'destination of the week! The Beach!' })
  ).toBeVisible();
  console.log('Title - Destination of the Week link is visible.');
  await delay();

  // Verify Departure City Heading
  await expect(
    page.getByRole('heading', { name: 'Choose your departure city:' })
  ).toBeVisible();
  console.log('Verify that - Departure Heading - Choose your departure city is visible');
  await delay();

  // Verify Departure Dropdown
  const departure = page.locator('select[name="fromPort"]');
  await expect(departure).toBeVisible();
  console.log('Departure city dropdown is visible and is clickable.');
  await delay();

  // Verify Destination City Heading
  await expect(
    page.getByRole('heading', { name: 'Choose your destination city:' })
  ).toBeVisible();
  console.log('Verify that - Destination Heading - Choose your destination city is visible');
  await delay();

  // Verify Destination Dropdown
  const destination = page.locator('select[name="toPort"]');
  await expect(destination).toBeVisible();
  console.log('Destination city dropdown is visible and is visible');
  await delay();

  // Verify Find Flights Button
  await expect(
    page.getByRole('button', { name: 'Find Flights' })
  ).toBeVisible();
  console.log('Verify that - Find Flights button is visible and is clickable');
  await delay();

  console.log('All home page elements are verified ');
});