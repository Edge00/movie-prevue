const puppeteer = require('puppeteer')
const base = `https://movie.douban.com/subject/`
const doubanId = '26627736'

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })
;(async () => {
  console.log('Start visit target page')

  const broswer = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await broswer.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  const result = await page.evaluate(() => {
    const $ = window.$
    const it = $('.related-pic-video')
    if (it && it.length > 0) {
      const link = it.attr('href')
      const cover = it
        .attr('style')
        .split('url(')[1]
        .split('?')[0]
      return {
        link,
        cover
      }
    }
    return {}
  })

  let video

  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await 2000
    video = await page.evaluate(() => {
      const $ = window.$
      const it = $('source')
      if (it && it.length > 0) {
        return it.attr('src')
      }
      return ''
    })
  }

  const data = {
    video,
    doubanId,
    cover: result.cover
  }

  broswer.close()

  process.send(data)
  process.exit(0)
})()
