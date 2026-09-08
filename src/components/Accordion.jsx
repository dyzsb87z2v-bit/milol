import { useId, useState } from 'react'
import { Plus } from 'lucide-react'

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-b hairline">
      <h3 className="font-sans">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-[13px] uppercase tracking-[0.22em] font-medium"
        >
          {title}
          <Plus size={16} strokeWidth={1.25} className={`shrink-0 transition-transform duration-500 ease-luxe ${open ? 'rotate-45' : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-500 ease-luxe"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-[15px] leading-relaxed text-charcoal/70">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function Accordion({ items }) {
  return (
    <div className="border-t hairline">
      {items.map((it, i) => (
        <AccordionItem key={i} title={it.title} defaultOpen={it.defaultOpen}>{it.content}</AccordionItem>
      ))}
    </div>
  )
}
