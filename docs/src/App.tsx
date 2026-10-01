import { useEffect, useState } from "react"
import { WispProvider } from "wispui"
import { DocsLayout } from "./components/DocsLayout.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { AccordionPage } from "./pages/AccordionPage.tsx"
import { AlertPage } from "./pages/AlertPage.tsx"
import { AvatarPage } from "./pages/AvatarPage.tsx"
import { AvatarGroupPage } from "./pages/AvatarGroupPage.tsx"
import { BadgePage } from "./pages/BadgePage.tsx"
import { BreadcrumbPage } from "./pages/BreadcrumbPage.tsx"
import { ButtonPage } from "./pages/ButtonPage.tsx"
import { ButtonGroupPage } from "./pages/ButtonGroupPage.tsx"
import { CardPage } from "./pages/CardPage.tsx"
import { CheckboxPage } from "./pages/CheckboxPage.tsx"
import { ChipPage } from "./pages/ChipPage.tsx"
import { CodeBlockPage } from "./pages/CodeBlockPage.tsx"
import { ContainerPage } from "./pages/ContainerPage.tsx"
import { DropdownPage } from "./pages/DropdownPage.tsx"
import { FormFieldPage } from "./pages/FormFieldPage.tsx"
import { InputPage } from "./pages/InputPage.tsx"
import { KbdPage } from "./pages/KbdPage.tsx"
import { LinkPage } from "./pages/LinkPage.tsx"
import { ModalPage } from "./pages/ModalPage.tsx"
import { NavPage } from "./pages/NavPage.tsx"
import { NavMenuPage } from "./pages/NavMenuPage.tsx"
import { PaginationPage } from "./pages/PaginationPage.tsx"
import { PopoverPage } from "./pages/PopoverPage.tsx"
import { ProgressPage } from "./pages/ProgressPage.tsx"
import { RadioGroupPage } from "./pages/RadioGroupPage.tsx"
import { SelectPage } from "./pages/SelectPage.tsx"
import { SeparatorPage } from "./pages/SeparatorPage.tsx"
import { SkeletonPage } from "./pages/SkeletonPage.tsx"
import { SliderPage } from "./pages/SliderPage.tsx"
import { SlideoverPage } from "./pages/SlideoverPage.tsx"
import { SwitchPage } from "./pages/SwitchPage.tsx"
import { TablePage } from "./pages/TablePage.tsx"
import { TabsPage } from "./pages/TabsPage.tsx"
import { TextareaPage } from "./pages/TextareaPage.tsx"
import { ToastPage } from "./pages/ToastPage.tsx"
import { TooltipPage } from "./pages/TooltipPage.tsx"

const pages = {
  "/button": ButtonPage,
  "/accordion": AccordionPage,
  "/avatar": AvatarPage,
  "/avatar-group": AvatarGroupPage,
  "/modal": ModalPage,
  "/nav": NavPage,
  "/nav-menu": NavMenuPage,
  "/badge": BadgePage,
  "/breadcrumb": BreadcrumbPage,
  "/alert": AlertPage,
  "/button-group": ButtonGroupPage,
  "/card": CardPage,
  "/chip": ChipPage,
  "/input": InputPage,
  "/textarea": TextareaPage,
  "/checkbox": CheckboxPage,
  "/code-block": CodeBlockPage,
  "/container": ContainerPage,
  "/switch": SwitchPage,
  "/radio-group": RadioGroupPage,
  "/select": SelectPage,
  "/form-field": FormFieldPage,
  "/dropdown": DropdownPage,
  "/separator": SeparatorPage,
  "/kbd": KbdPage,
  "/link": LinkPage,
  "/skeleton": SkeletonPage,
  "/slider": SliderPage,
  "/slideover": SlideoverPage,
  "/table": TablePage,
  "/tabs": TabsPage,
  "/pagination": PaginationPage,
  "/popover": PopoverPage,
  "/progress": ProgressPage,
  "/toast": ToastPage,
  "/tooltip": TooltipPage,
} as const

function pathOf() {
  return window.location.pathname.replace(/\/$/, "") || "/"
}

function scrollToHash() {
  const id = window.location.hash.slice(1)
  if (!id) {
    window.scrollTo(0, 0)
    return
  }
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  })
}

export default function App() {
  const [path, setPath] = useState(pathOf)

  useEffect(() => {
    function sync() {
      setPath(pathOf())
      scrollToHash()
    }
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  useEffect(() => {
    scrollToHash()
  }, [path])

  const home = path === "/"
  const Page = home ? HomePage : path in pages ? pages[path as keyof typeof pages] : ButtonPage

  return (
    <WispProvider>
      {home ? (
        <Page />
      ) : (
        <DocsLayout>
          <Page />
        </DocsLayout>
      )}
    </WispProvider>
  )
}
