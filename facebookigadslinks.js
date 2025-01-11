const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ["https://www.facebook.com/ads/library/?id=950962446959464",
"https://www.facebook.com/ads/library/?id=1620278885505765",
"https://www.facebook.com/ads/library/?id=587138317182736",
"https://www.facebook.com/ads/library/?id=612497484463097",
"https://www.facebook.com/ads/library/?id=549443417984030",
"https://www.facebook.com/ads/library/?id=576150308136584",
"https://www.facebook.com/ads/library/?id=1245440243379061",
"https://www.facebook.com/ads/library/?id=431787793313121",
"https://www.facebook.com/ads/library/?id=1097266368420393",
"https://www.facebook.com/ads/library/?id=1299507054558546",
"https://www.facebook.com/ads/library/?id=1100366014860407",
"https://www.facebook.com/ads/library/?id=1116732843406482",
"https://www.facebook.com/ads/library/?id=556322570594821",
"https://www.facebook.com/ads/library/?id=1233423717886941",
"https://www.facebook.com/ads/library/?id=1270193174106677",
"https://www.facebook.com/ads/library/?id=958017329509368",
"https://www.facebook.com/ads/library/?id=1110467477268974",
"https://www.facebook.com/ads/library/?id=929866301891941",
"https://www.facebook.com/ads/library/?id=975749171046882",
"https://www.facebook.com/ads/library/?id=1099835241779809",
"https://www.facebook.com/ads/library/?id=495171037010671",
"https://www.facebook.com/ads/library/?id=1114842136875513",
"https://www.facebook.com/ads/library/?id=1241075400475126",
"https://www.facebook.com/ads/library/?id=566963455743122",
"https://www.facebook.com/ads/library/?id=1022203259714091",
"https://www.facebook.com/ads/library/?id=2017967771989196",
"https://www.facebook.com/ads/library/?id=577224501659766",
"https://www.facebook.com/ads/library/?id=1073822530705759",
"https://www.facebook.com/ads/library/?id=481597658269134",
"https://www.facebook.com/ads/library/?id=3795531627259844",
"https://www.facebook.com/ads/library/?id=1288063589211245",
"https://www.facebook.com/ads/library/?id=475259268904506",
"https://www.facebook.com/ads/library/?id=8776039005850320",
"https://www.facebook.com/ads/library/?id=464612602833019",
"https://www.facebook.com/ads/library/?id=1787863365298968",
"https://www.facebook.com/ads/library/?id=6770976649692579",
"https://www.facebook.com/ads/library/?id=1473069433360377",
"https://www.facebook.com/ads/library/?id=1636435346962921",
"https://www.facebook.com/ads/library/?id=2586034208258967",
"https://www.facebook.com/ads/library/?id=1261706578176088",
"https://www.facebook.com/ads/library/?id=1091611789081545",
"https://www.facebook.com/ads/library/?id=1324531005200195",
"https://www.facebook.com/ads/library/?id=1957861241385087",
"https://www.facebook.com/ads/library/?id=1543792336312668",
"https://www.facebook.com/ads/library/?id=525857830479639",
"https://www.facebook.com/ads/library/?id=1379406616356925",
"https://www.facebook.com/ads/library/?id=922540613345361",
"https://www.facebook.com/ads/library/?id=917340843819160",
"https://www.facebook.com/ads/library/?id=584218200980868",
"https://www.facebook.com/ads/library/?id=575050305327272",
"https://www.facebook.com/ads/library/?id=3918470478425614",
"https://www.facebook.com/ads/library/?id=1686555638571551",
"https://www.facebook.com/ads/library/?id=580881788205949",
"https://www.facebook.com/ads/library/?id=23923362510589485",
"https://www.facebook.com/ads/library/?id=607733348376971",
"https://www.facebook.com/ads/library/?id=1125737288959959",
"https://www.facebook.com/ads/library/?id=898637769145475",
"https://www.facebook.com/ads/library/?id=1288644998954864",
"https://www.facebook.com/ads/library/?id=517739614652565",
"https://www.facebook.com/ads/library/?id=907887567802283",
"https://www.facebook.com/ads/library/?id=2604965426379417",
"https://www.facebook.com/ads/library/?id=948428607257348",
"https://www.facebook.com/ads/library/?id=1132296821943570",
"https://www.facebook.com/ads/library/?id=413524928421601",
"https://www.facebook.com/ads/library/?id=1103213628265250",
"https://www.facebook.com/ads/library/?id=522321397498970",
"https://www.facebook.com/ads/library/?id=519236001123819",
"https://www.facebook.com/ads/library/?id=481879557870289",
"https://www.facebook.com/ads/library/?id=8484256335031121",
"https://www.facebook.com/ads/library/?id=1281845626388262",
"https://www.facebook.com/ads/library/?id=577089471753073",
"https://www.facebook.com/ads/library/?id=628823250249242",
"https://www.facebook.com/ads/library/?id=953097569509140",
"https://www.facebook.com/ads/library/?id=1108546510761321",
"https://www.facebook.com/ads/library/?id=1239791483780892",
"https://www.facebook.com/ads/library/?id=1748251032628891",
"https://www.facebook.com/ads/library/?id=634041672384813",
"https://www.facebook.com/ads/library/?id=2356004641447030",
"https://www.facebook.com/ads/library/?id=1726353317921286",
"https://www.facebook.com/ads/library/?id=599709879099778",
"https://www.facebook.com/ads/library/?id=595124153235547",
"https://www.facebook.com/ads/library/?id=1139217497866669",
"https://www.facebook.com/ads/library/?id=612657061242797",
"https://www.facebook.com/ads/library/?id=612571401177616",
"https://www.facebook.com/ads/library/?id=1189793309483289",
"https://www.facebook.com/ads/library/?id=588180220833533",
"https://www.facebook.com/ads/library/?id=1618604218794991",
"https://www.facebook.com/ads/library/?id=1729739280931671",
"https://www.facebook.com/ads/library/?id=1044693947424811",
"https://www.facebook.com/ads/library/?id=941324427632041",
"https://www.facebook.com/ads/library/?id=2282205605495297",
"https://www.facebook.com/ads/library/?id=1579739303420400",
"https://www.facebook.com/ads/library/?id=1134953437516655",
"https://www.facebook.com/ads/library/?id=606985325402709",
"https://www.facebook.com/ads/library/?id=2651460038388030",
"https://www.facebook.com/ads/library/?id=810156067942418",
"https://www.facebook.com/ads/library/?id=485451437511985",
"https://www.facebook.com/ads/library/?id=1162340742115861",
"https://www.facebook.com/ads/library/?id=1584963215716219",
"https://www.facebook.com/ads/library/?id=939028348198573",
"https://www.facebook.com/ads/library/?id=441503749034735",
"https://www.facebook.com/ads/library/?id=495955146365395",
"https://www.facebook.com/ads/library/?id=8967367173352876",
"https://www.facebook.com/ads/library/?id=982782500567692",
"https://www.facebook.com/ads/library/?id=1295549181575384",
"https://www.facebook.com/ads/library/?id=1372435170584876",
"https://www.facebook.com/ads/library/?id=513326981110355",
"https://www.facebook.com/ads/library/?id=3826600400926727",
"https://www.facebook.com/ads/library/?id=1327205348694426",
"https://www.facebook.com/ads/library/?id=1026947399462004",
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
