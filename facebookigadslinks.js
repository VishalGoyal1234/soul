const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ["https://www.facebook.com/ads/library/?id=955749239832018",
"https://www.facebook.com/ads/library/?id=1005384314766738",
"https://www.facebook.com/ads/library/?id=1304439450898139",
"https://www.facebook.com/ads/library/?id=4176750222560600",
"https://www.facebook.com/ads/library/?id=1136681021518641",
"https://www.facebook.com/ads/library/?id=1317700679277597",
"https://www.facebook.com/ads/library/?id=610514538052804",
"https://www.facebook.com/ads/library/?id=1329960434666743",
"https://www.facebook.com/ads/library/?id=563813343139060",
"https://www.facebook.com/ads/library/?id=611472531239901",
"https://www.facebook.com/ads/library/?id=570453792555778",
"https://www.facebook.com/ads/library/?id=1261472945115445",
"https://www.facebook.com/ads/library/?id=1120734816255667",
"https://www.facebook.com/ads/library/?id=577323815096649",
"https://www.facebook.com/ads/library/?id=1643980366504548",
"https://www.facebook.com/ads/library/?id=1757736765046794",
"https://www.facebook.com/ads/library/?id=975314227838815",
"https://www.facebook.com/ads/library/?id=601238342452885",
"https://www.facebook.com/ads/library/?id=464012396563020",
"https://www.facebook.com/ads/library/?id=942646344507399",
"https://www.facebook.com/ads/library/?id=901640285499630",
"https://www.facebook.com/ads/library/?id=941664214682062",
"https://www.facebook.com/ads/library/?id=1145749786895268",
"https://www.facebook.com/ads/library/?id=589076657201442",
"https://www.facebook.com/ads/library/?id=1145554887571366",
"https://www.facebook.com/ads/library/?id=1158313125758420",
"https://www.facebook.com/ads/library/?id=995251022422650",
"https://www.facebook.com/ads/library/?id=1149519316794052",
"https://www.facebook.com/ads/library/?id=1153661083138426",
"https://www.facebook.com/ads/library/?id=486322057435376",
"https://www.facebook.com/ads/library/?id=620951793683051",
"https://www.facebook.com/ads/library/?id=8852325281530040",
"https://www.facebook.com/ads/library/?id=582343747845804",
"https://www.facebook.com/ads/library/?id=579595098376395",
"https://www.facebook.com/ads/library/?id=1049681030508180",
"https://www.facebook.com/ads/library/?id=1133307288345018",
"https://www.facebook.com/ads/library/?id=1156475535896114",
"https://www.facebook.com/ads/library/?id=1377294073641323",
"https://www.facebook.com/ads/library/?id=1314305772910623",
"https://www.facebook.com/ads/library/?id=581773801315400",
"https://www.facebook.com/ads/library/?id=624366883481438",
"https://www.facebook.com/ads/library/?id=612294151486631",
"https://www.facebook.com/ads/library/?id=954282383439233",
"https://www.facebook.com/ads/library/?id=8741469449311957",
"https://www.facebook.com/ads/library/?id=962152295793130",
"https://www.facebook.com/ads/library/?id=1388384465894577",
"https://www.facebook.com/ads/library/?id=583010297812223",
"https://www.facebook.com/ads/library/?id=575544948583199",
"https://www.facebook.com/ads/library/?id=581513521504231",
"https://www.facebook.com/ads/library/?id=903157355140077",
"https://www.facebook.com/ads/library/?id=1034181728514571",
"https://www.facebook.com/ads/library/?id=947899143941464",
"https://www.facebook.com/ads/library/?id=1509842139703082",
"https://www.facebook.com/ads/library/?id=1128723608713438",
"https://www.facebook.com/ads/library/?id=1274742583792716",
"https://www.facebook.com/ads/library/?id=976170564434477",
"https://www.facebook.com/ads/library/?id=9032447263458051",
"https://www.facebook.com/ads/library/?id=980607853962961",
"https://www.facebook.com/ads/library/?id=9264931270237022",
"https://www.facebook.com/ads/library/?id=1156239849214900",
"https://www.facebook.com/ads/library/?id=1253945032503178",
"https://www.facebook.com/ads/library/?id=9266705186725431",
"https://www.facebook.com/ads/library/?id=1846642339076740",
"https://www.facebook.com/ads/library/?id=601345269173735",
"https://www.facebook.com/ads/library/?id=1269785101018950",
"https://www.facebook.com/ads/library/?id=949723390006905",
"https://www.facebook.com/ads/library/?id=601345269173735",
"https://www.facebook.com/ads/library/?id=1494458927893385",
"https://www.facebook.com/ads/library/?id=1744431506405229",
"https://www.facebook.com/ads/library/?id=949925727064763",
"https://www.facebook.com/ads/library/?id=586242140842908",
"https://www.facebook.com/ads/library/?id=1601756030711424",
"https://www.facebook.com/ads/library/?id=2252891558400454",
"https://www.facebook.com/ads/library/?id=463472919950053",
"https://www.facebook.com/ads/library/?id=1649804075956356",
"https://www.facebook.com/ads/library/?id=904593761757612",
"https://www.facebook.com/ads/library/?id=990577246224274",
"https://www.facebook.com/ads/library/?id=469022959336279",
"https://www.facebook.com/ads/library/?id=971937921507736",
"https://www.facebook.com/ads/library/?id=1137729184551831",
"https://www.facebook.com/ads/library/?id=1104026217714552",
"https://www.facebook.com/ads/library/?id=512592217902384",
"https://www.facebook.com/ads/library/?id=926183649648000",
"https://www.facebook.com/ads/library/?id=4099633916989651",
"https://www.facebook.com/ads/library/?id=964696552250321",
"https://www.facebook.com/ads/library/?id=1957742858043954",
"https://www.facebook.com/ads/library/?id=637848862017984",
"https://www.facebook.com/ads/library/?id=966165194977992",
"https://www.facebook.com/ads/library/?id=1250380842732714",
"https://www.facebook.com/ads/library/?id=1307844813701310",
"https://www.facebook.com/ads/library/?id=1828096494608842",
"https://www.facebook.com/ads/library/?id=1228585541545630",
"https://www.facebook.com/ads/library/?id=1783304955816862",
"https://www.facebook.com/ads/library/?id=922588156518999",
"https://www.facebook.com/ads/library/?id=1790891124995064",
"https://www.facebook.com/ads/library/?id=915529640561118",
"https://www.facebook.com/ads/library/?id=1768182943722525",
"https://www.facebook.com/ads/library/?id=1044093627778331",
"https://www.facebook.com/ads/library/?id=1039633181257157",
"https://www.facebook.com/ads/library/?id=629333332848860",
"https://www.facebook.com/ads/library/?id=1927052067785569",
"https://www.facebook.com/ads/library/?id=1612520699379073",
"https://www.facebook.com/ads/library/?id=1320981375598080",
"https://www.facebook.com/ads/library/?id=480755604688693",
"https://www.facebook.com/ads/library/?id=1112790650300879",
"https://www.facebook.com/ads/library/?id=1152301199739929",
"https://www.facebook.com/ads/library/?id=1136328321457284",
"https://www.facebook.com/ads/library/?id=1513766509316821",
"https://www.facebook.com/ads/library/?id=8950427895070600",
"https://www.facebook.com/ads/library/?id=1787749415374690",
"https://www.facebook.com/ads/library/?id=9470848542927572",
"https://www.facebook.com/ads/library/?id=9484238118252806",
"https://www.facebook.com/ads/library/?id=1240141050420521",
"https://www.facebook.com/ads/library/?id=1716074539009230",
"https://www.facebook.com/ads/library/?id=589635287101594",
"https://www.facebook.com/ads/library/?id=568661419276725",
"https://www.facebook.com/ads/library/?id=1604526740450300",
"https://www.facebook.com/ads/library/?id=579383448381312",
"https://www.facebook.com/ads/library/?id=623192036839459",
"https://www.facebook.com/ads/library/?id=658178133404000",
"https://www.facebook.com/ads/library/?id=919922580121091",
"https://www.facebook.com/ads/library/?id=1297131624771792",
"https://www.facebook.com/ads/library/?id=658178133404000",
"https://www.facebook.com/ads/library/?id=1299263634534375",
"https://www.facebook.com/ads/library/?id=1312342076773154",
"https://www.facebook.com/ads/library/?id=1295468071732860",
"https://www.facebook.com/ads/library/?id=891214249565599",
"https://www.facebook.com/ads/library/?id=2322365508140002",
"https://www.facebook.com/ads/library/?id=518884291165969",
"https://www.facebook.com/ads/library/?id=2762951113886871",
"https://www.facebook.com/ads/library/?id=505837422619366",
"https://www.facebook.com/ads/library/?id=1317219969404388",
"https://www.facebook.com/ads/library/?id=1125472389192026",
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
