const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=928285699405338',
'https://www.facebook.com/ads/library/?id=1098745395037445',
'https://www.facebook.com/ads/library/?id=1173465857537095',
'https://www.facebook.com/ads/library/?id=1606444049962999',
'https://www.facebook.com/ads/library/?id=564883613052162',
'https://www.facebook.com/ads/library/?id=1685944075667946',
'https://www.facebook.com/ads/library/?id=787820033510718',
'https://www.facebook.com/ads/library/?id=1098253338747398',
'https://www.facebook.com/ads/library/?id=787820033510718',
'https://www.facebook.com/ads/library/?id=1263565451528710',
'https://www.facebook.com/ads/library/?id=895697729217991',
'https://www.facebook.com/ads/library/?id=1404603957527396',
'https://www.facebook.com/ads/library/?id=1135384084652180',
'https://www.facebook.com/ads/library/?id=973731027939519',
'https://www.facebook.com/ads/library/?id=3009373412564321',
'https://www.facebook.com/ads/library/?id=616838654352689',
'https://www.facebook.com/ads/library/?id=1631110711164519',
'https://www.facebook.com/ads/library/?id=1112580140872869',
'https://www.facebook.com/ads/library/?id=1685425115514689',
'https://www.facebook.com/ads/library/?id=579406305049296',
'https://www.facebook.com/ads/library/?id=1143998547513507',
'https://www.facebook.com/ads/library/?id=1126872585719776',
'https://www.facebook.com/ads/library/?id=652929173723628',
'https://www.facebook.com/ads/library/?id=579406305049296',
'https://www.facebook.com/ads/library/?id=1092408119286011',
'https://www.facebook.com/ads/library/?id=914407600838307',
'https://www.facebook.com/ads/library/?id=1108985640938291',
'https://www.facebook.com/ads/library/?id=662399499874261',
'https://www.facebook.com/ads/library/?id=458863487271142',
'https://www.facebook.com/ads/library/?id=920021929894733',
'https://www.facebook.com/ads/library/?id=1623741798548637',
'https://www.facebook.com/ads/library/?id=1566683617319679',
'https://www.facebook.com/ads/library/?id=1659040238013950',
'https://www.facebook.com/ads/library/?id=959167592753005',
'https://www.facebook.com/ads/library/?id=946565576995638',
'https://www.facebook.com/ads/library/?id=986324133417392',
'https://www.facebook.com/ads/library/?id=1101761907872690',
'https://www.facebook.com/ads/library/?id=508437744949553',
'https://www.facebook.com/ads/library/?id=1522045341821801',
'https://www.facebook.com/ads/library/?id=1109889844102227',
'https://www.facebook.com/ads/library/?id=1242045960388370',
'https://www.facebook.com/ads/library/?id=623369573593214',
'https://www.facebook.com/ads/library/?id=1442431803384040',
'https://www.facebook.com/ads/library/?id=1803617030441852',
'https://www.facebook.com/ads/library/?id=551597944379002',
'https://www.facebook.com/ads/library/?id=1153849576126596',
'https://www.facebook.com/ads/library/?id=1153849576126596',
'https://www.facebook.com/ads/library/?id=1144337707431475',
'https://www.facebook.com/ads/library/?id=562553936541394',
'https://www.facebook.com/ads/library/?id=1235987904149532',
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
