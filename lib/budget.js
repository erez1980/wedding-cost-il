export const DEFAULT_VALUES = {
  guests: 250,
  plate: 380,
  photo: 11000,
  dj: 7000,
  style: 12000,
  extra: 9000,
  contingencyRate: 10,
};

export const BUDGET_FIELDS = [
  { key: "guests", label: "מספר אורחים", unit: "אורחים", max: 5000, step: 1 },
  { key: "plate", label: "מחיר מנה", unit: "₪", max: 10000, step: 1 },
  { key: "photo", label: "צילום", unit: "₪", max: 1000000, step: 100 },
  { key: "dj", label: "מוזיקה / DJ", unit: "₪", max: 1000000, step: 100 },
  { key: "style", label: "לבוש ואיפור", unit: "₪", max: 1000000, step: 100 },
  { key: "extra", label: "עיצוב ותוספות", unit: "₪", max: 1000000, step: 100 },
];

export const CONTINGENCY_OPTIONS = [0, 5, 10, 15, 20];

export function parseBudgetValue(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const normalized = String(value ?? "").trim().replace(/,/g, "");
  if (!normalized) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

export function validateBudget(values) {
  const errors = {};

  for (const field of BUDGET_FIELDS) {
    const value = parseBudgetValue(values[field.key]);
    if (value === null) errors[field.key] = "נא להזין מספר.";
    else if (value < 0) errors[field.key] = "הסכום לא יכול להיות שלילי.";
    else if (value > field.max) errors[field.key] = `נא להזין עד ${field.max.toLocaleString("he-IL")}.`;
    else if (field.key === "guests" && value < 1) errors[field.key] = "יש להזין לפחות אורח אחד.";
  }

  const rate = parseBudgetValue(values.contingencyRate);
  if (rate === null || rate < 0 || rate > 100) {
    errors.contingencyRate = "רשת הביטחון חייבת להיות בין 0% ל־100%.";
  }

  return errors;
}

export function calculateBudget(values) {
  const guests = Math.max(0, parseBudgetValue(values.guests) ?? 0);
  const plate = Math.max(0, parseBudgetValue(values.plate) ?? 0);
  const photo = Math.max(0, parseBudgetValue(values.photo) ?? 0);
  const dj = Math.max(0, parseBudgetValue(values.dj) ?? 0);
  const style = Math.max(0, parseBudgetValue(values.style) ?? 0);
  const extra = Math.max(0, parseBudgetValue(values.extra) ?? 0);
  const contingencyRate = Math.max(0, parseBudgetValue(values.contingencyRate) ?? 0);

  const food = guests * plate;
  const vendors = photo + dj + style + extra;
  const baseTotal = food + vendors;
  const contingency = baseTotal * (contingencyRate / 100);
  const total = baseTotal + contingency;

  return {
    guests,
    plate,
    food,
    vendors,
    baseTotal,
    contingencyRate,
    contingency,
    total,
    perGuest: guests > 0 ? total / guests : 0,
  };
}
