const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=9052052548196696',
'https://www.facebook.com/ads/library/?id=1297539434720543',
'https://www.facebook.com/ads/library/?id=458073030439291',
'https://www.facebook.com/ads/library/?id=608990188180743',
'https://www.facebook.com/ads/library/?id=1124518832532485',
'https://www.facebook.com/ads/library/?id=1295243348482570',
'https://www.facebook.com/ads/library/?id=606641791814401',
'https://www.facebook.com/ads/library/?id=598860969294218',
'https://www.facebook.com/ads/library/?id=572915925672285',
'https://www.facebook.com/ads/library/?id=1071279858342971',
'https://www.facebook.com/ads/library/?id=1276414640305145',
'https://www.facebook.com/ads/library/?id=2353006688378564',
'https://www.facebook.com/ads/library/?id=1263447858206981',
'https://www.facebook.com/ads/library/?id=1095496192259073',
'https://www.facebook.com/ads/library/?id=1239341467355798',
'https://www.facebook.com/ads/library/?id=549057274711611',
'https://www.facebook.com/ads/library/?id=929650432113408',
'https://www.facebook.com/ads/library/?id=1300782227623995',
'https://www.facebook.com/ads/library/?id=1718975325343948',
'https://www.facebook.com/ads/library/?id=1247061406560061',
'https://www.facebook.com/ads/library/?id=949555106501424',
'https://www.facebook.com/ads/library/?id=1037573264721759',
'https://www.facebook.com/ads/library/?id=1122349422615940',
'https://www.facebook.com/ads/library/?id=838330134966241',
'https://www.facebook.com/ads/library/?id=1306606547459756',
'https://www.facebook.com/ads/library/?id=1121921962856393',
'https://www.facebook.com/ads/library/?id=558357543850845',
'https://www.facebook.com/ads/library/?id=1243400826928836',
'https://www.facebook.com/ads/library/?id=1632191137370130',
'https://www.facebook.com/ads/library/?id=1348182569884794',
'https://www.facebook.com/ads/library/?id=1046683087456658',
'https://www.facebook.com/ads/library/?id=453809774455344',
'https://www.facebook.com/ads/library/?id=932200295168953',
'https://www.facebook.com/ads/library/?id=1147694590322619',
'https://www.facebook.com/ads/library/?id=894499772764748',
'https://www.facebook.com/ads/library/?id=1110192473979684',
'https://www.facebook.com/ads/library/?id=554536190687388',
'https://www.facebook.com/ads/library/?id=2010432736151116',
'https://www.facebook.com/ads/library/?id=606395635119682',
'https://www.facebook.com/ads/library/?id=1250206636250648',
'https://www.facebook.com/ads/library/?id=598153069397150',
'https://www.facebook.com/ads/library/?id=1473783043742269',
'https://www.facebook.com/ads/library/?id=943337117709992',
'https://www.facebook.com/ads/library/?id=1266100521148283',
'https://www.facebook.com/ads/library/?id=970381035114597',
'https://www.facebook.com/ads/library/?id=1081423560126203',
'https://www.facebook.com/ads/library/?id=1588888165092981',
'https://www.facebook.com/ads/library/?id=1241086113849106',
'https://www.facebook.com/ads/library/?id=481385097766253',
'https://www.facebook.com/ads/library/?id=2165975570486787',
'https://www.facebook.com/ads/library/?id=918929467036885',
'https://www.facebook.com/ads/library/?id=1121296995561514',
'https://www.facebook.com/ads/library/?id=610729051512808',
'https://www.facebook.com/ads/library/?id=1139137907771329',
'https://www.facebook.com/ads/library/?id=1803219903781679',
'https://www.facebook.com/ads/library/?id=1257175715560007',
'https://www.facebook.com/ads/library/?id=970906474915548',
'https://www.facebook.com/ads/library/?id=3948720742070223',
'https://www.facebook.com/ads/library/?id=512849921773138',
'https://www.facebook.com/ads/library/?id=1024220106260685',
'https://www.facebook.com/ads/library/?id=922965379989809',
'https://www.facebook.com/ads/library/?id=1757976004979381',
'https://www.facebook.com/ads/library/?id=908827998062462',
'https://www.facebook.com/ads/library/?id=3807723462871387',
'https://www.facebook.com/ads/library/?id=1533449304034878',
'https://www.facebook.com/ads/library/?id=513508928404563',
'https://www.facebook.com/ads/library/?id=814957204059762',
'https://www.facebook.com/ads/library/?id=1250594416162549',
'https://www.facebook.com/ads/library/?id=3793003700966114',
'https://www.facebook.com/ads/library/?id=1749892959196445',
'https://www.facebook.com/ads/library/?id=911443871123753',
'https://www.facebook.com/ads/library/?id=568545162483065',
'https://www.facebook.com/ads/library/?id=1130385705447518',
'https://www.facebook.com/ads/library/?id=574900705162907',
'https://www.facebook.com/ads/library/?id=1564077824254684',
'https://www.facebook.com/ads/library/?id=1266343347749278',
'https://www.facebook.com/ads/library/?id=2037772130069428',
'https://www.facebook.com/ads/library/?id=1116059720133720',
'https://www.facebook.com/ads/library/?id=1153448242870596',
'https://www.facebook.com/ads/library/?id=587253754249717',
'https://www.facebook.com/ads/library/?id=921548059697386',
'https://www.facebook.com/ads/library/?id=1336926764109818',
'https://www.facebook.com/ads/library/?id=1323978855265095',
'https://www.facebook.com/ads/library/?id=954671369932821',
'https://www.facebook.com/ads/library/?id=618144410563730',
'https://www.facebook.com/ads/library/?id=2495418687515927',
'https://www.facebook.com/ads/library/?id=849494000482761',
'https://www.facebook.com/ads/library/?id=2369363173418630',
'https://www.facebook.com/ads/library/?id=2909361372553285',
'https://www.facebook.com/ads/library/?id=567773126172246',
'https://www.facebook.com/ads/library/?id=858774999529263',
'https://www.facebook.com/ads/library/?id=571382872469870',
'https://www.facebook.com/ads/library/?id=604903748699100',
'https://www.facebook.com/ads/library/?id=598441559257390',
'https://www.facebook.com/ads/library/?id=8770516209713879',
'https://www.facebook.com/ads/library/?id=570422552431220',
'https://www.facebook.com/ads/library/?id=1275024997085555',
'https://www.facebook.com/ads/library/?id=1263144214966526',
'https://www.facebook.com/ads/library/?id=469287732858609',
'https://www.facebook.com/ads/library/?id=1339941340722239',
'https://www.facebook.com/ads/library/?id=1328884584961917',
'https://www.facebook.com/ads/library/?id=969195675056974',
'https://www.facebook.com/ads/library/?id=1508109653210167',
'https://www.facebook.com/ads/library/?id=982583687025513',
'https://www.facebook.com/ads/library/?id=1644656049762051',
'https://www.facebook.com/ads/library/?id=1325255048842464',
'https://www.facebook.com/ads/library/?id=1283048759602088',
'https://www.facebook.com/ads/library/?id=638184401864514',
'https://www.facebook.com/ads/library/?id=1574710996749031',
'https://www.facebook.com/ads/library/?id=521695190902578',
'https://www.facebook.com/ads/library/?id=1295081085019363',
'https://www.facebook.com/ads/library/?id=946179276940173',
'https://www.facebook.com/ads/library/?id=1219381695822840',
'https://www.facebook.com/ads/library/?id=1257219125717374',
'https://www.facebook.com/ads/library/?id=492162123387548',
'https://www.facebook.com/ads/library/?id=883698450293604',
'https://www.facebook.com/ads/library/?id=1941355406355965',
'https://www.facebook.com/ads/library/?id=1544432066215023',
'https://www.facebook.com/ads/library/?id=9196949490369078',
'https://www.facebook.com/ads/library/?id=561616433444552',
'https://www.facebook.com/ads/library/?id=506859001787809',
'https://www.facebook.com/ads/library/?id=1312111006608176',
'https://www.facebook.com/ads/library/?id=595795866153236',
'https://www.facebook.com/ads/library/?id=1385362679101063',
'https://www.facebook.com/ads/library/?id=1230557714674107',
'https://www.facebook.com/ads/library/?id=1455170818743238',
'https://www.facebook.com/ads/library/?id=581576307824296',
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
