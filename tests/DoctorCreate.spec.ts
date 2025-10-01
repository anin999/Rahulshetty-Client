import { test, expect } from '@playwright/test';
import { DoctorCreatePage } from '../pages/DoctorCreatePage';

test.setTimeout(300_000);

test('Create new doctor and fill contact information', async ({ page }) => {
  const doctorPage = new DoctorCreatePage(page);

  // ------------------- Login -------------------
  await doctorPage.login('anin.fletcher@xminds.com', 'Xminds@123');

  // ------------------- Create Doctor -------------------
  await doctorPage.createDoctor(
    'Adam',         // First Name
    'Kerr',     // Last Name
    'Spec 123',      // Specialization
    '10',            // Years of Experience
    'LIN100',        // License Number
    '2025-12-30',    // License Expiry
    'MBBS',          // Degree
    'KIMS',          // Institution
    '2020'           // Institution Year
  );

  // ------------------- Fill Contact Information -------------------
  await doctorPage.fillContactInformation(
    'Palayam main road',       // Address Line 1
    'Lulu mall shop 3',        // Address Line 2
    'Kerala',                  // State
    'Thiruvananthapuram',      // City
    '4564564564',              // Zip
    'adam@gmail.com',           // Email
    '34563456456456',          // Phone
    '+'                        // Country Code
  );

  await doctorPage.fillHospitalAssociations(
    'Hospital 1',  // Hospital Name
    '8',           // Start Date (day of month)
    '22'           // End Date (day of month)
  );

  // ------------------- Optional Verification -------------------
  // await expect(page.getByText('Doctor created successfully')).toBeVisible();
});
