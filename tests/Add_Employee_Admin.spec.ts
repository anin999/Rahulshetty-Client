import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { AddEmployeePage } from '../pages/Add_Employee';

test('create new employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const addEmployeePage = new AddEmployeePage(page);

  // login page
  await loginPage.gotoLoginPage();
  await loginPage.login('akhilr@xminds.com', '@Dm!n**4455');

  // create employee
  await addEmployeePage.gotoAddEmployeeForm();
  await addEmployeePage.addEmployee('Asha', 'asha@xminds.com', 'Xminds@1234');
});