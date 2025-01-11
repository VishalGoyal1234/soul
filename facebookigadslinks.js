const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ["https://www.facebook.com/ads/library/?id=1026947399462004",
"https://www.facebook.com/ads/library/?id=1330622604753172",
"https://www.facebook.com/ads/library/?id=3918946628379567",
"https://www.facebook.com/ads/library/?id=572674975572320",
"https://www.facebook.com/ads/library/?id=1772809876819027",
"https://www.facebook.com/ads/library/?id=492622113395445",
"https://www.facebook.com/ads/library/?id=923428406425521",
"https://www.facebook.com/ads/library/?id=498459799402033",
"https://www.facebook.com/ads/library/?id=615855960981819",
"https://www.facebook.com/ads/library/?id=574674005184227",
"https://www.facebook.com/ads/library/?id=1900637230469640",
"https://www.facebook.com/ads/library/?id=1098257708653344",
"https://www.facebook.com/ads/library/?id=1540616839958623",
"https://www.facebook.com/ads/library/?id=1080013997212053",
"https://www.facebook.com/ads/library/?id=606478211954232",
"https://www.facebook.com/ads/library/?id=948670063993789",
"https://www.facebook.com/ads/library/?id=1769610473883296",
"https://www.facebook.com/ads/library/?id=1584636758823104",
"https://www.facebook.com/ads/library/?id=1791917334902047",
"https://www.facebook.com/ads/library/?id=607080651666673",
"https://www.facebook.com/ads/library/?id=1219557832471070",
"https://www.facebook.com/ads/library/?id=536253579405789",
"https://www.facebook.com/ads/library/?id=588513100388398",
"https://www.facebook.com/ads/library/?id=947279764130949",
"https://www.facebook.com/ads/library/?id=1301819197925922",
"https://www.facebook.com/ads/library/?id=865755572076746",
"https://www.facebook.com/ads/library/?id=1108105584185143",
"https://www.facebook.com/ads/library/?id=1504426106931005",
"https://www.facebook.com/ads/library/?id=8436504076475928",
"https://www.facebook.com/ads/library/?id=2046514809079134",
"https://www.facebook.com/ads/library/?id=3881453688804143",
"https://www.facebook.com/ads/library/?id=950962446959464",
"https://www.facebook.com/ads/library/?id=580059081186606",
"https://www.facebook.com/ads/library/?id=480192451140506",
"https://www.facebook.com/ads/library/?id=608791581517469",
"https://www.facebook.com/ads/library/?id=1075207677249467",
"https://www.facebook.com/ads/library/?id=2626548634219622",
"https://www.facebook.com/ads/library/?id=1984742415296883",
"https://www.facebook.com/ads/library/?id=905696624893678",
"https://www.facebook.com/ads/library/?id=1660215604845431",
"https://www.facebook.com/ads/library/?id=493886173686260",
"https://www.facebook.com/ads/library/?id=869638625325622",
"https://www.facebook.com/ads/library/?id=1085602623029488",
"https://www.facebook.com/ads/library/?id=2565304790332318",
"https://www.facebook.com/ads/library/?id=1157356718840424",
"https://www.facebook.com/ads/library/?id=2304786489897200",
"https://www.facebook.com/ads/library/?id=1070034828192421",
"https://www.facebook.com/ads/library/?id=567172215778959",
"https://www.facebook.com/ads/library/?id=1124339335844112",
"https://www.facebook.com/ads/library/?id=1071821654593844",
"https://www.facebook.com/ads/library/?id=1064514558380605",
"https://www.facebook.com/ads/library/?id=1080918230405257",
"https://www.facebook.com/ads/library/?id=2955245931295635",
"https://www.facebook.com/ads/library/?id=1516597679244018",
"https://www.facebook.com/ads/library/?id=532846309434304",
"https://www.facebook.com/ads/library/?id=915647880319003",
"https://www.facebook.com/ads/library/?id=447730928290567",
"https://www.facebook.com/ads/library/?id=1080852406971214",
"https://www.facebook.com/ads/library/?id=1101850011564182",
"https://www.facebook.com/ads/library/?id=867429128616406",
"https://www.facebook.com/ads/library/?id=496639703109189",
"https://www.facebook.com/ads/library/?id=1005005657986213",
"https://www.facebook.com/ads/library/?id=361795569946006",
"https://www.facebook.com/ads/library/?id=1163447461637868",
"https://www.facebook.com/ads/library/?id=2688128101354905",
"https://www.facebook.com/ads/library/?id=394907719551648",
"https://www.facebook.com/ads/library/?id=361313943102612",
"https://www.facebook.com/ads/library/?id=704130954947837",
"https://www.facebook.com/ads/library/?id=697303695663329",
"https://www.facebook.com/ads/library/?id=612657061242797",
"https://www.facebook.com/ads/library/?id=1310447313537287",
"https://www.facebook.com/ads/library/?id=1111587143764657",
"https://www.facebook.com/ads/library/?id=444426771936567",
"https://www.facebook.com/ads/library/?id=585047694279029",
"https://www.facebook.com/ads/library/?id=585447164121103",
"https://www.facebook.com/ads/library/?id=1259722605309892",
"https://www.facebook.com/ads/library/?id=1325613025519587",
"https://www.facebook.com/ads/library/?id=1991034761400604",
"https://www.facebook.com/ads/library/?id=9049476395165605",
"https://www.facebook.com/ads/library/?id=599709879099778",
"https://www.facebook.com/ads/library/?id=996251632361293",
"https://www.facebook.com/ads/library/?id=1134953437516655",
"https://www.facebook.com/ads/library/?id=953727146240920",
"https://www.facebook.com/ads/library/?id=790642289914186",
"https://www.facebook.com/ads/library/?id=443172988732707",
"https://www.facebook.com/ads/library/?id=1123099965948324",
"https://www.facebook.com/ads/library/?id=576354731858568",
"https://www.facebook.com/ads/library/?id=1833453537459874",
"https://www.facebook.com/ads/library/?id=1026947399462004",
"https://www.facebook.com/ads/library/?id=8967367173352876",
"https://www.facebook.com/ads/library/?id=575983208665233",
"https://www.facebook.com/ads/library/?id=931042515802102",
"https://www.facebook.com/ads/library/?id=1808769196619828",
"https://www.facebook.com/ads/library/?id=575281342061541",
"https://www.facebook.com/ads/library/?id=566118952984837",
"https://www.facebook.com/ads/library/?id=630703016059295",
"https://www.facebook.com/ads/library/?id=28146660821615098",
"https://www.facebook.com/ads/library/?id=9337875582931910",
"https://www.facebook.com/ads/library/?id=609622508125488",
"https://www.facebook.com/ads/library/?id=994427122537232",
"https://www.facebook.com/ads/library/?id=1664622074397782",
"https://www.facebook.com/ads/library/?id=1325613025519587",
"https://www.facebook.com/ads/library/?id=954617759450779",
"https://www.facebook.com/ads/library/?id=28443821665208840",
"https://www.facebook.com/ads/library/?id=1582263439071731",
"https://www.facebook.com/ads/library/?id=598810265970798",
"https://www.facebook.com/ads/library/?id=437752382743021",
"https://www.facebook.com/ads/library/?id=9082877338402095",
"https://www.facebook.com/ads/library/?id=578410524936758",
"https://www.facebook.com/ads/library/?id=8191221987644645",
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
