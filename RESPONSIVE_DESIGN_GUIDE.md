# 📱 Responsive Design Standards

All components must be fully responsive across all devices using these standardized breakpoints and spacing.

## Breakpoints (Tailwind CSS)

```
Mobile:    < 640px   (default, no prefix)
SM:        >= 640px  (sm:)
MD:        >= 768px  (md:)
LG:        >= 1024px (lg:)
XL:        >= 1280px (xl:)
2XL:       >= 1536px (2xl:)
```

## Standard Padding/Spacing

### Container Padding (Horizontal)
Use progressive padding that increases with screen size:

```jsx
className="px-4 sm:px-6 lg:px-8 xl:px-12"
```

- **Mobile**: 16px (px-4)
- **Small**: 24px (sm:px-6)
- **Large**: 32px (lg:px-8)
- **XL**: 48px (xl:px-12)

### Section Padding (Vertical)
```jsx
className="py-12 md:py-16 lg:py-20"
```

- **Mobile**: 48px (py-12)
- **Medium**: 64px (md:py-16)
- **Large**: 80px (lg:py-20)

### Max Width Container
```jsx
className="max-w-[1400px] mx-auto"
```

## Typography Scaling

### Headings
```jsx
// H1 - Hero headings
className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]"

// H2 - Section headings
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"

// H3 - Subsection headings
className="text-xl sm:text-2xl md:text-3xl"

// H4 - Card headings
className="text-lg sm:text-xl md:text-2xl"
```

### Body Text
```jsx
// Large body text
className="text-base sm:text-lg md:text-xl"

// Regular body text
className="text-sm sm:text-base md:text-lg"

// Small text
className="text-xs sm:text-sm"
```

## Grid Systems

### Two Column Layout
```jsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
```

### Three Column Layout
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
```

### Four Column Layout
```jsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
```

## Button Sizing

### Primary/Secondary Buttons
```jsx
className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
```

## Spacing Between Elements

### Margins
```jsx
// Small gaps
className="mb-3 md:mb-4"

// Medium gaps
className="mb-4 md:mb-6"

// Large gaps
className="mb-6 md:mb-8"

// Extra large gaps
className="mb-8 md:mb-12"
```

### Gaps (Flexbox/Grid)
```jsx
// Small
className="gap-3 md:gap-4"

// Medium
className="gap-4 md:gap-6"

// Large
className="gap-6 md:gap-8"

// Extra large
className="gap-8 md:gap-12 lg:gap-16"
```

## Image/Card Sizing

### Min Heights
```jsx
// Small cards
className="min-h-[250px] sm:min-h-[300px]"

// Medium cards
className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"

// Large sections
className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
```

### Border Radius
```jsx
// Mobile: smaller radius, Desktop: larger radius
className="rounded-xl md:rounded-2xl"
```

## Component Example Template

```jsx
export default function ResponsiveComponent() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Heading
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8">
              Description text
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
              Button
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Mobile-First Approach

Always design mobile-first, then add larger breakpoints:

1. ✅ Start with mobile styles (no prefix)
2. ✅ Add sm: for tablets
3. ✅ Add md: for small laptops
4. ✅ Add lg: for desktops
5. ✅ Add xl: for large screens

## Testing Checklist

Test every component at these widths:
- ✅ 375px (Mobile - iPhone SE)
- ✅ 640px (SM breakpoint)
- ✅ 768px (MD breakpoint - iPad)
- ✅ 1024px (LG breakpoint - Laptop)
- ✅ 1280px (XL breakpoint - Desktop)
- ✅ 1920px (Large Desktop)

## Common Patterns

### Hide/Show Elements
```jsx
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="block lg:hidden"
```

### Flex Direction
```jsx
// Stack on mobile, row on desktop
className="flex flex-col lg:flex-row"
```

### Text Alignment
```jsx
// Center on mobile, left on desktop
className="text-center lg:text-left"
```

## Performance Tips

1. Use appropriate image sizes for different screens
2. Lazy load images below the fold
3. Use `srcset` for responsive images
4. Test on real devices, not just browser resize
5. Check touch targets (minimum 44x44px)

---

**Remember**: Every component must work perfectly on ALL devices! 📱💻🖥️

