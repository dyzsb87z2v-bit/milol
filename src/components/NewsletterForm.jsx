import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { load, save } from '@/lib/storage'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterForm({ tone = 'dark', compact = false, buttonLabel = 'Join the List' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | error | done
  const dark = tone === 'dark'

  const submit = (e) => {
    e.preventDefault()
    if (!EMAIL.test(email)) return setState('error')
    save('newsletter', [...new Set([...load('newsletter', []), email.toLowerCase()])])
    setState('done')
  }

  if (state === 'done') {
    return (
      <p className={`serif text-2xl ${dark ? 'text-charcoal' : 'text-ivory'}`} role="status">
        Thank you. Your first note will arrive shortly.
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate className={`flex ${compact ? 'items-end gap-4' : 'flex-col sm:flex-row sm:items-end gap-6'}`}>
      <div className="flex-1">
        <label htmlFor={`nl-${tone}-${compact}`} className="sr-only">Email address</label>
        <input
          id={`nl-${tone}-${compact}`}
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState('idle') }}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? `nl-err-${tone}` : undefined}
          className={`field ${dark ? '' : 'field-dark'}`}
        />
        {state === 'error' && <p id={`nl-err-${tone}`} className="error-text">Please enter a valid email address.</p>}
      </div>
      {compact ? (
        <button type="submit" className={`icon-btn ${dark ? '' : 'text-ivory'}`} aria-label={buttonLabel}>
          <ArrowRight size={18} strokeWidth={1.25} />
        </button>
      ) : (
        <button type="submit" className={`btn ${dark ? 'btn-charcoal' : 'btn-ivory'}`}>{buttonLabel}</button>
      )}
    </form>
  )
}
