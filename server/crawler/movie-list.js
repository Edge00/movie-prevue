const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/tag/#/?sort=R&range=6,10&tags='

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {

  console.log('Start visit target page')

  const broswer = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await broswer.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 1; i++) {
    await(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    const $ = window.$
    const items = $('.list-wp a')
    let links = []
    if (items.length >= 1) {
      items.each((index, item) => {
        const it = $(item)
        const doubanId = it.find('.cover-wp').data('id')
        const title = it.find('.title').text()
        const rete = Number(it.find('.rate').text())
        const poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
        links.push({
          doubanId,
          title,
          rete,
          poster
        })
      })
    }
    return links
  })

  broswer.close()

  console.log(result)

})()


