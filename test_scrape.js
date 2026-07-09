const cheerio = require('cheerio')

async function testScrape() {
  const res = await fetch('https://news.ycombinator.com/jobs')
  const html = await res.text()
  const $ = cheerio.load(html)
  
  const jobs = []
  
  $('.athing').each((i, el) => {
    const titleline = $(el).find('.titleline > a').first()
    const title = titleline.text()
    const url = titleline.attr('href')
    
    // YC Jobs usually look like "Company (YC S21) is hiring..."
    if (title && url) {
      jobs.push({
        id: $(el).attr('id'),
        title: title,
        url: url.startsWith('http') ? url : `https://news.ycombinator.com/${url}`
      })
    }
  })
  
  console.log(`Found ${jobs.length} jobs`)
  console.log(jobs.slice(0, 3))
}

testScrape()
