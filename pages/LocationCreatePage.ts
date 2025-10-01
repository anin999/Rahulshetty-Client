import { Page } from '@playwright/test';
export class LocationCreatePage {
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

  async login(email: string, password: string) {
    await this.page.goto('https://zencurahms-stag-fe.xminds.com/');
    await this.page.getByRole('textbox', { name: 'Enter your email' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter password' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter password' }).fill(password);
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.humanDelay(1000, 1500); // extra delay for login
  }

  // ---------------- Navigation ----------------
  async openNewLocationForm() {
    await this.page.getByRole('button', { name: 'Master' }).click();
    await this.humanDelay();

    await this.page.getByRole('link', { name: 'Location / Hub' }).click();
    await this.humanDelay();

    await this.page.getByRole('button', { name: 'New' }).click();
    await this.humanDelay();
  }

  // ---------------- Form Fill ----------------
  async fillLocationInfo(id: string, name: string, description: string) {
    await this.page.getByRole('heading', { name: 'Location Information' }).click();
    await this.humanDelay();

    await this.page.getByRole('textbox', { name: 'Enter location id' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter location id' }).fill(id);
    await this.humanDelay();

    await this.page.getByText('Location Name').click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter location name' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter location name' }).fill(name);
    await this.humanDelay();

    await this.page.getByText('Description').click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter location description' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter location description' }).fill(description);
    await this.humanDelay();
  }

  async fillAddress(address1: string, address2: string, state: string, city: string, zip: string) {
  // Address Line 1
  await this.page.getByPlaceholder('Enter address').nth(0).click();
  await this.humanDelay();
  await this.page.getByPlaceholder('Enter address').nth(0).fill(address1);
  await this.humanDelay();

  // Address Line 2
  await this.page.getByPlaceholder('Enter address').nth(1).click();
  await this.humanDelay();
  await this.page.getByPlaceholder('Enter address').nth(1).fill(address2);
  await this.humanDelay();

  // State
  await this.page.getByText('Select state').click();
  await this.humanDelay();
  await this.page.getByRole('option', { name: state }).click();
  await this.humanDelay();

  // City
  await this.page.getByText('Select city').click();
  await this.humanDelay();
  await this.page.getByRole('option', { name: city }).click();
  await this.humanDelay();

  // Zip
  await this.page.getByRole('textbox', { name: 'Enter zip' }).click();
  await this.humanDelay();
  await this.page.getByRole('textbox', { name: 'Enter zip' }).fill(zip);
  await this.humanDelay();

    // Click Next after zip
  await this.page.getByRole('button', { name: 'Next' }).click();
  await this.humanDelay();
}

 // ---------------- Contact Information ----------------
  async fillContactInformation(
    contactName: string,
    contactEmail: string,
    contactPhone: string,
    altPhone: string
  ) {
    await this.page.getByRole('heading', { name: 'Contact Information' }).click();
    await this.humanDelay();

    // Contact Person Name
    await this.page.getByText('Contact Person Name').click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter person name' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter person name' }).fill(contactName);
    await this.humanDelay();

    // Email Address
    await this.page.getByText('Email Address').click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter email address' }).dblclick();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter email address' }).fill(contactEmail);
    await this.humanDelay();

    // Phone Number
    await this.page.getByText('Phone Number', { exact: true }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).dblclick();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).fill(contactPhone);
    await this.humanDelay();

    // Alternate Phone Number
    await this.page.getByText('Alternate Phone Number').click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter alternate phone number' }).dblclick();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter alternate phone number' }).fill(altPhone);
    await this.humanDelay();

    // Next
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.humanDelay();
  }

  async fillStatus(status: string) {
    // Click Status heading
    await this.page.getByRole('heading', { name: 'Status' }).click();
    await this.humanDelay();

    // Availability Status dropdown
    await this.page.getByText('Availability Status', { exact: true }).click();
    await this.humanDelay();
    await this.page.getByText('Select availability status').click();
    await this.humanDelay();
    await this.page.getByRole('option', { name: status, exact: true }).click();
    await this.humanDelay();

    // Submit
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.humanDelay();
    await this.page.waitForTimeout(6000);
  }
}
 