"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Zap, Globe, Shield, Clock, Search, Shuffle, Code2, Atom } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Element {
  name: string
  symbol: string
  number: number
  atomic_mass: number
  category: string
  period: number
  phase: string
  summary: string
  discovered_by?: string
  electron_configuration: string
  density?: number
  melt?: number
  boil?: number
  source: string
  "cpk-hex": string
  footer: string
}

const API_BASE = "https://periodic-elements-api.periodic-elements-api.workers.dev/api"

export default function PeriodicAPIPage() {
  const [element, setElement] = useState<Element | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeExample, setActiveExample] = useState("name")
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    })
  }

  const fetchElement = async (query: string, type: "name" | "symbol" | "number" = "name") => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}?${type}=${query}`)
      const data = await response.json()
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
        setElement(null)
      } else {
        setElement(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch element data",
        variant: "destructive",
      })
      setElement(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchRandomElement = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}?random=true`)
      const data = await response.json()
      setElement(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch random element",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    const term = searchTerm.trim()

    // Check if it's a number (atomic number)
    if (/^\d+$/.test(term)) {
      fetchElement(term, "number")
    }
    // Check if it's a 1-3 character symbol (chemical symbol)
    else if (/^[A-Za-z]{1,3}$/.test(term) && term.length <= 3) {
      fetchElement(term, "symbol")
    }
    // Otherwise treat as element name
    else {
      fetchElement(term, "name")
    }
  }

  const examples = [
    {
      id: "name",
      title: "Search by Name",
      code: `${API_BASE}?name=hydrogen`,
      description: "Get element data using the element name",
    },
    {
      id: "symbol",
      title: "Search by Symbol",
      code: `${API_BASE}?symbol=H`,
      description: "Get element data using the chemical symbol",
    },
    {
      id: "number",
      title: "Search by Atomic Number",
      code: `${API_BASE}?number=1`,
      description: "Get element data using the atomic number",
    },
    {
      id: "random",
      title: "Random Element",
      code: `${API_BASE}?random=true`,
      description: "Get a random element from the periodic table",
    },
    {
      id: "summary",
      title: "Summary Only",
      code: `${API_BASE}?name=hydrogen&summaryOnly=true`,
      description: "Get only the summary of an element",
    },
    {
      id: "all",
      title: "All Elements",
      code: `${API_BASE}?all=true`,
      description: "Get all elements in the database",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Atom className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-black text-xl text-foreground">Periodic Elements API</h1>
                <p className="text-sm text-muted-foreground">Lightning-fast chemical data</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Zap className="w-3 h-3" />
                Cloudflare Workers
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Documentation */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-4">
              <h2 className="font-serif font-black text-3xl text-foreground">World's Fastest Chemical Elements API</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Access detailed information about all chemical elements with our high-performance API. Powered by
                Cloudflare Workers for lightning-fast global performance.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium text-card-foreground">200+ Locations</div>
                  <div className="text-xs text-muted-foreground">Global CDN</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium text-card-foreground">~50ms</div>
                  <div className="text-xs text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium text-card-foreground">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium text-card-foreground">100k</div>
                  <div className="text-xs text-muted-foreground">Free Requests/Day</div>
                </div>
              </div>
            </div>

            {/* API Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  API Endpoints
                </CardTitle>
                <CardDescription>Explore different ways to query the Periodic Elements API</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeExample} onValueChange={setActiveExample} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                    {examples.map((example) => (
                      <TabsTrigger key={example.id} value={example.id} className="text-xs">
                        {example.title.split(" ")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {examples.map((example) => (
                    <TabsContent key={example.id} value={example.id} className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">{example.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
                        <div className="relative">
                          <pre className="bg-card border border-border rounded-lg p-4 text-sm overflow-x-auto">
                            <code className="text-card-foreground">{example.code}</code>
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(example.code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Live API Demo</CardTitle>
                <CardDescription>Test the API in real-time and see the results instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter element name, symbol, or atomic number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={loading}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={fetchRandomElement}
                  disabled={loading}
                  className="w-full bg-transparent"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Get Random Element
                </Button>

                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}

                {element && !loading && (
                  <Card className="border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-serif font-bold text-xl">
                          {element.name} ({element.symbol})
                        </CardTitle>
                        <div
                          className="w-8 h-8 rounded-full border-2 border-border"
                          style={{ backgroundColor: `#${element["cpk-hex"]}` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">#{element.number}</Badge>
                        <Badge variant="outline">{element.category}</Badge>
                        <Badge variant="outline">{element.phase}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{element.summary}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-foreground">Atomic Mass:</span>
                          <div className="text-muted-foreground">{element.atomic_mass}</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Period:</span>
                          <div className="text-muted-foreground">{element.period}</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Electron Config:</span>
                          <div className="text-muted-foreground font-mono text-xs">
                            {element.electron_configuration}
                          </div>
                        </div>
                        {element.density && (
                          <div>
                            <span className="font-medium text-foreground">Density:</span>
                            <div className="text-muted-foreground">{element.density} g/cm³</div>
                          </div>
                        )}
                        {element.melt && (
                          <div>
                            <span className="font-medium text-foreground">Melting Point:</span>
                            <div className="text-muted-foreground">{element.melt} K</div>
                          </div>
                        )}
                        {element.boil && (
                          <div>
                            <span className="font-medium text-foreground">Boiling Point:</span>
                            <div className="text-muted-foreground">{element.boil} K</div>
                          </div>
                        )}
                      </div>

                      {element.discovered_by && (
                        <div className="pt-2 border-t border-border">
                          <span className="font-medium text-foreground">Discovered by:</span>
                          <div className="text-muted-foreground">{element.discovered_by}</div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={element.source} target="_blank" rel="noopener noreferrer">
                            Learn More
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">JavaScript/Fetch</h4>
                  <div className="relative">
                    <pre className="bg-card border border-border rounded-lg p-4 text-sm overflow-x-auto">
                      <code className="text-card-foreground">{`fetch('${API_BASE}?name=hydrogen')
  .then(response => response.json())
  .then(data => console.log(data))`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(
                          `fetch('${API_BASE}?name=hydrogen')\n  .then(response => response.json())\n  .then(data => console.log(data))`,
                        )
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">cURL</h4>
                  <div className="relative">
                    <pre className="bg-card border border-border rounded-lg p-4 text-sm overflow-x-auto">
                      <code className="text-card-foreground">{`curl -X GET "${API_BASE}?name=hydrogen"`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`curl -X GET "${API_BASE}?name=hydrogen"`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Created by <span className="font-medium text-foreground">Developer Uzair</span> • Powered by{" "}
              <span className="font-medium text-foreground">Cloudflare Workers</span>
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <a href="mailto:contact@uzair.is-a.dev" className="text-primary hover:underline">
                Contact
              </a>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">100,000 free requests per day</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">MIT License</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
