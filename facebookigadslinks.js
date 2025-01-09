const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ["https://www.facebook.com/ads/library/?id=578143648312690",
"https://www.facebook.com/ads/library/?id=573860808859101",
"https://www.facebook.com/ads/library/?id=569924159181432",
"https://www.facebook.com/ads/library/?id=961845908657052",
"https://www.facebook.com/ads/library/?id=895746339075592",
"https://www.facebook.com/ads/library/?id=1803146213793670",
"https://www.facebook.com/ads/library/?id=583410657763445",
"https://www.facebook.com/ads/library/?id=856305446488877",
"https://www.facebook.com/ads/library/?id=1137679368036078",
"https://www.facebook.com/ads/library/?id=1418308615827299",
"https://www.facebook.com/ads/library/?id=1009765847848359",
"https://www.facebook.com/ads/library/?id=1288244172630222",
"https://www.facebook.com/ads/library/?id=527317490334403",
"https://www.facebook.com/ads/library/?id=1290132018906247",
"https://www.facebook.com/ads/library/?id=1109521870669415",
"https://www.facebook.com/ads/library/?id=575683595311220",
"https://www.facebook.com/ads/library/?id=949347360622908",
"https://www.facebook.com/ads/library/?id=582204957909557",
"https://www.facebook.com/ads/library/?id=612468967808319",
"https://www.facebook.com/ads/library/?id=572263989028344",
"https://www.facebook.com/ads/library/?id=1138731761201852",
"https://www.facebook.com/ads/library/?id=614602740985884",
"https://www.facebook.com/ads/library/?id=605152859131825",
"https://www.facebook.com/ads/library/?id=1125103902627939",
"https://www.facebook.com/ads/library/?id=1784076955671797",
"https://www.facebook.com/ads/library/?id=968007081915773",
"https://www.facebook.com/ads/library/?id=621430760404335",
"https://www.facebook.com/ads/library/?id=1434410514469916",
"https://www.facebook.com/ads/library/?id=1765576104176901",
"https://www.facebook.com/ads/library/?id=1260546785058570",
"https://www.facebook.com/ads/library/?id=897060529298515",
"https://www.facebook.com/ads/library/?id=1316913562671948",
"https://www.facebook.com/ads/library/?id=627971116463161",
"https://www.facebook.com/ads/library/?id=1125737288959959",
"https://www.facebook.com/ads/library/?id=615944527554272",
"https://www.facebook.com/ads/library/?id=1499229107424844",
"https://www.facebook.com/ads/library/?id=570060805862878",
"https://www.facebook.com/ads/library/?id=576321975182599",
"https://www.facebook.com/ads/library/?id=596169906391759",
"https://www.facebook.com/ads/library/?id=1288644998954864",
"https://www.facebook.com/ads/library/?id=1751773625621582",
"https://www.facebook.com/ads/library/?id=1069653164933328",
"https://www.facebook.com/ads/library/?id=1252614275811681",
"https://www.facebook.com/ads/library/?id=2107554889700264",
"https://www.facebook.com/ads/library/?id=1843626853048340",
"https://www.facebook.com/ads/library/?id=1176966440833247",
"https://www.facebook.com/ads/library/?id=1146426827004496",
"https://www.facebook.com/ads/library/?id=3468996370069439",
"https://www.facebook.com/ads/library/?id=509851462215294",
"https://www.facebook.com/ads/library/?id=1051600843318183",
"https://www.facebook.com/ads/library/?id=2604965426379417",
"https://www.facebook.com/ads/library/?id=1741365176710933",
"https://www.facebook.com/ads/library/?id=1111732046855067",
"https://www.facebook.com/ads/library/?id=788929423400247",
"https://www.facebook.com/ads/library/?id=8968136533276204",
"https://www.facebook.com/ads/library/?id=607309648417501",
"https://www.facebook.com/ads/library/?id=619630267273224",
"https://www.facebook.com/ads/library/?id=3375707745896441",
"https://www.facebook.com/ads/library/?id=522704984258145",
"https://www.facebook.com/ads/library/?id=972252601484441",
"https://www.facebook.com/ads/library/?id=884461340226451",
"https://www.facebook.com/ads/library/?id=1268397754430618",
"https://www.facebook.com/ads/library/?id=931704422267712",
"https://www.facebook.com/ads/library/?id=1013159000741497",
"https://www.facebook.com/ads/library/?id=1305099537354526",
"https://www.facebook.com/ads/library/?id=887403886920017",
"https://www.facebook.com/ads/library/?id=994586619154087",
"https://www.facebook.com/ads/library/?id=1335495024485747",
"https://www.facebook.com/ads/library/?id=598568186049729",
"https://www.facebook.com/ads/library/?id=1092795328840859",
"https://www.facebook.com/ads/library/?id=628823250249242",
"https://www.facebook.com/ads/library/?id=1245511893666482",
"https://www.facebook.com/ads/library/?id=8742344632530999",
"https://www.facebook.com/ads/library/?id=956282182553200",
"https://www.facebook.com/ads/library/?id=1239791483780892",
"https://www.facebook.com/ads/library/?id=479781178473967",
"https://www.facebook.com/ads/library/?id=599621402614981",
"https://www.facebook.com/ads/library/?id=1552519385399869",
"https://www.facebook.com/ads/library/?id=988081619806076",
"https://www.facebook.com/ads/library/?id=897908139078560",
"https://www.facebook.com/ads/library/?id=906911348196652",
"https://www.facebook.com/ads/library/?id=1127530055436297",
"https://www.facebook.com/ads/library/?id=918889680379468",
"https://www.facebook.com/ads/library/?id=580881564734170",
"https://www.facebook.com/ads/library/?id=629318209523180",
"https://www.facebook.com/ads/library/?id=1129275785871896",
"https://www.facebook.com/ads/library/?id=1118701392980340",
"https://www.facebook.com/ads/library/?id=8004278903008525",
"https://www.facebook.com/ads/library/?id=1497195165016910",
"https://www.facebook.com/ads/library/?id=1634696117465479",
"https://www.facebook.com/ads/library/?id=929537729133179",
"https://www.facebook.com/ads/library/?id=541106725586343",
"https://www.facebook.com/ads/library/?id=1754063018693376",
"https://www.facebook.com/ads/library/?id=952677526782934",
"https://www.facebook.com/ads/library/?id=1267085047776500",
"https://www.facebook.com/ads/library/?id=610865948035798",
"https://www.facebook.com/ads/library/?id=1063084748899431",
"https://www.facebook.com/ads/library/?id=927951765970288",
"https://www.facebook.com/ads/library/?id=894242546029553",
"https://www.facebook.com/ads/library/?id=957294266305633",
"https://www.facebook.com/ads/library/?id=957330759661812",
"https://www.facebook.com/ads/library/?id=940732840823628",
"https://www.facebook.com/ads/library/?id=940737944206458",
"https://www.facebook.com/ads/library/?id=1036562944939077",
"https://www.facebook.com/ads/library/?id=558427010282800",
"https://www.facebook.com/ads/library/?id=1250898596024376",
"https://www.facebook.com/ads/library/?id=2249858515400136",
"https://www.facebook.com/ads/library/?id=616371510961496",
"https://www.facebook.com/ads/library/?id=931374028964549",
"https://www.facebook.com/ads/library/?id=999074372244009",
"https://www.facebook.com/ads/library/?id=1083964866805885",
"https://www.facebook.com/ads/library/?id=601041392299957",
"https://www.facebook.com/ads/library/?id=1306839560679060",
"https://www.facebook.com/ads/library/?id=1667821747098131",
"https://www.facebook.com/ads/library/?id=536253579405789",
"https://www.facebook.com/ads/library/?id=536253579405789",
"https://www.facebook.com/ads/library/?id=9468358469860459",
"https://www.facebook.com/ads/library/?id=554813470626915",
"https://www.facebook.com/ads/library/?id=516123688075342",
"https://www.facebook.com/ads/library/?id=27613768178271959",
"https://www.facebook.com/ads/library/?id=8871962902887118",
"https://www.facebook.com/ads/library/?id=546957138144285",
"https://www.facebook.com/ads/library/?id=1944142982745977",
"https://www.facebook.com/ads/library/?id=1335269024589416",
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
