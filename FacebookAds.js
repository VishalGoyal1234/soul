const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=2008084856285894',
'https://www.facebook.com/ads/library/?id=3082917945179597',
'https://www.facebook.com/ads/library/?id=1372884700364803',
'https://www.facebook.com/ads/library/?id=1321622145633835',
'https://www.facebook.com/ads/library/?id=1306394713718659',
'https://www.facebook.com/ads/library/?id=973510567927255',
'https://www.facebook.com/ads/library/?id=899165489053501',
'https://www.facebook.com/ads/library/?id=1248497039549829',
'https://www.facebook.com/ads/library/?id=3816204358619951',
'https://www.facebook.com/ads/library/?id=950336426959760',
'https://www.facebook.com/ads/library/?id=602552212148708',
'https://www.facebook.com/ads/library/?id=1088099559307298',
'https://www.facebook.com/ads/library/?id=1786354528567373',
'https://www.facebook.com/ads/library/?id=1298828244475474',
'https://www.facebook.com/ads/library/?id=1119816376395935',
'https://www.facebook.com/ads/library/?id=1134444804872654',
'https://www.facebook.com/ads/library/?id=3907269079546466',
'https://www.facebook.com/ads/library/?id=1438562220864843',
'https://www.facebook.com/ads/library/?id=1367841404188558',
'https://www.facebook.com/ads/library/?id=1138969434397265',
'https://www.facebook.com/ads/library/?id=1981863432318659',
'https://www.facebook.com/ads/library/?id=2434789983536520',
'https://www.facebook.com/ads/library/?id=894700425808037',
'https://www.facebook.com/ads/library/?id=598895569170785',
'https://www.facebook.com/ads/library/?id=445488751962106',
'https://www.facebook.com/ads/library/?id=596576469452880',
'https://www.facebook.com/ads/library/?id=556723547125192',
'https://www.facebook.com/ads/library/?id=1092890615625236',
'https://www.facebook.com/ads/library/?id=3867570966847763',
'https://www.facebook.com/ads/library/?id=480212595090300',
'https://www.facebook.com/ads/library/?id=1134852674824385',
'https://www.facebook.com/ads/library/?id=1125827662389388',
'https://www.facebook.com/ads/library/?id=936865504641670',
'https://www.facebook.com/ads/library/?id=933791038847420',
'https://www.facebook.com/ads/library/?id=1139457747524561',
'https://www.facebook.com/ads/library/?id=1657664581483969',
'https://www.facebook.com/ads/library/?id=8640021722763818',
'https://www.facebook.com/ads/library/?id=9321994051153796',
'https://www.facebook.com/ads/library/?id=1250703962696029',
'https://www.facebook.com/ads/library/?id=909338214666618',
'https://www.facebook.com/ads/library/?id=1788952478536309',
'https://www.facebook.com/ads/library/?id=590501813487040',
'https://www.facebook.com/ads/library/?id=566994482756826',
'https://www.facebook.com/ads/library/?id=553462320896528',
'https://www.facebook.com/ads/library/?id=574872438642072',
'https://www.facebook.com/ads/library/?id=1294250868685597',
'https://www.facebook.com/ads/library/?id=1292545451889781',
'https://www.facebook.com/ads/library/?id=1105085164492358',
'https://www.facebook.com/ads/library/?id=959520002689358',
'https://www.facebook.com/ads/library/?id=560735423260657',
'https://www.facebook.com/ads/library/?id=1472991050753321',
'https://www.facebook.com/ads/library/?id=371278626044161',
'https://www.facebook.com/ads/library/?id=612699274428297',
'https://www.facebook.com/ads/library/?id=1111992760603983',
'https://www.facebook.com/ads/library/?id=1502919170394750',
'https://www.facebook.com/ads/library/?id=523110664094644',
'https://www.facebook.com/ads/library/?id=612232614798238',
'https://www.facebook.com/ads/library/?id=1232555664713693',
'https://www.facebook.com/ads/library/?id=924423399316618',
'https://www.facebook.com/ads/library/?id=8866364456787632',
'https://www.facebook.com/ads/library/?id=1022360429661387',
'https://www.facebook.com/ads/library/?id=1406870697462323',
'https://www.facebook.com/ads/library/?id=1837251670142722',
'https://www.facebook.com/ads/library/?id=599326069339781',
'https://www.facebook.com/ads/library/?id=1226511961755881',
'https://www.facebook.com/ads/library/?id=394386767035616',
'https://www.facebook.com/ads/library/?id=8980017265416792',
'https://www.facebook.com/ads/library/?id=1590583575166893',
'https://www.facebook.com/ads/library/?id=1253330342386656',
'https://www.facebook.com/ads/library/?id=1099615081345771',
'https://www.facebook.com/ads/library/?id=1139190854302225',
'https://www.facebook.com/ads/library/?id=1556383405763197',
'https://www.facebook.com/ads/library/?id=3911508745772824',
'https://www.facebook.com/ads/library/?id=9695834673764383',
'https://www.facebook.com/ads/library/?id=612482457873569',
'https://www.facebook.com/ads/library/?id=1295580744797431',
'https://www.facebook.com/ads/library/?id=1489609865050501',
'https://www.facebook.com/ads/library/?id=952775223385862',
'https://www.facebook.com/ads/library/?id=2874821709362882',
'https://www.facebook.com/ads/library/?id=1110758640450513',
'https://www.facebook.com/ads/library/?id=1852824798858070',
'https://www.facebook.com/ads/library/?id=555295000626685',
'https://www.facebook.com/ads/library/?id=1096171895002291',
'https://www.facebook.com/ads/library/?id=2399742943704344',
'https://www.facebook.com/ads/library/?id=1123623339219118',
'https://www.facebook.com/ads/library/?id=607499575269894',
'https://www.facebook.com/ads/library/?id=1306088177415700',
'https://www.facebook.com/ads/library/?id=3364996953631880',
'https://www.facebook.com/ads/library/?id=558174213855639',
'https://www.facebook.com/ads/library/?id=1102146364482981',
'https://www.facebook.com/ads/library/?id=2171282606602178',
'https://www.facebook.com/ads/library/?id=2047504845720148',
'https://www.facebook.com/ads/library/?id=1105370107955983',
'https://www.facebook.com/ads/library/?id=882207777077972',
'https://www.facebook.com/ads/library/?id=2017464875373923',
'https://www.facebook.com/ads/library/?id=829394622541246',
'https://www.facebook.com/ads/library/?id=883888263954717',
'https://www.facebook.com/ads/library/?id=591918056824504',
'https://www.facebook.com/ads/library/?id=1661817011213997',
'https://www.facebook.com/ads/library/?id=593650686550711',
'https://www.facebook.com/ads/library/?id=1298208807786394',
'https://www.facebook.com/ads/library/?id=574209475549900',
'https://www.facebook.com/ads/library/?id=887516110183172',
'https://www.facebook.com/ads/library/?id=1247223833197687',
'https://www.facebook.com/ads/library/?id=608227061645260',
'https://www.facebook.com/ads/library/?id=1155255209860275',
'https://www.facebook.com/ads/library/?id=1226580031761805',
'https://www.facebook.com/ads/library/?id=881259923852461',
'https://www.facebook.com/ads/library/?id=1683073652270499',
'https://www.facebook.com/ads/library/?id=957297809795582',
'https://www.facebook.com/ads/library/?id=437794516053102',
'https://www.facebook.com/ads/library/?id=3737328289838876',
'https://www.facebook.com/ads/library/?id=447794034831432',
'https://www.facebook.com/ads/library/?id=413839515027737',
'https://www.facebook.com/ads/library/?id=9207226905954689',
'https://www.facebook.com/ads/library/?id=1051173890150132',
'https://www.facebook.com/ads/library/?id=639264298530451',
'https://www.facebook.com/ads/library/?id=1139241337721927',
'https://www.facebook.com/ads/library/?id=2732212916962052',
'https://www.facebook.com/ads/library/?id=1000312105192342',
'https://www.facebook.com/ads/library/?id=1070737404848189',
'https://www.facebook.com/ads/library/?id=451244834456369',
'https://www.facebook.com/ads/library/?id=1282140459795618',
'https://www.facebook.com/ads/library/?id=1758511558305280',
'https://www.facebook.com/ads/library/?id=502519878809849',
'https://www.facebook.com/ads/library/?id=1277005740286508',
'https://www.facebook.com/ads/library/?id=3593999207558831',
'https://www.facebook.com/ads/library/?id=2720992421406159',
'https://www.facebook.com/ads/library/?id=554773377461639',
'https://www.facebook.com/ads/library/?id=1270911250818702',
'https://www.facebook.com/ads/library/?id=529763380059452',
'https://www.facebook.com/ads/library/?id=552959130953112',
'https://www.facebook.com/ads/library/?id=1094948482097509',
'https://www.facebook.com/ads/library/?id=1318783289286365',
'https://www.facebook.com/ads/library/?id=1095757598487084',
'https://www.facebook.com/ads/library/?id=1590122458377140',
'https://www.facebook.com/ads/library/?id=1545352819452142',
'https://www.facebook.com/ads/library/?id=1271081180765075',
'https://www.facebook.com/ads/library/?id=27574098268904329',
'https://www.facebook.com/ads/library/?id=1271081180765075',
'https://www.facebook.com/ads/library/?id=470914082269406',
'https://www.facebook.com/ads/library/?id=534843046044965',
'https://www.facebook.com/ads/library/?id=1213374866397639',
'https://www.facebook.com/ads/library/?id=992118736058785',
'https://www.facebook.com/ads/library/?id=555155987432933',
'https://www.facebook.com/ads/library/?id=1940216769819060',
'https://www.facebook.com/ads/library/?id=1363228371721186',
'https://www.facebook.com/ads/library/?id=1235157921045551',
'https://www.facebook.com/ads/library/?id=1896391527857704',
'https://www.facebook.com/ads/library/?id=2041485529628104',
'https://www.facebook.com/ads/library/?id=1261443178308117',

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
                if (scriptContent && scriptContent.includes('"page_profile_uri":')) {
                    const pageProfileUriMatch = scriptContent.match(/"page_profile_uri":"([^"]+)"/);
                    if (pageProfileUriMatch) {
                        pageProfileUri = pageProfileUriMatch[1];
                    }
                }
                const igUsernameMatch = scriptContent.match(/"ig_username":"([^"]+)"/);
                if (igUsernameMatch) {
                    igUsername = igUsernameMatch[1];
                }
                else if (pageProfileUri && pageProfileUri.includes('facebook.com')) {
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
