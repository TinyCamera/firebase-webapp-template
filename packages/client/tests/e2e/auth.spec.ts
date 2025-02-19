import { test, expect } from "@playwright/test";

test("should complete end-to-end signup flow", async ({ page }) => {
  // Generate unique email to avoid conflicts
  console.log("Starting test with fresh credentials");
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = "Test123456";
  const testName = "Test User";

  // Wait for app to be ready first
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Navigate to signup page
  console.log("Navigating to signup page...");
  await page.goto("/signup", { waitUntil: "networkidle" });
  await expect(page).toHaveURL("/signup");

  // Wait for and verify the form is visible
  console.log("Waiting for signup form to be visible...");
  const signupForm = page.locator("form");
  await expect(signupForm).toBeVisible();

  // Fill out the signup form using more specific selectors
  console.log("Filling out form fields...");
  await page.getByRole("textbox", { name: "Full Name" }).fill(testName);
  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page.getByLabel("Password", { exact: true }).fill(testPassword);
  await page.getByLabel("Confirm Password", { exact: true }).fill(testPassword);

  console.log("Submitting form...");
  await page.click('button[type="submit"]');

  // Wait for navigation and verify redirect to home page
  console.log("Waiting for redirect after submission...");
  await expect(page).toHaveURL("/");

  // click on the profile link
  await page.click("text=Profile");

  await expect(page).toHaveURL("/profile");
});

// Custom test setup to ensure Firebase emulator is running
test.beforeEach(async ({ page }) => {
  // Wait for Firebase emulator to be ready
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});
