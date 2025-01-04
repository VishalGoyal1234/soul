const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=427660486980633', 
'https://www.facebook.com/ads/library/?id=1117267012943429', 
'https://www.facebook.com/ads/library/?id=966724602012463', 
'https://www.facebook.com/ads/library/?id=1603611766912159', 
'https://www.facebook.com/ads/library/?id=1377551090337480', 
'https://www.facebook.com/ads/library/?id=1278276636818019', 
'https://www.facebook.com/ads/library/?id=1491607564843497', 
'https://www.facebook.com/ads/library/?id=1794070064739366', 
'https://www.facebook.com/ads/library/?id=1728231441087484', 
'https://www.facebook.com/ads/library/?id=1155718309234109', 
'https://www.facebook.com/ads/library/?id=1638690687083201', 
'https://www.facebook.com/ads/library/?id=1723687011745424', 
'https://www.facebook.com/ads/library/?id=1105504460897809', 
'https://www.facebook.com/ads/library/?id=617482800622328', 
'https://www.facebook.com/ads/library/?id=3013372765480141', 
'https://www.facebook.com/ads/library/?id=613515764546109', 
'https://www.facebook.com/ads/library/?id=1102539904884940', 
'https://www.facebook.com/ads/library/?id=1240369443739439', 
'https://www.facebook.com/ads/library/?id=1297693151370180', 
'https://www.facebook.com/ads/library/?id=1270293500756602', 
'https://www.facebook.com/ads/library/?id=1127821098238436', 
'https://www.facebook.com/ads/library/?id=1593358382056223', 
'https://www.facebook.com/ads/library/?id=992181819620496', 
'https://www.facebook.com/ads/library/?id=1315698402802146', 
'https://www.facebook.com/ads/library/?id=2335958050118651', 
'https://www.facebook.com/ads/library/?id=1108016103885930', 
'https://www.facebook.com/ads/library/?id=1159825548921468', 
'https://www.facebook.com/ads/library/?id=8863530183768187', 
'https://www.facebook.com/ads/library/?id=10055078891185782', 
'https://www.facebook.com/ads/library/?id=3393195210989252', 
'https://www.facebook.com/ads/library/?id=572326472243567', 
'https://www.facebook.com/ads/library/?id=465563019927625', 
'https://www.facebook.com/ads/library/?id=995105445788014', 
'https://www.facebook.com/ads/library/?id=1659627771259708', 
'https://www.facebook.com/ads/library/?id=610776094747842', 
'https://www.facebook.com/ads/library/?id=3788076064775851', 
'https://www.facebook.com/ads/library/?id=2994641877355624', 
'https://www.facebook.com/ads/library/?id=1108249820603953', 
'https://www.facebook.com/ads/library/?id=1272190527335314', 
'https://www.facebook.com/ads/library/?id=1640694030173212', 
'https://www.facebook.com/ads/library/?id=584584137862742', 
'https://www.facebook.com/ads/library/?id=560489120120723', 
'https://www.facebook.com/ads/library/?id=979145357501457', 
'https://www.facebook.com/ads/library/?id=1972967853187617', 
'https://www.facebook.com/ads/library/?id=9040684986025759', 
'https://www.facebook.com/ads/library/?id=1592083511682700', 
'https://www.facebook.com/ads/library/?id=512765177777056', 
'https://www.facebook.com/ads/library/?id=459384693647441', 
'https://www.facebook.com/ads/library/?id=1759845538171656', 
'https://www.facebook.com/ads/library/?id=1135175454849617', 
'https://www.facebook.com/ads/library/?id=884860846830877', 
'https://www.facebook.com/ads/library/?id=443365018849569', 
'https://www.facebook.com/ads/library/?id=962403982428004', 
'https://www.facebook.com/ads/library/?id=593268963249376', 
'https://www.facebook.com/ads/library/?id=1523556078338736', 
'https://www.facebook.com/ads/library/?id=1714800079077756', 
'https://www.facebook.com/ads/library/?id=1142916667191051', 
'https://www.facebook.com/ads/library/?id=3358729267591179', 
'https://www.facebook.com/ads/library/?id=891856559425685', 
'https://www.facebook.com/ads/library/?id=1129975711837256', 
'https://www.facebook.com/ads/library/?id=981064800541316', 
'https://www.facebook.com/ads/library/?id=609649881628388', 
'https://www.facebook.com/ads/library/?id=1301888820826131', 
'https://www.facebook.com/ads/library/?id=930481992000066', 
'https://www.facebook.com/ads/library/?id=1102071151703092', 
'https://www.facebook.com/ads/library/?id=446301441863653', 
'https://www.facebook.com/ads/library/?id=936264628445820', 
'https://www.facebook.com/ads/library/?id=880160404272046', 
'https://www.facebook.com/ads/library/?id=892247023023582', 
'https://www.facebook.com/ads/library/?id=1102980530877241', 
'https://www.facebook.com/ads/library/?id=1721675001725700', 
'https://www.facebook.com/ads/library/?id=985035333658589', 
'https://www.facebook.com/ads/library/?id=1045693260578743', 
'https://www.facebook.com/ads/library/?id=1097405812126311', 
'https://www.facebook.com/ads/library/?id=542220178692154', 
'https://www.facebook.com/ads/library/?id=1241726537154744', 
'https://www.facebook.com/ads/library/?id=1644243492821956', 
'https://www.facebook.com/ads/library/?id=1489432435093408', 
'https://www.facebook.com/ads/library/?id=8297229373658579', 
'https://www.facebook.com/ads/library/?id=890703619620580', 
'https://www.facebook.com/ads/library/?id=1598585411035887', 
'https://www.facebook.com/ads/library/?id=864222792360609', 
'https://www.facebook.com/ads/library/?id=1219526582611851', 
'https://www.facebook.com/ads/library/?id=1051696863002331', 
'https://www.facebook.com/ads/library/?id=942277387940764', 
'https://www.facebook.com/ads/library/?id=840183141588446', 
'https://www.facebook.com/ads/library/?id=1065334835167753', 
'https://www.facebook.com/ads/library/?id=1093702802399145', 
'https://www.facebook.com/ads/library/?id=1504898870909071', 
'https://www.facebook.com/ads/library/?id=535647748802591', 
'https://www.facebook.com/ads/library/?id=1026580325838824', 
'https://www.facebook.com/ads/library/?id=440906085241390', 
'https://www.facebook.com/ads/library/?id=360014223195152', 
'https://www.facebook.com/ads/library/?id=958028892726490', 
'https://www.facebook.com/ads/library/?id=969325684225148', 
'https://www.facebook.com/ads/library/?id=1087245262365684', 
'https://www.facebook.com/ads/library/?id=385270684434247', 
'https://www.facebook.com/ads/library/?id=680782247171156', 
'https://www.facebook.com/ads/library/?id=1418785731980115', 
'https://www.facebook.com/ads/library/?id=1407642606387104', 
'https://www.facebook.com/ads/library/?id=759823407921045', 
'https://www.facebook.com/ads/library/?id=2242914116109753', 
'https://www.facebook.com/ads/library/?id=427660486980633', 
'https://www.facebook.com/ads/library/?id=602958785481524', 
'https://www.facebook.com/ads/library/?id=936594418081735', 
'https://www.facebook.com/ads/library/?id=595596263075523', 
'https://www.facebook.com/ads/library/?id=3837084709863642', 
'https://www.facebook.com/ads/library/?id=1828507861299406', 
'https://www.facebook.com/ads/library/?id=2040575779698485', 
'https://www.facebook.com/ads/library/?id=1812651759566666', 
'https://www.facebook.com/ads/library/?id=1133118814863172', 
'https://www.facebook.com/ads/library/?id=933923432176870', 
'https://www.facebook.com/ads/library/?id=3013372765480141', 
'https://www.facebook.com/ads/library/?id=1640694030173212', 
'https://www.facebook.com/ads/library/?id=584584137862742', 
'https://www.facebook.com/ads/library/?id=1373893590688279', 
'https://www.facebook.com/ads/library/?id=1592083511682700', 
'https://www.facebook.com/ads/library/?id=1523556078338736', 
'https://www.facebook.com/ads/library/?id=8902131676566853', 
'https://www.facebook.com/ads/library/?id=4032318640380088', 
'https://www.facebook.com/ads/library/?id=930481992000066', 
'https://www.facebook.com/ads/library/?id=1893299641198880', 
'https://www.facebook.com/ads/library/?id=892247023023582', 
'https://www.facebook.com/ads/library/?id=1623101064971116', 
'https://www.facebook.com/ads/library/?id=1489432435093408', 
'https://www.facebook.com/ads/library/?id=565353922518696', 
'https://www.facebook.com/ads/library/?id=1093702802399145', 
'https://www.facebook.com/ads/library/?id=527295456877509', 
'https://www.facebook.com/ads/library/?id=2895715103928763', 
'https://www.facebook.com/ads/library/?id=1081528799999437', 
'https://www.facebook.com/ads/library/?id=885031012842795', 
'https://www.facebook.com/ads/library/?id=832104881792718', 
'https://www.facebook.com/ads/library/?id=3788076064775851', 
'https://www.facebook.com/ads/library/?id=512765177777056', 
'https://www.facebook.com/ads/library/?id=3358729267591179', 
'https://www.facebook.com/ads/library/?id=1515050619117515', 
'https://www.facebook.com/ads/library/?id=884860846830877', 
'https://www.facebook.com/ads/library/?id=891856559425685', 
'https://www.facebook.com/ads/library/?id=1574209970134687', 
'https://www.facebook.com/ads/library/?id=886173830202106', 
'https://www.facebook.com/ads/library/?id=3941654612772462', 
'https://www.facebook.com/ads/library/?id=514762114696195', 
'https://www.facebook.com/ads/library/?id=525580696776035', 
'https://www.facebook.com/ads/library/?id=378843268626270', 
'https://www.facebook.com/ads/library/?id=8297229373658579', 
'https://www.facebook.com/ads/library/?id=3451402155175591',
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
