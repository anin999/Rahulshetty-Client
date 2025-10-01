import { Page } from '@playwright/test';


export class TechnicianCreatePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ------------------- Human Delay Helper -------------------
  private async humanDelay(min = 200, max = 600) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    await this.page.waitForTimeout(ms);
  }

  // ------------------- Login -------------------
  async login(email: string, password: string) {
    await this.page.goto('https://zencurahms-stag-fe.xminds.com/');
    await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter password' }).fill(password);
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.humanDelay();
  }

  // ------------------- Navigate to Technicians -------------------
  async goToTechnicians() {
    await this.page.getByRole('button', { name: 'Master' }).click();
    await this.humanDelay();
    await this.page.getByRole('link', { name: 'Technicians' }).click();
    await this.humanDelay();
  }

  async clickNewTechnician() {
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.humanDelay();
  }

  // ------------------- Helper for Date Picker (DOB & Hire Date) -------------------
  private async selectDate(labelText: string, date: string) {
    const [day, month, year] = date.split('/'); // DD/MM/YYYY

    const container = this.page.locator(`label:has-text("${labelText}")`).locator('..');
    await container.getByRole('textbox').click();
    await this.humanDelay();
    await container.getByRole('button', { name: /Choose date/ }).click();
    await this.humanDelay();

    const calendar = this.page.locator('div[role="dialog"]:visible');
    await calendar.waitFor({ state: 'visible' });

    // Select year
    const yearDropdown = calendar.locator('select[aria-label="Year"]');
    if (await yearDropdown.count()) {
      await yearDropdown.selectOption(year);
      await this.humanDelay();
    }

    // Select month
    const monthDropdown = calendar.locator('select[aria-label="Month"]');
    if (await monthDropdown.count()) {
      await monthDropdown.selectOption((parseInt(month, 10) - 1).toString());
      await this.humanDelay();
    }

    // Select day
    await calendar.getByRole('gridcell', { name: String(parseInt(day, 10)), exact: true }).click({ force: true });
    await this.humanDelay();
  }

  // ------------------- Helper for Year Completed -------------------
  private async selectYearCompleted(year: string) {
    await this.page.locator('label').filter({ hasText: 'Year Completed' }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Select Year' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Choose date' }).click();
    await this.humanDelay();
    const yearOption = this.page.getByRole('radio', { name: year });
    await yearOption.scrollIntoViewIfNeeded();
    await yearOption.click({ force: true });
    await this.humanDelay();
  }

  // ------------------- Helper for Skills Year -------------------
  private async selectYearSkills(year: string) {
    await this.page.getByRole('heading', { name: 'Skills & Certifications' }).click();
    await this.humanDelay();
    await this.page.locator('label').filter({ hasText: /^Year$/ }).click();
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Select year' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: /^Choose date/ }).click();
    await this.humanDelay();
    const dialog = this.page.locator('div[role="dialog"]:visible');
    await dialog.waitFor({ state: 'visible' });
    const yearOption = dialog.getByRole('radio', { name: year });
    await yearOption.scrollIntoViewIfNeeded();
    await yearOption.click({ force: true });
    await this.humanDelay();
  }

  // ------------------- Personal Info -------------------
  async fillPersonalInfo(
    firstName: string,
    lastName: string,
    birthDate: string, // DD/MM/YYYY
    gender: string,
    city: string,
    state: string,
    country: string,
    address1: string,
    address2: string,
    zip: string,
    email: string,
    mobile: string,
    hireDate: string // DD/MM/YYYY
  ) {
    await this.page.getByRole('textbox', { name: 'Enter first name' }).fill(firstName);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter last name' }).fill(lastName);
    await this.humanDelay();
    await this.selectDate('Date of Birth', birthDate);
    await this.humanDelay();

    const genderCombo = this.page.locator('div[role="combobox"]:has-text("Select gender")');
    await genderCombo.scrollIntoViewIfNeeded();
    await genderCombo.click();
    await this.humanDelay();
    await this.page.locator(`text=${gender}`).first().click();
    await this.humanDelay();

    await this.selectDate('Hire Date', hireDate);
    await this.humanDelay();
     
     await this.page.getByText('Address Line 1').click();
     await this.page.getByRole('textbox', { name: 'Enter address' }).first().click();
     await this.page.getByRole('textbox', { name: 'Enter address' }).first().fill(address1);
    await this.humanDelay();

    await this.page.getByText('Address Line 2').click();
    await this.page.getByRole('textbox', { name: 'Enter address' }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'Enter address' }).nth(1).fill(address2);
    await this.humanDelay();

    await this.page.getByText('Select state').click();
    await this.humanDelay();
    const stateOption = this.page.locator(`li[role="option"]`, { hasText: state });
    await stateOption.scrollIntoViewIfNeeded();
    await stateOption.waitFor({ state: 'visible' });
    await stateOption.click({ force: true });
    await this.humanDelay();

    await this.page.getByText('City', { exact: true }).click();
    await this.humanDelay();
    await this.page.getByText('Select city').click();
    await this.humanDelay();
    const cityOption = this.page.locator(`li[role="option"]`, { hasText: city });
    await cityOption.scrollIntoViewIfNeeded();
    await cityOption.waitFor({ state: 'visible' });
    await cityOption.click({ force: true });
    await this.humanDelay();

    await this.page.getByRole('textbox', { name: 'Enter Zip' }).fill(zip);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter email address' }).fill(email);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter Mobile Number' }).fill(mobile);
    await this.humanDelay();

    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.humanDelay();
  }

  // ------------------- Education -------------------
  async fillEducation(title: string, institution: string, year: string) {
    await this.page.getByRole('textbox', { name: 'Enter Title' }).fill(title);
    await this.humanDelay();
    await this.page.getByRole('textbox', { name: 'Enter Institution' }).fill(institution);
    await this.humanDelay();
    await this.selectYearCompleted(year);
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.humanDelay();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.humanDelay();
  }

// ------------------- Skills -------------------
async fillSkills(skillName: string, year: string, filePath: string) {
  const skillInput = this.page.getByRole('textbox', { name: 'Enter skills' });
  await skillInput.scrollIntoViewIfNeeded();
  await skillInput.click();
  await this.humanDelay();
  await skillInput.fill(skillName);
  await this.humanDelay();
  await this.selectYearSkills(year);
  await this.humanDelay();

  // ------------------- File Upload -------------------
await this.page.locator('text=Browse file').click();

}

// ------------------- Manager & Department -------------------
  async fillManagerDepartment(manager: string, department: string, location: string, employment: string, availability: string) {
    const managerCombo = this.page.getByRole('combobox', { name: 'Select manager' });
    await managerCombo.waitFor({ state: 'visible' });
    await managerCombo.click();
    await this.humanDelay();
    await this.page.getByRole('option', { name: manager }).click();
    await this.humanDelay();

    const deptInput = this.page.getByRole('textbox', { name: 'Enter department / division' });
    await this.page.getByText('Department / Division').click();
    await this.humanDelay();
    await deptInput.waitFor({ state: 'visible' });
    await deptInput.fill(department);
    await this.humanDelay();

    const locationInput = this.page.getByRole('textbox', { name: 'Enter primary location' });
    await this.page.getByText('Primary Location').click();
    await this.humanDelay();
    await locationInput.waitFor({ state: 'visible' });
    await locationInput.fill(location);
    await this.humanDelay();

    const employmentCombo = this.page.getByRole('combobox', { name: 'Select employment status' });
    await employmentCombo.click();
    await this.humanDelay();
    const employmentListbox = this.page.locator('ul[role="listbox"]:visible');
    await employmentListbox.waitFor({ state: 'visible' });
    await employmentListbox.getByText(employment, { exact: true }).click();
    await this.humanDelay();

    const availabilityCombo = this.page.getByRole('combobox', { name: 'Select availability status' });
    await availabilityCombo.click();
    await this.humanDelay();
    const availabilityListbox = this.page.locator('ul[role="listbox"]:visible');
    await availabilityListbox.waitFor({ state: 'visible' });
    await availabilityListbox.getByText(availability, { exact: true }).click();
    await this.humanDelay();

    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.humanDelay();
  }

  // ------------------- Submit -------------------
  async submit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.humanDelay();
    await this.page.waitForTimeout(8000);

  }
}
