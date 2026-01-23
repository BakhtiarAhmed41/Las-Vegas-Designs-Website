export const svgCards = [
  {
    slug: "single-color-svg",
    title: "Single-Color SVG",
    text: "A single-color SVG is a vector-based graphic that uses a single solid color without gradients, shading, or multiple hues. It’s ideal for cutting, engraving, screen printing, and minimalistic designs.",
    image: "/assets/homePage/single-color.png",
    bgColor: "#0ca8adff",
    minHeight: 280,
    size: "small",
  },
  {
    slug: "full-color-svg",
    title: "Full-Color SVG",
    text: "A full-color SVG is a vector-based graphic that includes multiple colors, gradients, and intricate details. Perfect for high-quality prints, digital graphics, and detailed artwork.",
    image: "/assets/homePage/full-color.png",
    bgColor: "#0b9397",
    minHeight: 360,
    size: "large",
  },
  {
    slug: "silhouette-art",
    title: "Silhouette Art",
    text: "Silhouette art uses solid, single-color shapes (typically black) against a contrasting background. Ideal for cutting, engraving, and minimalist designs.",
    image: "/assets/homePage/silhouette.png",
    bgColor: "#0b9397",
    minHeight: 360,
    size: "large",
  },
  {
    slug: "line-art-illustrations",
    title: "Line Art & Illustrations",
    text: "Line art is a minimalist illustration style relying on clean, precise lines to form images without heavy shading or gradients. Great for engraving, embroidery, tattoos, and digital designs.",
    image: "/assets/homePage/line-art.png",
    bgColor: "#0ca8adff",
    minHeight: 280,
    size: "small",
  },
];

export function getCardBySlug(slug) {
  return svgCards.find((c) => c.slug === slug);
}
