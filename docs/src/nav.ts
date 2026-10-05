import type { WNavItem } from "wispui"
import { withBase } from "./base"

function withDocsBase(items: WNavItem[]): WNavItem[] {
  return items.map((item) => ({
    ...item,
    href: item.href ? withBase(item.href) : item.href,
    exact: item.href === "/" ? true : item.exact,
    children: item.children ? withDocsBase(item.children) : item.children,
  }))
}

export const docsNav: WNavItem[] = withDocsBase([
  {
    type: "label",
    label: "Getting started",
    children: [{ href: "/", label: "Overview" }],
  },
  {
    type: "label",
    label: "Element",
    children: [
      { href: "/button", label: "Button" },
      { href: "/button-group", label: "Button Group" },
      { href: "/badge", label: "Badge" },
      { href: "/chip", label: "Chip" },
      { href: "/alert", label: "Alert" },
      { href: "/avatar", label: "Avatar" },
      { href: "/avatar-group", label: "Avatar Group" },
      { href: "/card", label: "Card" },
      { href: "/container", label: "Container" },
      { href: "/separator", label: "Separator" },
      { href: "/skeleton", label: "Skeleton" },
      { href: "/progress", label: "Progress" },
      { href: "/kbd", label: "Kbd" },
      { href: "/code-block", label: "Code Block" },
    ],
  },
  {
    type: "label",
    label: "Form",
    children: [
      { href: "/input", label: "Input" },
      { href: "/textarea", label: "Textarea" },
      { href: "/form-field", label: "Form Field" },
      { href: "/checkbox", label: "Checkbox" },
      { href: "/switch", label: "Switch" },
      { href: "/radio-group", label: "Radio Group" },
      { href: "/select", label: "Select" },
      { href: "/slider", label: "Slider" },
    ],
  },
  {
    type: "label",
    label: "Overlay",
    children: [
      { href: "/modal", label: "Modal" },
      { href: "/slideover", label: "Slideover" },
      { href: "/popover", label: "Popover" },
      { href: "/tooltip", label: "Tooltip" },
      { href: "/dropdown", label: "Dropdown" },
      { href: "/toast", label: "Toast" },
    ],
  },
  {
    type: "label",
    label: "Navigation",
    children: [
      { href: "/link", label: "Link" },
      { href: "/nav", label: "Nav" },
      { href: "/nav-menu", label: "Nav Menu" },
      { href: "/breadcrumb", label: "Breadcrumb" },
      { href: "/tabs", label: "Tabs" },
      { href: "/pagination", label: "Pagination" },
    ],
  },
  {
    type: "label",
    label: "Data",
    children: [
      { href: "/table", label: "Table" },
      { href: "/accordion", label: "Accordion" },
    ],
  },
])
