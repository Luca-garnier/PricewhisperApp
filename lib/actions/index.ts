"use server"

import { scrapeAmazonProduct } from "../scraper";

//Scrape product and save it in our DB 
export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;

    try {
        connectToDB();


        //Retrieve product data
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) return;

        //Get or Create product in database


        
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
        
    }

}