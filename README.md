# GameScraper
GameScraper provides a way for users to look up the price of a video game across multiple websites and digital distributors.
- A user enters the name of the video game they're interested in.
- The user is then returned the price of that game according to different vendors/websites.
- For example, GameBillet may have Elden Ring for cheaper than the official Steam store does.

## How It Works
1. The /search endpoint takes a single GET parameter - q, or the 'search query' - which represents the title of the video game.
2. The 'search query' is then passed to multiple functions, each of which is responsible for scraping a specific website.
3. Inside those functions, 'scraping variables' are defined, such as the URL and various selectors that are specific to a website. Those variables are then passed into another function, which is defined as the 'scraper function'.
4. The scraper function does what the name implies, and it returns an array of objects, with each object representing a video game.
5. Those arrays of objects are then set as the value of the corresponding website. 
`steam : [
    {
        title: "Game1",
        ...
    },
    {
        title: "Game2",
        ...
    },
    ...
]`
6. The data for each website is then combined and set back as one big object.

## Limitations
### Self Limitation
The most obvious limitation is the fact that only **4 websites** are being scraped. However, this is a self-imposed limitation.

The goal of this project wasn't necessarily to create an actual service, rather, it was to practice and showcase skills that I previously did not have. In this case, I wanted to scrape data and transform it in a way that a client can easily digest.

I believe I accomplished my goal with only 4 websites, though I do plan to add more as time goes on. I just wanted to put something out there that showcased my skills first, before adding onto it.

### Handling Multiple Requests
The biggest issue I ran into was the inability to scrape websites **efficiently** for multiple clients.
- Websites have rate limits that were, in this case, based on the IP address of the 'client'.
- The client from the perspective of these websites, would be the GameScraper server.
- Every request that GameScraper receives would equal a request sent to the websites that I scrape.
- Meaning that, if 20 different clients query GameScraper in a second, all the websites would see is 20 GET requests from the same IP (the GameScraper server).
- This would result in throttling, or worse, a ban of some kind

To get around this issue, I would need 'premium web proxies' that the GameScraper server would send its requests through. That costs money - which I don't have - but even if I did, I wouldn't spend it on a personal project of this scale.

Building my own proxy with rotating IP addresses would be the alternative, however, that exceeds the scope of this project - at least for right now 😲.

### Efficiency (Headless Browsers)
One website that I really wanted to include was Epic Games. The only issue was that I couldn't retrieve the HTML using the fetch API (or something similar), to then use Cheerio to scrape. 

Instead, I needed to use a headless browser such as Puppeteer to scrape it. As it turns out, headless browsers are much slower than Cheerio scraping, and they aren't typically used for scraping in the manner that I do it.

Typically, people would scrape on an interval (like every day, or every 15 minutes). In that case, the few extra seconds that it takes to use Puppeteer becomes inconsequential. However, when scraping "on-demand", those few seconds do become *kind of a drag*.

## Possible Improvements
Adding more websites (the ones that require Puppeteer to scrape)
-  There's no way that I can avoid the few extra seconds it takes for a headless browser to load a page before scraping it...
-  However, I could make *two* different requests on my 'results page' - one for websites that I can scrape using Fetch and Cheerio, and the other for websites that require Puppeteer.
-  That way, some of the data can at least be presented to the user 'right away' (the Fetch/Cheerio combo) while the other data is still being retrieved.
