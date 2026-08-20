import assert from "node:assert/strict";
import test from "node:test";
import { calculateBudget, validateBudget, DEFAULT_VALUES } from "../lib/budget.js";

test("calculates a transparent wedding budget", () => {
  const budget = calculateBudget(DEFAULT_VALUES);
  assert.equal(budget.food, 95000);
  assert.equal(budget.vendors, 39000);
  assert.equal(budget.baseTotal, 134000);
  assert.equal(budget.contingency, 13400);
  assert.equal(budget.total, 147400);
  assert.equal(budget.perGuest, 589.6);
});

test("allows zero contingency without changing the base total", () => {
  const budget = calculateBudget({ ...DEFAULT_VALUES, contingencyRate: 0 });
  assert.equal(budget.contingency, 0);
  assert.equal(budget.total, budget.baseTotal);
});

test("validates missing, negative, and unrealistic input", () => {
  const errors = validateBudget({ ...DEFAULT_VALUES, guests: "", photo: -10, plate: 10001 });
  assert.match(errors.guests, /מספר/);
  assert.match(errors.photo, /שלילי/);
  assert.match(errors.plate, /עד/);
});
