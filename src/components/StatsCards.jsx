import { IndianRupee, Users, TrendingUp, Tag } from 'lucide-react'
import { formatINR } from '../App'

const statConfig = [
  {
    key: 'total',
    label: 'Total Amount',
    icon: IndianRupee,
    bg: 'bg-white dark:bg-slate-800/90',
    text: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
  },
  {
    key: 'perPerson',
    label: 'Per Person',
    icon: Users,
    bg: 'bg-gradient-to-br from-violet-600 to-purple-700 dark:from-violet-700 dark:to-purple-800',
    text: 'text-white',
    iconBg: 'bg-white/20',
    highlight: true,
  },
  {
    key: 'gstAmount',
    label: 'GST Amount',
    icon: TrendingUp,
    bg: 'bg-white dark:bg-slate-800/90',
    text: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  {
    key: 'tipAmount',
    label: 'Tip Amount',
    icon: Tag,
    bg: 'bg-white dark:bg-slate-800/90',
    text: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
  },
]

export default function StatsCards({ result }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
      {statConfig.map(({ key, label, icon: Icon, bg, text, iconBg, highlight }, i) => (
        <div
          key={key}
          className={`${bg} rounded-2xl p-4 card-shadow border ${highlight ? 'border-violet-500/30 dark:border-violet-600/30 lg:scale-[1.03]' : 'border-slate-200 dark:border-slate-700/60'} transition-transform hover:scale-[1.02]`}
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center mb-3`}>
            <Icon size={16} className={highlight ? 'text-white' : text} aria-hidden="true" />
          </div>
          <p className={`text-xs font-medium mb-1 ${highlight ? 'text-white/75' : 'text-slate-500 dark:text-slate-400'}`}>
            {label}
          </p>
          <p className={`text-xl font-bold font-mono leading-tight ${text}`}>
            ₹{formatINR(result[key])}
          </p>
          {highlight && (
            <span className="inline-block mt-1.5 text-[10px] font-semibold text-white/80 bg-white/15 px-2 py-0.5 rounded-full">
              each pays this
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
