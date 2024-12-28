const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1280561773256791',
'https://www.facebook.com/ads/library/?id=1255039059056095',
'https://www.facebook.com/ads/library/?id=1129745788667697',
'https://www.facebook.com/ads/library/?id=1113408797027723',
'https://www.facebook.com/ads/library/?id=1261359271617855',
'https://www.facebook.com/ads/library/?id=939686901038441',
'https://www.facebook.com/ads/library/?id=919579600276697',
'https://www.facebook.com/ads/library/?id=587660647322690',
'https://www.facebook.com/ads/library/?id=784207133874987',
'https://www.facebook.com/ads/library/?id=1101571605000094',
'https://www.facebook.com/ads/library/?id=563479549904823',
'https://www.facebook.com/ads/library/?id=605599638664640',
'https://www.facebook.com/ads/library/?id=1592080595523045',
'https://www.facebook.com/ads/library/?id=1685627438663480',
'https://www.facebook.com/ads/library/?id=1139253814447086',
'https://www.facebook.com/ads/library/?id=2036398663448141',
'https://www.facebook.com/ads/library/?id=614590511038266',
'https://www.facebook.com/ads/library/?id=911902714421545',
'https://www.facebook.com/ads/library/?id=569808755826364',
'https://www.facebook.com/ads/library/?id=1767732920654160',
'https://www.facebook.com/ads/library/?id=27942783232036869',
'https://www.facebook.com/ads/library/?id=452258811070994',
'https://www.facebook.com/ads/library/?id=1717828965815686',
'https://www.facebook.com/ads/library/?id=636140942167391',
'https://www.facebook.com/ads/library/?id=1590864202311946',
'https://www.facebook.com/ads/library/?id=3776234532629021',
'https://www.facebook.com/ads/library/?id=620001377274934',
'https://www.facebook.com/ads/library/?id=8985819238124106',
'https://www.facebook.com/ads/library/?id=1603409863605950',
'https://www.facebook.com/ads/library/?id=1328981428295824',
'https://www.facebook.com/ads/library/?id=3069269173223962',
'https://www.facebook.com/ads/library/?id=517205051371811',
'https://www.facebook.com/ads/library/?id=523068817433493',
'https://www.facebook.com/ads/library/?id=1139621390897604',
'https://www.facebook.com/ads/library/?id=2652479471628416',
'https://www.facebook.com/ads/library/?id=600067212498380',
'https://www.facebook.com/ads/library/?id=1286875249182773',
'https://www.facebook.com/ads/library/?id=1285046972625361',
'https://www.facebook.com/ads/library/?id=928022918933180',
'https://www.facebook.com/ads/library/?id=606209185409827',
'https://www.facebook.com/ads/library/?id=1352414049072554',
'https://www.facebook.com/ads/library/?id=980072567292244',
'https://www.facebook.com/ads/library/?id=943850627197058',
'https://www.facebook.com/ads/library/?id=1281295206448087',
'https://www.facebook.com/ads/library/?id=941128230909603',
'https://www.facebook.com/ads/library/?id=8302618499838534',
'https://www.facebook.com/ads/library/?id=955998133092872',
'https://www.facebook.com/ads/library/?id=1077810917416228',
'https://www.facebook.com/ads/library/?id=1322091825822928',
'https://www.facebook.com/ads/library/?id=913592304085413',
'https://www.facebook.com/ads/library/?id=1129745788667697',
'https://www.facebook.com/ads/library/?id=1261359271617855',
'https://www.facebook.com/ads/library/?id=1113408797027723',
'https://www.facebook.com/ads/library/?id=563479549904823',
'https://www.facebook.com/ads/library/?id=605599638664640',
'https://www.facebook.com/ads/library/?id=1101571605000094',
'https://www.facebook.com/ads/library/?id=1685627438663480',
'https://www.facebook.com/ads/library/?id=3666864106937530',
'https://www.facebook.com/ads/library/?id=2036398663448141',
'https://www.facebook.com/ads/library/?id=911902714421545',
'https://www.facebook.com/ads/library/?id=27942783232036869',
'https://www.facebook.com/ads/library/?id=1717828965815686',
'https://www.facebook.com/ads/library/?id=1124642929371397',
'https://www.facebook.com/ads/library/?id=1300986924665875',
'https://www.facebook.com/ads/library/?id=9013147105473142',
'https://www.facebook.com/ads/library/?id=1747577166095486',
'https://www.facebook.com/ads/library/?id=1120346032652924',
'https://www.facebook.com/ads/library/?id=2404023316611428',
'https://www.facebook.com/ads/library/?id=603474228722050',
'https://www.facebook.com/ads/library/?id=1785113835578621',
'https://www.facebook.com/ads/library/?id=8294386203995731',
'https://www.facebook.com/ads/library/?id=1285046972625361',
'https://www.facebook.com/ads/library/?id=1286462602386342',
'https://www.facebook.com/ads/library/?id=980072567292244',
'https://www.facebook.com/ads/library/?id=1352414049072554',
'https://www.facebook.com/ads/library/?id=943850627197058',
'https://www.facebook.com/ads/library/?id=1898243787366893',
'https://www.facebook.com/ads/library/?id=1126477435865728',
'https://www.facebook.com/ads/library/?id=895238082652166',
'https://www.facebook.com/ads/library/?id=595454919528566',
'https://www.facebook.com/ads/library/?id=1115026863521710',
'https://www.facebook.com/ads/library/?id=1662456624695267',
'https://www.facebook.com/ads/library/?id=422785834232473',
'https://www.facebook.com/ads/library/?id=551875844432559',
'https://www.facebook.com/ads/library/?id=604638035235331',
'https://www.facebook.com/ads/library/?id=1085348932905021',
'https://www.facebook.com/ads/library/?id=8605840959528660',
'https://www.facebook.com/ads/library/?id=927860505483237',
'https://www.facebook.com/ads/library/?id=928832712003850',
'https://www.facebook.com/ads/library/?id=923931222572497',
'https://www.facebook.com/ads/library/?id=1254683372457011',
'https://www.facebook.com/ads/library/?id=439276645884520',
'https://www.facebook.com/ads/library/?id=1098021021237791',
'https://www.facebook.com/ads/library/?id=1066384111895141',
'https://www.facebook.com/ads/library/?id=2254196191618129',
'https://www.facebook.com/ads/library/?id=552573097631066',
'https://www.facebook.com/ads/library/?id=1034579131667160',
'https://www.facebook.com/ads/library/?id=435314426065374',
'https://www.facebook.com/ads/library/?id=501456896234516',
'https://www.facebook.com/ads/library/?id=938576041439870',
'https://www.facebook.com/ads/library/?id=900471951561479',
'https://www.facebook.com/ads/library/?id=990688672909364',
'https://www.facebook.com/ads/library/?id=1008823561015455',
'https://www.facebook.com/ads/library/?id=383520764809907',
'https://www.facebook.com/ads/library/?id=456904227360292',
'https://www.facebook.com/ads/library/?id=1303504897699383',
'https://www.facebook.com/ads/library/?id=443398185415887',
'https://www.facebook.com/ads/library/?id=1022062472760018',
'https://www.facebook.com/ads/library/?id=406228038518967',
'https://www.facebook.com/ads/library/?id=7067598663366375',
'https://www.facebook.com/ads/library/?id=878112327130935',
'https://www.facebook.com/ads/library/?id=665701165620529',
'https://www.facebook.com/ads/library/?id=1409794349913092',
'https://www.facebook.com/ads/library/?id=787215093098810',
'https://www.facebook.com/ads/library/?id=640743454743213',
'https://www.facebook.com/ads/library/?id=840719610098482',
'https://www.facebook.com/ads/library/?id=1310934580047772',
'https://www.facebook.com/ads/library/?id=997732205497253',
'https://www.facebook.com/ads/library/?id=932415192191477',
'https://www.facebook.com/ads/library/?id=2055627181619544',
'https://www.facebook.com/ads/library/?id=1249783576253410',
'https://www.facebook.com/ads/library/?id=1127198298932645',
'https://www.facebook.com/ads/library/?id=591627463558052',
'https://www.facebook.com/ads/library/?id=900103981912652',
'https://www.facebook.com/ads/library/?id=8909421775815126',
'https://www.facebook.com/ads/library/?id=1322091825822928',
'https://www.facebook.com/ads/library/?id=1280561773256791',
'https://www.facebook.com/ads/library/?id=1130380138882008',
'https://www.facebook.com/ads/library/?id=2587188651487323',
'https://www.facebook.com/ads/library/?id=938649404865197',
'https://www.facebook.com/ads/library/?id=1313351486461048',
'https://www.facebook.com/ads/library/?id=1124785352634292',
'https://www.facebook.com/ads/library/?id=951309353574860',
'https://www.facebook.com/ads/library/?id=516870488063439',
'https://www.facebook.com/ads/library/?id=1019091980064481',
'https://www.facebook.com/ads/library/?id=1141625077231482',
'https://www.facebook.com/ads/library/?id=570509385936237',
'https://www.facebook.com/ads/library/?id=1755697341870695',
'https://www.facebook.com/ads/library/?id=1130428595541147',
'https://www.facebook.com/ads/library/?id=2151843288564568',
'https://www.facebook.com/ads/library/?id=1135320387971973',
'https://www.facebook.com/ads/library/?id=1348705556495627',
'https://www.facebook.com/ads/library/?id=932415192191477',
'https://www.facebook.com/ads/library/?id=2055627181619544',
'https://www.facebook.com/ads/library/?id=3919748171644181',
'https://www.facebook.com/ads/library/?id=591627463558052',
'https://www.facebook.com/ads/library/?id=2074797106286293',
'https://www.facebook.com/ads/library/?id=3737138563169486',
'https://www.facebook.com/ads/library/?id=518784591197811',
'https://www.facebook.com/ads/library/?id=900785445433896',
'https://www.facebook.com/ads/library/?id=450817744528528',
'https://www.facebook.com/ads/library/?id=590782876681077',
'https://www.facebook.com/ads/library/?id=1292284331804680',
'https://www.facebook.com/ads/library/?id=609003841574546',
'https://www.facebook.com/ads/library/?id=1057215936206257',
'https://www.facebook.com/ads/library/?id=554157847388508',
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
