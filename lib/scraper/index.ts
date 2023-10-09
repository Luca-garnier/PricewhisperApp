export async function scrapeAmazonProduct(url:string) {
    if(!url) return;

    //BrightData proxy configuration (makes sure we can use BrightData scrapping to get product data)
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    



}