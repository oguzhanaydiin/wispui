# wispui

The React component library.

Native HTML. Fully styled, easy to use, and highly editable.

## Install

```bash
npm i wispui
```

```css
@import "tailwindcss";
@import "wispui/theme.css";
```

```tsx
import { WButton, WispProvider } from "wispui"

<WispProvider>
  <WButton color="primary" variant="subtle" icon="plus">
    New
  </WButton>
</WispProvider>
```

Wrap the app in `WispProvider` for toast, confirm, and overlay. Same props everywhere: `color`, `variant`, `size`, `icon`, `className`.

## Components

Button · Badge · Alert · Avatar · Card · Input · Textarea · Checkbox · Switch · Radio Group · Form Field · Modal · Dropdown · Popover · Tooltip · Toast · Slideover · Progress · Separator · Kbd · Skeleton · Table · Pagination · Code Block · Link · Container · Button Group · Avatar Group · Chip · Accordion · Slider · Select · Breadcrumb · Tabs · Nav · Nav Menu

## Docs

https://oguzhanaydiin.github.io/wispui/

```bash
npm run dev
```

Peer: React 19, Tailwind CSS v4.

## License

MIT
