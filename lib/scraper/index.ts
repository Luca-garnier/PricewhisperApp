import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url:string) {
    if(!url) return;

    //BrightData proxy configuration (makes sure we can use BrightData scrapping to get product data)
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port  = 22225;
    const session_id = 1000000 * Math.random() | 0
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port, 
        rejectUnauthorized: false,
    }

    try {
        // Fetch the amazon product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        // Extract product data
        const title = $('#productTitle').text().trim();

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-while'),
            $('span.a-price-while'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.priceToPay')
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )

        const outOfStock = $('#availability span').text().trim().toLocaleLowerCase( ) === 'currently unavailable';

        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') ||
        $('#landingImage').attr('data-a-dynamic-image') ||
        '{}'
        const imageUrls = Object.keys(JSON.parse(images));  

        const currency = extractCurrency($('.a-price-symbol'));

        const discountRates = $('.savingsPercentage').text();
        const discountRatesMatches = discountRates.match(/-?\d+%/);
        const mostRecentDiscount = discountRatesMatches ? discountRatesMatches[0].replace(/[-%]/g,'') : '';

        const stars = $('span.a-size-base.a-color-base').text().trim().slice(0, 3);

        const description = $('#feature-bullets').text().trim();

        const regexReview  = /(\d+(,\d+)*(?:\.\d+)?|\.\d+)/
        const reviewsCount = $('#acrCustomerReviewText.a-size-base').text().trim();
        const reviewCountMatches = reviewsCount.match(regexReview);
        const numberOfReviews = reviewCountMatches ? reviewCountMatches[0].replace(/,/g, '') : '';


        //Construct data object with scraped information
        const data = {
            url, 
            image: imageUrls[0],
            title, 
            currency: currency || '$',
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice),
            priceHistory: [],
            discountRate: Number(mostRecentDiscount),
            category: 'category',
            reviewsCount: Number(numberOfReviews), 
            stars: Number(stars), 
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }

        console.log(data);
        return data;
        
    } catch (error:any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
        
    }



}