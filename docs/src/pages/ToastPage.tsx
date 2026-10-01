import { WButton, WModal, confirm, toast, useOverlay, type OverlayClose } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function Note({ close }: { close: OverlayClose }) {
  return (
    <WModal
      open
      title="Note"
      description="This is overlay.create().open(), not confirm."
      onOpenChange={(next) => {
        if (!next) close()
      }}
      footer={
        <WButton onClick={() => close("saved")}>Done</WButton>
      }
    >
      <p className="text-sm text-neutral-600">Any component with a close prop can live on the overlay stack.</p>
    </WModal>
  )
}

export function ToastPage() {
  const overlay = useOverlay()

  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Toast</h1>
        <p className="text-neutral-500">
          Wrap the app in <code className="text-neutral-800">WispProvider</code>. Then{" "}
          <code className="text-neutral-800">toast.add()</code> and{" "}
          <code className="text-neutral-800">await confirm()</code> work from anywhere. Confirm is not a
          component you put in JSX. It is a function that mounts{" "}
          <code className="text-neutral-800">WModal</code> inside the provider.
        </p>
      </header>

      <Code>{`<WispProvider>
  <App />
</WispProvider>

toast.add({ title: "Saved", color: "success" })

const ok = await confirm({ title: "Delete?", color: "error" })`}</Code>

      <Section title="Toast" description="toast.add. Color tints the icon. Duration is 5s; 0 stays until you close it.">
        <div className="flex flex-wrap gap-2">
          <WButton
            onClick={() => toast.add({ title: "Saved", description: "Your changes are live." })}
          >
            Default
          </WButton>
          <WButton
            color="success"
            variant="subtle"
            onClick={() => toast.add({ title: "Published", color: "success" })}
          >
            Success
          </WButton>
          <WButton
            color="error"
            variant="subtle"
            onClick={() =>
              toast.add({
                title: "Could not save",
                description: "Try again in a moment.",
                color: "error",
              })
            }
          >
            Error
          </WButton>
          <WButton
            color="neutral"
            variant="outline"
            onClick={() => toast.add({ title: "Pinned", duration: 0 })}
          >
            Stay open
          </WButton>
        </div>
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-2">
          {(["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const).map((color) => (
            <WButton
              key={color}
              color={color}
              variant="subtle"
              onClick={() => toast.add({ title: color, color })}
            >
              {color}
            </WButton>
          ))}
        </div>
      </Section>

      <Section title="Actions" description="Buttons on the toast. Click does not close it unless you toast.remove.">
        <WButton
          variant="outline"
          onClick={() => {
            const item = toast.add({
              title: "File uploaded",
              description: "report.pdf",
              color: "info",
              duration: 0,
              actions: [
                {
                  label: "Undo",
                  onClick: () => {
                    toast.remove(item.id)
                    toast.add({ title: "Undone", color: "neutral" })
                  },
                },
              ],
            })
          }}
        >
          With action
        </WButton>
      </Section>

      <Section
        title="Confirm"
        description="No WModal on this page. confirm() tells WispProvider to mount one. Same dialog as Modal, opened from a function."
      >
        <div className="flex flex-wrap gap-2">
          <WButton
            color="error"
            icon="trash"
            onClick={async () => {
              const ok = await confirm({
                title: "Delete project?",
                description: "This cannot be undone.",
                color: "error",
                confirmLabel: "Delete",
              })
              toast.add(
                ok
                  ? { title: "Deleted", color: "success" }
                  : { title: "Cancelled", color: "neutral" },
              )
            }}
          >
            Delete
          </WButton>
          <WButton
            variant="subtle"
            onClick={async () => {
              const ok = await confirm({ title: "Leave this page?" })
              toast.add({ title: ok ? "Left" : "Stayed", color: ok ? "warning" : "neutral" })
            }}
          >
            Confirm
          </WButton>
        </div>
      </Section>

      <Code>{`const ok = await confirm({
  title: "Delete project?",
  description: "This cannot be undone.",
  color: "error",
  confirmLabel: "Delete",
})
// ok === true: Confirm
// ok === false: Cancel

// what confirm() mounts (you don't write this):
<WModal
  open
  title={title}
  dismissible={false}
  close={false}
  footer={
    <>
      <WButton onClick={() => close(false)}>Cancel</WButton>
      <WButton color={color} onClick={() => close(true)}>Confirm</WButton>
    </>
  }
/>`}</Code>

      <Section title="Overlay" description="useOverlay().create(Component).open() for any modal, not just confirm.">
        <WButton
          color="neutral"
          variant="outline"
          onClick={async () => {
            const result = await overlay.create(Note).open()
            if (result != null) toast.add({ title: "Closed overlay", description: String(result) })
          }}
        >
          Open overlay
        </WButton>
      </Section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">API</h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["toast.add(input)", "ToastInput -> ToastRecord", "-"],
                ["toast.update(id, patch)", "void", "-"],
                ["toast.remove(id)", "void", "-"],
                ["toast.clear()", "void", "-"],
                ["confirm(options)", "Promise<boolean>", "-"],
                ["useOverlay().create(Comp).open()", "Promise<unknown>", "-"],
                ["title", "ReactNode", "-"],
                ["description", "ReactNode", "-"],
                ["icon", "IconName | ReactNode | false", "follows color"],
                ["color", "Color", "primary"],
                ["duration", "number (ms)", "5000; 0 = persist"],
                ["close", "boolean", "true"],
                ["actions", "{ label, color, variant, icon, onClick }[]", "-"],
                ["confirm.confirmLabel", "string", "Confirm"],
                ["confirm.cancelLabel", "string", "Cancel"],
                ["WispProvider toaster.position", "top-|bottom- + left|center|right", "bottom-right"],
                ["WispProvider toaster.max", "number", "5"],
              ].map(([name, type, fallback]) => (
                <tr key={name}>
                  <td className="px-3 py-2 font-mono text-xs">{name}</td>
                  <td className="px-3 py-2 font-mono text-xs text-neutral-500">{type}</td>
                  <td className="px-3 py-2 font-mono text-xs text-neutral-500">{fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
