const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=481635468346678',
'https://www.facebook.com/ads/library/?id=1310248223323373',
'https://www.facebook.com/ads/library/?id=622649120443738',
'https://www.facebook.com/ads/library/?id=934371575338171',
'https://www.facebook.com/ads/library/?id=971556061493077',
'https://www.facebook.com/ads/library/?id=469817825884663',
'https://www.facebook.com/ads/library/?id=1690297198185787',
'https://www.facebook.com/ads/library/?id=1371473837550641',
'https://www.facebook.com/ads/library/?id=980830314102949',
'https://www.facebook.com/ads/library/?id=527276780324740',
'https://www.facebook.com/ads/library/?id=1114913356532166',
'https://www.facebook.com/ads/library/?id=526730887055345',
'https://www.facebook.com/ads/library/?id=466104352976317',
'https://www.facebook.com/ads/library/?id=563195859817706',
'https://www.facebook.com/ads/library/?id=1288208582519286',
'https://www.facebook.com/ads/library/?id=583135511319800',
'https://www.facebook.com/ads/library/?id=866111095485248',
'https://www.facebook.com/ads/library/?id=977666400943065',
'https://www.facebook.com/ads/library/?id=892430396306646',
'https://www.facebook.com/ads/library/?id=621647153621798',
'https://www.facebook.com/ads/library/?id=9149101241794728',
'https://www.facebook.com/ads/library/?id=584370541207519',
'https://www.facebook.com/ads/library/?id=930426885488567',
'https://www.facebook.com/ads/library/?id=474467279029703',
'https://www.facebook.com/ads/library/?id=594055836577112',
'https://www.facebook.com/ads/library/?id=589230743806789',
'https://www.facebook.com/ads/library/?id=1077524254056791',
'https://www.facebook.com/ads/library/?id=1107238417285471',
'https://www.facebook.com/ads/library/?id=577403665190814',
'https://www.facebook.com/ads/library/?id=839595074886275',
'https://www.facebook.com/ads/library/?id=1933803220481542',
'https://www.facebook.com/ads/library/?id=1688712395026253',
'https://www.facebook.com/ads/library/?id=3860180847571116',
'https://www.facebook.com/ads/library/?id=1178044133750303',
'https://www.facebook.com/ads/library/?id=2048786418903241',
'https://www.facebook.com/ads/library/?id=1106196870769448',
'https://www.facebook.com/ads/library/?id=1943209619423890',
'https://www.facebook.com/ads/library/?id=924596486503946',
'https://www.facebook.com/ads/library/?id=574172595527349',
'https://www.facebook.com/ads/library/?id=1292115811991624',
'https://www.facebook.com/ads/library/?id=1125825618468221',
'https://www.facebook.com/ads/library/?id=583971311231034',
'https://www.facebook.com/ads/library/?id=909523034622453',
'https://www.facebook.com/ads/library/?id=912674581000594',
'https://www.facebook.com/ads/library/?id=516495434073309',
'https://www.facebook.com/ads/library/?id=496893066301682',
'https://www.facebook.com/ads/library/?id=956606506364946',
'https://www.facebook.com/ads/library/?id=1629482887677752',
'https://www.facebook.com/ads/library/?id=8649739895152241',
'https://www.facebook.com/ads/library/?id=615498567544950',
'https://www.facebook.com/ads/library/?id=527371397000012',
'https://www.facebook.com/ads/library/?id=635919978861375',
'https://www.facebook.com/ads/library/?id=9146744318681758',
'https://www.facebook.com/ads/library/?id=1152990163121953',
'https://www.facebook.com/ads/library/?id=618563370816969',
'https://www.facebook.com/ads/library/?id=1051187793475822',
'https://www.facebook.com/ads/library/?id=1107597607289172',
'https://www.facebook.com/ads/library/?id=1127574192334118',
'https://www.facebook.com/ads/library/?id=3936064276651998',
'https://www.facebook.com/ads/library/?id=1241868500230469',
'https://www.facebook.com/ads/library/?id=597177336432509',
'https://www.facebook.com/ads/library/?id=840484944777405',
'https://www.facebook.com/ads/library/?id=1533534307334362',
'https://www.facebook.com/ads/library/?id=1965930883816930',
'https://www.facebook.com/ads/library/?id=554261814264066',
'https://www.facebook.com/ads/library/?id=961635315865998',
'https://www.facebook.com/ads/library/?id=1248304282900845',
'https://www.facebook.com/ads/library/?id=565077786292131',
'https://www.facebook.com/ads/library/?id=1129373808860208',
'https://www.facebook.com/ads/library/?id=627368133054442',
'https://www.facebook.com/ads/library/?id=986134883390177',
'https://www.facebook.com/ads/library/?id=882622093766138',
'https://www.facebook.com/ads/library/?id=1230106041415983',
'https://www.facebook.com/ads/library/?id=1311140939891708',
'https://www.facebook.com/ads/library/?id=1360411475338471',
'https://www.facebook.com/ads/library/?id=2024332501365660',
'https://www.facebook.com/ads/library/?id=1919702538558868',
'https://www.facebook.com/ads/library/?id=1673812163200367',
'https://www.facebook.com/ads/library/?id=624291036610646',
'https://www.facebook.com/ads/library/?id=1705829289983645',
'https://www.facebook.com/ads/library/?id=1598488530798996',
'https://www.facebook.com/ads/library/?id=622507340115305',
'https://www.facebook.com/ads/library/?id=509296662272886',
'https://www.facebook.com/ads/library/?id=603811592191452',
'https://www.facebook.com/ads/library/?id=3580170795615977',
'https://www.facebook.com/ads/library/?id=1637045560222777',
'https://www.facebook.com/ads/library/?id=1119606569653226',
'https://www.facebook.com/ads/library/?id=1805474046952795',
'https://www.facebook.com/ads/library/?id=604812528595350',
'https://www.facebook.com/ads/library/?id=1257190742165606',
'https://www.facebook.com/ads/library/?id=8251345838300003',
'https://www.facebook.com/ads/library/?id=970349348300635',
'https://www.facebook.com/ads/library/?id=836789215163382',
'https://www.facebook.com/ads/library/?id=1105246241005651',
'https://www.facebook.com/ads/library/?id=946090760818816',
'https://www.facebook.com/ads/library/?id=1245680260066471',
'https://www.facebook.com/ads/library/?id=564591013215810',
'https://www.facebook.com/ads/library/?id=1350100539317761',
'https://www.facebook.com/ads/library/?id=617269514186064',
'https://www.facebook.com/ads/library/?id=903913648596168',
'https://www.facebook.com/ads/library/?id=929835509125185',
'https://www.facebook.com/ads/library/?id=1326516601693963',
'https://www.facebook.com/ads/library/?id=1284242502892691',
'https://www.facebook.com/ads/library/?id=1281575863079021',
'https://www.facebook.com/ads/library/?id=387875957748978',
'https://www.facebook.com/ads/library/?id=1122642919467020',
'https://www.facebook.com/ads/library/?id=1122642919467020',
'https://www.facebook.com/ads/library/?id=988668893085312',
'https://www.facebook.com/ads/library/?id=605677878652574',
'https://www.facebook.com/ads/library/?id=1665806127705980',
'https://www.facebook.com/ads/library/?id=567885266039375',
'https://www.facebook.com/ads/library/?id=1193021318774372',
'https://www.facebook.com/ads/library/?id=471654782337457',
'https://www.facebook.com/ads/library/?id=1658383481778940',
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
