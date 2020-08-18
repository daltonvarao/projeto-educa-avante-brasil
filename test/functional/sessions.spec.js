"use strict";

const { test, trait } = use("Test/Suite")("Sessions");

trait("Test/Browser");
trait("DatabaseTransactions");

const User = use("App/Models/User");
const Factory = use("Factory");

test("should not be able to access admin routes if not logged", async ({
  browser,
}) => {
  const response = await browser.visit("/admin/users");

  await response.assertPath("/admin/sessions");

  await response
    .waitForElement("div.alert-message")
    .assertHasIn("div.alert-message", "Faça login para continuar");
}).timeout(0);

test("should be able to access login index page in GET /admin/sessions", async ({
  browser,
}) => {
  const response = await browser.visit("/admin/sessions");

  await response.assertPath("/admin/sessions");
  await response.assertHas("Login");
}).timeout(0);

test("should be able to login in POST /admin/sessions", async ({ browser }) => {
  const user = await Factory.model("App/Models/User").create({
    password: "12345678",
  });

  const response = await browser.visit("/admin/sessions");

  await response
    .type('[name="email"]', user.email)
    .type('[name="password"]', "12345678")
    .submitForm("form");

  await response.assertPath("/admin/users");
}).timeout(0);

test("should be return an error alert when try login with invalid credentials", async ({
  browser,
}) => {
  await Factory.model("App/Models/User").create({
    password: "12345678",
  });

  const response = await browser.visit("/admin/sessions");

  await response
    .type('[name="email"]', "dalton@email.com")
    .type('[name="password"]', "12345678")
    .submitForm("form");

  await response.assertPath("/admin/sessions");

  await response
    .waitForElement("div.alert-message")
    .assertHasIn("div.alert-message", "Email ou senha inválidos.");
}).timeout(0);
