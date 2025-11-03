import { ArrowLeft, Download, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ScreenerConverter() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Screener.in INR to USD Converter</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Screener.in INR to USD Converter</h1>
              <p className="text-muted-foreground">Chrome Extension for Stock Research</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Converts Indian Rupee Crore values to USD Millions/Billions on Screener.in for easier comparison with global markets.
          </p>
        </div>

        {/* Problem & Solution */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
              <h3 className="font-semibold text-red-600 mb-3">The Problem</h3>
              <p className="text-muted-foreground text-sm">
                When researching Indian stocks on Screener.in, all financial data is in Indian Rupees (Crores).
                This makes it difficult to compare with US stocks or understand the scale in global terms.
              </p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
              <h3 className="font-semibold text-green-600 mb-3">The Solution</h3>
              <p className="text-muted-foreground text-sm">
                This extension automatically converts all INR values to USD with smart formatting
                (Billions, Millions, Thousands) so you can instantly understand company valuations in global context.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="bg-card border rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold shrink-0">1</span>
                <div>
                  <h3 className="font-semibold">Detects Financial Tables</h3>
                  <p className="text-sm text-muted-foreground">Extension identifies financial data tables on Screener.in pages</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold shrink-0">2</span>
                <div>
                  <h3 className="font-semibold">Parses Indian Number Format</h3>
                  <p className="text-sm text-muted-foreground">Correctly interprets Indian comma formatting (1,23,456 = 123,456)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold shrink-0">3</span>
                <div>
                  <h3 className="font-semibold">Converts Crores to USD</h3>
                  <p className="text-sm text-muted-foreground">1 Crore = 10 Million INR → Converted at current exchange rate</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold shrink-0">4</span>
                <div>
                  <h3 className="font-semibold">Smart Unit Formatting</h3>
                  <p className="text-sm text-muted-foreground">Displays as $1.2B, $500M, $10K based on magnitude</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversion Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Conversion Examples</h2>
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">INR Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">USD Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 text-sm">₹1,00,000 Cr</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$11.27B</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Large-cap Market Cap</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">₹10,000 Cr</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$1.13B</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Mid-cap Market Cap</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">₹500 Cr</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$56.35M</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Quarterly Revenue</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">₹2,500</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$28.18</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Stock Price (CMP)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">* Based on exchange rate of ₹88.74 = $1</p>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <div className="bg-card border rounded-lg p-6">
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                <span>Open Chrome and go to <code className="bg-muted px-2 py-1 rounded text-sm">chrome://extensions/</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                <span>Enable "Developer mode" using the toggle in the top right</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                <span>Click "Load unpacked" button</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm shrink-0">4</span>
                <span>Select the extension folder from the downloaded files</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm shrink-0">5</span>
                <span>Visit <a href="https://www.screener.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">screener.in</a> and see USD values!</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["Manifest V3", "JavaScript", "Chrome Storage API", "Content Scripts", "CSS Injection"].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Global Comparison</h3>
              <p className="text-sm text-muted-foreground">Compare Indian stocks with US counterparts</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-semibold mb-1">Investment Research</h3>
              <p className="text-sm text-muted-foreground">Understand company scale in global terms</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="font-semibold mb-1">NRI Investors</h3>
              <p className="text-sm text-muted-foreground">View Indian market data in familiar USD</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get the Extension</h2>
          <p className="text-muted-foreground mb-6">
            Available on Chrome Web Store or install manually from GitHub
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/ads1991/Screener-item"
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
