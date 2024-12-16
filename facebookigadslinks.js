const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=934134135247533',
'https://www.facebook.com/ads/library/?id=1502120337148246',
'https://www.facebook.com/ads/library/?id=567157279027458',
'https://www.facebook.com/ads/library/?id=512437268331334',
'https://www.facebook.com/ads/library/?id=907102101011102',
'https://www.facebook.com/ads/library/?id=531197399798995',
'https://www.facebook.com/ads/library/?id=478750608503674',
'https://www.facebook.com/ads/library/?id=452821934475386',
'https://www.facebook.com/ads/library/?id=672565130892020',
'https://www.facebook.com/ads/library/?id=840286091394943',
'https://www.facebook.com/ads/library/?id=1280403779589174',
'https://www.facebook.com/ads/library/?id=1002663234518510',
'https://www.facebook.com/ads/library/?id=2486576301732704',
'https://www.facebook.com/ads/library/?id=1454206285210579',
'https://www.facebook.com/ads/library/?id=772726994809942',
'https://www.facebook.com/ads/library/?id=1334506864566406',
'https://www.facebook.com/ads/library/?id=1280422886498492',
'https://www.facebook.com/ads/library/?id=1028437555985744',
'https://www.facebook.com/ads/library/?id=3688254174806696',
'https://www.facebook.com/ads/library/?id=975364264643053',
'https://www.facebook.com/ads/library/?id=1052264870003708',
'https://www.facebook.com/ads/library/?id=3726789450907411',
'https://www.facebook.com/ads/library/?id=1777527892997306',
'https://www.facebook.com/ads/library/?id=1764209334421521',
'https://www.facebook.com/ads/library/?id=1737268597110237',
'https://www.facebook.com/ads/library/?id=551525411007628',
'https://www.facebook.com/ads/library/?id=451350837650008',
'https://www.facebook.com/ads/library/?id=1026605729223504',
'https://www.facebook.com/ads/library/?id=2921259564729763',
'https://www.facebook.com/ads/library/?id=855198926685526',
'https://www.facebook.com/ads/library/?id=1647219229166734',
'https://www.facebook.com/ads/library/?id=1502120337148246',
'https://www.facebook.com/ads/library/?id=934134135247533',
'https://www.facebook.com/ads/library/?id=907102101011102',
'https://www.facebook.com/ads/library/?id=2045162619254763',
'https://www.facebook.com/ads/library/?id=3355180521442100',

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
