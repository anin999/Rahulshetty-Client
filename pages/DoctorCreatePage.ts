import { Page } from '@playwright/test';

export class DoctorCreatePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ------------------- Human Delay Helper -------------------
  private async humanDelay(min = 200, max = 600) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    await this.page.waitForTimeout(ms);
  }
  // ------------------- Helper: Click Next Safely -------------------
  private async clickNext() {
    const nextButton = this.page.getByRole('button', { name: 'Next' });
    await nextButton.scrollIntoViewIfNeeded();
    await nextButton.waitFor({ state: 'visible' });
    await this.humanDelay(300, 500);
    await nextButton.click({ force: true });
    await this.humanDelay(500, 800);
  }

  // ------------------- Login -------------------
  async login(email: string, password: string) {
    await this.page.goto('https://zencurahms-stag-fe.xminds.com/');

    // Email
    await this.page.getByRole('textbox', { name: 'Enter your email' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await this.humanDelay();

    // Password
    await this.page.getByRole('textbox', { name: 'Enter password' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter password' }).fill(password);
    await this.humanDelay();

    // Sign in
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.humanDelay(1000, 1500); // extra delay for login
  }

   async createDoctor(
    firstName: string,
    lastName: string,
    specialization: string,
    experience: string,
    licenseNumber: string,
    licenseExpiry: string, // format: 'YYYY-MM-DD'
    degree: string,
    institution: string,
    institutionYear: string // format: 'YYYY'
  ) {
    // Navigate to Doctor form
    await this.page.getByRole('button', { name: 'Master' }).click();
    await this.humanDelay();
    await this.page.getByRole('link', { name: 'Doctor' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.humanDelay();

    // ---------------- Basic Information ----------------
    await this.page.getByRole('heading', { name: 'Basic Information' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter first name' }).fill(firstName);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter last name' }).fill(lastName);
    await this.humanDelay();

    // ---------------- Professional Details ----------------
    await this.page.getByRole('heading', { name: 'Professional Details' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter specialization' }).fill(specialization);
    await this.humanDelay();

    await this.page.evaluate(() => window.scrollBy(0, 200));
    await this.humanDelay(300, 500);


    await this.page.getByRole('textbox', { name: 'Enter years of experience' }).fill(experience);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter license number' }).fill(licenseNumber);
    await this.humanDelay();

    // License Expiry
    await this.page.getByRole('textbox', { name: 'Select date' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Choose date' }).first().click();
    await this.humanDelay();
    const [year, month, day] = licenseExpiry.split('-');
    await this.page.getByRole('gridcell', { name: day }).click();
    await this.humanDelay();

const degreeLabel = this.page.locator('label').filter({ hasText: 'Degree' });
const degreeHandle = await degreeLabel.elementHandle();

if (degreeHandle) {
  await this.page.evaluate((el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, degreeHandle);
  await this.humanDelay(500, 800);
} else {
  throw new Error('Degree label not found for scrolling');
}

    // Degree
    await this.page.locator('label').filter({ hasText: 'Degree' }).click();
    await this.page.getByRole('textbox', { name: 'Enter degree' }).fill(degree);
    await this.humanDelay();

    // Institution
    await this.page.getByRole('textbox', { name: 'Enter institution' }).fill(institution);
    await this.humanDelay();

    // Institution Year
    await this.page.getByRole('textbox', { name: 'Select year' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await this.page.getByRole('radio', { name: institutionYear }).click();
    await this.humanDelay();
    await this.page.waitForTimeout(1000);


    // Add and Next
await this.page.getByRole('button', { name: 'Add' }).click();
await this.humanDelay();
await this.page.waitForTimeout(3000);

// Scroll Next button into view before clicking
const nextButton = this.page.getByRole('button', { name: 'Next' });
await nextButton.scrollIntoViewIfNeeded();
await this.humanDelay(300, 600);
await nextButton.click();
await this.humanDelay(500, 800);
await this.page.waitForTimeout(2000);
  }
    // ------------------- Fill Contact Address and Info -------------------
  async fillContactInformation(
    address1: string,
    address2: string,
    state: string,
    city: string,
    zip: string,
    email: string,
    phone: string,
    countryCode: string = '+'
  ) {
    await this.page.getByRole('heading', { name: 'Contact Information' }).click();
    await this.humanDelay();

    // Address Line 1
    const addrInputs = this.page.getByRole('textbox', { name: 'Enter address' });
    await addrInputs.first().fill(address1);
    await this.humanDelay();

    // Address Line 2
    await addrInputs.nth(1).fill(address2);
    await this.humanDelay();

    // State
    await this.page.getByText('Select state').click();
    await this.page.getByRole('option', { name: state }).click();
    await this.humanDelay();

    // City
    await this.page.getByText('Select city').click();
    await this.page.getByRole('option', { name: city }).click();
    await this.humanDelay();

    // Zip
    await this.page.getByRole('textbox', { name: 'Enter zip' }).fill(zip);
    await this.humanDelay();

    // Email
    await this.page.getByRole('textbox', { name: 'Enter email ID' }).fill(email);
    await this.humanDelay();

    // Phone
    await this.page.getByText('+').click();
    await this.page.getByRole('option', { name: countryCode }).click();
    await this.page.getByRole('textbox', { name: 'Enter Mobile Number' }).fill(phone);
    await this.humanDelay();
    await this.page.waitForTimeout(1500);

    // Next
    const nextButton = this.page.getByRole('button', { name: 'Next' });
    await nextButton.scrollIntoViewIfNeeded();
    await this.humanDelay(300, 600);
    await nextButton.click();
    await this.humanDelay(500, 800);
    await this.page.waitForTimeout(3000);
  }
  async fillHospitalAssociations(
  hospitalName: string,
  startDate: string, // format: 'DD'
  endDate: string    // format: 'DD'
) {
  await this.page.getByRole('heading', { name: 'Hospital Associations' }).click();
  await this.humanDelay();

  // Select Hospital
  await this.page.locator('label').filter({ hasText: /^Hospital$/ }).click();
  await this.page.getByText('Select hospital').click();
  await this.page.getByRole('option', { name: hospitalName, exact: true }).click();
  await this.humanDelay();

await this.page.locator('label').filter({ hasText: 'Start Date' }).click();
await this.page.getByRole('button', { name: 'Choose date' }).first().click();
await this.page.getByRole('gridcell', { name: startDate, exact: true }).click();
await this.humanDelay();

// End Date
await this.page.locator('label').filter({ hasText: 'End Date' }).click();
await this.page.getByRole('button', { name: 'Choose date', exact: true }).click();
await this.page.getByRole('gridcell', { name: endDate, exact: true }).click();
await this.humanDelay();

  // Add and Submit
  await this.page.getByRole('button', { name: 'Add' }).click();
  await this.humanDelay();
  await this.page.waitForTimeout(3000);
  await this.page.getByRole('button', { name: 'Submit' }).click();
  await this.humanDelay(500, 800);
  await this.page.waitForTimeout(10000);

}

}




