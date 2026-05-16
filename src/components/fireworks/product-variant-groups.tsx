"use client";

import Link from "next/link";

import type { ProductVariantGroup } from "@/src/constants/products";

type ProductVariantGroupsProps = {
  groups: ProductVariantGroup[];
};

const boxClassName =
  "block rounded-xl border border-white/20 bg-white/5 px-4 py-4 text-center text-white transition hover:border-amber-400/60 hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80";

const labelStyle = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  lineHeight: "28px",
} as const;

function VariantBox({ item }: { item: ProductVariantGroup }) {
  if (item.children?.length) {
    return (
      <div className="rounded-xl border border-white/25 bg-white/[0.03] p-4">
        <p className="mb-4 text-white" style={{ ...labelStyle, fontWeight: 500 }}>
          {item.name}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {item.children.map((child) => (
            <VariantBox key={child.name} item={child} />
          ))}
        </div>
      </div>
    );
  }

  if (item.href) {
    return (
      <Link href={item.href} className={boxClassName} style={labelStyle}>
        {item.name}
      </Link>
    );
  }

  return (
    <div className={boxClassName} style={labelStyle}>
      {item.name}
    </div>
  );
}

export default function ProductVariantGroups({
  groups,
}: ProductVariantGroupsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {groups.map((group) => (
        <VariantBox key={group.name} item={group} />
      ))}
    </div>
  );
}
