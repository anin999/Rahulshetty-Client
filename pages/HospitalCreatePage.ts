import { Page } from '@playwright/test';

export class HospitalCreatePage {
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
    await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter password' }).fill(password);
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.humanDelay(1000, 1500); // extra delay for login
  }

  // ------------------- Helper: Date Picker -------------------
  private async selectDate(labelText: string, startDay: string, endDay: string) {
    const container = this.page.locator(`label:has-text("${labelText}")`).locator('..');
    await container.click();
    await this.humanDelay();

    // Start Date
    const startDateButton = this.page.getByRole('button', { name: 'Choose date' }).first();
    await startDateButton.scrollIntoViewIfNeeded();
    await startDateButton.waitFor({ state: 'visible' });
    await this.humanDelay();
    await startDateButton.click({ force: true });
    await this.page.getByRole('gridcell', { name: startDay, exact: true }).click();
    await this.humanDelay();

    // End Date
    const endDateButton = this.page.getByRole('button', { name: 'Choose date', exact: true });
    await endDateButton.scrollIntoViewIfNeeded();
    await endDateButton.waitFor({ state: 'visible' });
    await this.humanDelay();
    await endDateButton.click({ force: true });
    await this.page.getByRole('gridcell', { name: endDay }).click();
    await this.humanDelay();
  }

  // ------------------- Navigation -------------------
  async goToHospitals() {
    await this.page.goto('https://zencurahms-stag-fe.xminds.com/admin/index');
    await this.page.getByRole('link', { name: 'Dashboard' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Master' }).click();
    await this.humanDelay();
    await this.page.getByRole('link', { name: 'Hospital' }).click();
    await this.humanDelay();
  }

  async clickNewHospital() {
    const newButton = this.page.getByRole('button', { name: 'New' });
    await newButton.scrollIntoViewIfNeeded();
    await newButton.waitFor({ state: 'visible' });
    await this.humanDelay();
    await newButton.click({ force: true });
    await this.humanDelay();
  }

  // ------------------- Hospital Info -------------------
  async fillHospitalInfo(hospitalName: string, accreditation: string, startDay: string, endDay: string) {
    await this.page.getByText('Hospital Name').click();
    await this.page.getByRole('textbox', { name: 'Enter hospital' }).fill(hospitalName);
    await this.humanDelay();

    await this.page.locator('label').filter({ hasText: 'Accreditation Level' }).click();
    await this.page.getByRole('textbox', { name: 'Enter accreditation level' }).fill(accreditation);
    await this.humanDelay();

    await this.selectDate('Validity Period', startDay, endDay);
  }

  async addHospital() {
    const addButton = this.page.getByRole('button', { name: 'Add' });
    await addButton.scrollIntoViewIfNeeded();
    await addButton.waitFor({ state: 'visible' });
    await this.humanDelay();
    await addButton.click({ force: true });
    await this.humanDelay();
    await this.clickNext();
  }

  // ------------------- License Info -------------------
  async fillLicense(type: string, number: string, authority: string, issueDay: string, expiryDay: string) {
    await this.page.getByRole('heading', { name: 'License' }).click();
    await this.humanDelay();

    const typeCombo = this.page.locator('label:has-text("License Type")').locator('..').getByRole('combobox');
    await typeCombo.click();
    await this.humanDelay();
    await this.page.getByRole('option', { name: type }).click();
    await this.humanDelay();

    await this.page.locator('label:has-text("License Number")').locator('..').getByRole('textbox').fill(number);
    await this.humanDelay();

    const authorityCombo = this.page.locator('label:has-text("Issuing Authority")').locator('..').getByRole('combobox');
    await authorityCombo.click();
    await this.humanDelay();
    await this.page.getByRole('option', { name: authority }).click();
    await this.humanDelay();

    // Issue Date
    const issueInput = this.page.locator('label:has-text("Issue Date")').locator('..').getByRole('textbox');
    await issueInput.click();
    await this.humanDelay();
    const issueDateBtn = this.page.getByRole('button', { name: 'Choose date' }).first();
    await issueDateBtn.click({ force: true });
    await this.page.getByRole('gridcell', { name: issueDay, exact: true }).click();
    await this.humanDelay();

    // Expiry Date
    const expiryInput = this.page.locator('label:has-text("Expiry Date")').locator('..').getByRole('textbox');
    await expiryInput.click();
    await this.humanDelay();
    const expiryDateBtn = this.page.getByRole('button', { name: 'Choose date', exact: true });
    await expiryDateBtn.click({ force: true });
    await this.page.getByRole('gridcell', { name: expiryDay }).click();
    await this.humanDelay();

    const addButton = this.page.getByRole('button', { name: 'Add' });
    await addButton.click({ force: true });
    await this.humanDelay();
    await this.clickNext();
  }

  // ------------------- Certifications -------------------
  async fillCertifications(certName: string, expiryDay: string) {
    await this.page.getByRole('heading', { name: 'Certifications' }).click();
    await this.humanDelay();

    const certInput = this.page.getByRole('textbox', { name: 'Enter certification name' });
    await certInput.fill(certName);
    await this.humanDelay();

    const dateInput = this.page.getByRole('textbox', { name: 'Select expiry date' });
    await dateInput.click();
    await this.humanDelay();
    const dateButton = this.page.getByRole('button', { name: 'Choose date' });
    await dateButton.click({ force: true });
    await this.page.getByRole('gridcell', { name: expiryDay }).click();
    await this.humanDelay();

    const addButton = this.page.getByRole('button', { name: 'Add' });
    await addButton.click({ force: true });
    await this.humanDelay();
    await this.clickNext();
  }

  // ------------------- Contact Person -------------------
  async fillContactPerson(
    name: string,
    designation: string,
    department: string,
    phone: string,
    email: string,
    note: string
  ) {
    await this.page.getByRole('heading', { name: 'Contact Person' }).click();
    await this.humanDelay();

    await this.page.getByRole('textbox', { name: 'Enter name' }).fill(name);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter designation' }).fill(designation);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter department' }).fill(department);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter Phone' }).fill(phone);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter email' }).fill(email);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Note' }).fill(note);
    await this.humanDelay();

    const addButton = this.page.getByRole('button', { name: 'Add' });
    await addButton.click({ force: true });
    await this.humanDelay();
    await this.clickNext();
  }

  // ------------------- Primary Address -------------------
  async fillPrimaryAddress(
  address1: string,
  address2: string,
  state: string,
  city: string,
  zip: string,
  email: string,
  phone: string
) {
  await this.page.getByRole('heading', { name: 'Primary Address' }).click();
  await this.humanDelay();

  await this.page.getByRole('textbox', { name: 'Enter address' }).first().fill(address1);
  await this.humanDelay();
  await this.page.getByRole('textbox', { name: 'Enter address' }).nth(1).fill(address2);
  await this.humanDelay();

  // ------------------- FIXED State & City -------------------
  const stateDropdown = this.page.getByText('Select state');
  await stateDropdown.click();
  await this.humanDelay();
  await this.page.getByRole('option', { name: state }).click();
  await this.humanDelay();

  const cityDropdown = this.page.getByText('Select city');
  await cityDropdown.click();
  await this.humanDelay();
  await this.page.getByRole('option', { name: city }).click();
  await this.humanDelay();

  await this.page.getByRole('textbox', { name: 'Enter zip' }).fill(zip);
  await this.humanDelay();
  await this.page.getByRole('textbox', { name: 'Enter email' }).fill(email);
  await this.humanDelay();
  await this.page.getByRole('textbox', { name: 'Enter Phone' }).fill(phone);
  await this.humanDelay();
}

  // ------------------- Delivery & Billing Address -------------------
  async fillDeliveryAndBillingAddress() {
    // Delivery Address
    const addDeliveryBtn = this.page.getByRole('button', { name: 'Add Delivery Address' });
    await addDeliveryBtn.scrollIntoViewIfNeeded();
    await addDeliveryBtn.waitFor({ state: 'visible' });
    await this.humanDelay();
    await addDeliveryBtn.click({ force: true });
    await this.humanDelay();

    const deliveryCheckbox = this.page.getByRole('checkbox', { name: 'Same As Primary Address' }).first();
    await deliveryCheckbox.check();
    await this.humanDelay();

    // Billing Address
    const addBillingBtn = this.page.getByRole('button', { name: 'Add Billing Address' });
    await addBillingBtn.scrollIntoViewIfNeeded();
    await addBillingBtn.waitFor({ state: 'visible' });
    await this.humanDelay();
    await addBillingBtn.click({ force: true });
    await this.humanDelay();

    const billingCheckbox = this.page.getByRole('checkbox', { name: 'Same As Primary Address' }).nth(1);
    await billingCheckbox.check();
    await this.humanDelay();
  }

  // ------------------- Submit -------------------
  async submit() {
    const submitBtn = this.page.getByRole('button', { name: 'Submit' });
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.waitFor({ state: 'visible' });
    await submitBtn.click({ force: true });
    await this.humanDelay(1000, 1500);
    await this.page.waitForTimeout(5000);

const hospitalLabel = this.page.locator('text=Hospitals');
const hospitalHandle = await hospitalLabel.elementHandle();

if (hospitalHandle) {
  await this.page.evaluate((el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, hospitalHandle);
  await this.humanDelay(500, 800);
} else {
  throw new Error('"Hospitals" text not found for scrolling');
}

await this.humanDelay(500, 800);
await this.page.waitForTimeout(4000)
  }

  // ------------------- Verify Hospital -------------------
  async verifyHospitalCreated(hospitalName: string) {
    await this.page.getByText(hospitalName, { exact: true }).waitFor({ state: 'visible' });
  }
}
