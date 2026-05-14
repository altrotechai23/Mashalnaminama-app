// components/SizeSelector.tsx
"use client";

import { useState } from "react";

interface ProductSize {
  id: string;
  size: "XS" | "S" | "M" | "L" | "XL";
  stock: number;
}

export default function SizeSelector({
  sizes,
}: {
  sizes: ProductSize[];
}) {
  const [selected, setSelected] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-900">
          Size: <span className="font-medium">{selected || "-"}</span>
        </p>

        <button className="text-sm underline underline-offset-4">
          Find your size
        </button>
      </div>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border border-zinc-300 px-4 py-4 text-lg bg-white outline-none"
      >
        <option value="">Select size</option>

        {sizes.map((item) => (
          <option
            key={item.id}
            value={item.size}
            disabled={item.stock === 0}
          >
            {item.stock === 0
              ? `${item.size} — Out of stock`
              : item.size}
          </option>
        ))}
      </select>

      <div className="flex gap-2 flex-wrap pt-2">
        {sizes.map((item) => (
          <div
            key={item.id}
            className={`border px-4 py-2 text-sm uppercase tracking-wide transition-all ${
              item.stock === 0
                ? "opacity-40 line-through border-zinc-200"
                : selected === item.size
                ? "bg-black text-white border-black"
                : "border-zinc-300"
            }`}
          >
            {item.size}
          </div>
        ))}
      </div>

      {selected &&
        sizes.find((s) => s.size === selected)?.stock === 0 && (
          <div className="space-y-2 pt-2">
            <input
              type="email"
              placeholder="Enter email for restock notification"
              className="w-full border border-zinc-300 px-4 py-3 outline-none"
            />
          </div>
        )}
    </div>
  );
}