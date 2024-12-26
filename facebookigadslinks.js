const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1342149196780007',  
'https://www.facebook.com/ads/library/?id=1849288362544352',  
'https://www.facebook.com/ads/library/?id=566171962849537',  
'https://www.facebook.com/ads/library/?id=570932565697198',  
'https://www.facebook.com/ads/library/?id=956671149728658',  
'https://www.facebook.com/ads/library/?id=1701608807071527',  
'https://www.facebook.com/ads/library/?id=27945549855091246',  
'https://www.facebook.com/ads/library/?id=2361908400817799',  
'https://www.facebook.com/ads/library/?id=616515947511528',  
'https://www.facebook.com/ads/library/?id=1124989965957475',  
'https://www.facebook.com/ads/library/?id=1704334133829749',  
'https://www.facebook.com/ads/library/?id=610958144652039',  
'https://www.facebook.com/ads/library/?id=922203076714436',  
'https://www.facebook.com/ads/library/?id=1725873467982522',  
'https://www.facebook.com/ads/library/?id=944662387084727',  
'https://www.facebook.com/ads/library/?id=614919591196320',  
'https://www.facebook.com/ads/library/?id=941909657495481',  
'https://www.facebook.com/ads/library/?id=2074176103003572',  
'https://www.facebook.com/ads/library/?id=1139844234470461',  
'https://www.facebook.com/ads/library/?id=933577291719078',  
'https://www.facebook.com/ads/library/?id=1305449627151709',  
'https://www.facebook.com/ads/library/?id=559111686966680',  
'https://www.facebook.com/ads/library/?id=602253175791740',  
'https://www.facebook.com/ads/library/?id=559506436991653',  
'https://www.facebook.com/ads/library/?id=1485359835487426',  
'https://www.facebook.com/ads/library/?id=1282959093039700',  
'https://www.facebook.com/ads/library/?id=1611341883078603',  
'https://www.facebook.com/ads/library/?id=1228634694878175',  
'https://www.facebook.com/ads/library/?id=1131901035229073',  
'https://www.facebook.com/ads/library/?id=1092527075940750',  
'https://www.facebook.com/ads/library/?id=914442147471787',  
'https://www.facebook.com/ads/library/?id=576587268558803',  
'https://www.facebook.com/ads/library/?id=1100586888280090',  
'https://www.facebook.com/ads/library/?id=2833621103480278',  
'https://www.facebook.com/ads/library/?id=588698873945855',  
'https://www.facebook.com/ads/library/?id=558833653689272',  
'https://www.facebook.com/ads/library/?id=568420959267044',  
'https://www.facebook.com/ads/library/?id=432781573242681',  
'https://www.facebook.com/ads/library/?id=557427747184659',  
'https://www.facebook.com/ads/library/?id=1368763227904163',  
'https://www.facebook.com/ads/library/?id=580647338039780',  
'https://www.facebook.com/ads/library/?id=589552283777997',  
'https://www.facebook.com/ads/library/?id=534857423041203',  
'https://www.facebook.com/ads/library/?id=1131726431959946',  
'https://www.facebook.com/ads/library/?id=468730742584434',  
'https://www.facebook.com/ads/library/?id=942073897401848',  
'https://www.facebook.com/ads/library/?id=3347611698703749',

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
