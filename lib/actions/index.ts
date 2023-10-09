"use server"

//Scrape product and save it in our DB 
export async function scrapeAndStorePRoduct(productUrl: string) {
    if(!productUrl) return;

    try {
        
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
        
    }

}