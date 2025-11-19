const puppeteer = require('puppeteer');
const { createPixelCSV } = require("/Users/aiden/Documents/VScode/venv/camerareader/createcsv.cjs");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(link){
    // First, we must launch a browser instance
    const browser = await puppeteer.launch({

        headless: false,
        ignoreHTTPSErrors: false,

    })

    let page = await browser.newPage();

    await page.goto(link, {
        waitUntil: 'domcontentloaded',
    });

    await delay(15000); // Wait for 15 seconds to ensure the image loads 
        const img = await page.$$eval('#stream', imgs => {
            return imgs.map(img => img.src);
        });
        console.log(img); // Or do something with the images array
        return(img[0]);


    await browser.close();

}

async function run() {
    try {
      // Step 1: run Puppeteer
      const captured_img = await main("http://192.168.68.30");
      console.log("Captured image src:", captured_img);
  
      // Step 2: run your getcsv.js function with the captured src
      await createPixelCSV(captured_img, "pixels.csv");
  
      console.log("CSV saved successfully.");
    } catch (err) {
      console.error("Error:", err);
    }
    return;
  }
  
  // Entry point
  run();