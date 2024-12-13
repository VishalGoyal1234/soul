const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = [''https://www.facebook.com/ads/library/?id=1128062672040193',
'https://www.facebook.com/ads/library/?id=1052264870003708',
'https://www.facebook.com/ads/library/?id=1227200291707078',
'https://www.facebook.com/ads/library/?id=3919179671681721',
'https://www.facebook.com/ads/library/?id=2530044664053251',
'https://www.facebook.com/ads/library/?id=619025883887685',
'https://www.facebook.com/ads/library/?id=483046704303526',
'https://www.facebook.com/ads/library/?id=875765964628792',
'https://www.facebook.com/ads/library/?id=885880696995407',
'https://www.facebook.com/ads/library/?id=957896726220818',
'https://www.facebook.com/ads/library/?id=550387094526491',
'https://www.facebook.com/ads/library/?id=384123544728348',
'https://www.facebook.com/ads/library/?id=1307706566834804',
'https://www.facebook.com/ads/library/?id=1114574853529353',
'https://www.facebook.com/ads/library/?id=930131439025190',
'https://www.facebook.com/ads/library/?id=586358397212141',
'https://www.facebook.com/ads/library/?id=1299850647694867',
'https://www.facebook.com/ads/library/?id=2970194926472603',
'https://www.facebook.com/ads/library/?id=607904768430017',
'https://www.facebook.com/ads/library/?id=1242224680339278',
'https://www.facebook.com/ads/library/?id=880205274310347',
'https://www.facebook.com/ads/library/?id=500561203038232',
'https://www.facebook.com/ads/library/?id=1899513130578655',
'https://www.facebook.com/ads/library/?id=1026605729223504',
'https://www.facebook.com/ads/library/?id=1911907722632814',
'https://www.facebook.com/ads/library/?id=1737268597110237',
'https://www.facebook.com/ads/library/?id=1550754708904172',
'https://www.facebook.com/ads/library/?id=1260796501867596',
'https://www.facebook.com/ads/library/?id=1312149853556324',
'https://www.facebook.com/ads/library/?id=1083537466396518',
'https://www.facebook.com/ads/library/?id=1037008958176888',
'https://www.facebook.com/ads/library/?id=1329189401415505',
'https://www.facebook.com/ads/library/?id=1077227097278225',
'https://www.facebook.com/ads/library/?id=560635506730623',
'https://www.facebook.com/ads/library/?id=4137764693117370',
'https://www.facebook.com/ads/library/?id=1108459724012438',
'https://www.facebook.com/ads/library/?id=1712684832885822',
'https://www.facebook.com/ads/library/?id=8377128902415861',
'https://www.facebook.com/ads/library/?id=1629507211278252',
'https://www.facebook.com/ads/library/?id=582709840896959',
'https://www.facebook.com/ads/library/?id=1279137963263883',
'https://www.facebook.com/ads/library/?id=413302751833557',
'https://www.facebook.com/ads/library/?id=1208343767130779',
'https://www.facebook.com/ads/library/?id=1533543523947803',
'https://www.facebook.com/ads/library/?id=2846275955527175',
'https://www.facebook.com/ads/library/?id=910175377833634',
'https://www.facebook.com/ads/library/?id=8607664732588522',
'https://www.facebook.com/ads/library/?id=1280403779589174',
'https://www.facebook.com/ads/library/?id=1187476105632537',
'https://www.facebook.com/ads/library/?id=1450615838990644',
'https://www.facebook.com/ads/library/?id=802131921864002',
'https://www.facebook.com/ads/library/?id=660289022754146',
'https://www.facebook.com/ads/library/?id=1455797842478957',
'https://www.facebook.com/ads/library/?id=1097798772023519',
'https://www.facebook.com/ads/library/?id=483046704303526',
'https://www.facebook.com/ads/library/?id=384123544728348',
'https://www.facebook.com/ads/library/?id=550387094526491',
'https://www.facebook.com/ads/library/?id=885880696995407',
'https://www.facebook.com/ads/library/?id=1106413013870691',
'https://www.facebook.com/ads/library/?id=553280340924009',
'https://www.facebook.com/ads/library/?id=494304849696368',
'https://www.facebook.com/ads/library/?id=1113476930169783',
'https://www.facebook.com/ads/library/?id=2740351842802890',
'https://www.facebook.com/ads/library/?id=930131439025190',
'https://www.facebook.com/ads/library/?id=1037008958176888',
'https://www.facebook.com/ads/library/?id=1911907722632814',
'https://www.facebook.com/ads/library/?id=1083537466396518',
'https://www.facebook.com/ads/library/?id=1084067953029204',
'https://www.facebook.com/ads/library/?id=1136145801368218',
'https://www.facebook.com/ads/library/?id=1629507211278252',
'https://www.facebook.com/ads/library/?id=472691002599980',
'https://www.facebook.com/ads/library/?id=1712684832885822',
'https://www.facebook.com/ads/library/?id=1279137963263883',
'https://www.facebook.com/ads/library/?id=8377128902415861',
'https://www.facebook.com/ads/library/?id=452356491151339',
'https://www.facebook.com/ads/library/?id=863885112114722',
'https://www.facebook.com/ads/library/?id=1038317197136255',
'https://www.facebook.com/ads/library/?id=840286091394943',
'https://www.facebook.com/ads/library/?id=8521550491189493',
'https://www.facebook.com/ads/library/?id=1455797842478957',
'https://www.facebook.com/ads/library/?id=498332985998961',
'https://www.facebook.com/ads/library/?id=303001902758966',
'https://www.facebook.com/ads/library/?id=198176156676577',
'https://www.facebook.com/ads/library/?id=363397026060043',
'https://www.facebook.com/ads/library/?id=660289022754146',
'https://www.facebook.com/ads/library/?id=573840865431306',
'https://www.facebook.com/ads/library/?id=384123544728348',
'https://www.facebook.com/ads/library/?id=586358397212141',
'https://www.facebook.com/ads/library/?id=1249267682908563',
'https://www.facebook.com/ads/library/?id=1114574853529353',
'https://www.facebook.com/ads/library/?id=2870159386476415',
'https://www.facebook.com/ads/library/?id=930131439025190',
'https://www.facebook.com/ads/library/?id=923414159750896',
'https://www.facebook.com/ads/library/?id=591103263277219',
'https://www.facebook.com/ads/library/?id=494304849696368',
'https://www.facebook.com/ads/library/?id=880205274310347',
'https://www.facebook.com/ads/library/?id=956866226493167',
'https://www.facebook.com/ads/library/?id=1136145801368218',
'https://www.facebook.com/ads/library/?id=1737268597110237',
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
                const pageAliasMatch = scriptContent.match(/"page_alias":"([^"]+)"/);
                if (igUsernameMatch) {
                    igUsername = igUsernameMatch[1];
                } else if (pageAliasMatch) {                    
                    pageId = pageAliasMatch[1];
                } else {
                    const pageIdMatch = scriptContent.match(/"page_id":"([^"]+)"/);
                    pageId = 'https://www.facebook.com/' + pageIdMatch[1];
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
