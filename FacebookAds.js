const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1398841424407724',
'https://www.facebook.com/ads/library/?id=544251875112964',
'https://www.facebook.com/ads/library/?id=3871669286313014',
'https://www.facebook.com/ads/library/?id=1305757864209481',
'https://www.facebook.com/ads/library/?id=2316447908738364',
'https://www.facebook.com/ads/library/?id=565062119461470',
'https://www.facebook.com/ads/library/?id=2350427095316901',
'https://www.facebook.com/ads/library/?id=596325186147858',
'https://www.facebook.com/ads/library/?id=3887021124889320',
'https://www.facebook.com/ads/library/?id=1639997346897942',
'https://www.facebook.com/ads/library/?id=1207979056939615',
'https://www.facebook.com/ads/library/?id=1272858247195861',
'https://www.facebook.com/ads/library/?id=1596942070893210',
'https://www.facebook.com/ads/library/?id=581278604481183',
'https://www.facebook.com/ads/library/?id=3939773423010869',
'https://www.facebook.com/ads/library/?id=1330143528149168',
'https://www.facebook.com/ads/library/?id=1122721122726479',
'https://www.facebook.com/ads/library/?id=580968557673694',
'https://www.facebook.com/ads/library/?id=1712906229506506',
'https://www.facebook.com/ads/library/?id=515965194792871',
'https://www.facebook.com/ads/library/?id=540538875635214',
'https://www.facebook.com/ads/library/?id=582895760890763',
'https://www.facebook.com/ads/library/?id=1623363578550307',
'https://www.facebook.com/ads/library/?id=1101984844656547',
'https://www.facebook.com/ads/library/?id=1003437271590657',
'https://www.facebook.com/ads/library/?id=1086032932683322',
'https://www.facebook.com/ads/library/?id=535296972641665',
'https://www.facebook.com/ads/library/?id=418853124617022',
'https://www.facebook.com/ads/library/?id=1327500211945081',
'https://www.facebook.com/ads/library/?id=1088811025798884',
'https://www.facebook.com/ads/library/?id=1934208503726346',
'https://www.facebook.com/ads/library/?id=1712779092836780',
'https://www.facebook.com/ads/library/?id=1103660668056059',
'https://www.facebook.com/ads/library/?id=1302987337720658',
'https://www.facebook.com/ads/library/?id=426253433861655',
'https://www.facebook.com/ads/library/?id=578902224533227',
'https://www.facebook.com/ads/library/?id=1106696057675276',
'https://www.facebook.com/ads/library/?id=1084733779491751',
'https://www.facebook.com/ads/library/?id=1498719617511627',
'https://www.facebook.com/ads/library/?id=1298782237789248',
'https://www.facebook.com/ads/library/?id=936084761913886',
'https://www.facebook.com/ads/library/?id=1312453143454680',
'https://www.facebook.com/ads/library/?id=8612934322147724',
'https://www.facebook.com/ads/library/?id=580313244355670',
'https://www.facebook.com/ads/library/?id=554474607479176',
'https://www.facebook.com/ads/library/?id=940857154629647',
'https://www.facebook.com/ads/library/?id=1051303896795468',
'https://www.facebook.com/ads/library/?id=1120204656199140',
'https://www.facebook.com/ads/library/?id=1289726195391799',
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
                if (scriptContent && scriptContent.includes('"page_profile_uri":')) {
                    const pageProfileUriMatch = scriptContent.match(/"page_profile_uri":"([^"]+)"/);
                    if (pageProfileUriMatch) {
                        pageProfileUri = pageProfileUriMatch[1];
                    }
                }
                const igUsernameMatch = scriptContent.match(/"ig_username":"([^"]+)"/);
                if (igUsernameMatch) {
                    igUsername = igUsernameMatch[1];
                }
                else if (pageProfileUri && pageProfileUri.includes('facebook.com')) {
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
