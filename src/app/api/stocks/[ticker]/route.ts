import { NextResponse } from 'next/server'

export type StockDataPoint = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Generate realistic looking mock data for a ticker
function generateMockData(ticker: string, days: number = 30): StockDataPoint[] {
  const data: StockDataPoint[] = []
  
  // Base prices to make tickers look different
  const basePrices: Record<string, number> = {
    'AAPL': 185.50,
    'MSFT': 410.20,
    'TSLA': 175.80,
    'NVDA': 880.10,
    'GOOGL': 145.30
  }
  
  let currentPrice = basePrices[ticker] || 100.00
  let volatility = currentPrice * 0.02 // 2% daily volatility

  // Generate backwards from today
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue

    const dateStr = d.toISOString().split('T')[0]
    
    // Random walk
    const change = (Math.random() - 0.45) * volatility // Slight upward bias
    const open = currentPrice
    const close = currentPrice + change
    const high = Math.max(open, close) + (Math.random() * volatility * 0.5)
    const low = Math.min(open, close) - (Math.random() * volatility * 0.5)
    
    data.push({
      date: dateStr,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 5000000
    })
    
    currentPrice = close
  }
  
  return data
}

export async function generateStaticParams() {
  return [
    { ticker: 'AAPL' },
    { ticker: 'MSFT' },
    { ticker: 'NVDA' },
    { ticker: 'GOOGL' },
    { ticker: 'TSLA' }
  ]
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticker: string }> | { ticker: string } }
) {
  // Await params in case it's a promise (Next.js 15+ pattern, safe for earlier versions)
  const resolvedParams = await params;
  const ticker = (resolvedParams.ticker || 'AAPL').toUpperCase()
  
  // PROOF OF CONCEPT: Paid tier API key check
  // In a production environment, you would add your AlphaVantage or Polygon.io key to .env.local
  const apiKey = process.env.STOCK_API_KEY
  
  if (apiKey) {
    try {
      // Example implementation for Alpha Vantage TIME_SERIES_DAILY
      // Note: This block will only execute if STOCK_API_KEY is provided.
      const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`)
      const json = await res.json()
      
      if (json['Time Series (Daily)']) {
        const timeSeries = json['Time Series (Daily)']
        const dates = Object.keys(timeSeries).slice(0, 30).reverse()
        
        const realData: StockDataPoint[] = dates.map(date => {
          const dayData = timeSeries[date]
          return {
            date: date,
            open: parseFloat(dayData['1. open']),
            high: parseFloat(dayData['2. high']),
            low: parseFloat(dayData['3. low']),
            close: parseFloat(dayData['4. close']),
            volume: parseInt(dayData['5. volume'], 10)
          }
        })
        
        return NextResponse.json({ data: realData, source: 'API' })
      }
      
      // Fallback if API limit reached or invalid ticker
      console.warn('Real API returned unexpected format, falling back to mock data.')
    } catch (error) {
      console.error('Failed to fetch from real API, falling back to mock data:', error)
    }
  }
  
  // Fallback to mock data
  const mockData = generateMockData(ticker, 45) // 45 days to account for weekends and guarantee ~30 data points
  return NextResponse.json({ data: mockData.slice(-30), source: 'MOCK' })
}
