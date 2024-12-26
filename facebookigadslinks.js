const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1951867388642106',
'https://www.facebook.com/ads/library/?id=613512727903198',
'https://www.facebook.com/ads/library/?id=911645247372746',
'https://www.facebook.com/ads/library/?id=1885255701883546',
'https://www.facebook.com/ads/library/?id=556361563827118',
'https://www.facebook.com/ads/library/?id=965115742188477',
'https://www.facebook.com/ads/library/?id=1178728023870184',
'https://www.facebook.com/ads/library/?id=1320509162636056',
'https://www.facebook.com/ads/library/?id=925130152961381',
'https://www.facebook.com/ads/library/?id=1104289917735646',
'https://www.facebook.com/ads/library/?id=988121183333773',
'https://www.facebook.com/ads/library/?id=435486102953505',
'https://www.facebook.com/ads/library/?id=584716667385165',
'https://www.facebook.com/ads/library/?id=1491674674838829',
'https://www.facebook.com/ads/library/?id=1776732809815922',
'https://www.facebook.com/ads/library/?id=1126016072464349',
'https://www.facebook.com/ads/library/?id=1237549797550881',
'https://www.facebook.com/ads/library/?id=1636493733880370',
'https://www.facebook.com/ads/library/?id=1120593186073911',
'https://www.facebook.com/ads/library/?id=573976462031599',
'https://www.facebook.com/ads/library/?id=597863329572309',
'https://www.facebook.com/ads/library/?id=1315271439652314',
'https://www.facebook.com/ads/library/?id=550047177821520',
'https://www.facebook.com/ads/library/?id=3980777688857691',
'https://www.facebook.com/ads/library/?id=3832501000348989',
'https://www.facebook.com/ads/library/?id=1797773374323776',
'https://www.facebook.com/ads/library/?id=409514752240828',
'https://www.facebook.com/ads/library/?id=539711732276434',
'https://www.facebook.com/ads/library/?id=1286080122736162',
'https://www.facebook.com/ads/library/?id=2165408377211653',
'https://www.facebook.com/ads/library/?id=910188001069893',
'https://www.facebook.com/ads/library/?id=1796806681059339',
'https://www.facebook.com/ads/library/?id=453784974405127',
'https://www.facebook.com/ads/library/?id=975542601275368',
'https://www.facebook.com/ads/library/?id=359179020590120',
'https://www.facebook.com/ads/library/?id=1252277052767213',
'https://www.facebook.com/ads/library/?id=2035112043626247',
'https://www.facebook.com/ads/library/?id=583901184307295',
'https://www.facebook.com/ads/library/?id=1935172836980535',
'https://www.facebook.com/ads/library/?id=1232317514460571',
'https://www.facebook.com/ads/library/?id=1199273151290244',
'https://www.facebook.com/ads/library/?id=3819142511653990',
'https://www.facebook.com/ads/library/?id=1042947610640497',
'https://www.facebook.com/ads/library/?id=1329187744750572',
'https://www.facebook.com/ads/library/?id=533731252569807',
'https://www.facebook.com/ads/library/?id=893351668885277',
'https://www.facebook.com/ads/library/?id=890380649208894',
'https://www.facebook.com/ads/library/?id=532645956126747',
'https://www.facebook.com/ads/library/?id=832167765777894',
'https://www.facebook.com/ads/library/?id=1064460288566295',
'https://www.facebook.com/ads/library/?id=531378079433816',
'https://www.facebook.com/ads/library/?id=3934579676867928',
'https://www.facebook.com/ads/library/?id=1050529100148243',
'https://www.facebook.com/ads/library/?id=872059714351500',
'https://www.facebook.com/ads/library/?id=2423796491151920',
'https://www.facebook.com/ads/library/?id=518606567223485',
'https://www.facebook.com/ads/library/?id=3741662756047679',
'https://www.facebook.com/ads/library/?id=490648097253300',
'https://www.facebook.com/ads/library/?id=410961228201222',
'https://www.facebook.com/ads/library/?id=1954561105016152',
'https://www.facebook.com/ads/library/?id=3821188751433331',
'https://www.facebook.com/ads/library/?id=1205768650572331',
'https://www.facebook.com/ads/library/?id=1276629529970980',
'https://www.facebook.com/ads/library/?id=475528131922662',
'https://www.facebook.com/ads/library/?id=841914824546663',
'https://www.facebook.com/ads/library/?id=362792710223176',
'https://www.facebook.com/ads/library/?id=726580566203290',
'https://www.facebook.com/ads/library/?id=1074733234071038',
'https://www.facebook.com/ads/library/?id=1011422249916242',
'https://www.facebook.com/ads/library/?id=885524723343194',
'https://www.facebook.com/ads/library/?id=1865013207312212',
'https://www.facebook.com/ads/library/?id=950191969922758',
'https://www.facebook.com/ads/library/?id=1530607404337574',
'https://www.facebook.com/ads/library/?id=348010228265700',
'https://www.facebook.com/ads/library/?id=310848671880024',
'https://www.facebook.com/ads/library/?id=444795928116063',
'https://www.facebook.com/ads/library/?id=1083540522950058',
'https://www.facebook.com/ads/library/?id=794026879333575',
'https://www.facebook.com/ads/library/?id=820945570133097',
'https://www.facebook.com/ads/library/?id=1096357094959551',
'https://www.facebook.com/ads/library/?id=1927327581038242',
'https://www.facebook.com/ads/library/?id=1069091381029286',
'https://www.facebook.com/ads/library/?id=386664740907482',
'https://www.facebook.com/ads/library/?id=432688912462531',
'https://www.facebook.com/ads/library/?id=428163086342980',
'https://www.facebook.com/ads/library/?id=1367320530572514',
'https://www.facebook.com/ads/library/?id=1606801276806308',
'https://www.facebook.com/ads/library/?id=951456966689492',
'https://www.facebook.com/ads/library/?id=907824430655167',
'https://www.facebook.com/ads/library/?id=426652056376762',
'https://www.facebook.com/ads/library/?id=911319383506879',
'https://www.facebook.com/ads/library/?id=918599688810383',
'https://www.facebook.com/ads/library/?id=1074786313377500',
'https://www.facebook.com/ads/library/?id=435899358053802',
'https://www.facebook.com/ads/library/?id=468945603756095',
'https://www.facebook.com/ads/library/?id=418751612224482',
'https://www.facebook.com/ads/library/?id=1359037558803630',
'https://www.facebook.com/ads/library/?id=627834956266581',
'https://www.facebook.com/ads/library/?id=1265055127946129',
'https://www.facebook.com/ads/library/?id=538043355899185',
'https://www.facebook.com/ads/library/?id=1098391311554004',
'https://www.facebook.com/ads/library/?id=1103476254654893',
'https://www.facebook.com/ads/library/?id=1114591183793788',
'https://www.facebook.com/ads/library/?id=1071795524746065',
'https://www.facebook.com/ads/library/?id=558993967119130',
'https://www.facebook.com/ads/library/?id=949427846552489',
'https://www.facebook.com/ads/library/?id=3418285785144482',
'https://www.facebook.com/ads/library/?id=1381759552796441',
'https://www.facebook.com/ads/library/?id=1318843476098613',
'https://www.facebook.com/ads/library/?id=825881189605392',
'https://www.facebook.com/ads/library/?id=1814513062708333',
'https://www.facebook.com/ads/library/?id=1092970315812006',

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
