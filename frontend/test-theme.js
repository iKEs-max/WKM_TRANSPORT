import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  
  // Get theme attribute
  const themeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Active Theme Data Attribute:', themeAttr);
  
  // Get primary color computed style
  const primaryColor = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--brand-primary').trim();
  });
  console.log('Computed Primary Color:', primaryColor);
  
  await browser.close();
})();
