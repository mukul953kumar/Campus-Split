import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, SplitSquareHorizontal, RotateCcw } from 'lucide-react'
import ExpenseForm from './components/ExpenseForm'
import ResultCard from './components/ResultCard'
import StatsCards from './components/StatsCards'
import AIInsights from './components/AIInsights'
import ThemeToggle from './components/ThemeToggle'
import Footer from './components/Footer'
import EmptyState from './components/EmptyState'
import './index.css'

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 toast-enter">
      <div className="flex items-center gap-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium whitespace-nowrap">
        <CheckCircle size={16} className="text-emerald-400 dark:text-emerald-600 shrink-0" />
        {message}
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  function calculate({ bill, friends, gst, tip }) {
    setLoading(true)
    setTimeout(() => {
      const gstAmount = (bill * gst) / 100
      const tipAmount = (bill * tip) / 100
      const total = bill + gstAmount + tipAmount
      const perPerson = total / friends
      setResult({ bill, friends, gstPct: gst, tipPct: tip, gstAmount, tipAmount, total, perPerson })
      setLoading(false)
    }, 800)
  }

  function handleReset() {
    setResult(null)
    setResetKey(k => k + 1)
  }

  const handleShare = useCallback(() => {
    if (!result) return
    const text = [
      'Campus Split AI Result',
      '',
      `Bill Amount: ₹${formatINR(result.bill)}`,
      `GST (${result.gstPct}%): ₹${formatINR(result.gstAmount)}`,
      `Tip (${result.tipPct}%): ₹${formatINR(result.tipAmount)}`,
      `Total: ₹${formatINR(result.total)}`,
      `Per Person: ₹${formatINR(result.perPerson)}`,
      '',
      'Calculated using Campus Split AI',
    ].join('\n')
    navigator.clipboard.writeText(text).then(() => setToast('Result copied to clipboard!'))
  }, [result])

  const hideToast = useCallback(() => setToast(null), [])

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/campusspilit_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-white/60 dark:bg-slate-950/75" />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-purple-700/90 to-indigo-800/90 dark:from-violet-900/95 dark:via-purple-950/95 dark:to-slate-900/95" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <SplitSquareHorizontal size={20} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Campus Split</span>
          </div>
          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all"
                aria-label="Reset calculator"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pb-20 pt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Smart Bill Splitter for Students & Friends
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Split Bills Like a <span className="text-yellow-300">Pro</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Add GST, tip, and friends — get instant per-person calculations with AI-powered insights.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 card-shadow border border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-5 text-base">Enter Bill Details</h2>
            <ExpenseForm key={resetKey} onCalculate={calculate} loading={loading} />
          </div>

          <div className="flex flex-col gap-5">
            {result ? (
              <>
                <ResultCard result={result} onShare={handleShare} />
                <AIInsights result={result} />
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl card-shadow border border-slate-200 dark:border-slate-700 flex-1">
                <EmptyState />
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="mt-5">
            <StatsCards result={result} />
          </div>
        )}
      </main>

      <Footer />
      {toast && <Toast message={toast} onClose={hideToast} />}
    </div>
  )
}
