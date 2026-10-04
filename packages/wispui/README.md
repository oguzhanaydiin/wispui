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

Peer: React 19, Tailwind CSS v4.

## License

MIT
