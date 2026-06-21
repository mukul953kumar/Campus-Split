import { Share2 } from 'lucide-react'
import { formatINR } from '../App'

export default function ResultCard({ result, onShare }) {
  const rows = [
    { label: 'Base Bill', value: result.bill },
    { label: `GST (${result.gstPct}%)`, value: result.gstAmount },
    { label: `Tip (${result.tipPct}%)`, value: result.tipAmount },
    { label: 'Total Amount', value: result.total, bold: true },
    { label: `Per Person (÷ ${result.friends})`, value: result.perPerson, highlight: true },
  ]

  return (
    <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 card-shadow border border-slate-200 dark:border-slate-700 animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Bill Breakdown</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{result.friends} {result.friends === 1 ? 'person' : 'people'} splitting</p>
        </div>
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 text-xs font-medium
            text-violet-600 dark:text-violet-400
            hover:text-violet-800 dark:hover:text-violet-200
            bg-violet-50 dark:bg-violet-900/30
            hover:bg-violet-100 dark:hover:bg-violet-900/50
            px-3 py-1.5 rounded-lg
            transition-all duration-150 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="Copy result to clipboard"
        >
          <Share2 size={13} aria-hidden="true" />
          Share
        </button>
      </div>

      <div className="space-y-1.5">
        {rows.map(({ label, value, bold, highlight }) => (
          <div
            key={label}
            className={`flex justify-between items-center py-2.5 px-3 rounded-xl transition-colors
              ${highlight
                ? 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/25 dark:to-purple-900/25 border border-violet-100 dark:border-violet-800/40 mt-2'
                : 'hover:bg-slate-50 dark:hover:bg-slate-700/30 border border-transparent'
              }`}
          >
            <span className={`text-sm ${highlight
              ? 'text-violet-700 dark:text-violet-300 font-semibold'
              : bold
                ? 'text-slate-800 dark:text-slate-200 font-medium'
                : 'text-slate-500 dark:text-slate-400'
            }`}>
              {label}
            </span>
            <span className={`font-mono ${highlight
              ? 'text-violet-700 dark:text-violet-300 font-bold text-base'
              : bold
                ? 'font-bold text-slate-800 dark:text-slate-200'
                : 'text-slate-700 dark:text-slate-300'
            }`}>
              ₹{formatINR(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
