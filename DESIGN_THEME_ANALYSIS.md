# Las Vegas Designs USA - Design Theme Analysis

## 🎨 **Brand Colors**

### Primary Colors
- **Red**: `#9C0F17` (`--lv-red`) - Primary brand red
- **Blue**: `#183559` (`--lv-blue`) - Primary navy blue

### Color Variations
- **Red**: `--lv-red-dark` (#7d0c12), `--lv-red-light` (#c0121d), `--lv-red-pale` (#fef2f2)
- **Blue**: `--lv-blue-light` (#1e3f6a), `--lv-blue-lighter` (#2d4f7a), `--lv-sky-blue` (#eef2fb), `--lv-blue-pale` (#f8fafc)

### Usage Patterns
- **Headings**: Blue (`text-lv-blue`) with `text-shadow-blue`
- **Subheadings/Accents**: Red (`text-lv-red`) with `text-shadow-red`
- **Service Labels**: Red text on pale red background (`bg-lv-red-pale text-lv-red`)
- **Primary Buttons**: Red background (`bg-lv-red`) with white text
- **Secondary Buttons**: White background with blue text, gray border

---

## 📐 **Page Structure Pattern**

### Standard Service Pages (Custom Vector, CNC, SVG)
```
1. TopTicker
2. Navbar
3. Hero Section (ServiceHero)
4. Multiple ServiceHero sections (alternating layouts)
5. ServiceCards section (2 or 3 columns)
6. WhyChooseUs section (with FAQ)
7. EtsyReviews section
8. QuickQuote section
9. Footer
10. GoUp button
11. ChatButton
```

### Special Pages (Contact, Payment)
```
1. TopTicker
2. Navbar
3. Custom Hero (ContactHero/PaymentHero)
4. Form Section (ContactFormSection/PaymentFormSection)
5. EtsyReviews (Contact only)
6. Footer
7. GoUp button
8. ChatButton
```

---

## 🧩 **Component Patterns**

### 1. **ServiceHero Component**
- **Layout Options**:
  - Normal: Content left, Image right
  - Swapped: Image left, Content right (`swapLayout={true}`)
  - Centered: Text-only centered layout (`centered={true}`)
  - Narrow: 55/40 split instead of 50/50 (`narrowLayout={true}`)

- **Structure**:
  - Service Label (optional)
  - Main Heading (Blue, bold, with text shadow)
  - Subheading (Red, bold, optional)
  - Description (Gray text, multi-paragraph support)
  - Features List (bullet points with gray dots)
  - Action Buttons (Primary red, Secondary white)

- **Styling**:
  - Section padding: `py-8 md:py-12 lg:py-16`
  - Max width: `max-w-[1400px]`
  - Image container: White background, rounded-xl, custom shadow with red/blue tints
  - Image min-height: `min-h-[400px] sm:min-h-[450px] md:min-h-[500px]`

### 2. **ServiceCards Component**
- **Grid Layouts**:
  - 3 columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (default)
  - 2 columns: `grid-cols-1 lg:grid-cols-2` (when `columns={2}`)
  - Max width: `max-w-7xl` for 2 columns, `max-w-[1400px]` for 3 columns

- **Card Structure**:
  - Image container (gradient background, `h-56 sm:h-64 md:h-72 lg:h-80`)
  - Decorative separator (gradient line with red/blue dots)
  - Icon + Label
  - Title (Red, bold)
  - Features list (gray bullets)
  - CTA Button (red gradient)

- **Styling**:
  - Card: White background, border, rounded-2xl, shadow-lg
  - Hover effects: Shadow increase, slight translate up
  - Gap spacing: `gap-10 md:gap-12 lg:gap-16` for 2 columns, `gap-6 md:gap-8` for 3 columns

### 3. **WhyChooseUs Component**
- **Layout**: 2-column grid (Benefits left, FAQ right)
- **Left Column**:
  - Service Label
  - Heading (Blue)
  - Description
  - Benefits list (Red checkmarks)
  - CTA Buttons
- **Right Column**:
  - FAQ Accordion
  - Expandable items with blue questions, gray answers
- **Styling**: White cards with border, rounded-xl, shadow-sm

### 4. **ServiceLabel Component**
- **Style**: Pill-shaped badge
- **Colors**: `bg-lv-red-pale text-lv-red`
- **Typography**: Bold, uppercase, tracking-wide
- **Size**: `text-[10px] sm:text-xs`
- **Padding**: `px-3 sm:px-4 py-1.5 sm:py-2`
- **Shape**: `rounded-full`

### 5. **QuickQuote Component**
- **Layout**: Horizontal card with content left, button/phone right
- **Styling**: White card, border, rounded-xl, shadow-md
- **Button**: Red primary button
- **Phone**: Gray text, clickable link

---

## 📝 **Typography Patterns**

### Headings
- **H1 (Main)**: 
  - Size: `text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px]`
  - Color: `text-lv-blue` or `text-gray-800`
  - Style: `font-bold`, `text-shadow-blue`
  - Line height: `leading-[1.2]`

- **H2 (Section)**: 
  - Size: `text-[17px] sm:text-[23px] md:text-[29px]` (WhyChooseUs/FAQ)
  - Size: `text-[20px] sm:text-[29px] md:text-[41px]` (ServiceCards heading)
  - Color: `text-lv-blue`
  - Style: `font-bold`, `text-shadow-blue`

- **H3 (Subheading)**: 
  - Size: `text-sm sm:text-base md:text-lg`
  - Color: `text-lv-red`
  - Style: `font-bold`, `text-shadow-red`

### Body Text
- **Description**: 
  - Size: `text-sm sm:text-[14px] md:text-base`
  - Color: `text-[#6b7280]`
  - Style: `font-medium`, `leading-[1.75]`, `text-shadow-sm`

- **Features/Benefits**: 
  - Size: `text-sm`
  - Color: `text-[#4b5563]` or `text-gray-700`
  - Style: `font-normal` or `font-medium`

### Buttons
- **Primary**: 
  - Background: `bg-lv-red hover:bg-lv-red-dark`
  - Text: White, bold
  - Size: `text-[15px]` or `text-sm`
  - Padding: `px-7 py-3.5`
  - Border radius: `rounded-[10px]` or `rounded-full`
  - Shadow: `shadow-lg hover:shadow-xl`

- **Secondary**: 
  - Background: `bg-white`
  - Text: `text-lv-blue hover:text-lv-red`
  - Border: `border border-gray-300` or `border-2`
  - Same padding and radius as primary

---

## 🎯 **Spacing Patterns**

### Section Padding
- Standard: `py-8 md:py-12 lg:py-16`
- ServiceCards: `py-6 md:py-8 lg:py-10`

### Container Padding
- Horizontal: `px-4 sm:px-6 lg:px-8 xl:px-12`
- Max width: `max-w-[1400px]` (most sections)
- Max width: `max-w-7xl` (2-column ServiceCards)

### Gaps
- Grid gaps: `gap-8 md:gap-12 lg:gap-16` (ServiceHero)
- Card gaps: `gap-10 md:gap-12 lg:gap-16` (2-column), `gap-6 md:gap-8` (3-column)
- Button gaps: `gap-4` or `gap-5 sm:gap-6`

### Margins
- Heading margins: `mb-4` or `mb-5` or `mb-6`
- Description margins: `mb-5` or `mb-6`
- List margins: `mb-6` or `mb-8`

---

## 🖼️ **Image Patterns**

### Image Containers
- **Background**: White (`bg-white`)
- **Border radius**: `rounded-xl md:rounded-2xl`
- **Padding**: `p-3 sm:p-4 md:p-5 lg:p-6`
- **Min height**: `min-h-[400px] sm:min-h-[450px] md:min-h-[500px]`
- **Shadow**: Custom box-shadow with red/blue tints
- **Border**: `0.5px solid rgba(156, 15, 23, 0.08)`

### Image Display
- **Object fit**: `object-contain` (ServiceCards), `object-cover` (if needed)
- **Padding around images**: `p-2 sm:p-3 md:p-4` (ServiceCards)
- **Responsive sizing**: `w-full h-auto`

### Placeholders
- Gray background: `bg-gray-100`
- Icon: SVG image icon, gray color
- Text: `text-gray-400 text-xs sm:text-sm`

---

## ✨ **Animation Patterns**

### Scroll Animations
- **FadeInRight**: Content from left
- **FadeInLeft**: Content from right
- **FadeInUp**: Content from bottom
- **Delays**: Incremental (0.1, 0.2, 0.3, etc.)

### Hover Effects
- **Buttons**: Shadow increase, color change
- **Cards**: Shadow increase, slight translate up (`hover:-translate-y-1`)
- **Images**: Scale up (`group-hover:scale-105`)
- **Transitions**: `transition-all duration-200` or `duration-300`

---

## 🎨 **Shadow Patterns**

### Box Shadows
- **Cards**: `shadow-lg`, `shadow-md`, `shadow-sm`
- **Hover**: `hover:shadow-xl`, `hover:shadow-2xl`
- **Custom ServiceHero image**: 
  ```css
  boxShadow: '0 10px 30px rgba(156, 15, 23, 0.15), 0 4px 15px rgba(24, 53, 89, 0.2)'
  ```
- **Payment card**: 
  ```css
  boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  ```

### Text Shadows
- **Blue headings**: `text-shadow-blue` (rgba(24, 53, 89, 0.2))
- **Red headings**: `text-shadow-red` (rgba(156, 15, 23, 0.2))
- **General**: `text-shadow-sm` (rgba(0, 0, 0, 0.1))

---

## 🔘 **Button Patterns**

### Primary Button
```jsx
className="inline-block bg-lv-red hover:bg-lv-red-dark text-white font-bold px-7 py-3.5 rounded-[10px] transition-all duration-200 text-center text-[15px] shadow-lg hover:shadow-xl"
```

### Secondary Button
```jsx
className="inline-block bg-white text-lv-blue hover:text-lv-red font-bold px-7 py-3.5 rounded-[10px] border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-center text-[15px]"
```

### Rounded Full Button (Contact/Payment)
- Same styles but `rounded-full` instead of `rounded-[10px]`

---

## 📋 **Form Patterns**

### Form Sections
- **Background**: `bg-gray-100` (main card), `bg-white` (inner cards)
- **Border**: `border border-gray-300`
- **Border radius**: `rounded-xl`
- **Padding**: `p-6 md:p-8`
- **Shadow**: Custom shadows for emphasis

### Form Fields
- Standard input styling with gray borders
- Focus states with brand colors
- Labels in gray or blue

---

## 🏷️ **Badge/Pill Patterns**

### Service Labels
- Background: `bg-lv-red-pale`
- Text: `text-lv-red`
- Shape: `rounded-full`
- Size: `text-[10px] sm:text-xs`

### Feature Badges
- Background: `bg-white` or `bg-gray-100`
- Border: `border border-gray-300`
- Text: `text-gray-700`
- Shape: `rounded-full`
- Size: `text-xs sm:text-sm`
- Padding: `px-3 py-1.5` or `px-4 py-2`

---

## 📱 **Responsive Breakpoints**

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Common Responsive Patterns
- Text sizes: `text-[base] sm:text-[sm] md:text-[md]`
- Padding: `p-[base] sm:p-[sm] md:p-[md] lg:p-[lg]`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gaps: `gap-[base] md:gap-[md] lg:gap-[lg]`

---

## 🎯 **Key Design Principles**

1. **Consistency**: All service pages follow the same structure
2. **Brand Colors**: Red and blue used consistently throughout
3. **Typography Hierarchy**: Clear heading sizes and weights
4. **Spacing**: Generous padding and margins for readability
5. **Shadows**: Subtle shadows for depth, custom shadows for emphasis
6. **Animations**: Smooth scroll animations with incremental delays
7. **Hover States**: Interactive feedback on all clickable elements
8. **Responsive**: Mobile-first approach with progressive enhancement
9. **Accessibility**: Good contrast ratios, semantic HTML
10. **Visual Hierarchy**: Service labels, headings, descriptions, features in order

---

## 📦 **Reusable Components**

1. **ServiceHero** - Main service section with image and content
2. **ServiceCards** - Grid of service cards (2 or 3 columns)
3. **WhyChooseUs** - Benefits and FAQ section
4. **QuickQuote** - CTA section with button and phone
5. **ServiceLabel** - Small badge/label component
6. **ScrollAnimation** - Wrapper for scroll-triggered animations
7. **EtsyReviews** - Reviews widget section
8. **ContactHero** - Contact page hero
9. **PaymentHero** - Payment page hero
10. **ContactFormSection** - Contact form with quick contact
11. **PaymentFormSection** - Payment form with summary

---

## 🔍 **Special Layouts**

### Centered Text-Only Section
- Use `centered={true}` on ServiceHero
- No image, all content centered
- Max width: `max-w-4xl mx-auto`

### Narrow Layout
- Use `narrowLayout={true}` on ServiceHero
- Grid: `lg:grid-cols-[55%_40%]` instead of 50/50

### Swapped Layout
- Use `swapLayout={true}` on ServiceHero
- Image on left, content on right

---

## ✅ **Checklist for New Pages**

When creating a new page, ensure:

- [ ] Uses TopTicker and Navbar at top
- [ ] Uses Footer, GoUp, and ChatButton at bottom
- [ ] Follows standard section padding (`py-8 md:py-12 lg:py-16`)
- [ ] Uses max-width container (`max-w-[1400px]`)
- [ ] Uses brand colors (red `#9C0F17`, blue `#183559`)
- [ ] Includes ServiceLabel for section badges
- [ ] Uses ScrollAnimation for all content
- [ ] Follows typography hierarchy
- [ ] Includes proper hover states
- [ ] Is fully responsive
- [ ] Uses consistent spacing patterns
- [ ] Includes proper shadows and borders
- [ ] Follows button styling patterns
