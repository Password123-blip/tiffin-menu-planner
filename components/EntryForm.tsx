"use client";

import { useState } from "react";
import { supabase, TABLE, isConfigured } from "@/lib/supabase";

type FieldDef = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
};

const FIELDS: FieldDef[] = [{"name": "dish", "label": "Dish", "type": "text", "required": true, "placeholder": "Rajma, bhindi, dal tadka"}, {"name": "day_of_week", "label": "Day", "type": "text", "required": true, "placeholder": "Monday"}, {"name": "meal_type", "label": "Meal type", "type": "text", "required": true, "placeholder": "Lunch"}, {"name": "is_veg", "label": "Vegetarian", "type": "bool", "required": false, "placeholder": ""}, {"name": "notes", "label": "Notes", "type": "text", "required": true, "placeholder": ""}];

export default function EntryForm() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {};

    for (const f of FIELDS) {
      const raw = data.get(f.name);
      if (f.type === "bool") {
        payload[f.name] = data.get(f.name) === "on";
      } else if (raw === null || raw === "") {
        if (f.required) {
          setMsg(`${f.label} is required.`);
          return;
        }
      } else if (f.type === "int") {
        payload[f.name] = parseInt(String(raw), 10);
      } else if (f.type === "number") {
        payload[f.name] = parseFloat(String(raw));
      } else {
        payload[f.name] = String(raw);
      }
    }

    if (!isConfigured) {
      setMsg("Add your Supabase keys to .env.local first.");
      return;
    }

    setBusy(true);
    setMsg(null);
    const { error } = await supabase().from(TABLE).insert(payload);
    setBusy(false);

    if (error) {
      setMsg(error.message);
      return;
    }
    form.reset();
    setMsg("Saved.");
    window.dispatchEvent(new Event("entry:created"));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Add a meal</h2>
      <p className="mt-1 text-sm text-slate-500">
        Writes directly to the tiffin_menu_planner_meals table.
      </p>

      <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Dish</label>
            <input type="text" name="dish" placeholder="Rajma, bhindi, dal tadka" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Day</label>
            <input type="text" name="day_of_week" placeholder="Monday" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Meal type</label>
            <input type="text" name="meal_type" placeholder="Lunch" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="is_veg" className="h-4 w-4 rounded border-slate-300" />
            Vegetarian
          </label>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Notes</label>
            <input type="text" name="notes" placeholder="" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:opacity-60"
        style={{ background: "var(--accent)" }}
      >
        {busy ? "Saving…" : "Save meal"}
      </button>

      {msg && <p className="mt-3 text-sm text-slate-600">{msg}</p>}
    </form>
  );
}
