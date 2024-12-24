const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1241086113849106',
'https://www.facebook.com/ads/library/?id=512535411816070',
'https://www.facebook.com/ads/library/?id=3472993113005711',
'https://www.facebook.com/ads/library/?id=1374098153973997',
'https://www.facebook.com/ads/library/?id=898947675342602',
'https://www.facebook.com/ads/library/?id=1118705693189273',
'https://www.facebook.com/ads/library/?id=967499125302979',
'https://www.facebook.com/ads/library/?id=505466442530064',
'https://www.facebook.com/ads/library/?id=1256101842626420',
'https://www.facebook.com/ads/library/?id=1642795663286013',
'https://www.facebook.com/ads/library/?id=1104129328010455',
'https://www.facebook.com/ads/library/?id=1809531472785114',
'https://www.facebook.com/ads/library/?id=2214998948899161',
'https://www.facebook.com/ads/library/?id=1320127808976497',
'https://www.facebook.com/ads/library/?id=1056295369516930',
'https://www.facebook.com/ads/library/?id=1366799554701991',
'https://www.facebook.com/ads/library/?id=1715108439282043',
'https://www.facebook.com/ads/library/?id=1590775071521372',
'https://www.facebook.com/ads/library/?id=1122148506102927',
'https://www.facebook.com/ads/library/?id=1315471326299701',
'https://www.facebook.com/ads/library/?id=436331369511743',
'https://www.facebook.com/ads/library/?id=433367412969170',
'https://www.facebook.com/ads/library/?id=618757324052580',
'https://www.facebook.com/ads/library/?id=920392006365189',
'https://www.facebook.com/ads/library/?id=1820405608702696',
'https://www.facebook.com/ads/library/?id=1237023194185970',
'https://www.facebook.com/ads/library/?id=576055271494377',
'https://www.facebook.com/ads/library/?id=546546854874141',
'https://www.facebook.com/ads/library/?id=1132340881833481',
'https://www.facebook.com/ads/library/?id=1095236022393685',
'https://www.facebook.com/ads/library/?id=595394746247082',
'https://www.facebook.com/ads/library/?id=1235080660886632',
'https://www.facebook.com/ads/library/?id=1456435411888314',
'https://www.facebook.com/ads/library/?id=968135722018222',
'https://www.facebook.com/ads/library/?id=1112124550509067',
'https://www.facebook.com/ads/library/?id=531291826491789',
'https://www.facebook.com/ads/library/?id=936559738370756',
'https://www.facebook.com/ads/library/?id=3886136655033385',
'https://www.facebook.com/ads/library/?id=1142677847425438',
'https://www.facebook.com/ads/library/?id=493081750443026',
'https://www.facebook.com/ads/library/?id=532293496447998',
'https://www.facebook.com/ads/library/?id=850594377272016',
'https://www.facebook.com/ads/library/?id=601719309197847',
'https://www.facebook.com/ads/library/?id=933698741428576',
'https://www.facebook.com/ads/library/?id=1564267557784295',
'https://www.facebook.com/ads/library/?id=891332579783612',
'https://www.facebook.com/ads/library/?id=371971502594396',
'https://www.facebook.com/ads/library/?id=579943311198854',
'https://www.facebook.com/ads/library/?id=1080370327218188',
'https://www.facebook.com/ads/library/?id=945802637361852',
'https://www.facebook.com/ads/library/?id=1107149724308565',
'https://www.facebook.com/ads/library/?id=1774957749944716',
'https://www.facebook.com/ads/library/?id=1292538511949256',
'https://www.facebook.com/ads/library/?id=888293626727244',
'https://www.facebook.com/ads/library/?id=417457791430874',
'https://www.facebook.com/ads/library/?id=1321098158895782',
'https://www.facebook.com/ads/library/?id=941465037472712',
'https://www.facebook.com/ads/library/?id=2501073816890854',
'https://www.facebook.com/ads/library/?id=1089404936221331',
'https://www.facebook.com/ads/library/?id=1814513062708333',
'https://www.facebook.com/ads/library/?id=909735224627140',
'https://www.facebook.com/ads/library/?id=825881189605392',
'https://www.facebook.com/ads/library/?id=1092970315812006',
'https://www.facebook.com/ads/library/?id=1341754166987159',
'https://www.facebook.com/ads/library/?id=27911119285169480',
'https://www.facebook.com/ads/library/?id=1126610808829366',
'https://www.facebook.com/ads/library/?id=560255620214613',
'https://www.facebook.com/ads/library/?id=602727492261390',
'https://www.facebook.com/ads/library/?id=473840592409150',
'https://www.facebook.com/ads/library/?id=584734054170514',
'https://www.facebook.com/ads/library/?id=1950410348786419',
'https://www.facebook.com/ads/library/?id=9052052548196696',
'https://www.facebook.com/ads/library/?id=1297539434720543',
'https://www.facebook.com/ads/library/?id=651538193868135',
'https://www.facebook.com/ads/library/?id=3974092099541342',
'https://www.facebook.com/ads/library/?id=3947677988888239',
'https://www.facebook.com/ads/library/?id=458073030439291',
'https://www.facebook.com/ads/library/?id=1883242495537892',
'https://www.facebook.com/ads/library/?id=562000733263803',
'https://www.facebook.com/ads/library/?id=1124518832532485',
'https://www.facebook.com/ads/library/?id=606641791814401',
'https://www.facebook.com/ads/library/?id=1292668321768163',
'https://www.facebook.com/ads/library/?id=559334363597596',
'https://www.facebook.com/ads/library/?id=1295243348482570',
'https://www.facebook.com/ads/library/?id=598856832828244',
'https://www.facebook.com/ads/library/?id=1071279858342971',
'https://www.facebook.com/ads/library/?id=614150497640063',
'https://www.facebook.com/ads/library/?id=1603419843616476',
'https://www.facebook.com/ads/library/?id=501768608950847',
'https://www.facebook.com/ads/library/?id=960623549296733',
'https://www.facebook.com/ads/library/?id=1662295351165994',
'https://www.facebook.com/ads/library/?id=1276414640305145',
'https://www.facebook.com/ads/library/?id=576158748683989',
'https://www.facebook.com/ads/library/?id=2222062118180167',
'https://www.facebook.com/ads/library/?id=929650432113408',
'https://www.facebook.com/ads/library/?id=1660712801455616',
'https://www.facebook.com/ads/library/?id=549057274711611',
'https://www.facebook.com/ads/library/?id=928292282237850',
'https://www.facebook.com/ads/library/?id=1154457409367535',
'https://www.facebook.com/ads/library/?id=1779621582837734',
'https://www.facebook.com/ads/library/?id=474257445304434',
'https://www.facebook.com/ads/library/?id=1644392456151135',
'https://www.facebook.com/ads/library/?id=581158574610127',
'https://www.facebook.com/ads/library/?id=838330134966241',
'https://www.facebook.com/ads/library/?id=980641373900202',
'https://www.facebook.com/ads/library/?id=1037573264721759',
'https://www.facebook.com/ads/library/?id=949555106501424',
'https://www.facebook.com/ads/library/?id=1632191137370130',
'https://www.facebook.com/ads/library/?id=455699354001534',
'https://www.facebook.com/ads/library/?id=1046683087456658',
'https://www.facebook.com/ads/library/?id=453809774455344',
'https://www.facebook.com/ads/library/?id=596991906151658',
'https://www.facebook.com/ads/library/?id=597156909528417',
'https://www.facebook.com/ads/library/?id=589361467080891',
'https://www.facebook.com/ads/library/?id=559994260336076',
'https://www.facebook.com/ads/library/?id=809385731279525',
'https://www.facebook.com/ads/library/?id=604196488716152',
'https://www.facebook.com/ads/library/?id=2010432736151116',
'https://www.facebook.com/ads/library/?id=1737365993775534',
'https://www.facebook.com/ads/library/?id=591014290288927',
'https://www.facebook.com/ads/library/?id=1266100521148283',
'https://www.facebook.com/ads/library/?id=2570071173203044',
'https://www.facebook.com/ads/library/?id=967442685200275',
'https://www.facebook.com/ads/library/?id=943337117709992',
'https://www.facebook.com/ads/library/?id=1473783043742269',
'https://www.facebook.com/ads/library/?id=611407038117010',
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
