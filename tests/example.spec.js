// @ts-check
import { test, expect } from '@playwright/test';

//test('has title', async ({ page }) => {
  //await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/GSB Frais/);
//});

test('Login dashbord refresh', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();

  await page.fill('input[name="login"]', 'andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('link', { name: 'Déconnexion' }).click();
  await page.goto('http://localhost:3000/login');
  await expect(page).toHaveURL('http://localhost:3000/login');
});
