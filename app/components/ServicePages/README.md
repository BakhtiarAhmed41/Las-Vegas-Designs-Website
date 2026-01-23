# Service Pages Components

Reusable components for creating consistent service pages across the website.

## ServiceHero Component

A dynamic hero section component for service pages with customizable content.

### Usage

```jsx
import ServiceHero from "@/app/components/ServicePages/ServiceHero";

<ServiceHero
  serviceLabel="CUSTOM VECTOR ART SERVICE"
  heading="Clean, Scalable Custom Vector Files"
  subheading="TURN PNG, JPG, and Logos into Smooth Vector Art"
  description="Your description text here..."
  features={[
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]}
  primaryButton={{
    text: "Get a Quote",
    href: "/contact"
  }}
  secondaryButton={{
    text: "View Examples",
    href: "#portfolio"
  }}
  imageSrc="/path/to/image.jpg"
  imageAlt="Alt text"
/>
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `serviceLabel` | string | No | Small uppercase label above heading |
| `heading` | string | Yes | Main heading text (large, navy blue) |
| `subheading` | string | No | Secondary heading (red) |
| `description` | string | No | Paragraph description |
| `features` | array | No | Array of feature strings for bullet points |
| `primaryButton` | object | No | `{ text: string, href: string }` |
| `secondaryButton` | object | No | `{ text: string, href: string }` |
| `imageSrc` | string | No | Image path (null shows placeholder) |
| `imageAlt` | string | No | Alt text for image |

### Example Data Structure

Create a data file for each service page:

```js
// app/data/yourService/heroData.js
export const heroData = {
  serviceLabel: "YOUR SERVICE LABEL",
  heading: "Your Main Heading",
  subheading: "Your Subheading",
  description: "Your description...",
  features: ["Feature 1", "Feature 2"],
  primaryButton: { text: "CTA Text", href: "/link" },
  secondaryButton: { text: "Secondary", href: "/link" },
  imageSrc: null,
  imageAlt: "Description",
};
```

Then import and use:

```jsx
import ServiceHero from "@/app/components/ServicePages/ServiceHero";
import { heroData } from "@/app/data/yourService/heroData";

<ServiceHero {...heroData} />
```

### Styling

- Uses brand colors: `lv-blue` (navy), `lv-red` (burgundy)
- Fully responsive (mobile, tablet, desktop)
- Consistent typography and spacing
- Hover states on buttons

### Creating New Service Pages

1. Create data file: `app/data/yourService/heroData.js`
2. Create page: `app/your-service/page.jsx`
3. Import ServiceHero and data
4. Use spread operator to pass all props: `<ServiceHero {...heroData} />`

