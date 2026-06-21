import { useState } from 'react'
import { Calculator, Users, Receipt, Percent } from 'lucide-react'

const fields = [
  { name: 'bill', label: 'Total Bill Amount', unit: '₹', icon: Receipt, placeholder: '2500', min: 0, hint: 'Enter the base bill before GST/tip' },
  { name: 'friends', label: 'Number of People', unit: '#', icon: Users, placeholder: '4', min: 1, hint: 'Including yourself' },
  { name: 'gst', label: 'GST Percentage', unit: '%', icon: Percent, placeholder: '18', min: 0, hint: 'Standard GST is 5%, 12% or 18%' },
  { name: 'tip', label: 'Tip Percentage', unit: '%', icon: Percent, placeholder: '10', min: 0, hint: 'Optional — 0% if no tip' },
]

function validate(form) {
  const e = {}
  if (!form.bill || isNaN(form.bill) || Number(form.bill) <= 0) e.bill = 'Enter a valid bill amount greater than 0'
  if (!form.friends || isNaN(form.friends) || Number(form.friends) < 1) e.friends = 'Must have at least 1 person'
  if (form.gst === '' || isNaN(form.gst) || Number(form.gst) < 0) e.gst = 'GST cannot be negative'
  if (form.tip === '' || isNaN(form.tip) || Number(form.tip) < 0) e.tip = 'Tip cannot be negative'
  return e
}

export default function ExpenseForm({ onCalculate, loading }) {
  const [form, setForm] = useState({ bill: '', friends: '', gst: '', tip: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    setTouched({ bill: true, friends: true, gst: true, tip: true })
    if (Object.keys(errs).length > 0) return
    onCalculate({
      bill: Number(form.bill),
      friends: Number(form.friends),
      gst: Number(form.gst),
      tip: Number(form.tip),
    })
  }

  function handleChange(name, value) {
    setForm(p => ({ ...p, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value })
      setErrors(p => ({ ...p, [name]: errs[name] || '' }))
    }
  }

  function handleBlur(name) {
    setTouched(p => ({ ...p, [name]: true }))
    const errs = validate(form)
    setErrors(p => ({ ...p, [name]: errs[name] || '' }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, unit, icon: Icon, placeholder, min, hint }) => (
          <div key={name}>
            <label
              htmlFor={`field-${name}`}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              {label}
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                aria-hidden="true"
              >
                <Icon size={15} />
              </span>
              <input
                id={`field-${name}`}
                type="number"
                min={min}
                step="any"
                placeholder={placeholder}
                value={form[name]}
                onChange={e => handleChange(name, e.target.value)}
                onBlur={() => handleBlur(name)}
                aria-describedby={errors[name] ? `${name}-error` : `${name}-hint`}
                aria-invalid={!!errors[name]}
                className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm
                  bg-slate-50 dark:bg-slate-900/60
                  text-slate-800 dark:text-slate-100
                  placeholder-slate-400 dark:placeholder-slate-600
                  transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:bg-white dark:focus:bg-slate-800
                  ${errors[name]
                    ? 'border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600'
                  }`}
              />
            </div>
            {errors[name] ? (
              <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                {errors[name]}
              </p>
            ) : (
              <p id={`${name}-hint`} className="mt-1 text-xs text-slate-400 dark:text-slate-600">{hint}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600
          hover:from-violet-700 hover:to-purple-700 active:scale-[0.98]
          text-white font-semibold text-sm tracking-wide
          flex items-center justify-center gap-2
          transition-all duration-200 hover:scale-[1.01]
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
          shadow-lg shadow-violet-200 dark:shadow-violet-900/30
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Calculating...
          </>
        ) : (
          <>
            <Calculator size={17} aria-hidden="true" />
            Calculate Split
          </>
        )}
      </button>
    </form>
  )
}
