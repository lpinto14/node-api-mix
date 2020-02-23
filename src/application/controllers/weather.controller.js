const BaseController = require('./base/base.controller');
const puppeteer = require('puppeteer')

//TODO: Remove hardcoded strings.
class WeatherController extends BaseController {
  async getCityWeather(req, res) {

    let ciudad = req.params.city;
    ciudad = ciudad.replace('-', " ");
    ciudad = ciudad.replace('%20', " ");

    if (!ciudad) {
        return res.status(400).json({
            err: true,
            message: "falta el parametro",
        })
    }

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });;
    const page = await browser.newPage();
    const resultSelector = '#wob_tm';

    console.log(ciudad);
    //TODO: Modularize in order to avoid boilerplate code.
    await page.goto('https://www.google.com.ar');
    await page.focus('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input');
    await page.keyboard.type(`temperatura ${ciudad}`);
    await page.click('#tsf > div:nth-child(2) > div.A8SBwf > div.FPdoLc.tfB0Bf > center > input.gNO89b')
    
    try {
        await page.waitForSelector(resultSelector,{timeout: 20000});

    } catch {
        return res.status(400).json({
            err: true,
            message: "no se encuentra esa ciudad",
        })
    }

    // await page.click(resultSelector);

    
    let tmp = await page.evaluate(() => {

        let extendido = document.querySelectorAll('.wob_df');
        let arr = new Array;
        extendido.forEach( (item) => {
            // obj.push(item.innerText);
            let array = item.innerText.split('.');
            let dia = array[0];
            let max = array[1];
            max.replace(/(\r\n|\n|\r)/gm, " ");
            let min = array[2];

            let obj = {
                dia,
                min,
                max
            }

            arr.push(obj)


        })

        let results = {
            'ciudad': document.getElementById('wob_loc').innerText,
            'fecha': document.getElementById('wob_dts').innerText,
            'precipitacion': document.getElementById('wob_pp').innerText,
            'temperatura': document.getElementById('wob_tm').innerText + ' C°',
            'humedad': document.getElementById('wob_hm').innerText,
            'cielo' : document.getElementById('wob_dc').innerText,
            'viento' : document.getElementById('wob_ws').innerText,
            'extendido': arr 
        }

      
      return results;
    })

    await page.close()

    try {
        let response = tmp;

        res.json(response);
    } catch (err) {
      //TODO: Send appropriate error message and code. 
        res.status(400);
        res.send('Tamo hasta los hue'); 
    }
  }
}

module.exports = WeatherController;