const Jimp = require('jimp');
const fs = require('fs');

/**
 * Create CSV with pixel number and RGB values
 * @param {string} imageSrc - Image source (file path, URL, or data URL)
 * @param {string} filename - Output CSV filename
 */
async function createPixelCSV(imageSrc, filename = 'pixels.csv') {
    try {
        // Load image
        const image = await Jimp.read(imageSrc);
        const width = image.getWidth();
        const height = image.getHeight();
        
        // Create CSV content
        let csvContent = 'pixel,r,g,b\n';
        let pixelNumber = 0;
        
        // Go through pixels left-right, top-bottom
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Get pixel color
                const color = image.getPixelColor(x, y);
                
                // Extract RGB values
                const r = (color >>> 24) & 0xFF;
                const g = (color >>> 16) & 0xFF;
                const b = (color >>> 8) & 0xFF;
                
                // Add to CSV
                csvContent += `${pixelNumber},${r},${g},${b}\n`;
                pixelNumber++;
            }
        }
        
        // Save CSV file
        fs.writeFileSync(filename, csvContent);
        
        console.log(`✅ CSV saved: ${filename}`);
        console.log(`📊 Total pixels: ${pixelNumber}`);
        
        return filename;
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

/**
 * Process pixels after another function completes
 */
async function processAfterImageSave(imageFunction, csvFilename = 'pixels.csv') {
    try {
        console.log('⏳ Waiting for image...');
        
        const imageSrc = await imageFunction();
        
        console.log('✅ Image ready, creating CSV...');
        const result = await createPixelCSV(imageSrc, csvFilename);
        
        return result;
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

module.exports = {
    createPixelCSV,
    processAfterImageSave
};