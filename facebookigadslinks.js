const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=811723377747907',
'https://www.facebook.com/ads/library/?id=2921502481350039',
'https://www.facebook.com/ads/library/?id=28071347165845228',
'https://www.facebook.com/ads/library/?id=1489612691710219',
'https://www.facebook.com/ads/library/?id=1766278964147694',
'https://www.facebook.com/ads/library/?id=966529938674228',
'https://www.facebook.com/ads/library/?id=619464547092399',
'https://www.facebook.com/ads/library/?id=574261378829464',
'https://www.facebook.com/ads/library/?id=8844196432324272',
'https://www.facebook.com/ads/library/?id=938747877839750',
'https://www.facebook.com/ads/library/?id=1145160513645245',
'https://www.facebook.com/ads/library/?id=904173001880419',
'https://www.facebook.com/ads/library/?id=1129755422060942',
'https://www.facebook.com/ads/library/?id=1114742173512692',
'https://www.facebook.com/ads/library/?id=3020308348119160',
'https://www.facebook.com/ads/library/?id=576025001925928',
'https://www.facebook.com/ads/library/?id=4115161478717977',
'https://www.facebook.com/ads/library/?id=1618772705702355',
'https://www.facebook.com/ads/library/?id=1127131029042162',
'https://www.facebook.com/ads/library/?id=868406921867127',
'https://www.facebook.com/ads/library/?id=403698692736628',
'https://www.facebook.com/ads/library/?id=489950233578675',
'https://www.facebook.com/ads/library/?id=500912879671649',
'https://www.facebook.com/ads/library/?id=1503212393681780',
'https://www.facebook.com/ads/library/?id=1503212393681780',
'https://www.facebook.com/ads/library/?id=1792631134884861',
'https://www.facebook.com/ads/library/?id=3846679388914351',
'https://www.facebook.com/ads/library/?id=484495787998827',
'https://www.facebook.com/ads/library/?id=3582732821871501',
'https://www.facebook.com/ads/library/?id=445722085242556',
'https://www.facebook.com/ads/library/?id=882716993851496',
'https://www.facebook.com/ads/library/?id=1263036198252131',
'https://www.facebook.com/ads/library/?id=1628431231115313',
'https://www.facebook.com/ads/library/?id=1337517137659060',
'https://www.facebook.com/ads/library/?id=1104894341132107',
'https://www.facebook.com/ads/library/?id=2342375966101044',
'https://www.facebook.com/ads/library/?id=1110441610673363',
'https://www.facebook.com/ads/library/?id=1082068840055221',
'https://www.facebook.com/ads/library/?id=1164214455270968',
'https://www.facebook.com/ads/library/?id=1270922530701128',
'https://www.facebook.com/ads/library/?id=2474085762982938',
'https://www.facebook.com/ads/library/?id=1112965376720090',
'https://www.facebook.com/ads/library/?id=1644673539790109',
'https://www.facebook.com/ads/library/?id=1489612691710219',
'https://www.facebook.com/ads/library/?id=1333168224350467',
'https://www.facebook.com/ads/library/?id=1118927876499525',
'https://www.facebook.com/ads/library/?id=581179891199071',
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
