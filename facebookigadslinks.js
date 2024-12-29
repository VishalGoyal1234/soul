const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=460034040251621',
'https://www.facebook.com/ads/library/?id=936573138474924',
'https://www.facebook.com/ads/library/?id=455399521000017',
'https://www.facebook.com/ads/library/?id=1135784158334259',
'https://www.facebook.com/ads/library/?id=1678634292700679',
'https://www.facebook.com/ads/library/?id=1101571605000094',
'https://www.facebook.com/ads/library/?id=8928641333886381',
'https://www.facebook.com/ads/library/?id=569808755826364',
'https://www.facebook.com/ads/library/?id=1747577166095486',
'https://www.facebook.com/ads/library/?id=1249679449416991',
'https://www.facebook.com/ads/library/?id=1608222120073591',
'https://www.facebook.com/ads/library/?id=3069269173223962',
'https://www.facebook.com/ads/library/?id=482720741493808',
'https://www.facebook.com/ads/library/?id=1792402674896893',
'https://www.facebook.com/ads/library/?id=1060235199231761',
'https://www.facebook.com/ads/library/?id=1308960623433010',
'https://www.facebook.com/ads/library/?id=941744714438256',
'https://www.facebook.com/ads/library/?id=1592148708182561',
'https://www.facebook.com/ads/library/?id=383520764809907',
'https://www.facebook.com/ads/library/?id=1134372350999394',
'https://www.facebook.com/ads/library/?id=186009590147377',
'https://www.facebook.com/ads/library/?id=593199806691647',
'https://www.facebook.com/ads/library/?id=622138383614125',
'https://www.facebook.com/ads/library/?id=936573138474924',
'https://www.facebook.com/ads/library/?id=567294509560624',
'https://www.facebook.com/ads/library/?id=3735850616559325',
'https://www.facebook.com/ads/library/?id=1086920329893067',
'https://www.facebook.com/ads/library/?id=595793726353847',
'https://www.facebook.com/ads/library/?id=1049414396984980',
'https://www.facebook.com/ads/library/?id=535134782665963',
'https://www.facebook.com/ads/library/?id=3842178679373660',
'https://www.facebook.com/ads/library/?id=941744714438256',
'https://www.facebook.com/ads/library/?id=537219218743057',
'https://www.facebook.com/ads/library/?id=1705363276627808',
'https://www.facebook.com/ads/library/?id=556896532821468',
'https://www.facebook.com/ads/library/?id=9685835031431048',
'https://www.facebook.com/ads/library/?id=611733781198249',
'https://www.facebook.com/ads/library/?id=491441080152585',
'https://www.facebook.com/ads/library/?id=1305620094195887',
'https://www.facebook.com/ads/library/?id=2741600616027609',
'https://www.facebook.com/ads/library/?id=1120483679013121',
'https://www.facebook.com/ads/library/?id=1586979502187258',
'https://www.facebook.com/ads/library/?id=1102188504790776',
'https://www.facebook.com/ads/library/?id=3445004879128603',
'https://www.facebook.com/ads/library/?id=1136809004731002',
'https://www.facebook.com/ads/library/?id=1541228046574600',
'https://www.facebook.com/ads/library/?id=8807244936053973',
'https://www.facebook.com/ads/library/?id=625728686541468',
'https://www.facebook.com/ads/library/?id=599350012864115',
'https://www.facebook.com/ads/library/?id=3427743107528993',
'https://www.facebook.com/ads/library/?id=618020060893111',
'https://www.facebook.com/ads/library/?id=1085601810030292',
'https://www.facebook.com/ads/library/?id=1018360633641136',
'https://www.facebook.com/ads/library/?id=8798275690219444',
'https://www.facebook.com/ads/library/?id=602392308910035',
'https://www.facebook.com/ads/library/?id=1370410461056632',
'https://www.facebook.com/ads/library/?id=1156010786234047',
'https://www.facebook.com/ads/library/?id=1138172251036808',
'https://www.facebook.com/ads/library/?id=1119533863164726',
'https://www.facebook.com/ads/library/?id=1791569748258320',
'https://www.facebook.com/ads/library/?id=599399036181678',
'https://www.facebook.com/ads/library/?id=1558278781527050',
'https://www.facebook.com/ads/library/?id=968204278492904',
'https://www.facebook.com/ads/library/?id=905207918432075',
'https://www.facebook.com/ads/library/?id=607816231765995',
'https://www.facebook.com/ads/library/?id=8947608205352070',
'https://www.facebook.com/ads/library/?id=905207918432075',
'https://www.facebook.com/ads/library/?id=1149724903174594',
'https://www.facebook.com/ads/library/?id=1336474584455434',
'https://www.facebook.com/ads/library/?id=1288941072438366',
'https://www.facebook.com/ads/library/?id=1782555215891039',
'https://www.facebook.com/ads/library/?id=947288637336716',
'https://www.facebook.com/ads/library/?id=967295748545454',
'https://www.facebook.com/ads/library/?id=1780580989393891',
'https://www.facebook.com/ads/library/?id=1107341887762116',
'https://www.facebook.com/ads/library/?id=951165496345566',
'https://www.facebook.com/ads/library/?id=616345184066104',
'https://www.facebook.com/ads/library/?id=1487460058761466',
'https://www.facebook.com/ads/library/?id=601328695618207',
'https://www.facebook.com/ads/library/?id=445447581955978',
'https://www.facebook.com/ads/library/?id=1118640003238387',
'https://www.facebook.com/ads/library/?id=603774305560803',
'https://www.facebook.com/ads/library/?id=1104635230958833',
'https://www.facebook.com/ads/library/?id=460609623763916',
'https://www.facebook.com/ads/library/?id=1135801484922741',
'https://www.facebook.com/ads/library/?id=2207892162982773',
'https://www.facebook.com/ads/library/?id=1403447087285372',
'https://www.facebook.com/ads/library/?id=899955918952521',
'https://www.facebook.com/ads/library/?id=9806404029374082',
'https://www.facebook.com/ads/library/?id=1104255631392826',
'https://www.facebook.com/ads/library/?id=487503207191215',
'https://www.facebook.com/ads/library/?id=1139363017530659',
'https://www.facebook.com/ads/library/?id=1137820041387817',
'https://www.facebook.com/ads/library/?id=598434046004735',
'https://www.facebook.com/ads/library/?id=1138561687812416',
'https://www.facebook.com/ads/library/?id=1728090874710627',
'https://www.facebook.com/ads/library/?id=1141230224031925',
'https://www.facebook.com/ads/library/?id=1016405843575945',
'https://www.facebook.com/ads/library/?id=974257338059294',
'https://www.facebook.com/ads/library/?id=842031381220498',
'https://www.facebook.com/ads/library/?id=908619090989934',
'https://www.facebook.com/ads/library/?id=942854174387026',
'https://www.facebook.com/ads/library/?id=2123962888059912',
'https://www.facebook.com/ads/library/?id=643651844654700',
'https://www.facebook.com/ads/library/?id=1008739771295960',
'https://www.facebook.com/ads/library/?id=889296960082158',
'https://www.facebook.com/ads/library/?id=552221370906736',
'https://www.facebook.com/ads/library/?id=486106161152042',
'https://www.facebook.com/ads/library/?id=2120498338352995',
'https://www.facebook.com/ads/library/?id=1302099817615299',
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
