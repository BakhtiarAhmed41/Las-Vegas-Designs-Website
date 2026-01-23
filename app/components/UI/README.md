# UI Components

Reusable UI elements used throughout the website.

## ServiceLabel Component

A small pill/badge component for displaying service category labels.

### Design

- **Background**: Light pink (`lv-red-pale`)
- **Text**: Bold red (`lv-red`) from logo
- **Shape**: Rounded pill (`rounded-full`)
- **Style**: Uppercase, small text, letter-spaced

### Usage

```jsx
import ServiceLabel from "@/app/components/UI/ServiceLabel";

// Basic usage
<ServiceLabel text="CUSTOM VECTOR ART SERVICE" />

// With additional classes
<ServiceLabel 
  text="DIGITIZING SERVICE" 
  className="mb-6" 
/>
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | string | Yes | - | The label text to display |
| `className` | string | No | `""` | Additional Tailwind classes |

### Examples

```jsx
// In hero sections
<ServiceLabel text="CUSTOM VECTOR ART SERVICE" />

// In card headers
<ServiceLabel text="EMBROIDERY DIGITIZING" className="mb-4" />

// In banners
<ServiceLabel text="SVG FILES" />

// In grid items
<ServiceLabel text="CNC & LASER CUT" className="mx-auto" />
```

### Use Cases

- Service page headers
- Category tags
- Feature badges
- Section labels
- Card headers
- Filter tags

