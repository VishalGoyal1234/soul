const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=531899749847976',
'https://www.facebook.com/ads/library/?id=442150662109269',
'https://www.facebook.com/ads/library/?id=1160369238992694',
'https://www.facebook.com/ads/library/?id=1121935982830130',
'https://www.facebook.com/ads/library/?id=1076965034226727',
'https://www.facebook.com/ads/library/?id=3842090726039884',
'https://www.facebook.com/ads/library/?id=1117571646657342',
'https://www.facebook.com/ads/library/?id=473953455730061',
'https://www.facebook.com/ads/library/?id=1132013148603647',
'https://www.facebook.com/ads/library/?id=1817632635644640',
'https://www.facebook.com/ads/library/?id=1610880656181817',
'https://www.facebook.com/ads/library/?id=1279933089914196',
'https://www.facebook.com/ads/library/?id=902370672038042',
'https://www.facebook.com/ads/library/?id=1782508602539686',
'https://www.facebook.com/ads/library/?id=9191845787494585',
'https://www.facebook.com/ads/library/?id=934838651495874',
'https://www.facebook.com/ads/library/?id=554807044047402',
'https://www.facebook.com/ads/library/?id=1530073197713002',
'https://www.facebook.com/ads/library/?id=550233241150362',
'https://www.facebook.com/ads/library/?id=460299073400235',
'https://www.facebook.com/ads/library/?id=1134258064990704',
'https://www.facebook.com/ads/library/?id=1094299225225979',
'https://www.facebook.com/ads/library/?id=3727046344093761',
'https://www.facebook.com/ads/library/?id=2313194642383031',
'https://www.facebook.com/ads/library/?id=1097674061735749',
'https://www.facebook.com/ads/library/?id=1526158104767604',
'https://www.facebook.com/ads/library/?id=1590410171599127',
];

// Function to introduce a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(id) {
    let url = id;
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Origin': 'https://www.facebook.com',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"15.0.0"'
    };

    try {
        const response = await axios.get(url, { headers });
        const html = response.data;
        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        // Extract the ig_username value
        const scriptTags = $('script');
        let igUsername = null;
        let pageId = null;

        scriptTags.each((index, element) => {
            const scriptContent = $(element).html();
            if (scriptContent && scriptContent.includes('"ig_username":') && scriptContent.includes('"page_id":')) {
                const igUsernameMatch = scriptContent.match(/"ig_username":"([^"]+)"/);
                if (igUsernameMatch) {
                    igUsername = igUsernameMatch[1];
                }
                if (scriptContent && scriptContent.includes('"page_profile_uri":')) {
                    const pageProfileUriMatch = scriptContent.match(/"page_profile_uri":"([^"]+)"/);
                    if (pageProfileUriMatch) {
                        pageProfileUri = pageProfileUriMatch[1];
                    }
                }
                if (pageProfileUri && pageProfileUri.includes('facebook.com')) {
                    const pageAliasMatch = scriptContent.match(/"page_alias":"([^"]+)"/);
                    if (pageAliasMatch) {
                        pageId = 'https://www.facebook.com/' + pageAliasMatch[1];
                    } else {
                        const pageIdMatch = scriptContent.match(/"page_id":"([^"]+)"/);
                        pageId = 'https://www.facebook.com/' + pageIdMatch[1];
                    }
                }
            }
        });

        return { id, igUsername, pageId };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchAllData(ids) {
    const results = [];
    for (const id of ids) {
        const result = await fetchData(id);
        results.push(result);
        if (result.igUsername) {
            console.log(`ID: ${result.id}, Instagram Username: ${result.igUsername}`);
        } else if (result.pageId) {
            console.log(`ID: ${result.id}, Page Profile URI: ${result.pageId}`);
        }
        // Introduce a delay between requests
        await delay(2000); // 2000 milliseconds = 2 seconds
    }
    return results;
}

async function saveToTextFile(results, filePath) {
    const fileContent = results.map(result =>
        `${result.id};${result.igUsername || ''};${result.pageId || ''}`
    ).join('\n');

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Results saved to ${filePath}`);
}

fetchAllData(ids)
    .then(results => saveToTextFile(results, 'facebook_ads_data.txt'))
    .catch(error => {
        console.error('Error in fetchAllData:', error);
    });
