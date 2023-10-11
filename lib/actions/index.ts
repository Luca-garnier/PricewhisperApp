"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

//Scrape product and save it in our DB 
export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;

    try {
        connectToDB();

        //Retrieve product data
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) return;

        //Get or Create product in database
        let product = scrapedProduct;
        const existingProduct = await Product.findOne({url: scrapedProduct.url});
        //If exists, update, else create
        if(existingProduct){
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory, 
                { price: scrapedProduct.currentPrice}
            ]
            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

            }
        }

        const newProduct = await Product.findOneAndUpdate(
            {url: scrapedProduct.url},
            product,
            {upsert: true, new:true}
            )

        revalidatePath(`/products/${newProduct._id}`);


        
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
        
    }

}