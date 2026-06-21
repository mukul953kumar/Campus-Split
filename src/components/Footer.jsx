import { Mail, Heart, ExternalLink, Code2, Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              <span>Made with</span>
              <Heart size={13} className="text-red-500 fill-red-500" aria-hidden="true" />
              <span>by</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Mukul Kumar</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:mukulkumar953622@gmail.com"
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                aria-label="Send email to Mukul Kumar"
              >
                <Mail size={12} aria-hidden="true" />
                mukulkumar953622@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all"
              aria-label="GitHub profile (opens in new tab)"
            >
              <Code2 size={13} aria-hidden="true" />
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-lg transition-all"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <Briefcase size={13} aria-hidden="true" />
              LinkedIn
            </a>

            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transition-all hover:scale-105 shadow-md shadow-violet-200 dark:shadow-violet-900/30 focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="Visit Digital Heroes Co (opens in new tab)"
            >
              Built for Digital Heroes
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-600">
          <p>© {new Date().getFullYear()} Campus Split AI. Smart expense splitting for everyone.</p>
          <p>Built with React + Vite + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
