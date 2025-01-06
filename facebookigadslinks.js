const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=565876202926300',
'https://www.facebook.com/ads/library/?id=525784200478862',
'https://www.facebook.com/ads/library/?id=2058566104658603',
'https://www.facebook.com/ads/library/?id=1169539411843247',
'https://www.facebook.com/ads/library/?id=534420822927879',
'https://www.facebook.com/ads/library/?id=1339132733777008',
'https://www.facebook.com/ads/library/?id=968659238661099',
'https://www.facebook.com/ads/library/?id=585030494143476',
'https://www.facebook.com/ads/library/?id=1112965376720090',
'https://www.facebook.com/ads/library/?id=2777227242458234',
'https://www.facebook.com/ads/library/?id=950715380344671',
'https://www.facebook.com/ads/library/?id=2706649756173674',
'https://www.facebook.com/ads/library/?id=3977569265808958',
'https://www.facebook.com/ads/library/?id=945452984314713',
'https://www.facebook.com/ads/library/?id=1668723403682579',
'https://www.facebook.com/ads/library/?id=1276416966812078',
'https://www.facebook.com/ads/library/?id=1295205491817239',
'https://www.facebook.com/ads/library/?id=971502668180228',
'https://www.facebook.com/ads/library/?id=3422589491205875',
'https://www.facebook.com/ads/library/?id=1830323167774364',
'https://www.facebook.com/ads/library/?id=1285936219276671',
'https://www.facebook.com/ads/library/?id=1294403428357678',
'https://www.facebook.com/ads/library/?id=565755553091425',
'https://www.facebook.com/ads/library/?id=1139676980837272',
'https://www.facebook.com/ads/library/?id=1050055083559193',
'https://www.facebook.com/ads/library/?id=9067098873336044',
'https://www.facebook.com/ads/library/?id=1297880748022873',
'https://www.facebook.com/ads/library/?id=3965722273659454',
'https://www.facebook.com/ads/library/?id=3050715075084285',
'https://www.facebook.com/ads/library/?id=1115619236429583',
'https://www.facebook.com/ads/library/?id=2583067988569994',
'https://www.facebook.com/ads/library/?id=619464547092399',
'https://www.facebook.com/ads/library/?id=957035649089980',
'https://www.facebook.com/ads/library/?id=3817104685274745',
'https://www.facebook.com/ads/library/?id=1778439576245540',
'https://www.facebook.com/ads/library/?id=1344520663303199',
'https://www.facebook.com/ads/library/?id=1249607022918349',
'https://www.facebook.com/ads/library/?id=1746254949556058',
'https://www.facebook.com/ads/library/?id=1256690078741099',
'https://www.facebook.com/ads/library/?id=2035820150174646',
'https://www.facebook.com/ads/library/?id=938747877839750',
'https://www.facebook.com/ads/library/?id=1110228247560144',
'https://www.facebook.com/ads/library/?id=1306218420398960',
'https://www.facebook.com/ads/library/?id=583230551124526',
'https://www.facebook.com/ads/library/?id=8844196432324272',
'https://www.facebook.com/ads/library/?id=2963564807128724',
'https://www.facebook.com/ads/library/?id=1982211652267513',
'https://www.facebook.com/ads/library/?id=574261378829464',
'https://www.facebook.com/ads/library/?id=469875319158564',
'https://www.facebook.com/ads/library/?id=606952185206135',
'https://www.facebook.com/ads/library/?id=585011650793412',
'https://www.facebook.com/ads/library/?id=1114742173512692',
'https://www.facebook.com/ads/library/?id=2308036142906967',
'https://www.facebook.com/ads/library/?id=503957975432494',
'https://www.facebook.com/ads/library/?id=2022824798196046',
'https://www.facebook.com/ads/library/?id=628833109475164',
'https://www.facebook.com/ads/library/?id=909848187568582',
'https://www.facebook.com/ads/library/?id=8955853634534808',
'https://www.facebook.com/ads/library/?id=1618772705702355',
'https://www.facebook.com/ads/library/?id=571973225545230',
'https://www.facebook.com/ads/library/?id=1127131029042162',
'https://www.facebook.com/ads/library/?id=570863782389515',
'https://www.facebook.com/ads/library/?id=8231898163576276',
'https://www.facebook.com/ads/library/?id=908833751442033',
'https://www.facebook.com/ads/library/?id=584190961011519',
'https://www.facebook.com/ads/library/?id=1531237187552013',
'https://www.facebook.com/ads/library/?id=612496331356205',
'https://www.facebook.com/ads/library/?id=445046391995953',
'https://www.facebook.com/ads/library/?id=1036230151852311',
'https://www.facebook.com/ads/library/?id=1756421838485874',
'https://www.facebook.com/ads/library/?id=1250200432764766',
'https://www.facebook.com/ads/library/?id=1580129106027160',
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
