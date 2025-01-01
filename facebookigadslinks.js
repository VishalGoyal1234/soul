const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=885733390418995',
'https://www.facebook.com/ads/library/?id=8452621194842425',
'https://www.facebook.com/ads/library/?id=939554198121185',
'https://www.facebook.com/ads/library/?id=1245566306514465',
'https://www.facebook.com/ads/library/?id=563483333190056',
'https://www.facebook.com/ads/library/?id=985785643586022',
'https://www.facebook.com/ads/library/?id=1238062657262980',
'https://www.facebook.com/ads/library/?id=1926598081196460',
'https://www.facebook.com/ads/library/?id=582242904585603',
'https://www.facebook.com/ads/library/?id=1137961984354032',
'https://www.facebook.com/ads/library/?id=1117500923203771',
'https://www.facebook.com/ads/library/?id=9625436600822258',
'https://www.facebook.com/ads/library/?id=599225499714731',
'https://www.facebook.com/ads/library/?id=1308727663489930',
'https://www.facebook.com/ads/library/?id=639440578512902',
'https://www.facebook.com/ads/library/?id=881852274020139',
'https://www.facebook.com/ads/library/?id=3784803958398191',
'https://www.facebook.com/ads/library/?id=573413152128408',
'https://www.facebook.com/ads/library/?id=1540510387339734',
'https://www.facebook.com/ads/library/?id=1723816681888168',
'https://www.facebook.com/ads/library/?id=620549297167349',
'https://www.facebook.com/ads/library/?id=2037174526727378',
'https://www.facebook.com/ads/library/?id=3922304561371438',
'https://www.facebook.com/ads/library/?id=627284252974873',
'https://www.facebook.com/ads/library/?id=2958516034297294',
'https://www.facebook.com/ads/library/?id=570435072417715',
'https://www.facebook.com/ads/library/?id=930851015849267',
'https://www.facebook.com/ads/library/?id=4064524910443101',
'https://www.facebook.com/ads/library/?id=954620600095196',
'https://www.facebook.com/ads/library/?id=552793604246923',
'https://www.facebook.com/ads/library/?id=1258449391872463',
'https://www.facebook.com/ads/library/?id=1637492166862034',
'https://www.facebook.com/ads/library/?id=608739001651423',
'https://www.facebook.com/ads/library/?id=608841258367195',
'https://www.facebook.com/ads/library/?id=1101590441663147',
'https://www.facebook.com/ads/library/?id=3246966058776369',
'https://www.facebook.com/ads/library/?id=1733490743881753',
'https://www.facebook.com/ads/library/?id=8902898553156351',
'https://www.facebook.com/ads/library/?id=2341659179524316',
'https://www.facebook.com/ads/library/?id=482112837846506',
'https://www.facebook.com/ads/library/?id=2003716383463317',
'https://www.facebook.com/ads/library/?id=967639365260242',
'https://www.facebook.com/ads/library/?id=887163493499956',
'https://www.facebook.com/ads/library/?id=924579006320963',
'https://www.facebook.com/ads/library/?id=1276379470239643',
'https://www.facebook.com/ads/library/?id=573480458810905',
'https://www.facebook.com/ads/library/?id=922686153303599',
'https://www.facebook.com/ads/library/?id=1649951735907206',
'https://www.facebook.com/ads/library/?id=951434166896802',
'https://www.facebook.com/ads/library/?id=8473574922746518',
'https://www.facebook.com/ads/library/?id=570912359143876',
'https://www.facebook.com/ads/library/?id=990067566505624',
'https://www.facebook.com/ads/library/?id=557879490417118',
'https://www.facebook.com/ads/library/?id=1124921358597149',
'https://www.facebook.com/ads/library/?id=555008317532549',
'https://www.facebook.com/ads/library/?id=605851428805599',
'https://www.facebook.com/ads/library/?id=1908963472964084',
'https://www.facebook.com/ads/library/?id=1582719812347429',
'https://www.facebook.com/ads/library/?id=928285699405338',
'https://www.facebook.com/ads/library/?id=1215083219958339',
'https://www.facebook.com/ads/library/?id=8961407940579439',
'https://www.facebook.com/ads/library/?id=3766438243618755',
'https://www.facebook.com/ads/library/?id=518117664571586',
'https://www.facebook.com/ads/library/?id=1685944075667946',
'https://www.facebook.com/ads/library/?id=1331232571566078',
'https://www.facebook.com/ads/library/?id=787820033510718',
'https://www.facebook.com/ads/library/?id=1263565451528710',
'https://www.facebook.com/ads/library/?id=579406305049296',
'https://www.facebook.com/ads/library/?id=1685425115514689',
'https://www.facebook.com/ads/library/?id=1135384084652180',
'https://www.facebook.com/ads/library/?id=929640839301714',
'https://www.facebook.com/ads/library/?id=1143998547513507',
'https://www.facebook.com/ads/library/?id=1631110711164519',
'https://www.facebook.com/ads/library/?id=3009373412564321',
'https://www.facebook.com/ads/library/?id=652929173723628',
'https://www.facebook.com/ads/library/?id=973731027939519',
'https://www.facebook.com/ads/library/?id=3047569488725027',
'https://www.facebook.com/ads/library/?id=567258439534849',
'https://www.facebook.com/ads/library/?id=868350572042037',
'https://www.facebook.com/ads/library/?id=1121550046268751',
'https://www.facebook.com/ads/library/?id=951750003548111',
'https://www.facebook.com/ads/library/?id=1237361514022833',
'https://www.facebook.com/ads/library/?id=919324520306782',
'https://www.facebook.com/ads/library/?id=3706326146347146',
'https://www.facebook.com/ads/library/?id=523147397556559',
'https://www.facebook.com/ads/library/?id=1108985640938291',
'https://www.facebook.com/ads/library/?id=458863487271142',
'https://www.facebook.com/ads/library/?id=508437744949553',
'https://www.facebook.com/ads/library/?id=986324133417392',
'https://www.facebook.com/ads/library/?id=577974665162654',
'https://www.facebook.com/ads/library/?id=1341204383721809',
'https://www.facebook.com/ads/library/?id=1101761907872690',
'https://www.facebook.com/ads/library/?id=1522045341821801',
'https://www.facebook.com/ads/library/?id=1242045960388370',
'https://www.facebook.com/ads/library/?id=1260550365169247',
'https://www.facebook.com/ads/library/?id=1097156535059284',
'https://www.facebook.com/ads/library/?id=676498998279685',
'https://www.facebook.com/ads/library/?id=1401593227483116',
'https://www.facebook.com/ads/library/?id=1795948710943638',
'https://www.facebook.com/ads/library/?id=411955025241023',
'https://www.facebook.com/ads/library/?id=548384301527430',
'https://www.facebook.com/ads/library/?id=1111404720512086',
'https://www.facebook.com/ads/library/?id=568503069307195',
'https://www.facebook.com/ads/library/?id=1153293583075319',
'https://www.facebook.com/ads/library/?id=1235987904149532',
'https://www.facebook.com/ads/library/?id=501084126427141',
'https://www.facebook.com/ads/library/?id=7147649195358876',
'https://www.facebook.com/ads/library/?id=603230022064654',
'https://www.facebook.com/ads/library/?id=1108157174440106',
'https://www.facebook.com/ads/library/?id=1013706040569130',
'https://www.facebook.com/ads/library/?id=3363789623753240',
'https://www.facebook.com/ads/library/?id=574749781849351',
'https://www.facebook.com/ads/library/?id=497016842843449',
'https://www.facebook.com/ads/library/?id=2936304006526179',
'https://www.facebook.com/ads/library/?id=9385668138133602',
'https://www.facebook.com/ads/library/?id=611303907978421',
'https://www.facebook.com/ads/library/?id=1670286260369266',
'https://www.facebook.com/ads/library/?id=1263613754904668',
'https://www.facebook.com/ads/library/?id=1124925329011862',
'https://www.facebook.com/ads/library/?id=570794989041541',
'https://www.facebook.com/ads/library/?id=1345392290226160',
'https://www.facebook.com/ads/library/?id=609816508177020',
'https://www.facebook.com/ads/library/?id=947913057281005',
'https://www.facebook.com/ads/library/?id=1240091703743189',
'https://www.facebook.com/ads/library/?id=3703105509999839',
'https://www.facebook.com/ads/library/?id=1296078121543201',
'https://www.facebook.com/ads/library/?id=1491409801550044',
'https://www.facebook.com/ads/library/?id=459376333880274',
'https://www.facebook.com/ads/library/?id=1245007766758017',
'https://www.facebook.com/ads/library/?id=1599119134310572',
'https://www.facebook.com/ads/library/?id=588863890400339',
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
