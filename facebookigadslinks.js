const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=576730638419945',
'https://www.facebook.com/ads/library/?id=1333405228096773',
'https://www.facebook.com/ads/library/?id=1296081825067969',
'https://www.facebook.com/ads/library/?id=1101571605000094',
'https://www.facebook.com/ads/library/?id=569808755826364',
'https://www.facebook.com/ads/library/?id=569808755826364',
'https://www.facebook.com/ads/library/?id=3069269173223962',
'https://www.facebook.com/ads/library/?id=1608222120073591',
'https://www.facebook.com/ads/library/?id=557540040516600',
'https://www.facebook.com/ads/library/?id=1117546013055640',
'https://www.facebook.com/ads/library/?id=1599414184328746',
'https://www.facebook.com/ads/library/?id=383520764809907',
'https://www.facebook.com/ads/library/?id=1134372350999394',
'https://www.facebook.com/ads/library/?id=467056096298163',
'https://www.facebook.com/ads/library/?id=432453106028560',
'https://www.facebook.com/ads/library/?id=196001099794921',
'https://www.facebook.com/ads/library/?id=3389713554620411',
'https://www.facebook.com/ads/library/?id=428658539036080',
'https://www.facebook.com/ads/library/?id=395802218377025',
'https://www.facebook.com/ads/library/?id=577096058523878',
'https://www.facebook.com/ads/library/?id=9457107020995411',
'https://www.facebook.com/ads/library/?id=887911889879106',
'https://www.facebook.com/ads/library/?id=503772008797444',
'https://www.facebook.com/ads/library/?id=1528121834569796',
'https://www.facebook.com/ads/library/?id=954784120080165',
'https://www.facebook.com/ads/library/?id=1777865623029742',
'https://www.facebook.com/ads/library/?id=1296081825067969',
'https://www.facebook.com/ads/library/?id=1246437799923944',
'https://www.facebook.com/ads/library/?id=528110296355033',
'https://www.facebook.com/ads/library/?id=1231848421262206',
'https://www.facebook.com/ads/library/?id=509142445275484',
'https://www.facebook.com/ads/library/?id=1066558718162022',
'https://www.facebook.com/ads/library/?id=2599169756951543',
'https://www.facebook.com/ads/library/?id=5267057890084994',
'https://www.facebook.com/ads/library/?id=261784932223392',
'https://www.facebook.com/ads/library/?id=1117067063151957',
'https://www.facebook.com/ads/library/?id=3735850616559325',
'https://www.facebook.com/ads/library/?id=1651485065462087',
'https://www.facebook.com/ads/library/?id=3295622677234597',
'https://www.facebook.com/ads/library/?id=1269963474331945',
'https://www.facebook.com/ads/library/?id=976355804555153',
'https://www.facebook.com/ads/library/?id=953412356129332',
'https://www.facebook.com/ads/library/?id=1099129761848640',
'https://www.facebook.com/ads/library/?id=3005117352976332',
'https://www.facebook.com/ads/library/?id=915475373899137',
'https://www.facebook.com/ads/library/?id=908548108116516',
'https://www.facebook.com/ads/library/?id=606886501782262',
'https://www.facebook.com/ads/library/?id=3790591324497438',
'https://www.facebook.com/ads/library/?id=1780403169472000',
'https://www.facebook.com/ads/library/?id=555161033985899',
'https://www.facebook.com/ads/library/?id=3637147363244141',
'https://www.facebook.com/ads/library/?id=1274565093581861',
'https://www.facebook.com/ads/library/?id=466219302715981',
'https://www.facebook.com/ads/library/?id=534412029571739',
'https://www.facebook.com/ads/library/?id=872027305136280',
'https://www.facebook.com/ads/library/?id=517768464428000',
'https://www.facebook.com/ads/library/?id=1131621585636188',
'https://www.facebook.com/ads/library/?id=1218764949423818',
'https://www.facebook.com/ads/library/?id=520733377447395',
'https://www.facebook.com/ads/library/?id=572698831993156',
'https://www.facebook.com/ads/library/?id=1276525130268218',
'https://www.facebook.com/ads/library/?id=522824313693540',
'https://www.facebook.com/ads/library/?id=508258145468092',
'https://www.facebook.com/ads/library/?id=326809100483791',
'https://www.facebook.com/ads/library/?id=884682640277086',
'https://www.facebook.com/ads/library/?id=1071833027865887',
'https://www.facebook.com/ads/library/?id=751526513724718',
'https://www.facebook.com/ads/library/?id=1477016439617457',
'https://www.facebook.com/ads/library/?id=906468084623478',
'https://www.facebook.com/ads/library/?id=1022928819536488',
'https://www.facebook.com/ads/library/?id=1652879398890282',
'https://www.facebook.com/ads/library/?id=810754784498854',
'https://www.facebook.com/ads/library/?id=776373734671351',
'https://www.facebook.com/ads/library/?id=7757138361065254',
'https://www.facebook.com/ads/library/?id=718519073636163',
'https://www.facebook.com/ads/library/?id=430455259563211',
'https://www.facebook.com/ads/library/?id=378467028288801',
'https://www.facebook.com/ads/library/?id=297468593090869',
'https://www.facebook.com/ads/library/?id=346038145013369',
'https://www.facebook.com/ads/library/?id=3628927854028951',
'https://www.facebook.com/ads/library/?id=712143354178322',
'https://www.facebook.com/ads/library/?id=1757690847988905',
'https://www.facebook.com/ads/library/?id=1356229138291741',
'https://www.facebook.com/ads/library/?id=895525325080210',
'https://www.facebook.com/ads/library/?id=973178953966404',
'https://www.facebook.com/ads/library/?id=1600681033693288',
'https://www.facebook.com/ads/library/?id=428658539036080',
'https://www.facebook.com/ads/library/?id=799395573990918',
'https://www.facebook.com/ads/library/?id=1288183362329431',
'https://www.facebook.com/ads/library/?id=3843337769254230',
'https://www.facebook.com/ads/library/?id=1665347700861719',
'https://www.facebook.com/ads/library/?id=3866876196912978',
'https://www.facebook.com/ads/library/?id=3005117352976332',
'https://www.facebook.com/ads/library/?id=550895874602527',
'https://www.facebook.com/ads/library/?id=915475373899137',
'https://www.facebook.com/ads/library/?id=1132587675057671',
'https://www.facebook.com/ads/library/?id=2000672080452935',
'https://www.facebook.com/ads/library/?id=937083931329613',
'https://www.facebook.com/ads/library/?id=566901199541973',
'https://www.facebook.com/ads/library/?id=1121059689673640',
'https://www.facebook.com/ads/library/?id=557033937309717',
'https://www.facebook.com/ads/library/?id=1321232305977030',
'https://www.facebook.com/ads/library/?id=610064355000284',
'https://www.facebook.com/ads/library/?id=1104635230958833',
'https://www.facebook.com/ads/library/?id=571861785783149',
'https://www.facebook.com/ads/library/?id=1335480984499011',
'https://www.facebook.com/ads/library/?id=1501255420535054',
'https://www.facebook.com/ads/library/?id=1477771432910006',
'https://www.facebook.com/ads/library/?id=2021391844982316',
'https://www.facebook.com/ads/library/?id=618500047171076',
'https://www.facebook.com/ads/library/?id=572455248563102',
'https://www.facebook.com/ads/library/?id=2620780698129807',
'https://www.facebook.com/ads/library/?id=508258145468092',
'https://www.facebook.com/ads/library/?id=1204413637330895',
'https://www.facebook.com/ads/library/?id=1224545305362360',
'https://www.facebook.com/ads/library/?id=884682640277086',
'https://www.facebook.com/ads/library/?id=883522613116250',
'https://www.facebook.com/ads/library/?id=2287649331582617',
'https://www.facebook.com/ads/library/?id=1232597781102229',
'https://www.facebook.com/ads/library/?id=1011766179804897',
'https://www.facebook.com/ads/library/?id=1165864997783528',
'https://www.facebook.com/ads/library/?id=769633851781259',
'https://www.facebook.com/ads/library/?id=1120656229075485',
'https://www.facebook.com/ads/library/?id=3628927854028951',
'https://www.facebook.com/ads/library/?id=788472502621115',
'https://www.facebook.com/ads/library/?id=2929862930629735',
'https://www.facebook.com/ads/library/?id=1272133560576382',
'https://www.facebook.com/ads/library/?id=2885551608261855',
'https://www.facebook.com/ads/library/?id=476750354980566',
'https://www.facebook.com/ads/library/?id=481492044975598',
'https://www.facebook.com/ads/library/?id=1130416205106394',
'https://www.facebook.com/ads/library/?id=880330780829413',
'https://www.facebook.com/ads/library/?id=3299401050360213',
'https://www.facebook.com/ads/library/?id=1757690847988905',
'https://www.facebook.com/ads/library/?id=408993131064017',
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
