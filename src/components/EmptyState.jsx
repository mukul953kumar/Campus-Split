import { SplitSquareHorizontal, ArrowRight } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center animate-fade-in">
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
          <SplitSquareHorizontal size={34} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-800 animate-pulse" />
      </div>

      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-2">
        Ready to Split Expenses
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
        Enter your bill details on the left to see a complete breakdown with GST, tip, and per-person share.
      </p>

      <div className="mt-6 flex items-center gap-2 text-xs text-violet-500 dark:text-violet-400 font-medium">
        <ArrowRight size={13} className="animate-bounce-x" />
        Fill the form to get started
      </div>
    </div>
  )
}
