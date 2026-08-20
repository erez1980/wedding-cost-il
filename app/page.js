"use client";

import { useMemo, useState } from "react";
import {
  BUDGET_FIELDS,
  CONTINGENCY_OPTIONS,
  DEFAULT_VALUES,
  calculateBudget,
  validateBudget,
} from "../lib/budget";

const currency = (value) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

const number = (value) => new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [touched, setTouched] = useState({});
  const errors = useMemo(() => validateBudget(values), [values]);
  const data = useMemo(() => calculateBudget(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function resetCalculator() {
    setValues(DEFAULT_VALUES);
    setTouched({});
  }

  return (
    <main className="shell wedding">
      <nav className="nav" aria-label="ניווט ראשי">
        <a className="brand" href="#top" aria-label="חתונה בתכלס - לעמוד הראשי">
          חתונה בתכלס<span className="dot">.</span>
        </a>
        <a href="#calculator">למחשבון ↓</a>
      </nav>

      <section className="hero" id="top" aria-labelledby="page-title">
        <div>
          <div className="eyebrow">WEDDING BUDGET · ישראל</div>
          <h1 id="page-title">חתונה מדהימה.{"\n"}תקציב שפוי.</h1>
          <p className="lead">
            במקום לגלות את המספר רק אחרי שסוגרים ספקים — בונים תמונת תקציב ברורה, כולל רשת ביטחון
            להוצאות שלא תמיד רואים מראש.
          </p>
        </div>
        <div
          className="heroArt"
          role="img"
          aria-label="זוג חתן וכלה ביום חתונתם"
          style={{
            "--hero":
              'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85")',
          }}
        >
          <div className="floatTag">
            <span>תכנון חכם</span>
            <b>מספרים שאפשר לסמוך עליהם</b>
          </div>
        </div>
      </section>

      <section id="calculator" className="calculator" aria-labelledby="calculator-title">
        <div className="panel">
          <div className="panelHeading">
            <div>
              <h2 id="calculator-title">בואו נחשב</h2>
              <p>הזינו הערכות לכל סעיף — התוצאה מתעדכנת מיד.</p>
            </div>
            <button className="resetButton" type="button" onClick={resetCalculator}>
              איפוס
            </button>
          </div>

          <div className="fields">
            {BUDGET_FIELDS.map((field) => {
              const error = touched[field.key] && errors[field.key];
              return (
                <label key={field.key} className={error ? "field hasError" : "field"}>
                  <span>{field.label}</span>
                  <div className="inputWrap">
                    <input
                      aria-describedby={error ? `${field.key}-error` : undefined}
                      aria-invalid={Boolean(error)}
                      inputMode="numeric"
                      min="0"
                      max={field.max}
                      name={field.key}
                      onBlur={() => setTouched((current) => ({ ...current, [field.key]: true }))}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      step={field.step}
                      type="number"
                      value={values[field.key]}
                    />
                    <small>{field.unit}</small>
                  </div>
                  {error && <em id={`${field.key}-error`}>{error}</em>}
                </label>
              );
            })}
          </div>

          <fieldset className={touched.contingencyRate && errors.contingencyRate ? "contingency hasError" : "contingency"}>
            <legend>רשת ביטחון להוצאות בלתי צפויות</legend>
            <p>נוספת רק לאחר חישוב כל הסעיפים. לא מסתירים אותה בתוך המחיר.</p>
            <div className="rateOptions">
              {CONTINGENCY_OPTIONS.map((rate) => (
                <label key={rate} className={values.contingencyRate === rate ? "rate active" : "rate"}>
                  <input
                    checked={Number(values.contingencyRate) === rate}
                    name="contingencyRate"
                    onBlur={() => setTouched((current) => ({ ...current, contingencyRate: true }))}
                    onChange={() => updateValue("contingencyRate", rate)}
                    type="radio"
                    value={rate}
                  />
                  {rate}%
                </label>
              ))}
            </div>
            {touched.contingencyRate && errors.contingencyRate && <em>{errors.contingencyRate}</em>}
          </fieldset>
        </div>

        <aside className="result" aria-live="polite" aria-atomic="true">
          <div>
            <div className="resultLabel">תקציב משוער כולל</div>
            <div className="total">{currency(data.total)}</div>
            <div className="secondary">{currency(data.perGuest)} לאורח</div>
          </div>

          <div className="rows" aria-label="פירוט התקציב">
            <div className="row"><span>אולם ואוכל</span><b>{currency(data.food)}</b></div>
            <div className="row"><span>ספקים והפקה</span><b>{currency(data.vendors)}</b></div>
            <div className="row"><span>סה״כ לפני רשת ביטחון</span><b>{currency(data.baseTotal)}</b></div>
            <div className="row safetyRow">
              <span>רשת ביטחון ({number(data.contingencyRate)}%)</span>
              <b>+{currency(data.contingency)}</b>
            </div>
          </div>
          {hasErrors && <p className="resultNote">הסכומים מחושבים לפי הערכים התקינים; השלימו את השדות המסומנים.</p>}
        </aside>
      </section>

      <section className="method" aria-labelledby="method-title">
        <div>
          <div className="eyebrow">שקוף ופשוט</div>
          <h2 id="method-title">איך החישוב עובד?</h2>
        </div>
        <div className="formula" dir="rtl">
          <strong>תקציב כולל</strong>
          <span>= (מספר אורחים × מחיר מנה) + צילום + מוזיקה + לבוש ואיפור + עיצוב ותוספות + רשת ביטחון</span>
          <p>רשת הביטחון היא אחוז מפורש מהסכום שלפני כן. אפשר להגדיר אותה ל־0%, 5%, 10%, 15% או 20% — ולראות בדיוק מה נוסף.</p>
        </div>
      </section>

      <section className="benefits" aria-label="יתרונות המחשבון">
        <div className="benefit"><i />רואים מחיר אמיתי לאורח</div>
        <div className="benefit"><i />מתכננים רשת ביטחון שקופה</div>
        <div className="benefit"><i />משווים תרחישים בשניות</div>
      </section>
      <footer className="footer">חתונה בתכלס · תכנון פשוט. החלטות טובות יותר.</footer>
    </main>
  );
}
