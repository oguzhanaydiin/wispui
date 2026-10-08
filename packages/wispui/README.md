# wispui

React 19 component library for Tailwind CSS v4. Native HTML. Fully styled, easy to use, and highly editable.

No Radix. No copy-paste kit. You install the package, pass data, and ship. Same props on every component: `color`, `variant`, `size`, `icon`, `className`.

**Docs:** [oguzhanaydiin.github.io/wispui](https://oguzhanaydiin.github.io/wispui)

## Install

```bash
npm i wispui
```

Peer: React 19, React DOM, Tailwind CSS v4.

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

Wrap the app in `WispProvider` for toast, confirm, modal-from-code, and other overlays.

## Components

Button, Button Group, Badge, Chip, Alert, Avatar, Avatar Group, Card, Container, Separator, Skeleton, Progress, Kbd, Code Block, Input, Textarea, Form Field, Checkbox, Switch, Radio Group, Select, Slider, Modal, Slideover, Popover, Tooltip, Dropdown, Toast, Link, Nav, Nav Menu, Breadcrumb, Tabs, Pagination, Table, Accordion.

## License

MIT
