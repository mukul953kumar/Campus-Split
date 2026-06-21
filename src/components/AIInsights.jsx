import { Sparkles, TrendingDown, AlertCircle, Users, ThumbsUp, Coffee, Wallet } from 'lucide-react'

function getSuggestions({ perPerson, friends, gstPct, tipPct, bill, total }) {
  const insights = []

  if (tipPct > 15) {
    insights.push({
      icon: TrendingDown,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: `Your tip is ${tipPct}% — that's adding ₹${((bill * tipPct) / 100).toFixed(0)} to the bill. Consider 10% to keep it reasonable.`,
    })
  } else if (tipPct === 0 && bill > 500) {
    insights.push({
      icon: Coffee,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'No tip added. A 5–10% tip is a great way to appreciate good service.',
    })
  }

  if (gstPct > 18) {
    insights.push({
      icon: AlertCircle,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: `GST of ${gstPct}% is unusually high. Double-check whether GST was already included in the printed bill.`,
    })
  } else if (gstPct === 0 && bill > 1000) {
    insights.push({
      icon: AlertCircle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'GST is set to 0%. Most restaurants charge 5–18% GST. Confirm if it\'s included in the bill.',
    })
  }

  if (friends > 8) {
    insights.push({
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: `Splitting among ${friends} people? Collect payments digitally via UPI before paying to avoid confusion.`,
    })
  }

  if (perPerson > 1000) {
    insights.push({
      icon: Wallet,
      color: 'text-violet-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      text: `Each person owes ₹${Math.round(perPerson).toLocaleString('en-IN')}. Consider splitting the bill into smaller rounds next time.`,
    })
  }

  if (friends === 1) {
    insights.push({
      icon: Coffee,
      color: 'text-pink-500',
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      text: 'Dining solo today? Treat yourself — you deserve it!',
    })
  }

  if (insights.length === 0) {
    insights.push({
      icon: ThumbsUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'Everything looks well balanced! GST and tip percentages are in a healthy range.',
    })
  }

  return insights
}

export default function AIInsights({ result }) {
  const insights = getSuggestions(result)

  return (
    <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 dark:border-slate-700 animate-slide-up card-shadow">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
          <Sparkles size={15} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">AI Insights</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">{insights.length} smart suggestion{insights.length !== 1 ? 's' : ''} based on your split</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {insights.map(({ icon: Icon, color, bg, text }, i) => (
          <div key={i} className={`flex gap-3 items-start ${bg} rounded-xl px-3.5 py-3`}>
            <Icon size={15} className={`${color} mt-0.5 shrink-0`} aria-hidden="true" />
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
