const BaseController = require('./base/base.controller');
const puppeteer = require('puppeteer')

//TODO: Remove hardcoded strings.
class CurrencyExchangeController extends BaseController {
  async getDollarCurrency(req, res) {

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });;
    const page = await browser.newPage();
    const currencySelector = '#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.vk_bk.gsrt > span.DFlfde.SwHCTb';
    
    //TODO: Modularize in order to avoid boilerplate code.
    await page.goto('https://www.google.com');
    await page.focus('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input');
    await page.keyboard.type('dolar hoy');
    await page.click('#tsf > div:nth-child(2) > div.A8SBwf > div.FPdoLc.tfB0Bf > center > input.gNO89b')
    await page.waitForSelector(currencySelector);
    
    let tmp = await page.evaluate(() => {
      let results = '';
      let items = document.querySelectorAll('#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.vk_bk.gsrt');
      items.forEach((item) => {
        results = item.querySelector('span.DFlfde.SwHCTb').innerText
                
      });
      return results;
    })

    await page.close()

    try {
      let response = {
        'dollar': tmp
      }

      res.json(response);
    } catch (err) {
      //TODO: Send appropriate error message and code. 
      res.status(400);
      res.send('Tamo hasta los hue'); 
    }
  }
}

module.exports = CurrencyExchangeController;
