/** Portfolio filter options — id is stored in DB (category_id primary + category_ids JSONB). */

export const PORTFOLIO_CATEGORIES = [
  { id: "embroidery", label: "Embroidery Digitizing" },
  { id: "vector", label: "Vector Artwork" },
  { id: "svg", label: "SVG and PNG" },
  { id: "cnc", label: "CNC and Laser" },
  { id: "hats", label: "Hats" },
  { id: "leftchest", label: "Left Chest" },
  { id: "jacketback", label: "Jacket Back" },
  { id: "vehicles", label: "Vehicles" },
  { id: "patches", label: "Patches" },
  { id: "applique-embroidery", label: "Appliqué Embroidery" },
  { id: "plasma-project", label: "Plasma project" },
  { id: "engraving-project", label: "Engraving Project" },
  { id: "stencil-project", label: "Stencil Project" },
  { id: "one-color-svg", label: "one color svg" },
  { id: "full-color-svg", label: "full color svg" },
  { id: "pets-portraits-embroidery", label: "Pets and Portraits Embroidery" },
];

const labelById = new Map(PORTFOLIO_CATEGORIES.map((c) => [c.id, c.label]));

export function labelsFromCategoryIds(ids) {
  if (!ids?.length) return "";
  return ids.map((id) => labelById.get(id) || id).join(", ");
}

export function normalizeCategoryIds(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string") {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p.filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return [];
}
