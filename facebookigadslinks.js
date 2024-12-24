const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=570231802602588', 
'https://www.facebook.com/ads/library/?id=1370424517639817', 
'https://www.facebook.com/ads/library/?id=1251827686109671', 
'https://www.facebook.com/ads/library/?id=2038359413279503', 
'https://www.facebook.com/ads/library/?id=8653762314733104', 
'https://www.facebook.com/ads/library/?id=2910118149152023', 
'https://www.facebook.com/ads/library/?id=1492746641412953', 
'https://www.facebook.com/ads/library/?id=1404592097613600', 
'https://www.facebook.com/ads/library/?id=1500030860657871', 
'https://www.facebook.com/ads/library/?id=600034425928392', 
'https://www.facebook.com/ads/library/?id=1087109902894180', 
'https://www.facebook.com/ads/library/?id=1087759622670857', 
'https://www.facebook.com/ads/library/?id=3837298303265744', 
'https://www.facebook.com/ads/library/?id=1106560364464700', 
'https://www.facebook.com/ads/library/?id=899264295627091', 
'https://www.facebook.com/ads/library/?id=552558104358432', 
'https://www.facebook.com/ads/library/?id=1259536308338597', 
'https://www.facebook.com/ads/library/?id=1193817738778678', 
'https://www.facebook.com/ads/library/?id=1068185681764839', 
'https://www.facebook.com/ads/library/?id=2380632738954683', 
'https://www.facebook.com/ads/library/?id=561910273264672', 
'https://www.facebook.com/ads/library/?id=595394746247082', 
'https://www.facebook.com/ads/library/?id=915917183969141', 
'https://www.facebook.com/ads/library/?id=528170913496446', 
'https://www.facebook.com/ads/library/?id=581348321232298', 
'https://www.facebook.com/ads/library/?id=1046144047170337', 
'https://www.facebook.com/ads/library/?id=825488532771997', 
'https://www.facebook.com/ads/library/?id=855854172544773', 
'https://www.facebook.com/ads/library/?id=933883798765145', 
'https://www.facebook.com/ads/library/?id=891621802867912', 
'https://www.facebook.com/ads/library/?id=2385726931814864', 
'https://www.facebook.com/ads/library/?id=1257105225540338', 
'https://www.facebook.com/ads/library/?id=1101814794729470', 
'https://www.facebook.com/ads/library/?id=1492746641412953', 
'https://www.facebook.com/ads/library/?id=1606716893269389', 
'https://www.facebook.com/ads/library/?id=3837298303265744', 
'https://www.facebook.com/ads/library/?id=1087759622670857', 
'https://www.facebook.com/ads/library/?id=1689428668288588', 
'https://www.facebook.com/ads/library/?id=561015176800469', 
'https://www.facebook.com/ads/library/?id=477209272073857', 
'https://www.facebook.com/ads/library/?id=1522354671888878', 
'https://www.facebook.com/ads/library/?id=491543376782226', 
'https://www.facebook.com/ads/library/?id=3586595608300236', 
'https://www.facebook.com/ads/library/?id=1113738807048846', 
'https://www.facebook.com/ads/library/?id=897151065740717', 
'https://www.facebook.com/ads/library/?id=917916723814619', 
'https://www.facebook.com/ads/library/?id=1233663114387290', 
'https://www.facebook.com/ads/library/?id=2057237878060665', 
'https://www.facebook.com/ads/library/?id=590131226998608', 
'https://www.facebook.com/ads/library/?id=3038115539677696', 
'https://www.facebook.com/ads/library/?id=1268376854481849', 
'https://www.facebook.com/ads/library/?id=1052005956726645', 
'https://www.facebook.com/ads/library/?id=1559712978238788', 
'https://www.facebook.com/ads/library/?id=2681009585621792', 
'https://www.facebook.com/ads/library/?id=1096359495549259', 
'https://www.facebook.com/ads/library/?id=1240948170467752', 
'https://www.facebook.com/ads/library/?id=583222107795524', 
'https://www.facebook.com/ads/library/?id=603149118869637', 
'https://www.facebook.com/ads/library/?id=1066823995116715', 
'https://www.facebook.com/ads/library/?id=1561464144503131', 
'https://www.facebook.com/ads/library/?id=624288606696337', 
'https://www.facebook.com/ads/library/?id=1516068399081370', 
'https://www.facebook.com/ads/library/?id=1117532642781634', 
'https://www.facebook.com/ads/library/?id=2054306661672338', 
'https://www.facebook.com/ads/library/?id=977228807558536', 
'https://www.facebook.com/ads/library/?id=1143363413791758', 
'https://www.facebook.com/ads/library/?id=1114097923505296', 
'https://www.facebook.com/ads/library/?id=1109986570607087', 
'https://www.facebook.com/ads/library/?id=1312000963050969', 
'https://www.facebook.com/ads/library/?id=851675070253942', 
'https://www.facebook.com/ads/library/?id=562254610103954', 
'https://www.facebook.com/ads/library/?id=1089870089540284', 
'https://www.facebook.com/ads/library/?id=560351740225751', 
'https://www.facebook.com/ads/library/?id=1126457289071527', 
'https://www.facebook.com/ads/library/?id=1631166937805877', 
'https://www.facebook.com/ads/library/?id=613155551186768', 
'https://www.facebook.com/ads/library/?id=1613668772921276', 
'https://www.facebook.com/ads/library/?id=1574847609812341', 
'https://www.facebook.com/ads/library/?id=507368682337981', 
'https://www.facebook.com/ads/library/?id=602811228865798', 
'https://www.facebook.com/ads/library/?id=1086838876257136', 
'https://www.facebook.com/ads/library/?id=937663001656079', 
'https://www.facebook.com/ads/library/?id=968629241984872', 
'https://www.facebook.com/ads/library/?id=1991794081284190', 
'https://www.facebook.com/ads/library/?id=961559002536749', 
'https://www.facebook.com/ads/library/?id=557542593830580', 
'https://www.facebook.com/ads/library/?id=840032884787751', 
'https://www.facebook.com/ads/library/?id=558514883852684', 
'https://www.facebook.com/ads/library/?id=574951582156173', 
'https://www.facebook.com/ads/library/?id=591653499937984', 
'https://www.facebook.com/ads/library/?id=1570613673639289', 
'https://www.facebook.com/ads/library/?id=1514655029196010', 
'https://www.facebook.com/ads/library/?id=1106050841012876', 
'https://www.facebook.com/ads/library/?id=592943306550519', 
'https://www.facebook.com/ads/library/?id=428720530172382', 
'https://www.facebook.com/ads/library/?id=1274645503761767', 
'https://www.facebook.com/ads/library/?id=1112297366942006', 
'https://www.facebook.com/ads/library/?id=1543418696346926', 
'https://www.facebook.com/ads/library/?id=1606716893269389', 
'https://www.facebook.com/ads/library/?id=2604089789790100', 
'https://www.facebook.com/ads/library/?id=1500030860657871', 
'https://www.facebook.com/ads/library/?id=565572639551888', 
'https://www.facebook.com/ads/library/?id=1095511211821352', 
'https://www.facebook.com/ads/library/?id=1742743183179393', 
'https://www.facebook.com/ads/library/?id=600034425928392', 
'https://www.facebook.com/ads/library/?id=1269241154406196', 
'https://www.facebook.com/ads/library/?id=2205218363205899', 
'https://www.facebook.com/ads/library/?id=1250721359538516', 
'https://www.facebook.com/ads/library/?id=886091377068916', 
'https://www.facebook.com/ads/library/?id=1323418552425913', 
'https://www.facebook.com/ads/library/?id=2067750623684237', 
'https://www.facebook.com/ads/library/?id=1289895152053224',
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
