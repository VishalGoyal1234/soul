const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=458150166579352',
'https://www.facebook.com/ads/library/?id=1588307795043722',
'https://www.facebook.com/ads/library/?id=25724681120512507',
'https://www.facebook.com/ads/library/?id=467920012620714',
'https://www.facebook.com/ads/library/?id=846437613989084',
'https://www.facebook.com/ads/library/?id=1678521799578268',
'https://www.facebook.com/ads/library/?id=1187476105632537',
'https://www.facebook.com/ads/library/?id=1536067563990360',
'https://www.facebook.com/ads/library/?id=1208910090295187',
'https://www.facebook.com/ads/library/?id=404295925820209',
'https://www.facebook.com/ads/library/?id=488949866788516',
'https://www.facebook.com/ads/library/?id=1430494547586081',
'https://www.facebook.com/ads/library/?id=772726994809942',
'https://www.facebook.com/ads/library/?id=364627233136308',
'https://www.facebook.com/ads/library/?id=420792860523860',
'https://www.facebook.com/ads/library/?id=1132928644573471',
'https://www.facebook.com/ads/library/?id=421940496954657',
'https://www.facebook.com/ads/library/?id=1715200992573253',
'https://www.facebook.com/ads/library/?id=2147389575617569',
'https://www.facebook.com/ads/library/?id=1806326936460886',
'https://www.facebook.com/ads/library/?id=275614158934867',
'https://www.facebook.com/ads/library/?id=777214147665014',
'https://www.facebook.com/ads/library/?id=2328921480637707',
'https://www.facebook.com/ads/library/?id=1041779487152469',
'https://www.facebook.com/ads/library/?id=340144165245804',
'https://www.facebook.com/ads/library/?id=1096192138246719',
'https://www.facebook.com/ads/library/?id=853506829671880',
'https://www.facebook.com/ads/library/?id=1971497559862957',
'https://www.facebook.com/ads/library/?id=1446079009498056',
'https://www.facebook.com/ads/library/?id=1386437838750192',
'https://www.facebook.com/ads/library/?id=269217935606388',
'https://www.facebook.com/ads/library/?id=1214621779166681',
'https://www.facebook.com/ads/library/?id=1125573715730333',
'https://www.facebook.com/ads/library/?id=431581620025205',
'https://www.facebook.com/ads/library/?id=9052563738129475',
'https://www.facebook.com/ads/library/?id=902080438570887',
'https://www.facebook.com/ads/library/?id=546473574851602',
'https://www.facebook.com/ads/library/?id=1334467837918161',
'https://www.facebook.com/ads/library/?id=2086768891739408',
'https://www.facebook.com/ads/library/?id=1104166087946480',
'https://www.facebook.com/ads/library/?id=551834830991229',
'https://www.facebook.com/ads/library/?id=2922908514518269',
'https://www.facebook.com/ads/library/?id=1303486150815972',
'https://www.facebook.com/ads/library/?id=504312655746833',
'https://www.facebook.com/ads/library/?id=579547384754660',
'https://www.facebook.com/ads/library/?id=1174154387029014',
'https://www.facebook.com/ads/library/?id=1804960736709746',
'https://www.facebook.com/ads/library/?id=1096192138246719',
'https://www.facebook.com/ads/library/?id=25724681120512507',
'https://www.facebook.com/ads/library/?id=1446079009498056',
'https://www.facebook.com/ads/library/?id=269217935606388',
'https://www.facebook.com/ads/library/?id=458150166579352',
'https://www.facebook.com/ads/library/?id=777214147665014',
'https://www.facebook.com/ads/library/?id=1807082153458481',
'https://www.facebook.com/ads/library/?id=560124913401835',
'https://www.facebook.com/ads/library/?id=1366473427662556',
'https://www.facebook.com/ads/library/?id=2103493100072330',
'https://www.facebook.com/ads/library/?id=560452839948083',
'https://www.facebook.com/ads/library/?id=940907080755654',
'https://www.facebook.com/ads/library/?id=1275850120123579',
'https://www.facebook.com/ads/library/?id=576179025268963',
'https://www.facebook.com/ads/library/?id=892183299474147',
'https://www.facebook.com/ads/library/?id=954613019856539',
'https://www.facebook.com/ads/library/?id=1733567370771514',
'https://www.facebook.com/ads/library/?id=895189629470209',
'https://www.facebook.com/ads/library/?id=1452854415636678',
'https://www.facebook.com/ads/library/?id=1978690219280419',
'https://www.facebook.com/ads/library/?id=9158666854224753',
'https://www.facebook.com/ads/library/?id=1155459736144258',
'https://www.facebook.com/ads/library/?id=1983908725418322',
'https://www.facebook.com/ads/library/?id=1225371135429825',
'https://www.facebook.com/ads/library/?id=1087624895983716',
'https://www.facebook.com/ads/library/?id=940517981318860',
'https://www.facebook.com/ads/library/?id=884634807158382',
'https://www.facebook.com/ads/library/?id=8825841917505823',
'https://www.facebook.com/ads/library/?id=515038204879288',
'https://www.facebook.com/ads/library/?id=906207308296086',
'https://www.facebook.com/ads/library/?id=1265683114479539',
'https://www.facebook.com/ads/library/?id=1088908945781756',
'https://www.facebook.com/ads/library/?id=956866226493167',
'https://www.facebook.com/ads/library/?id=509593135395627',
'https://www.facebook.com/ads/library/?id=983746503581142',
'https://www.facebook.com/ads/library/?id=1790847421658372',
'https://www.facebook.com/ads/library/?id=1263202404735819',
'https://www.facebook.com/ads/library/?id=1354306092374136',
'https://www.facebook.com/ads/library/?id=3827339217487491',
'https://www.facebook.com/ads/library/?id=995029309021643',
'https://www.facebook.com/ads/library/?id=1590153131860399',
'https://www.facebook.com/ads/library/?id=903185791527216',
'https://www.facebook.com/ads/library/?id=560795036581972',
'https://www.facebook.com/ads/library/?id=555196264024864',
'https://www.facebook.com/ads/library/?id=1108459724012438',
'https://www.facebook.com/ads/library/?id=1334506864566406',
'https://www.facebook.com/ads/library/?id=1028437555985744',
'https://www.facebook.com/ads/library/?id=562868323302989',
'https://www.facebook.com/ads/library/?id=1581769099117661',
'https://www.facebook.com/ads/library/?id=3688254174806696',
'https://www.facebook.com/ads/library/?id=1105322817655161',
'https://www.facebook.com/ads/library/?id=1673269566617580',
'https://www.facebook.com/ads/library/?id=563455876298161',
'https://www.facebook.com/ads/library/?id=1014131417139954',
'https://www.facebook.com/ads/library/?id=3726789450907411',
'https://www.facebook.com/ads/library/?id=419079227941970',
'https://www.facebook.com/ads/library/?id=3726789450907411',
'https://www.facebook.com/ads/library/?id=1802594447240365',
'https://www.facebook.com/ads/library/?id=1095747438699344',
'https://www.facebook.com/ads/library/?id=498458073243546',
'https://www.facebook.com/ads/library/?id=419079227941970',
'https://www.facebook.com/ads/library/?id=4000662050166121',
'https://www.facebook.com/ads/library/?id=551525411007628',
'https://www.facebook.com/ads/library/?id=1026605729223504',
'https://www.facebook.com/ads/library/?id=1911907722632814',
'https://www.facebook.com/ads/library/?id=2343556976004945',
'https://www.facebook.com/ads/library/?id=861470402728089',
'https://www.facebook.com/ads/library/?id=1037008958176888',
'https://www.facebook.com/ads/library/?id=1077227097278225',
'https://www.facebook.com/ads/library/?id=2921259564729763',
'https://www.facebook.com/ads/library/?id=1077227097278225',
'https://www.facebook.com/ads/library/?id=873826051406068',
'https://www.facebook.com/ads/library/?id=901265195438059',
'https://www.facebook.com/ads/library/?id=1647219229166734',
'https://www.facebook.com/ads/library/?id=2022666818248407',
'https://www.facebook.com/ads/library/?id=1103394998076645',
'https://www.facebook.com/ads/library/?id=934134135247533',
'https://www.facebook.com/ads/library/?id=1502120337148246',
'https://www.facebook.com/ads/library/?id=567157279027458',
'https://www.facebook.com/ads/library/?id=512437268331334',
'https://www.facebook.com/ads/library/?id=907102101011102',
'https://www.facebook.com/ads/library/?id=531197399798995',
'https://www.facebook.com/ads/library/?id=478750608503674',
'https://www.facebook.com/ads/library/?id=452821934475386',
'https://www.facebook.com/ads/library/?id=672565130892020',
'https://www.facebook.com/ads/library/?id=840286091394943',
'https://www.facebook.com/ads/library/?id=1280403779589174',
'https://www.facebook.com/ads/library/?id=1002663234518510',
'https://www.facebook.com/ads/library/?id=2486576301732704',
'https://www.facebook.com/ads/library/?id=1454206285210579',
'https://www.facebook.com/ads/library/?id=772726994809942',
'https://www.facebook.com/ads/library/?id=1334506864566406',
'https://www.facebook.com/ads/library/?id=1280422886498492',
'https://www.facebook.com/ads/library/?id=1028437555985744',
'https://www.facebook.com/ads/library/?id=3688254174806696',
'https://www.facebook.com/ads/library/?id=975364264643053',
'https://www.facebook.com/ads/library/?id=1052264870003708',
'https://www.facebook.com/ads/library/?id=3726789450907411',
'https://www.facebook.com/ads/library/?id=1777527892997306',
'https://www.facebook.com/ads/library/?id=1764209334421521',
'https://www.facebook.com/ads/library/?id=1737268597110237',
'https://www.facebook.com/ads/library/?id=551525411007628',
'https://www.facebook.com/ads/library/?id=451350837650008',
'https://www.facebook.com/ads/library/?id=1026605729223504',
'https://www.facebook.com/ads/library/?id=2921259564729763',
'https://www.facebook.com/ads/library/?id=855198926685526',
'https://www.facebook.com/ads/library/?id=1647219229166734',
'https://www.facebook.com/ads/library/?id=1502120337148246',
'https://www.facebook.com/ads/library/?id=934134135247533',
'https://www.facebook.com/ads/library/?id=907102101011102',
'https://www.facebook.com/ads/library/?id=2045162619254763',
'https://www.facebook.com/ads/library/?id=3355180521442100',
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
