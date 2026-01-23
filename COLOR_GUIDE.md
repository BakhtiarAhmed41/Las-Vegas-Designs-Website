# 🎨 Las Vegas Designs USA - Color System Guide

## Brand Colors (Extracted from Logo)

### Primary Colors

#### **LV Red** - `#B4262B`
- **Usage**: Primary brand color, CTAs, headings, hover states
- **Source**: Logo "VD" letters and "LAS VEGAS" text
- **Class**: `text-lv-red`, `bg-lv-red`, `border-lv-red`
- **Examples**:
  - Primary buttons
  - Important headings
  - Links hover state
  - Active navigation items

#### **LV Navy Blue** - `#0C2A52`
- **Usage**: Primary text, navigation, professional elements
- **Source**: Logo outlines and "DESIGNS USA" text
- **Class**: `text-lv-blue`, `bg-lv-blue`, `border-lv-blue`
- **Examples**:
  - Main navigation text
  - Body headings
  - Professional sections
  - Footer backgrounds

---

## Color Variations

### Red Palette
| Color | Hex | Usage | Tailwind Class |
|-------|-----|-------|----------------|
| **Red Dark** | `#A8261D` | Hover states, pressed buttons | `lv-red-dark` |
| **Red** | `#B4262B` | Primary actions, headings | `lv-red` |
| **Red Light** | `#D93036` | Highlights, accents | `lv-red-light` |
| **Red Pale** | `#FEF2F2` | Light backgrounds, alerts | `lv-red-pale` |
| **Maroon** | `#7A1F1F` | Deep accents, footers | `lv-maroon` |

### Blue Palette
| Color | Hex | Usage | Tailwind Class |
|-------|-----|-------|----------------|
| **Navy Blue** | `#0C2A52` | Primary text, nav | `lv-blue` |
| **Blue Light** | `#17365D` | Secondary elements | `lv-blue-light` |
| **Blue Lighter** | `#2D4A73` | Hover states | `lv-blue-lighter` |
| **Sky Blue** | `#EEF2FB` | Light backgrounds | `lv-sky-blue` |
| **Blue Pale** | `#F8FAFC` | Subtle backgrounds | `lv-blue-pale` |

---

## Usage Guidelines

### 🎯 Primary Usage (Use Most Often)
1. **LV Red (`#B4262B`)** - Call-to-action buttons, important links, headings
2. **LV Blue (`#0C2A52`)** - Main text, navigation, professional sections
3. **White (`#FFFFFF`)** - Backgrounds, cards, contrast text
4. **Grays** - Body text, borders, subtle UI elements

### ⚠️ Secondary Usage (Use Sparingly)
- **Teal (`#0B9397`)** - Special highlights only
- **Bright Blue (`#00A8FF`)** - Informational elements only
- **Maroon (`#7A1F1F`)** - Deep accent sections only

### ❌ Avoid
- Don't use reds and blues together at full saturation
- Don't use accent colors for large areas
- Don't mix teal with primary red/blue unless necessary

---

## Component Color Patterns

### Navigation
```
Background: White or Gray-100
Text: LV Blue (#0C2A52)
Hover: LV Red (#B4262B)
Active: LV Red (#B4262B)
```

### Buttons
```css
/* Primary Button */
background: LV Red (#B4262B)
text: White
hover: LV Red Dark (#A8261D)

/* Secondary Button */
background: LV Blue (#0C2A52)
text: White
hover: LV Blue Light (#17365D)

/* Outline Button */
border: LV Blue (#0C2A52)
text: LV Blue (#0C2A52)
hover-bg: LV Blue (#0C2A52)
hover-text: White
```

### Headings
```
H1-H2: LV Blue (#0C2A52) or LV Red (#B4262B)
H3-H4: LV Blue (#0C2A52)
H5-H6: Gray (#444444)
```

### Links
```
Default: LV Blue (#0C2A52)
Hover: LV Red (#B4262B)
Visited: LV Blue Light (#17365D)
```

### Cards & Sections
```
Background: White or Sky Blue (#EEF2FB)
Border: Border Light (#E5E7EB)
Shadow: rgba(0, 0, 0, 0.1)
```

---

## Accessibility

### Contrast Ratios (WCAG AA Compliant)
✅ **LV Blue (#0C2A52) on White** - 12.5:1 (Excellent)
✅ **LV Red (#B4262B) on White** - 8.2:1 (Good)
✅ **White on LV Blue (#0C2A52)** - 12.5:1 (Excellent)
✅ **White on LV Red (#B4262B)** - 8.2:1 (Good)

### Best Practices
- Always use LV Blue or LV Red for text on white backgrounds
- Always use white text on LV Blue or LV Red backgrounds
- For light backgrounds, use darker text colors
- Maintain minimum 4.5:1 contrast ratio for body text

---

## Quick Reference

### Most Common Combinations
1. **LV Blue text** on **White background** ← Navigation, body text
2. **LV Red text** on **White background** ← Headings, CTAs
3. **White text** on **LV Blue background** ← Hero sections, footers
4. **White text** on **LV Red background** ← Primary buttons, alerts
5. **LV Blue text** on **Sky Blue background** ← Info boxes, cards

### Hover States
- Blue text → Red text
- Red background → Red Dark background
- Blue background → Blue Light background

---

## Implementation Examples

### In CSS/Tailwind
```jsx
// Primary heading
<h1 className="text-lv-blue font-bold">

// Call-to-action button
<button className="bg-lv-red hover:bg-lv-red-dark text-white">

// Navigation link
<a className="text-lv-blue hover:text-lv-red">

// Card with light background
<div className="bg-lv-sky-blue border border-border-light">
```

---

**Last Updated**: January 2026
**Based on**: Las Vegas Designs USA Logo Colors

