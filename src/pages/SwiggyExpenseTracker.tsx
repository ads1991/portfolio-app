import { ArrowLeft, Chrome, Download, BarChart3, FileSpreadsheet, Shield } from 'lucide-react'
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

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Chrome className="w-5 h-5" />}
              title="Chrome Extension"
              features={[
                "Auto-detects Swiggy login status",
                "Extracts order data from Swiggy API",
                "Supports pagination (fetches all orders)",
                "Beautiful popup UI with login indicator"
              ]}
            />
            <FeatureCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="React Dashboard"
              features={[
                "Monthly spending trend charts",
                "Top restaurants analysis",
                "Orders per month visualization",
                "4 key metric cards"
              ]}
            />
            <FeatureCard
              icon={<FileSpreadsheet className="w-5 h-5" />}
              title="Excel Export"
              features={[
                "Export all orders to Excel",
                "Summary sheet with totals",
                "Organized by order details",
                "Perfect for tax/expense reports"
              ]}
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Privacy First"
              features={[
                "All data stays local",
                "No external servers",
                "Uses existing Swiggy session",
                "Open source - inspect the code"
              ]}
            />
          </div>
        </section>

        {/* Services Tracked */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Services Tracked</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🍔", name: "Food Delivery", desc: "Restaurant orders" },
              { emoji: "🛒", name: "Instamart", desc: "Grocery orders" },
              { emoji: "🍽️", name: "Dineout", desc: "Restaurant reservations" },
              { emoji: "📦", name: "Genie", desc: "Pickup & Errands" }
            ].map((service) => (
              <div key={service.name} className="bg-card border rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{service.emoji}</div>
                <div className="font-semibold">{service.name}</div>
                <div className="text-sm text-muted-foreground">{service.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</span>
                Install Chrome Extension
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-8">
                <li>Open Chrome → <code className="bg-muted px-2 py-1 rounded">chrome://extensions/</code></li>
                <li>Enable "Developer mode" (top right toggle)</li>
                <li>Click "Load unpacked"</li>
                <li>Select the <code className="bg-muted px-2 py-1 rounded">extension</code> folder</li>
                <li>Pin extension to toolbar</li>
              </ol>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</span>
                Run React Dashboard
              </h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`cd react-app
npm install
npm run dev
# Opens on http://localhost:5175`}
              </pre>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</span>
                Use the Tracker
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-8">
                <li>Login to swiggy.com</li>
                <li>Click extension icon</li>
                <li>Click "View Analytics Dashboard"</li>
                <li>See your real expense data!</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Extension</h3>
              <div className="flex flex-wrap gap-2">
                {["Manifest V3", "JavaScript", "Chrome APIs", "Fetch API"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">React App</h3>
              <div className="flex flex-wrap gap-2">
                {["React 18", "Vite", "Tailwind CSS", "Recharts", "XLSX"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Tracked */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Data Tracked</h2>
          <div className="bg-card border rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Order Details</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Order ID, Date, Time</li>
                  <li>• Restaurant/Store name</li>
                  <li>• Total amount, Item total</li>
                  <li>• Delivery fees, Taxes</li>
                  <li>• Discounts & Savings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Analytics</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Monthly spending trends</li>
                  <li>• Top 10 restaurants</li>
                  <li>• Average order value</li>
                  <li>• Coupon savings analysis</li>
                  <li>• Payment method preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get the Extension</h2>
          <p className="text-muted-foreground mb-6">
            Available on Chrome Web Store or install manually from GitHub
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

function FeatureCard({ icon, title, features }: { icon: React.ReactNode; title: string; features: string[] }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
