const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1617429242176952',
'https://www.facebook.com/ads/library/?id=1517520102296686',
'https://www.facebook.com/ads/library/?id=459343626858134',
'https://www.facebook.com/ads/library/?id=552231991060265',
'https://www.facebook.com/ads/library/?id=972301994922117',
'https://www.facebook.com/ads/library/?id=1260457861904621',
'https://www.facebook.com/ads/library/?id=1116136613559422',
'https://www.facebook.com/ads/library/?id=1280849420005864',
'https://www.facebook.com/ads/library/?id=857022513007188',
'https://www.facebook.com/ads/library/?id=940517981318860',
'https://www.facebook.com/ads/library/?id=3820871441563150',
'https://www.facebook.com/ads/library/?id=8734610206656537',
'https://www.facebook.com/ads/library/?id=906207308296086',
'https://www.facebook.com/ads/library/?id=8825841917505823',
'https://www.facebook.com/ads/library/?id=2315103725505559',
'https://www.facebook.com/ads/library/?id=1088908945781756',
'https://www.facebook.com/ads/library/?id=956866226493167',
'https://www.facebook.com/ads/library/?id=1264316771383872',
'https://www.facebook.com/ads/library/?id=1983228652150308',
'https://www.facebook.com/ads/library/?id=918947830333375',
'https://www.facebook.com/ads/library/?id=541948495416506',
'https://www.facebook.com/ads/library/?id=3838590549727908',
'https://www.facebook.com/ads/library/?id=885987560185914',
'https://www.facebook.com/ads/library/?id=3994717020793322',
'https://www.facebook.com/ads/library/?id=8658044960910993',
'https://www.facebook.com/ads/library/?id=983746503581142',
'https://www.facebook.com/ads/library/?id=898769839057005',
'https://www.facebook.com/ads/library/?id=1336707351039962',
'https://www.facebook.com/ads/library/?id=896569845543616',
'https://www.facebook.com/ads/library/?id=1124598429275737',
'https://www.facebook.com/ads/library/?id=1334467837918161',
'https://www.facebook.com/ads/library/?id=1578874366067708',
'https://www.facebook.com/ads/library/?id=1055278762952756',
'https://www.facebook.com/ads/library/?id=484974360664273',
'https://www.facebook.com/ads/library/?id=896245409315905',
'https://www.facebook.com/ads/library/?id=531274523233850',
'https://www.facebook.com/ads/library/?id=880141120972012',
'https://www.facebook.com/ads/library/?id=2904875013010217',
'https://www.facebook.com/ads/library/?id=8805547279492144',
'https://www.facebook.com/ads/library/?id=1975618176278752',
'https://www.facebook.com/ads/library/?id=1240562197176418',
'https://www.facebook.com/ads/library/?id=2270367620007377',
'https://www.facebook.com/ads/library/?id=1059781919229196',
'https://www.facebook.com/ads/library/?id=8762220093871875',
'https://www.facebook.com/ads/library/?id=1088670036123382',
'https://www.facebook.com/ads/library/?id=374780785663185',
'https://www.facebook.com/ads/library/?id=906423724930488',
'https://www.facebook.com/ads/library/?id=874711294823897',
'https://www.facebook.com/ads/library/?id=1082436599805408',
'https://www.facebook.com/ads/library/?id=465432753226567',
'https://www.facebook.com/ads/library/?id=1263202404735819',
'https://www.facebook.com/ads/library/?id=536382825943898',
'https://www.facebook.com/ads/library/?id=1223150622127965',
'https://www.facebook.com/ads/library/?id=1590153131860399',
'https://www.facebook.com/ads/library/?id=3827339217487491',
'https://www.facebook.com/ads/library/?id=555196264024864',
'https://www.facebook.com/ads/library/?id=855198926685526',
'https://www.facebook.com/ads/library/?id=552623190817154',
'https://www.facebook.com/ads/library/?id=869450761974898',
'https://www.facebook.com/ads/library/?id=1468133204574681',
'https://www.facebook.com/ads/library/?id=1840422446361513',
'https://www.facebook.com/ads/library/?id=2086768891739408',
'https://www.facebook.com/ads/library/?id=1654786311785874',
'https://www.facebook.com/ads/library/?id=1741274193385330',
'https://www.facebook.com/ads/library/?id=1085250996429802',
'https://www.facebook.com/ads/library/?id=450463114351032',
'https://www.facebook.com/ads/library/?id=1647219229166734',
'https://www.facebook.com/ads/library/?id=864338822528027',
'https://www.facebook.com/ads/library/?id=1695829597940360',
'https://www.facebook.com/ads/library/?id=434619469408273',
'https://www.facebook.com/ads/library/?id=866565185591867',
'https://www.facebook.com/ads/library/?id=478750608503674',
'https://www.facebook.com/ads/library/?id=490967173989519',
'https://www.facebook.com/ads/library/?id=1469995587030696',
'https://www.facebook.com/ads/library/?id=529728063242250',
'https://www.facebook.com/ads/library/?id=1519581245346716',
'https://www.facebook.com/ads/library/?id=916031573832315',
'https://www.facebook.com/ads/library/?id=3680363535562516',
'https://www.facebook.com/ads/library/?id=852578563699293',
'https://www.facebook.com/ads/library/?id=3386356271661048',
'https://www.facebook.com/ads/library/?id=3386356271661048',
'https://www.facebook.com/ads/library/?id=3680363535562516',
'https://www.facebook.com/ads/library/?id=1295894618454818',
'https://www.facebook.com/ads/library/?id=1220085369113725',
'https://www.facebook.com/ads/library/?id=1077695694002443',
'https://www.facebook.com/ads/library/?id=512327024939330',
'https://www.facebook.com/ads/library/?id=545213901490613',
'https://www.facebook.com/ads/library/?id=563098399537762',
'https://www.facebook.com/ads/library/?id=526632393650846',
'https://www.facebook.com/ads/library/?id=862677635627389',
'https://www.facebook.com/ads/library/?id=1050988553240423',
'https://www.facebook.com/ads/library/?id=1593323874955505',
'https://www.facebook.com/ads/library/?id=1450615838990644',
'https://www.facebook.com/ads/library/?id=483654971174903',
'https://www.facebook.com/ads/library/?id=423070000792769',
'https://www.facebook.com/ads/library/?id=1739790156780355',
'https://www.facebook.com/ads/library/?id=526262389788410',
'https://www.facebook.com/ads/library/?id=1042368967534370',
'https://www.facebook.com/ads/library/?id=2280565415636939',
'https://www.facebook.com/ads/library/?id=1273836750660610',
'https://www.facebook.com/ads/library/?id=1184805922740392',
'https://www.facebook.com/ads/library/?id=1177431613491055',
'https://www.facebook.com/ads/library/?id=1198511691414919',
'https://www.facebook.com/ads/library/?id=369531126191762',
'https://www.facebook.com/ads/library/?id=1002663234518510',
'https://www.facebook.com/ads/library/?id=1535395443724240',
'https://www.facebook.com/ads/library/?id=524937059893157',
'https://www.facebook.com/ads/library/?id=1000395425118342',
'https://www.facebook.com/ads/library/?id=1251078779396192',
'https://www.facebook.com/ads/library/?id=1091581759247935',
'https://www.facebook.com/ads/library/?id=2066107947173992',
'https://www.facebook.com/ads/library/?id=1281693753205464',
'https://www.facebook.com/ads/library/?id=498332985998961',
'https://www.facebook.com/ads/library/?id=1036017541289802',
'https://www.facebook.com/ads/library/?id=1036017541289802',
'https://www.facebook.com/ads/library/?id=578091406883204'
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
