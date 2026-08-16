import { test, expect } from '@playwright/test';

test.setTimeout(500000);

test('iFrame Example - Practice Page', async ({ page }) => {

  // 3-second human delay
  const humanDelay = async () => {
    await page.waitForTimeout(3000);
  };

  // Click helper with logging
  const clickAndLog = async (locator: any, name: string) => {
    await humanDelay();
    console.log(`Clicking: ${name}`);
    await locator.click();
    console.log(`Clicked: ${name}`);
  };

  console.log('Test Started');

  // --------------------------------------------------
  // Open Practice Page
  // --------------------------------------------------

  await humanDelay();

  console.log(
    'Verify that - Opening Practice Page - https://rahulshettyacademy.com/AutomationPractice/'
    
  );

await page.goto(
  'https://rahulshettyacademy.com/AutomationPractice/',
  {
    waitUntil: 'domcontentloaded',
    timeout: 120000,
  }
);
  console.log('Verify that - Practice Page loaded successfully');

  // --------------------------------------------------
  // Practice Page Heading
  // --------------------------------------------------

  const practicePageHeading = page.getByRole('heading', {
    name: 'Practice Page'
  });

  await expect(practicePageHeading).toBeVisible();

  console.log('Verify that - Practice Page heading is visible');



  await humanDelay();

  console.log('Verify that - Scrolling down to iFrame Example is started');

  const iframe = page.locator('iframe[name="iframe-name"]');

  await iframe.scrollIntoViewIfNeeded();

  console.log('Verify that - iFrame Example is now visible');

  await expect(iframe).toBeVisible();


  const frame = page
    .locator('iframe[name="iframe-name"]')
    .contentFrame();


  const coursesLink = frame.getByRole('link', {
    name: 'Courses',
    exact: true
  });

  await expect(coursesLink).toBeVisible();

  console.log('Verify that - Courses link is visible');

  await clickAndLog(
    coursesLink,
    'Courses'
  );

  // --------------------------------------------------
  // Click More
  // --------------------------------------------------

  const moreButton = frame.getByRole('button', {
    name: 'More'
  });

  await expect(moreButton).toBeVisible();

  console.log('Verify that - More button is visible');

  await clickAndLog(
    moreButton,
    'More'
  );



  const lifetimeAccess = frame.getByRole('link', {
    name: 'Lifetime Access'
  });

  await expect(lifetimeAccess).toBeVisible();

  console.log('Verify that - Lifetime Access is visible');

  await clickAndLog(
    lifetimeAccess,
    'Lifetime Access'
  );


  const coursesLinkAgain = frame.getByRole('link', {
    name: 'Courses',
    exact: true
  });

  await expect(coursesLinkAgain).toBeVisible();

  console.log('Verify that - Courses link is visible again');

  await clickAndLog(
    coursesLinkAgain,
    'Courses again'
  );


  const mentorshipLink = frame
    .getByRole('navigation')
    .getByRole('link', {
      name: 'Mentorship'
    });

  await expect(mentorshipLink).toBeVisible();

  console.log('Verify that - Mentorship link is visible');

  await clickAndLog(
    mentorshipLink,
    'Mentorship'
  );



  console.log('iFrame Test Completed Successfully');

  await page.waitForTimeout(5000);
});