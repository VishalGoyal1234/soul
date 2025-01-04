const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=431744379816511',
'https://www.facebook.com/ads/library/?id=1098339788557111',
'https://www.facebook.com/ads/library/?id=903239061943757',
'https://www.facebook.com/ads/library/?id=504107929280340',
'https://www.facebook.com/ads/library/?id=1091224085948111',
'https://www.facebook.com/ads/library/?id=849093347088653',
'https://www.facebook.com/ads/library/?id=530091206617948',
'https://www.facebook.com/ads/library/?id=869191905195397',
'https://www.facebook.com/ads/library/?id=513851184790589',
'https://www.facebook.com/ads/library/?id=578431754865837',
'https://www.facebook.com/ads/library/?id=934954681799504',
'https://www.facebook.com/ads/library/?id=1393499384941002',
'https://www.facebook.com/ads/library/?id=522604537282972',
'https://www.facebook.com/ads/library/?id=871702638287031',
'https://www.facebook.com/ads/library/?id=1267508614417472',
'https://www.facebook.com/ads/library/?id=438678469336638',
'https://www.facebook.com/ads/library/?id=582936714413517',
'https://www.facebook.com/ads/library/?id=503054619364433',
'https://www.facebook.com/ads/library/?id=1974975019607324',
'https://www.facebook.com/ads/library/?id=1559508388337743',
'https://www.facebook.com/ads/library/?id=1554195321902321',
'https://www.facebook.com/ads/library/?id=3775129752707571',
'https://www.facebook.com/ads/library/?id=1457695734943889',
'https://www.facebook.com/ads/library/?id=1985587118548396',
'https://www.facebook.com/ads/library/?id=1264476041599959',
'https://www.facebook.com/ads/library/?id=844871281133864',
'https://www.facebook.com/ads/library/?id=417418621451847',
'https://www.facebook.com/ads/library/?id=2211602969208486',
'https://www.facebook.com/ads/library/?id=433562229053268',
'https://www.facebook.com/ads/library/?id=480429264727606',
'https://www.facebook.com/ads/library/?id=1558581891391076',
'https://www.facebook.com/ads/library/?id=1491760624784424',
'https://www.facebook.com/ads/library/?id=1034740648266928',
'https://www.facebook.com/ads/library/?id=1526538478277468',
'https://www.facebook.com/ads/library/?id=484866117356544',
'https://www.facebook.com/ads/library/?id=416339514243130',
'https://www.facebook.com/ads/library/?id=1552063448968870',
'https://www.facebook.com/ads/library/?id=1662524584519227',
'https://www.facebook.com/ads/library/?id=1288252895145607',
'https://www.facebook.com/ads/library/?id=580187664803090',
'https://www.facebook.com/ads/library/?id=1133033687691959',
'https://www.facebook.com/ads/library/?id=1324002908956001',
'https://www.facebook.com/ads/library/?id=1767150807442249',
'https://www.facebook.com/ads/library/?id=2293279324378297',
'https://www.facebook.com/ads/library/?id=1123130436108344',
'https://www.facebook.com/ads/library/?id=3534571256843775',
'https://www.facebook.com/ads/library/?id=1411397083168554',
'https://www.facebook.com/ads/library/?id=1625036921458618',
'https://www.facebook.com/ads/library/?id=602673662411074',
'https://www.facebook.com/ads/library/?id=616294554402400',
'https://www.facebook.com/ads/library/?id=3507194119588422',
'https://www.facebook.com/ads/library/?id=1096578772015841',
'https://www.facebook.com/ads/library/?id=1327240175364523',
'https://www.facebook.com/ads/library/?id=1362512461413701',
'https://www.facebook.com/ads/library/?id=2274600346246064',
'https://www.facebook.com/ads/library/?id=525980133820355',
'https://www.facebook.com/ads/library/?id=1044614914103659',
'https://www.facebook.com/ads/library/?id=1263313958334756',
'https://www.facebook.com/ads/library/?id=541896378822499',
'https://www.facebook.com/ads/library/?id=983384636953505',
'https://www.facebook.com/ads/library/?id=1081038117090730',
'https://www.facebook.com/ads/library/?id=3778263859150493',
'https://www.facebook.com/ads/library/?id=1319785399377682',
'https://www.facebook.com/ads/library/?id=1273089427142954',
'https://www.facebook.com/ads/library/?id=569434495951252',
'https://www.facebook.com/ads/library/?id=1208912830173655',
'https://www.facebook.com/ads/library/?id=879227544363832',
'https://www.facebook.com/ads/library/?id=594393106270421',
'https://www.facebook.com/ads/library/?id=594164949704239',
'https://www.facebook.com/ads/library/?id=1637009723583206',
'https://www.facebook.com/ads/library/?id=440384272390392',
'https://www.facebook.com/ads/library/?id=446054468180963',
'https://www.facebook.com/ads/library/?id=1368508787146664',
'https://www.facebook.com/ads/library/?id=834732732035745',
'https://www.facebook.com/ads/library/?id=1662524584519227',
'https://www.facebook.com/ads/library/?id=1123708121767156',
'https://www.facebook.com/ads/library/?id=256963263938116',
'https://www.facebook.com/ads/library/?id=778710559168069',
'https://www.facebook.com/ads/library/?id=1355625928736651',
'https://www.facebook.com/ads/library/?id=1023512449495788',
'https://www.facebook.com/ads/library/?id=1143830963842981',
'https://www.facebook.com/ads/library/?id=1046342060841454',
'https://www.facebook.com/ads/library/?id=2029557477548442',
'https://www.facebook.com/ads/library/?id=1121761736200775',
'https://www.facebook.com/ads/library/?id=591980023424111',
'https://www.facebook.com/ads/library/?id=614296757965100',
'https://www.facebook.com/ads/library/?id=1649294832461367',
'https://www.facebook.com/ads/library/?id=1258501518576375',
'https://www.facebook.com/ads/library/?id=917489360357096',
'https://www.facebook.com/ads/library/?id=1206633587090054',
'https://www.facebook.com/ads/library/?id=934954681799504',
'https://www.facebook.com/ads/library/?id=1051997639724372',
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
