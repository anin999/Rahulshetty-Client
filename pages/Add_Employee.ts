import { Page } from '@playwright/test';

export class AddEmployeePage {
  private page: Page;
  private employees_link;
  private addEmployee_link;
  private name_textbox;
  private email_textbox;
  private password_textbox;
  private createEmployee_button;

  constructor(page: Page) {
    this.page = page;
    this.employees_link = page.getByRole('link', { name: ' Employees' });
    this.addEmployee_link = page.getByRole('link', { name: '+ Add New Employee' });
    this.name_textbox = page.locator('input[name="name"]');
    this.email_textbox = page.locator('input[name="email"]');
    this.password_textbox = page.locator('input[name="password"]');
    this.createEmployee_button = page.getByRole('button', { name: 'Create Employee' });
  }

  async gotoAddEmployeeForm(): Promise<void> {
    await this.employees_link.click();
    await this.addEmployee_link.click();
  }

  async addEmployee(name: string, email: string, password: string): Promise<void> {
    await this.name_textbox.fill(name);
    await this.email_textbox.fill(email);
    await this.password_textbox.fill(password);
    await this.createEmployee_button.click();
  }
}