const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1355625928736651',
'https://www.facebook.com/ads/library/?id=1023512449495788',
'https://www.facebook.com/ads/library/?id=1133033687691959',
'https://www.facebook.com/ads/library/?id=1257146652067041',
'https://www.facebook.com/ads/library/?id=1976909166143693',
'https://www.facebook.com/ads/library/?id=1324002908956001',
'https://www.facebook.com/ads/library/?id=1121761736200775',
'https://www.facebook.com/ads/library/?id=629740529564951',
'https://www.facebook.com/ads/library/?id=1767150807442249',
'https://www.facebook.com/ads/library/?id=621252583593191',
'https://www.facebook.com/ads/library/?id=2293279324378297',
'https://www.facebook.com/ads/library/?id=1046342060841454',
'https://www.facebook.com/ads/library/?id=1143404317785524',
'https://www.facebook.com/ads/library/?id=1325545185255993',
'https://www.facebook.com/ads/library/?id=1123130436108344',
'https://www.facebook.com/ads/library/?id=3534571256843775',
'https://www.facebook.com/ads/library/?id=2029557477548442',
'https://www.facebook.com/ads/library/?id=1411397083168554',
'https://www.facebook.com/ads/library/?id=3534571256843775',
'https://www.facebook.com/ads/library/?id=4070590679841251',
'https://www.facebook.com/ads/library/?id=531107133312768',
'https://www.facebook.com/ads/library/?id=1111068637233881',
'https://www.facebook.com/ads/library/?id=929114695591948',
'https://www.facebook.com/ads/library/?id=1625036921458618',
'https://www.facebook.com/ads/library/?id=873522504692609',
'https://www.facebook.com/ads/library/?id=1145020113898759',
'https://www.facebook.com/ads/library/?id=920730580244406',
'https://www.facebook.com/ads/library/?id=563537833188414',
'https://www.facebook.com/ads/library/?id=614439101030787',
'https://www.facebook.com/ads/library/?id=643826451548713',
'https://www.facebook.com/ads/library/?id=1141621167966739',
'https://www.facebook.com/ads/library/?id=602673662411074',
'https://www.facebook.com/ads/library/?id=610776094747842',
'https://www.facebook.com/ads/library/?id=629921259373654',
'https://www.facebook.com/ads/library/?id=605856338527010',
'https://www.facebook.com/ads/library/?id=8970312933047629',
'https://www.facebook.com/ads/library/?id=608353131680288',
'https://www.facebook.com/ads/library/?id=1059164382709520',
'https://www.facebook.com/ads/library/?id=1061524955724328',
'https://www.facebook.com/ads/library/?id=614296757965100',
'https://www.facebook.com/ads/library/?id=1753862375156266',
'https://www.facebook.com/ads/library/?id=620825710381902',
'https://www.facebook.com/ads/library/?id=890279503315235',
'https://www.facebook.com/ads/library/?id=616294554402400',
'https://www.facebook.com/ads/library/?id=1592130781689553',
'https://www.facebook.com/ads/library/?id=1110086024156002',
'https://www.facebook.com/ads/library/?id=548277134861067',
'https://www.facebook.com/ads/library/?id=591980023424111',
'https://www.facebook.com/ads/library/?id=1044614914103659',
'https://www.facebook.com/ads/library/?id=1081038117090730',
'https://www.facebook.com/ads/library/?id=552222521135425',
'https://www.facebook.com/ads/library/?id=1108483320719175',
'https://www.facebook.com/ads/library/?id=1047282457082910',
'https://www.facebook.com/ads/library/?id=1759845538171656',
'https://www.facebook.com/ads/library/?id=459384693647441',
'https://www.facebook.com/ads/library/?id=2694155787639635',
'https://www.facebook.com/ads/library/?id=1730801307503763',
'https://www.facebook.com/ads/library/?id=945008877569933',
'https://www.facebook.com/ads/library/?id=1121346322859052',
'https://www.facebook.com/ads/library/?id=577901808428698',
'https://www.facebook.com/ads/library/?id=1111958877478712',
'https://www.facebook.com/ads/library/?id=983384636953505',
'https://www.facebook.com/ads/library/?id=541896378822499',
'https://www.facebook.com/ads/library/?id=948430623553364',
'https://www.facebook.com/ads/library/?id=594992683118320',
'https://www.facebook.com/ads/library/?id=577901808428698',
'https://www.facebook.com/ads/library/?id=605346712028960',
'https://www.facebook.com/ads/library/?id=983384636953505',
'https://www.facebook.com/ads/library/?id=381608554997379',
'https://www.facebook.com/ads/library/?id=1329890971713777',
'https://www.facebook.com/ads/library/?id=1208912830173655',
'https://www.facebook.com/ads/library/?id=565251522974256',
'https://www.facebook.com/ads/library/?id=3778263859150493',
'https://www.facebook.com/ads/library/?id=503562885411713',
'https://www.facebook.com/ads/library/?id=1279433239970277',
'https://www.facebook.com/ads/library/?id=612787167977268',
'https://www.facebook.com/ads/library/?id=1733894964060522',
'https://www.facebook.com/ads/library/?id=3038361609659121',
'https://www.facebook.com/ads/library/?id=545340528373259',
'https://www.facebook.com/ads/library/?id=1038675604610815',
'https://www.facebook.com/ads/library/?id=1344247913409380',
'https://www.facebook.com/ads/library/?id=1100446518752858',
'https://www.facebook.com/ads/library/?id=1319785399377682',
'https://www.facebook.com/ads/library/?id=569683802452508',
'https://www.facebook.com/ads/library/?id=1273089427142954',
'https://www.facebook.com/ads/library/?id=2045065652621377',
'https://www.facebook.com/ads/library/?id=1244876046727628',
'https://www.facebook.com/ads/library/?id=2074687796280774',
'https://www.facebook.com/ads/library/?id=1522409758411102',
'https://www.facebook.com/ads/library/?id=1129705612134290',
'https://www.facebook.com/ads/library/?id=1120363989702724',
'https://www.facebook.com/ads/library/?id=1637009723583206',
'https://www.facebook.com/ads/library/?id=1945852625913501',
'https://www.facebook.com/ads/library/?id=3873056279652962',
'https://www.facebook.com/ads/library/?id=565367142806345',
'https://www.facebook.com/ads/library/?id=427682463728438',
'https://www.facebook.com/ads/library/?id=1864885624040144',
'https://www.facebook.com/ads/library/?id=1761163894632968',
'https://www.facebook.com/ads/library/?id=917489360357096',
'https://www.facebook.com/ads/library/?id=1084598426312802',
'https://www.facebook.com/ads/library/?id=594164949704239',
'https://www.facebook.com/ads/library/?id=1761397717929503',
'https://www.facebook.com/ads/library/?id=605671455355997',
'https://www.facebook.com/ads/library/?id=1035951888282280',
'https://www.facebook.com/ads/library/?id=1070096117939191',
'https://www.facebook.com/ads/library/?id=1619760965242383',
'https://www.facebook.com/ads/library/?id=595308376175734',
'https://www.facebook.com/ads/library/?id=431744379816511',
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
