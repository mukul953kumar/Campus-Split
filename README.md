# Campus Split AI

**Smart bill splitting for students and friend groups.**
Calculate GST, tip, and per-person share instantly — with AI-powered insights to help you spend smarter.

---

## Live Demo

> Deploy on Vercel — [vercel.com](https://vercel.com)

---

## Features

| Feature | Description |
|---|---|
| Bill Splitting | Split any bill among any number of people |
| GST Calculation | Add GST percentage (5%, 12%, 18%, or custom) |
| Tip Calculation | Add tip percentage on top of the base bill |
| AI Insights | Context-aware suggestions based on your actual numbers |
| Indian Currency | Proper ₹ formatting (e.g., ₹1,25,000.00) |
| Share Result | Copy full breakdown to clipboard with one click |
| Dark / Light Mode | Persisted via localStorage |
| Reset Button | Clear all inputs and results instantly |
| Stats Dashboard | Visual cards highlighting total, per-person, GST, and tip |
| Responsive Design | Mobile-first, works on all screen sizes |

---

## AI Insights Engine

The AI Insights panel generates smart, context-aware suggestions based on your actual values:

- **High tip** → Suggests reducing tip to save money
- **Zero tip on large bill** → Recommends adding a small tip
- **GST > 18%** → Warns that GST may already be included
- **GST = 0%** → Reminds to verify GST inclusion
- **Group > 8 people** → Recommends collecting via UPI before payment
- **Per-person > ₹1000** → Suggests splitting into smaller rounds
- **Solo dining** → Fun message for solo users
- **Balanced split** → Positive confirmation when everything looks good

---

## Tech Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Deployment:** Vercel (zero config)
- **Language:** JavaScript (no TypeScript)

---

## Project Structure

```
src/
├── components/
│   ├── AIInsights.jsx      # Smart AI suggestion engine
│   ├── EmptyState.jsx      # Pre-calculation placeholder
│   ├── ExpenseForm.jsx     # Input form with validation
│   ├── Footer.jsx          # Footer with creator info and links
│   ├── ResultCard.jsx      # Bill breakdown with share button
│   ├── StatsCards.jsx      # Dashboard stat cards
│   └── ThemeToggle.jsx     # Dark/light mode toggle
├── App.jsx                 # Root component, state, formatINR utility
├── main.jsx                # React entry point
└── index.css               # Tailwind + custom animations
public/
├── campusspilit_bg.png     # Background image
└── favicon.svg             # App favicon
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/campus-split-ai.git

# Navigate into the project
cd campus-split-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Ready for Vercel deployment.

---

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Leave all settings as default (Vite is auto-detected)
5. Click **Deploy**

Your app will be live in under a minute.

---

## How It Works

### Calculation Formula

```
GST Amount   = Bill Amount × (GST % / 100)
Tip Amount   = Bill Amount × (Tip % / 100)
Total Amount = Bill Amount + GST Amount + Tip Amount
Per Person   = Total Amount / Number of People
```

### Currency Formatting

All amounts use Indian number formatting via the browser's `Intl.NumberFormat` API:

```js
new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(amount)
// Output: 1,25,000.00
```

---

## Validation Rules

| Field | Rule |
|---|---|
| Bill Amount | Required, must be greater than 0 |
| Number of People | Required, minimum 1 |
| GST % | Required, cannot be negative |
| Tip % | Required, cannot be negative |

Errors appear inline below each field with real-time validation on blur.

---

## Accessibility

- All inputs have proper `<label>` elements with `htmlFor`
- Error messages use `role="alert"` and `aria-invalid`
- Hint text linked via `aria-describedby`
- All interactive elements have visible `focus` states
- Decorative icons marked with `aria-hidden="true"`
- Toast notification uses `role="status"` and `aria-live="polite"`

---

## Screenshots

> Add screenshots here after deployment.

---

## Author

**Mukul Kumar**

- Email: [mukulkumar953622@gmail.com](mailto:mukulkumar953622@gmail.com)
- GitHub: [github.com](https://github.com)
- LinkedIn: [linkedin.com](https://linkedin.com)

---

## License

MIT License — free to use, modify, and distribute.

---

*Built for [Digital Heroes Co.](https://digitalheroesco.com)*
