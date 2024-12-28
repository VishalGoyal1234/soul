const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=3058951467593550',
'https://www.facebook.com/ads/library/?id=1646495436268347',
'https://www.facebook.com/ads/library/?id=604893961885012',
'https://www.facebook.com/ads/library/?id=973417237944443',
'https://www.facebook.com/ads/library/?id=500461503032465',
'https://www.facebook.com/ads/library/?id=1108515533546012',
'https://www.facebook.com/ads/library/?id=947320840590363',
'https://www.facebook.com/ads/library/?id=1778864949593600',
'https://www.facebook.com/ads/library/?id=870906581910876',
'https://www.facebook.com/ads/library/?id=583430640731396',
'https://www.facebook.com/ads/library/?id=2322795454729764',
'https://www.facebook.com/ads/library/?id=1120470246104433',
'https://www.facebook.com/ads/library/?id=2440193996186330',
'https://www.facebook.com/ads/library/?id=1112054380492558',
'https://www.facebook.com/ads/library/?id=1250964406122510',
'https://www.facebook.com/ads/library/?id=889191249996706',
'https://www.facebook.com/ads/library/?id=493962913673257',
'https://www.facebook.com/ads/library/?id=571818921902920',
'https://www.facebook.com/ads/library/?id=1747184859468586',
'https://www.facebook.com/ads/library/?id=3820170271556088',
'https://www.facebook.com/ads/library/?id=1273902204046421',
'https://www.facebook.com/ads/library/?id=2078025929300111',
'https://www.facebook.com/ads/library/?id=556540196956608',
'https://www.facebook.com/ads/library/?id=28160672713520068',
'https://www.facebook.com/ads/library/?id=8450188338363672',
'https://www.facebook.com/ads/library/?id=904267001195760',
'https://www.facebook.com/ads/library/?id=933252802000035',
'https://www.facebook.com/ads/library/?id=463101336750607',
'https://www.facebook.com/ads/library/?id=1692513908149323',
'https://www.facebook.com/ads/library/?id=1256384755378730',
'https://www.facebook.com/ads/library/?id=1032049505384889',
'https://www.facebook.com/ads/library/?id=1178568503220043',
'https://www.facebook.com/ads/library/?id=567905345570123',
'https://www.facebook.com/ads/library/?id=952843053269611',
'https://www.facebook.com/ads/library/?id=1231018241384883',
'https://www.facebook.com/ads/library/?id=558408893354599',
'https://www.facebook.com/ads/library/?id=544125791389459',
'https://www.facebook.com/ads/library/?id=870998325090289',
'https://www.facebook.com/ads/library/?id=532934385858144',
'https://www.facebook.com/ads/library/?id=798236362382887',
'https://www.facebook.com/ads/library/?id=771087008542196',
'https://www.facebook.com/ads/library/?id=335329552915756',
'https://www.facebook.com/ads/library/?id=300418106493730',
'https://www.facebook.com/ads/library/?id=824014436238339',
'https://www.facebook.com/ads/library/?id=365077886547227',
'https://www.facebook.com/ads/library/?id=438862205326226',
'https://www.facebook.com/ads/library/?id=1345935876108134',
'https://www.facebook.com/ads/library/?id=764659268347453',
'https://www.facebook.com/ads/library/?id=1820321775078898',
'https://www.facebook.com/ads/library/?id=1052229669148211',
'https://www.facebook.com/ads/library/?id=719625340165637',
'https://www.facebook.com/ads/library/?id=1214217652557849',
'https://www.facebook.com/ads/library/?id=190973036965260',
'https://www.facebook.com/ads/library/?id=1060739167957447',
'https://www.facebook.com/ads/library/?id=389418366227933',
'https://www.facebook.com/ads/library/?id=467818098231946',
'https://www.facebook.com/ads/library/?id=401822891553314',
'https://www.facebook.com/ads/library/?id=365942808320785',
'https://www.facebook.com/ads/library/?id=1162535400845838',
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
