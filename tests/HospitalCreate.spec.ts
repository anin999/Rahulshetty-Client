import { test, expect } from '@playwright/test';
import { HospitalCreatePage } from '../pages/HospitalCreatePage';

test.setTimeout(300_000);

test('Create hospital with certifications', async ({ page }) => {
  const hospitalPage = new HospitalCreatePage(page);

  // ------------------- Login -------------------
  await hospitalPage.login('anin.fletcher@xminds.com', 'Xminds@123');

  // ------------------- Navigate to Hospitals -------------------
  await hospitalPage.goToHospitals();
  await hospitalPage.clickNewHospital();

  // ------------------- Define hospital name -------------------
  const hospitalName = 'Medical College';

  // ------------------- Fill Hospital Info -------------------
  await hospitalPage.fillHospitalInfo(hospitalName, 'Level 1', '1', '29');
  await hospitalPage.addHospital();

  // ------------------- Fill License Info -------------------
  await hospitalPage.fillLicense('Type Name 1', '1234567', 'ABC Ltd Corp', '1', '29');

  // ------------------- Fill Certifications Info -------------------
  await hospitalPage.fillCertifications('Certificate 1', '29');

  // ------------------- Fill Contact Person -------------------
  await hospitalPage.fillContactPerson(
    'mohan',
    'Designation 1001',
    'Department 100',
    '786676678678768',
    'mohan@gmail.com',
    'test 1234567'
  );

  // ------------------- Fill Primary Address -------------------
  await hospitalPage.fillPrimaryAddress(
    '1234 East Fort',
    '4567 Lulu Mall',
    'Kerala',
    'Thiruvananthapuram',
    '695033',
    'lukas@gmail.com',
    '89098877756'
  );

  // ------------------- Fill Delivery & Billing Address -------------------
  await hospitalPage.fillDeliveryAndBillingAddress();

  // ------------------- Submit -------------------
  await hospitalPage.submit();

  // ------------------- Verify Hospital Created -------------------
  await hospitalPage.verifyHospitalCreated(hospitalName);
});
