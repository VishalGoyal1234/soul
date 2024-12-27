const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1301615001291874',  
'https://www.facebook.com/ads/library/?id=3816769068577336',  
'https://www.facebook.com/ads/library/?id=615241420993542',  
'https://www.facebook.com/ads/library/?id=1143031277169672',  
'https://www.facebook.com/ads/library/?id=4758395641052193',  
'https://www.facebook.com/ads/library/?id=564942706419427',  
'https://www.facebook.com/ads/library/?id=8801605529947653',  
'https://www.facebook.com/ads/library/?id=2933713583473797',  
'https://www.facebook.com/ads/library/?id=1649569709324322',  
'https://www.facebook.com/ads/library/?id=1714707669376596',  
'https://www.facebook.com/ads/library/?id=1067461908489279',  
'https://www.facebook.com/ads/library/?id=896081662699423',  
'https://www.facebook.com/ads/library/?id=571223859173562',  
'https://www.facebook.com/ads/library/?id=910494994187845',  
'https://www.facebook.com/ads/library/?id=605251175339916',  
'https://www.facebook.com/ads/library/?id=474441245674672',  
'https://www.facebook.com/ads/library/?id=2781625142008808',  
'https://www.facebook.com/ads/library/?id=1836762380416135',  
'https://www.facebook.com/ads/library/?id=445892188578492',  
'https://www.facebook.com/ads/library/?id=1305049313843811',  
'https://www.facebook.com/ads/library/?id=4009149155964017',  
'https://www.facebook.com/ads/library/?id=1372237150826535',  
'https://www.facebook.com/ads/library/?id=590920406921983',  
'https://www.facebook.com/ads/library/?id=934450268662305',  
'https://www.facebook.com/ads/library/?id=473218318793034',  
'https://www.facebook.com/ads/library/?id=945385310849419',  
'https://www.facebook.com/ads/library/?id=1120809006237479',  
'https://www.facebook.com/ads/library/?id=1624761864799359',  
'https://www.facebook.com/ads/library/?id=616863897693543',  
'https://www.facebook.com/ads/library/?id=1542947516389227',  
'https://www.facebook.com/ads/library/?id=949560823209947',  
'https://www.facebook.com/ads/library/?id=2358971547801316',  
'https://www.facebook.com/ads/library/?id=943764554368211',  
'https://www.facebook.com/ads/library/?id=956893552995649',  
'https://www.facebook.com/ads/library/?id=1568151977153337',  
'https://www.facebook.com/ads/library/?id=1352966082360839',  
'https://www.facebook.com/ads/library/?id=1235113270896214',  
'https://www.facebook.com/ads/library/?id=1676268059652268',  
'https://www.facebook.com/ads/library/?id=1969481343536711',  
'https://www.facebook.com/ads/library/?id=1312085900225099',  
'https://www.facebook.com/ads/library/?id=961152739244760',  
'https://www.facebook.com/ads/library/?id=1253635629042234',  
'https://www.facebook.com/ads/library/?id=971764328143579',  
'https://www.facebook.com/ads/library/?id=1227048655029956',  
'https://www.facebook.com/ads/library/?id=1134805568647393',  
'https://www.facebook.com/ads/library/?id=993187172632662',  
'https://www.facebook.com/ads/library/?id=1985213535290300',  
'https://www.facebook.com/ads/library/?id=607601325056432',  
'https://www.facebook.com/ads/library/?id=1166130531818318',  
'https://www.facebook.com/ads/library/?id=1149440426521713',  
'https://www.facebook.com/ads/library/?id=471656832292767',  
'https://www.facebook.com/ads/library/?id=607386925013722',  
'https://www.facebook.com/ads/library/?id=944233770564518',  
'https://www.facebook.com/ads/library/?id=583542364307049',  
'https://www.facebook.com/ads/library/?id=1737486146795367',  
'https://www.facebook.com/ads/library/?id=497546413447565',  
'https://www.facebook.com/ads/library/?id=1376796853682241',  
'https://www.facebook.com/ads/library/?id=1543457566310217',  
'https://www.facebook.com/ads/library/?id=601662538936395',  
'https://www.facebook.com/ads/library/?id=1323242018860898',  
'https://www.facebook.com/ads/library/?id=1297230418378347',  
'https://www.facebook.com/ads/library/?id=988799566409581',  
'https://www.facebook.com/ads/library/?id=2928248974148461',  
'https://www.facebook.com/ads/library/?id=3869756069965512',  
'https://www.facebook.com/ads/library/?id=892829129601953',  
'https://www.facebook.com/ads/library/?id=511873877882032',  
'https://www.facebook.com/ads/library/?id=1107145834239137',  
'https://www.facebook.com/ads/library/?id=460347430213276',  
'https://www.facebook.com/ads/library/?id=1120542112374389',  
'https://www.facebook.com/ads/library/?id=947133650666105',  
'https://www.facebook.com/ads/library/?id=553969180734066',  
'https://www.facebook.com/ads/library/?id=917007147226722',  
'https://www.facebook.com/ads/library/?id=1303457810692369',  
'https://www.facebook.com/ads/library/?id=491222780174765',  
'https://www.facebook.com/ads/library/?id=940863558000477',  
'https://www.facebook.com/ads/library/?id=1545930619391927',  
'https://www.facebook.com/ads/library/?id=602127982207369',  
'https://www.facebook.com/ads/library/?id=1118732099626970',  
'https://www.facebook.com/ads/library/?id=1273906133812584',  
'https://www.facebook.com/ads/library/?id=1108111414342847',  
'https://www.facebook.com/ads/library/?id=1094576121989923',  
'https://www.facebook.com/ads/library/?id=1118884293229312',  
'https://www.facebook.com/ads/library/?id=2373830649631536',  
'https://www.facebook.com/ads/library/?id=1690870728477200',  
'https://www.facebook.com/ads/library/?id=477228252060725',  
'https://www.facebook.com/ads/library/?id=939685724388658',  
'https://www.facebook.com/ads/library/?id=3463932603903548',  
'https://www.facebook.com/ads/library/?id=1518242065539975',  
'https://www.facebook.com/ads/library/?id=2153658505036171',  
'https://www.facebook.com/ads/library/?id=610769921398796'
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
