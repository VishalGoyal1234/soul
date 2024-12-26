const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=812191144356675',  
'https://www.facebook.com/ads/library/?id=3987269844881588',  
'https://www.facebook.com/ads/library/?id=1974744799716650',  
'https://www.facebook.com/ads/library/?id=1401852657713370',  
'https://www.facebook.com/ads/library/?id=1343693283642642',  
'https://www.facebook.com/ads/library/?id=1753625941872713',  
'https://www.facebook.com/ads/library/?id=979600880890959',  
'https://www.facebook.com/ads/library/?id=973019304643861',  
'https://www.facebook.com/ads/library/?id=571466548971536',  
'https://www.facebook.com/ads/library/?id=1712567299614930',  
'https://www.facebook.com/ads/library/?id=1133107318219029',  
'https://www.facebook.com/ads/library/?id=1667718694156727',  
'https://www.facebook.com/ads/library/?id=1773086896776392',  
'https://www.facebook.com/ads/library/?id=1155990609087671',  
'https://www.facebook.com/ads/library/?id=1099649025225376',  
'https://www.facebook.com/ads/library/?id=1485351285468844',  
'https://www.facebook.com/ads/library/?id=1922955774896843',  
'https://www.facebook.com/ads/library/?id=1118734953379253',  
'https://www.facebook.com/ads/library/?id=4031393910439061',  
'https://www.facebook.com/ads/library/?id=1103011591614344',  
'https://www.facebook.com/ads/library/?id=939178224395732',  
'https://www.facebook.com/ads/library/?id=554318254181016',  
'https://www.facebook.com/ads/library/?id=567073896255184',  
'https://www.facebook.com/ads/library/?id=2673373812850766',  
'https://www.facebook.com/ads/library/?id=616896697474816',  
'https://www.facebook.com/ads/library/?id=1613452722635036',  
'https://www.facebook.com/ads/library/?id=1811447449609099',
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
