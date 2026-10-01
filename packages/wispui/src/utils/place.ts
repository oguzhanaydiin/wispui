export type WPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"

function parse(placement: WPlacement) {
  const dash = placement.indexOf("-")
  if (dash === -1) {
    return { side: placement as "top" | "right" | "bottom" | "left", align: "center" as const }
  }
  return {
    side: placement.slice(0, dash) as "top" | "right" | "bottom" | "left",
    align: placement.slice(dash + 1) as "start" | "end",
  }
}

export function placeFloating(
  trigger: DOMRect,
  panel: DOMRect,
  placement: WPlacement,
  gap = 8,
) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const pad = 8
  let { side, align } = parse(placement)

  const wouldOverflow = {
    top: trigger.top - gap - panel.height < pad,
    bottom: trigger.bottom + gap + panel.height > vh - pad,
    left: trigger.left - gap - panel.width < pad,
    right: trigger.right + gap + panel.width > vw - pad,
  }

  if (side === "bottom" && wouldOverflow.bottom) side = "top"
  else if (side === "top" && wouldOverflow.top) side = "bottom"
  else if (side === "right" && wouldOverflow.right) side = "left"
  else if (side === "left" && wouldOverflow.left) side = "right"

  let x = 0
  let y = 0

  if (side === "bottom" || side === "top") {
    y = side === "bottom" ? trigger.bottom + gap : trigger.top - panel.height - gap
    if (align === "start") x = trigger.left
    else if (align === "end") x = trigger.right - panel.width
    else x = trigger.left + (trigger.width - panel.width) / 2
  } else {
    x = side === "right" ? trigger.right + gap : trigger.left - panel.width - gap
    if (align === "start") y = trigger.top
    else if (align === "end") y = trigger.bottom - panel.height
    else y = trigger.top + (trigger.height - panel.height) / 2
  }

  x = Math.min(Math.max(pad, x), Math.max(pad, vw - panel.width - pad))
  y = Math.min(Math.max(pad, y), Math.max(pad, vh - panel.height - pad))

  return { x, y, side }
}
