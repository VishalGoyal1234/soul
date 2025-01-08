const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['http://www.facebook.com/ads/library/?id=3512874279015682',
'http://www.facebook.com/ads/library/?id=617548820617459',
'http://www.facebook.com/ads/library/?id=518587537899026',
'http://www.facebook.com/ads/library/?id=585607297738059',
'http://www.facebook.com/ads/library/?id=974968224676252',
'http://www.facebook.com/ads/library/?id=1145406143688017',
'http://www.facebook.com/ads/library/?id=886644040349886',
'http://www.facebook.com/ads/library/?id=3686148005016955',
'http://www.facebook.com/ads/library/?id=8967367173352876',
'http://www.facebook.com/ads/library/?id=1537777080260347',
'http://www.facebook.com/ads/library/?id=604388251982725',
'http://www.facebook.com/ads/library/?id=1284025996133552',
'http://www.facebook.com/ads/library/?id=981256840498960',
'http://www.facebook.com/ads/library/?id=1356791882162938',
'http://www.facebook.com/ads/library/?id=27967728806175899',
'http://www.facebook.com/ads/library/?id=397792680086334',
'http://www.facebook.com/ads/library/?id=1380958266679169',
'http://www.facebook.com/ads/library/?id=1098257708653344',
'http://www.facebook.com/ads/library/?id=1710951319449062',
'http://www.facebook.com/ads/library/?id=928829932195451',
'http://www.facebook.com/ads/library/?id=1362209505189093',
'http://www.facebook.com/ads/library/?id=559179730283801',
'http://www.facebook.com/ads/library/?id=943014437887868',
'http://www.facebook.com/ads/library/?id=1769610473883296',
'http://www.facebook.com/ads/library/?id=1189234696247260',
'http://www.facebook.com/ads/library/?id=2354092234967290',
'http://www.facebook.com/ads/library/?id=1076319520755332',
'http://www.facebook.com/ads/library/?id=567984029428374',
'http://www.facebook.com/ads/library/?id=1649248802688991',
'http://www.facebook.com/ads/library/?id=2108136902969888',
'http://www.facebook.com/ads/library/?id=491249940048702',
'http://www.facebook.com/ads/library/?id=3457266154582976',
'http://www.facebook.com/ads/library/?id=1820478325153435',
'http://www.facebook.com/ads/library/?id=1321076775994236',
'http://www.facebook.com/ads/library/?id=469353452463813',
'http://www.facebook.com/ads/library/?id=620655566975089',
'http://www.facebook.com/ads/library/?id=1562840774600395',
'http://www.facebook.com/ads/library/?id=3954341808218073',
'http://www.facebook.com/ads/library/?id=4129281120728728',
'http://www.facebook.com/ads/library/?id=1229641225004345',
'http://www.facebook.com/ads/library/?id=1109727150935541',
'http://www.facebook.com/ads/library/?id=1938518326639212',
'http://www.facebook.com/ads/library/?id=977150347205675',
'http://www.facebook.com/ads/library/?id=512196315115325',
'http://www.facebook.com/ads/library/?id=550315891210453',
'http://www.facebook.com/ads/library/?id=607080651666673',
'http://www.facebook.com/ads/library/?id=482106191084501',
'http://www.facebook.com/ads/library/?id=1478738839467371',
'http://www.facebook.com/ads/library/?id=928743465442785',
'http://www.facebook.com/ads/library/?id=594495149703098',
'http://www.facebook.com/ads/library/?id=553619570848346',
'http://www.facebook.com/ads/library/?id=452546344288422',
'http://www.facebook.com/ads/library/?id=9707253392634918',
'http://www.facebook.com/ads/library/?id=563793169705436',
'http://www.facebook.com/ads/library/?id=471217342239638',
'http://www.facebook.com/ads/library/?id=931963271699300',
'http://www.facebook.com/ads/library/?id=576453794762958',
'http://www.facebook.com/ads/library/?id=2538940729650585',
'http://www.facebook.com/ads/library/?id=979113150700749',
'http://www.facebook.com/ads/library/?id=1082766443629412',
'http://www.facebook.com/ads/library/?id=1087081666240785',
'http://www.facebook.com/ads/library/?id=914246234019464',
'http://www.facebook.com/ads/library/?id=2017566578726375',
'http://www.facebook.com/ads/library/?id=1292838768517049',
'http://www.facebook.com/ads/library/?id=4130592737175505',
'http://www.facebook.com/ads/library/?id=865755572076746',
'http://www.facebook.com/ads/library/?id=1720454255401560',
'http://www.facebook.com/ads/library/?id=567529409158521',
'http://www.facebook.com/ads/library/?id=1045702280692739',
'http://www.facebook.com/ads/library/?id=597889289436342',
'http://www.facebook.com/ads/library/?id=1619119222363272',
'http://www.facebook.com/ads/library/?id=929441492470040',
'http://www.facebook.com/ads/library/?id=1840508826689398',
'http://www.facebook.com/ads/library/?id=417751118062217',
'http://www.facebook.com/ads/library/?id=1977313312749630',
'http://www.facebook.com/ads/library/?id=540625248787334',
'http://www.facebook.com/ads/library/?id=446092068260112',
'http://www.facebook.com/ads/library/?id=589584810134404',
'http://www.facebook.com/ads/library/?id=3024526794360923',
'http://www.facebook.com/ads/library/?id=1117819979723130',
'http://www.facebook.com/ads/library/?id=1744698596265553',
'http://www.facebook.com/ads/library/?id=8590450927742625',
'http://www.facebook.com/ads/library/?id=583537610843476',
'http://www.facebook.com/ads/library/?id=1081457803631155',
'http://www.facebook.com/ads/library/?id=1739662423476876',
'http://www.facebook.com/ads/library/?id=8610532602363822',
'http://www.facebook.com/ads/library/?id=2265385453846796',
'http://www.facebook.com/ads/library/?id=1684811762086342',
'http://www.facebook.com/ads/library/?id=2449896305341742',
'http://www.facebook.com/ads/library/?id=8799210643479277',
'http://www.facebook.com/ads/library/?id=1837511846656122',
'http://www.facebook.com/ads/library/?id=409645198752306',
'http://www.facebook.com/ads/library/?id=909552374469595',
'http://www.facebook.com/ads/library/?id=897209379206033',
'http://www.facebook.com/ads/library/?id=602935672160247',
'http://www.facebook.com/ads/library/?id=595626173124006',
'http://www.facebook.com/ads/library/?id=1120458842993171',
'http://www.facebook.com/ads/library/?id=582474184190048',
'http://www.facebook.com/ads/library/?id=1774766486645622',
'http://www.facebook.com/ads/library/?id=1640350943533117',
'http://www.facebook.com/ads/library/?id=1124985762387588',
'http://www.facebook.com/ads/library/?id=1209539190123470',
'http://www.facebook.com/ads/library/?id=415213738189573',
'http://www.facebook.com/ads/library/?id=461240343205713',
'http://www.facebook.com/ads/library/?id=1319602979201355',
'http://www.facebook.com/ads/library/?id=1677449369481674',
'http://www.facebook.com/ads/library/?id=1221193012474157',
'http://www.facebook.com/ads/library/?id=883718587216527',
'http://www.facebook.com/ads/library/?id=1073888237325268',
'http://www.facebook.com/ads/library/?id=1573355677398280',
'http://www.facebook.com/ads/library/?id=796700689196701',
'http://www.facebook.com/ads/library/?id=3006805076136337',
'http://www.facebook.com/ads/library/?id=1414912773246962',
'http://www.facebook.com/ads/library/?id=1124239785929488',
'http://www.facebook.com/ads/library/?id=2856503811199162',
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
