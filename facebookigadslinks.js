const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=27996986869944656',
'https://www.facebook.com/ads/library/?id=598337242653096',
'https://www.facebook.com/ads/library/?id=452455184509956',
'https://www.facebook.com/ads/library/?id=1110716170684777',
'https://www.facebook.com/ads/library/?id=1107330337759926',
'https://www.facebook.com/ads/library/?id=1085588163044768',
'https://www.facebook.com/ads/library/?id=917162579924688',
'https://www.facebook.com/ads/library/?id=936260701698633',
'https://www.facebook.com/ads/library/?id=555375300550022',
'https://www.facebook.com/ads/library/?id=596812716240447',
'https://www.facebook.com/ads/library/?id=2322787834755557',
'https://www.facebook.com/ads/library/?id=1093379102408575',
'https://www.facebook.com/ads/library/?id=959525379532119',
'https://www.facebook.com/ads/library/?id=1068266844779149',
'https://www.facebook.com/ads/library/?id=918678273480242',
'https://www.facebook.com/ads/library/?id=1737666810320145',
'https://www.facebook.com/ads/library/?id=1691812731614499',
'https://www.facebook.com/ads/library/?id=1626847238174140',
'https://www.facebook.com/ads/library/?id=1365636120731137',
'https://www.facebook.com/ads/library/?id=1088644512691470',
'https://www.facebook.com/ads/library/?id=1752858958796426',
'https://www.facebook.com/ads/library/?id=1047611426576777',
'https://www.facebook.com/ads/library/?id=1733200937522033',
'https://www.facebook.com/ads/library/?id=3807973039443194',
'https://www.facebook.com/ads/library/?id=543794901565306',
'https://www.facebook.com/ads/library/?id=809042928050863',
'https://www.facebook.com/ads/library/?id=1447446539298586',
'https://www.facebook.com/ads/library/?id=2271706429835092',
'https://www.facebook.com/ads/library/?id=2606071959553856',
'https://www.facebook.com/ads/library/?id=952275899806863',
'https://www.facebook.com/ads/library/?id=779986797575652',
'https://www.facebook.com/ads/library/?id=456208650073968',
'https://www.facebook.com/ads/library/?id=1415204975798701',
'https://www.facebook.com/ads/library/?id=333357532628138',
'https://www.facebook.com/ads/library/?id=804797778197146',
'https://www.facebook.com/ads/library/?id=285994331195583',
'https://www.facebook.com/ads/library/?id=378814728392929',
'https://www.facebook.com/ads/library/?id=292211680499792',
'https://www.facebook.com/ads/library/?id=857371012535271',
'https://www.facebook.com/ads/library/?id=841226957536881',
'https://www.facebook.com/ads/library/?id=700853428554823',
'https://www.facebook.com/ads/library/?id=595578149215301',
'https://www.facebook.com/ads/library/?id=1705363276627808',
'https://www.facebook.com/ads/library/?id=857517569302932',
'https://www.facebook.com/ads/library/?id=293645986501448',
'https://www.facebook.com/ads/library/?id=285578200651445',
'https://www.facebook.com/ads/library/?id=683919450181163',
'https://www.facebook.com/ads/library/?id=1115662542429620',
'https://www.facebook.com/ads/library/?id=3268813676704944',
'https://www.facebook.com/ads/library/?id=519511080158834',
'https://www.facebook.com/ads/library/?id=677297843881677',
'https://www.facebook.com/ads/library/?id=366542588969131',
'https://www.facebook.com/ads/library/?id=1265037490622033',
'https://www.facebook.com/ads/library/?id=847225232306569',
'https://www.facebook.com/ads/library/?id=491441080152585',
'https://www.facebook.com/ads/library/?id=9685835031431048',
'https://www.facebook.com/ads/library/?id=2741600616027609',
'https://www.facebook.com/ads/library/?id=1305620094195887',
'https://www.facebook.com/ads/library/?id=1136809004731002',
'https://www.facebook.com/ads/library/?id=1120483679013121',
'https://www.facebook.com/ads/library/?id=1102188504790776',
'https://www.facebook.com/ads/library/?id=1541228046574600',
'https://www.facebook.com/ads/library/?id=1123652986148160',
'https://www.facebook.com/ads/library/?id=2154247838338488',
'https://www.facebook.com/ads/library/?id=1298172344964162',
'https://www.facebook.com/ads/library/?id=2546152095583665',
'https://www.facebook.com/ads/library/?id=526288643780181',
'https://www.facebook.com/ads/library/?id=8947608205352070',
'https://www.facebook.com/ads/library/?id=1104251997602073',
'https://www.facebook.com/ads/library/?id=2537507893122793',
'https://www.facebook.com/ads/library/?id=905207918432075',
'https://www.facebook.com/ads/library/?id=9160788180639873',
'https://www.facebook.com/ads/library/?id=947288637336716',
'https://www.facebook.com/ads/library/?id=1678889209652845',
'https://www.facebook.com/ads/library/?id=951165496345566',
'https://www.facebook.com/ads/library/?id=459528120512104',
'https://www.facebook.com/ads/library/?id=1107341887762116',
'https://www.facebook.com/ads/library/?id=1139363017530659',
'https://www.facebook.com/ads/library/?id=1270498594152478',
'https://www.facebook.com/ads/library/?id=451193114484912',
'https://www.facebook.com/ads/library/?id=582214941173872',
'https://www.facebook.com/ads/library/?id=1016405843575945',
'https://www.facebook.com/ads/library/?id=1141230224031925',
'https://www.facebook.com/ads/library/?id=598434046004735',
'https://www.facebook.com/ads/library/?id=923968309917298',
'https://www.facebook.com/ads/library/?id=521794487150339',
'https://www.facebook.com/ads/library/?id=1591931651728489',
'https://www.facebook.com/ads/library/?id=845164587095346',
'https://www.facebook.com/ads/library/?id=1525939768054655',
'https://www.facebook.com/ads/library/?id=927028942184398',
'https://www.facebook.com/ads/library/?id=538487339134576',
'https://www.facebook.com/ads/library/?id=537219218743057',
'https://www.facebook.com/ads/library/?id=1880747879034232',
'https://www.facebook.com/ads/library/?id=333357532628138',
'https://www.facebook.com/ads/library/?id=285994331195583',
'https://www.facebook.com/ads/library/?id=378814728392929',
'https://www.facebook.com/ads/library/?id=668964798613322',
'https://www.facebook.com/ads/library/?id=293645986501448',
'https://www.facebook.com/ads/library/?id=1571920999955768',
'https://www.facebook.com/ads/library/?id=637832864500876',
'https://www.facebook.com/ads/library/?id=389418366227933',
'https://www.facebook.com/ads/library/?id=539754357474011',
'https://www.facebook.com/ads/library/?id=1265037490622033',
'https://www.facebook.com/ads/library/?id=847225232306569',
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
