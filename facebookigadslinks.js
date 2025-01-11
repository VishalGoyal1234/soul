const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ["https://www.facebook.com/ads/library/?id=616268720858995",
"https://www.facebook.com/ads/library/?id=521682457587705",
"https://www.facebook.com/ads/library/?id=1322080498794012",
"https://www.facebook.com/ads/library/?id=918174636730374",
"https://www.facebook.com/ads/library/?id=9470848542927572",
"https://www.facebook.com/ads/library/?id=579383448381312",
"https://www.facebook.com/ads/library/?id=970141681708814",
"https://www.facebook.com/ads/library/?id=909737174298751",
"https://www.facebook.com/ads/library/?id=1261472945115445",
"https://www.facebook.com/ads/library/?id=1258912258738351",
"https://www.facebook.com/ads/library/?id=956661332576382",
"https://www.facebook.com/ads/library/?id=1240141050420521",
"https://www.facebook.com/ads/library/?id=1106859690843386",
"https://www.facebook.com/ads/library/?id=472282532319007",
"https://www.facebook.com/ads/library/?id=936115341952768",
"https://www.facebook.com/ads/library/?id=1299263634534375",
"https://www.facebook.com/ads/library/?id=1108153787454194",
"https://www.facebook.com/ads/library/?id=514942750966508",
"https://www.facebook.com/ads/library/?id=872715761470554",
"https://www.facebook.com/ads/library/?id=1264091478145622",
"https://www.facebook.com/ads/library/?id=1110778706928524",
"https://www.facebook.com/ads/library/?id=983785397141283",
"https://www.facebook.com/ads/library/?id=1767695470686102",
"https://www.facebook.com/ads/library/?id=1927052067785569",
"https://www.facebook.com/ads/library/?id=543719792034386",
"https://www.facebook.com/ads/library/?id=629129256206831",
"https://www.facebook.com/ads/library/?id=1136764791129591",
"https://www.facebook.com/ads/library/?id=1138296441346239",
"https://www.facebook.com/ads/library/?id=1957685761393514",
"https://www.facebook.com/ads/library/?id=1385976202846427",
"https://www.facebook.com/ads/library/?id=1111654630438511",
"https://www.facebook.com/ads/library/?id=933908975474064",
"https://www.facebook.com/ads/library/?id=9193753507358961",
"https://www.facebook.com/ads/library/?id=3263243903811109",
"https://www.facebook.com/ads/library/?id=628440279530487",
"https://www.facebook.com/ads/library/?id=1559414438785695",
"https://www.facebook.com/ads/library/?id=1136439881167828",
"https://www.facebook.com/ads/library/?id=579912448183857",
"https://www.facebook.com/ads/library/?id=3674609609497082",
"https://www.facebook.com/ads/library/?id=2781014762078443",
"https://www.facebook.com/ads/library/?id=2793985360781680",
"https://www.facebook.com/ads/library/?id=1246910043328182",
"https://www.facebook.com/ads/library/?id=1084652576686007",
"https://www.facebook.com/ads/library/?id=1305253630830698",
"https://www.facebook.com/ads/library/?id=1088035799490106",
"https://www.facebook.com/ads/library/?id=1636651460255828",
"https://www.facebook.com/ads/library/?id=892712353032575",
"https://www.facebook.com/ads/library/?id=1706531533597425",
"https://www.facebook.com/ads/library/?id=588929466876496",
"https://www.facebook.com/ads/library/?id=1087757272671509",
"https://www.facebook.com/ads/library/?id=8889704224431435",
"https://www.facebook.com/ads/library/?id=8885859464861487",
"https://www.facebook.com/ads/library/?id=542895562079291",
"https://www.facebook.com/ads/library/?id=4328831787343865",
"https://www.facebook.com/ads/library/?id=1278243823194650",
"https://www.facebook.com/ads/library/?id=577109944843351",
"https://www.facebook.com/ads/library/?id=411011248749092",
"https://www.facebook.com/ads/library/?id=368604126277127",
"https://www.facebook.com/ads/library/?id=1232434737962813",
"https://www.facebook.com/ads/library/?id=1082023060083398",
"https://www.facebook.com/ads/library/?id=570202059075399",
"https://www.facebook.com/ads/library/?id=8422399861142538",
"https://www.facebook.com/ads/library/?id=1939387933216278",
"https://www.facebook.com/ads/library/?id=980026910629873",
"https://www.facebook.com/ads/library/?id=1264957071490293",
"https://www.facebook.com/ads/library/?id=1591244035132016",
"https://www.facebook.com/ads/library/?id=1616561939265793",
"https://www.facebook.com/ads/library/?id=467578745728709",
"https://www.facebook.com/ads/library/?id=1481717685781111",
"https://www.facebook.com/ads/library/?id=3590905841131957",
"https://www.facebook.com/ads/library/?id=933118085487665",
"https://www.facebook.com/ads/library/?id=1127562178298845",
"https://www.facebook.com/ads/library/?id=1907520396384002",
"https://www.facebook.com/ads/library/?id=433292602894935",
"https://www.facebook.com/ads/library/?id=1023309949373282",
"https://www.facebook.com/ads/library/?id=1070974687539131",
"https://www.facebook.com/ads/library/?id=1103589517422843",
"https://www.facebook.com/ads/library/?id=366645835941396",
"https://www.facebook.com/ads/library/?id=970792918079879",
"https://www.facebook.com/ads/library/?id=1081273516416514",
"https://www.facebook.com/ads/library/?id=214671451288520",
"https://www.facebook.com/ads/library/?id=322143837200824",
"https://www.facebook.com/ads/library/?id=2762951113886871",
"https://www.facebook.com/ads/library/?id=2222037428133272",
"https://www.facebook.com/ads/library/?id=958514815736294",
"https://www.facebook.com/ads/library/?id=1631242697485850",
"https://www.facebook.com/ads/library/?id=620299644019717",
"https://www.facebook.com/ads/library/?id=885017090238098",
"https://www.facebook.com/ads/library/?id=934858555027797",
"https://www.facebook.com/ads/library/?id=534212219666059",
"https://www.facebook.com/ads/library/?id=1054887339754545",
"https://www.facebook.com/ads/library/?id=943149687806687",
"https://www.facebook.com/ads/library/?id=548002530939527",
"https://www.facebook.com/ads/library/?id=978836164102704",
"https://www.facebook.com/ads/library/?id=981321490523598",
"https://www.facebook.com/ads/library/?id=1252037935873338",
"https://www.facebook.com/ads/library/?id=1060323285756849",
"https://www.facebook.com/ads/library/?id=1775324769676253",
"https://www.facebook.com/ads/library/?id=511279904712988",
"https://www.facebook.com/ads/library/?id=1675152759738001",
"https://www.facebook.com/ads/library/?id=1107037537415611",
"https://www.facebook.com/ads/library/?id=640078575024688",
"https://www.facebook.com/ads/library/?id=941938627894502",
"https://www.facebook.com/ads/library/?id=1313580513155851",
"https://www.facebook.com/ads/library/?id=1546644966006383",
"https://www.facebook.com/ads/library/?id=1583999385569615",
"https://www.facebook.com/ads/library/?id=589988320282473",
"https://www.facebook.com/ads/library/?id=943771137338270",
"https://www.facebook.com/ads/library/?id=1775324769676253",
"https://www.facebook.com/ads/library/?id=937255238507237",
"https://www.facebook.com/ads/library/?id=590119123776441",
"https://www.facebook.com/ads/library/?id=2938519516317718",
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
