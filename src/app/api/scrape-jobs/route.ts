import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const res = await fetch('https://news.ycombinator.com/jobs', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`)
    }

    const html = await res.text()
    const $ = cheerio.load(html)
    
    const jobs: any[] = []
    
    $('.athing').each((i, el) => {
      const titleline = $(el).find('.titleline > a').first()
      const title = titleline.text()
      const url = titleline.attr('href')
      
      const subtext = $(el).next().find('.subtext').text().trim() || ''
      const time = $(el).next().find('.age').attr('title') || ''
      
      if (title && url) {
        jobs.push({
          id: $(el).attr('id') || `job-${i}`,
          title: title,
          url: url.startsWith('http') ? url : `https://news.ycombinator.com/${url}`,
          timestamp: time,
          company: title.split(' (')[0].split(' is ')[0] || 'Unknown Company' // Rough heuristic to extract company name
        })
      }
    })
    
    return NextResponse.json({ success: true, count: jobs.length, jobs })
  } catch (error: any) {
    console.error('Job Scrape Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to scrape job listings.' },
      { status: 500 }
    )
  }
}
