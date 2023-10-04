// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3001');
});

const loginParams = { email: 'antonio@mail.com', password: 'password3' };
const createPostParams = {
  title: 'My first test post',
  content: 'This is my first test post',
};

test('login with valid credentials', async ({ page }) => {
  await page.fill('#email', loginParams.email);
  await page.fill('#password', loginParams.password);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3001/');
});

test('create a post', async ({ page }) => {
  console.log('INIT');
  await page.fill('#email', loginParams.email);
  await page.fill('#password', loginParams.password);
  await page.click('button[type="submit"]');

  await page.click('text=Crear Post');
  await page.fill('#title', createPostParams.title);
  await page.fill('#content', createPostParams.content);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3001/create-post');
  const locator = page.locator('text=Post creado correctamente');
  await expect(locator).toContainText('Post creado correctamente');
  console.log('END');
});

test('login, create a post and delete it', async ({ page }) => {
  console.log('INIT');
  await page.fill('#email', loginParams.email);
  await page.fill('#password', loginParams.password);
  await page.click('button[type="submit"]');
  console.log('LOGIN');

  await page.click('text=Crear Post');
  await page.fill('#title', createPostParams.title);
  await page.fill('#content', createPostParams.content);
  await page.click('button[type="submit"]');
  console.log('POST CREATED');

  await expect(page).toHaveURL('http://localhost:3001/create-post');
  const locator = page.locator('text=Post creado correctamente');
  await expect(locator).toContainText('Post creado correctamente');
  console.log('POST CREATED CORRECTLY');

  await page.click('text=Mis Posts');
  await page.click('text=My first test post');
  await page.click('#deletePost');
  console.log('POST DELETED');

  await expect(page).toHaveURL('http://localhost:3001/');
  console.log('POST DELETED CORRECTLY');
  console.log('END');
});

test('login, create a post and updated it', async ({ page }) => {
  console.log('INIT');
  await page.fill('#email', loginParams.email);
  await page.fill('#password', loginParams.password);
  await page.click('button[type="submit"]');
  console.log('LOGIN');

  await page.click('text=Crear Post');
  await page.fill('#title', createPostParams.title);
  await page.fill('#content', createPostParams.content);
  await page.click('button[type="submit"]');
  console.log('POST CREATED');

  await expect(page).toHaveURL('http://localhost:3001/create-post');
  const locator = page.locator('text=Post creado correctamente');
  await expect(locator).toContainText('Post creado correctamente');
  console.log('POST CREATED CORRECTLY');

  await page.click('text=Mis Posts');
  await page.click('text=My first test post');
  await page.click('#editPost');
  await page.fill('#modal-confirm_title', 'Updated title');
  await page.fill('#modal-confirm_content', 'Updated content');
  await page.click('#editPostSend');
  console.log('POST UPDATED');

  const locatorUpdated = page.locator('text=Post editado correctamente');
  await expect(locatorUpdated).toContainText('Post editado correctamente');
  console.log('POST UPDATED CORRECTLY');
  console.log('END');
});
