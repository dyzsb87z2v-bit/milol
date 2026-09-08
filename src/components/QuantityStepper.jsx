import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, min = 1, max = 9, size = 'md', label = 'Quantity' }) {
  const h = size === 'sm' ? 'h-9' : 'h-12'
  const w = size === 'sm' ? 'w-9' : 'w-12'
  return (
    <div className={`inline-flex items-center border hairline ${h}`} role="group" aria-label={label}>
      <button type="button" className={`${w} ${h} inline-flex items-center justify-center hover:bg-charcoal/5 disabled:opacity-30`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={14} strokeWidth={1.25} />
      </button>
      <output className="w-10 text-center text-sm tabular-nums" aria-live="polite">{value}</output>
      <button type="button" className={`${w} ${h} inline-flex items-center justify-center hover:bg-charcoal/5 disabled:opacity-30`} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={14} strokeWidth={1.25} />
      </button>
    </div>
  )
}
