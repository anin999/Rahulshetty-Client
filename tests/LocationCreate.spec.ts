import { test, expect } from '@playwright/test';
import { LocationCreatePage } from '../pages/LocationCreatePage';

test.setTimeout(300_000);

test('Create new location with person & contact information', async ({ page }) => {
  const locationPage = new LocationCreatePage(page);

  // Login
  await locationPage.login('anin.fletcher@xminds.com', 'Xminds@123');

  // Create location
  await locationPage.openNewLocationForm();
  await locationPage.fillLocationInfo('Location 901', 'Clarkson', 'Description 002');
  await locationPage.fillAddress(
    '123 MG Road',
    '456 Chakka Main road',
    'Kerala',
    'Thiruvananthapuram',
    '789789789'
  );
  // ---------------- Fill Contact Information ----------------
  await locationPage.fillContactInformation(
    'Clarkson',
    'clarkson@gmail.com',
    '6557677909',
    '8564534456'
  );
// ---------------- Fill Status ----------------
  await locationPage.fillStatus('Active');

  // ✅ Verification (optional)
  // await expect(page.getByText('Location created successfully')).toBeVisible();
});