const BaseController = require('./base/base.controller');
const puppeteer = require('puppeteer')

//TODO: Remove hardcoded strings.
class WeatherController extends BaseController {
  async getCityWeather(req, res) {

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });;
    const page = await browser.newPage();
    // const resultSelector = '#forecast_list_ul > table > tbody > tr > td:nth-child(2) > b:nth-child(1) > a';
    const resultSelector = '#weatherWidgetInner > a > div.currentWeather > div.currentConditions > div.currentTemp.ng-binding';
    
    const input = '#fl-input-8';
    //TODO: Modularize in order to avoid boilerplate code.
    await page.goto('https://weatherwidget.io/');
    await page.focus(input);
    await page.click('#fl-input-8');
    await page.type('#fl-input-8','Córdoba, Córdoba, Argentina');
    await page.keyboard.press('Enter', {delay: 500});
    await page.keyboard.press('Enter', {delay: 500});
    await page.waitForSelector(resultSelector,{timeout: 45000});
    await page.click(resultSelector);

    
    let tmp = await page.evaluate(() => {
      let results = new Object;
      results.input = document.getElementById('fl-input-8').innerText;
      results.temp = document.getElementsByClassName('currentTemp')[0].innerHTML;
      results.sky = document.getElementsByClassName('currentDesc')[0].innerHTML;
      results.city = document.getElementsByClassName('locationName')[0].innerText.replace('\nWEATHER', '');
      
      return results;
    })

    await page.close()

    try {
      let response = {
        'input': tmp.input,
        'ciudad': tmp.city,
        'clima': tmp.sky,
        'temperatura': tmp.temp,

      }

      res.json(response);
    } catch (err) {
      //TODO: Send appropriate error message and code. 
      res.status(400);
      res.send('Tamo hasta los hue'); 
    }
  }
}

module.exports = WeatherController;