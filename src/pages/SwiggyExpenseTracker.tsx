import { ArrowLeft, Download, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SwiggyExpenseTracker() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Swiggy & Instamart Expense Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Swiggy & Instamart Expense Tracker</h1>
              <p className="text-muted-foreground">Chrome Extension + React Dashboard</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            A Chrome extension with React dashboard to track and analyze your Swiggy, Instamart, Dineout, and Genie expenses.
          </p>
        </div>

        {/* What does it do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What does it do?</h2>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              This Chrome extension extracts your complete order history from Swiggy and presents it in a beautiful analytics dashboard. It helps you understand your food ordering habits and spending patterns.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
                <span>Automatically fetches all your Swiggy orders (Food, Instamart, Dineout, Genie)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
                <span>Shows monthly spending trends with interactive charts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
                <span>Identifies your top restaurants and most ordered items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
                <span>Export your data to Excel for personal records or tax purposes</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How does it work */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How does it work?</h2>
          <div className="bg-card border rounded-lg overflow-hidden">
            {/* GIF placeholder - replace src with actual GIF */}
            <div className="aspect-video bg-muted flex items-center justify-center">
              <img
                src="/swiggy-demo.gif"
                alt="Swiggy Expense Tracker Demo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-muted-foreground">Demo GIF - Add /public/swiggy-demo.gif</div>';
                }}
              />
            </div>
            <div className="p-6">
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                  <span>Login to your Swiggy account on swiggy.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                  <span>Click the extension icon - it detects your login status automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                  <span>Click "View Analytics Dashboard" to extract and visualize your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm shrink-0">4</span>
                  <span>Explore your spending trends, top restaurants, and export to Excel</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get the Extension</h2>
          <p className="text-muted-foreground mb-6">
            Install manually from GitHub
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/ads1991/Swiggy-Instmart-Expense-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
