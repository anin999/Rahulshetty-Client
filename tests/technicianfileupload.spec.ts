import { test, expect } from '@playwright/test';
import { TechnicianCreatePage } from '../pages/TechnicianCreatePage';

test.setTimeout(300_000);

test('Create a new technician with all details', async ({ page }) => {
  const technicianPage = new TechnicianCreatePage(page);

  // -------------------- Login --------------------
  await technicianPage.login('anin.fletcher@xminds.com', 'Xminds@123');

  // -------------------- Navigate to Technicians --------------------
  await technicianPage.goToTechnicians();
  await technicianPage.clickNewTechnician();

  // -------------------- Personal Info --------------------
  await technicianPage.fillPersonalInfo(
  'Alfin',             // First Name
  'Joji',             // Last Name
  '01/10/2025',         // Birth date
  'Male',               // Gender
  'Thiruvananthapuram', // City
  'Kerala',             // State
  'India',              // Country
  '123 MG Road',        // Address Line 1
  '456 East Fort',      // Address Line 2
  '695033',             // Zip
  'alfin@xminds.com',  // Email
  '33453453333',         // Mobile
  '01/10/2025'          // Hire Date (DD/MM/YYYY)
);


  // -------------------- Education --------------------
  await technicianPage.fillEducation(
    'B.Tech',             // Title
    'Mohandas',           // Institution
    '2023'                // Year
  );

  // -------------------- Skills --------------------
await technicianPage.fillSkills(
  'Skill 5',
  '2025',
  './files/ai-wallpapers-14132_upscaled.jpg'
);

  // -------------------- Manager & Department --------------------
  await technicianPage.fillManagerDepartment(
    'Archana ram',      // Manager
    'Department 001',   // Department
    'Location 001',     // Location
    'Active',           // Employment status
    'Available'         // Availability
  );

  // -------------------- Submit Form --------------------
  await technicianPage.submit();

  // -------------------- Verification --------------------
  await expect(page).toHaveURL(/.*technicians/);

});
