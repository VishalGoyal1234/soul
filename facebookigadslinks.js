const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=569659679037284', 
'https://www.facebook.com/ads/library/?id=1318768062734278', 
'https://www.facebook.com/ads/library/?id=906111561629352', 
'https://www.facebook.com/ads/library/?id=772518161743381', 
'https://www.facebook.com/ads/library/?id=1701435600414675', 
'https://www.facebook.com/ads/library/?id=2896128867215838', 
'https://www.facebook.com/ads/library/?id=563382496490041', 
'https://www.facebook.com/ads/library/?id=1136887694542008', 
'https://www.facebook.com/ads/library/?id=1789370958567721', 
'https://www.facebook.com/ads/library/?id=886200947015663', 
'https://www.facebook.com/ads/library/?id=2366798073669001', 
'https://www.facebook.com/ads/library/?id=484089991363207', 
'https://www.facebook.com/ads/library/?id=879979787335988', 
'https://www.facebook.com/ads/library/?id=2090844534718843', 
'https://www.facebook.com/ads/library/?id=925180583050518', 
'https://www.facebook.com/ads/library/?id=1340656046920204', 
'https://www.facebook.com/ads/library/?id=1105864804883718', 
'https://www.facebook.com/ads/library/?id=1258632395427957', 
'https://www.facebook.com/ads/library/?id=1123856966004219', 
'https://www.facebook.com/ads/library/?id=9179063242151437', 
'https://www.facebook.com/ads/library/?id=935929041814244', 
'https://www.facebook.com/ads/library/?id=1725291978012902', 
'https://www.facebook.com/ads/library/?id=8803042876430289', 
'https://www.facebook.com/ads/library/?id=946130194133618', 
'https://www.facebook.com/ads/library/?id=620414043742815', 
'https://www.facebook.com/ads/library/?id=1106560364464700', 
'https://www.facebook.com/ads/library/?id=878138021136172', 
'https://www.facebook.com/ads/library/?id=982009083960437', 
'https://www.facebook.com/ads/library/?id=1246535789930250', 
'https://www.facebook.com/ads/library/?id=592479443316863', 
'https://www.facebook.com/ads/library/?id=1506778963373564', 
'https://www.facebook.com/ads/library/?id=1193817738778678', 
'https://www.facebook.com/ads/library/?id=580751701312122', 
'https://www.facebook.com/ads/library/?id=551009460876327', 
'https://www.facebook.com/ads/library/?id=1080360023533961', 
'https://www.facebook.com/ads/library/?id=447266354673245', 
'https://www.facebook.com/ads/library/?id=1207699347195420', 
'https://www.facebook.com/ads/library/?id=1106662721468152', 
'https://www.facebook.com/ads/library/?id=1936352600164267', 
'https://www.facebook.com/ads/library/?id=1237008004171358', 
'https://www.facebook.com/ads/library/?id=3874395716140802', 
'https://www.facebook.com/ads/library/?id=2807913879387015', 
'https://www.facebook.com/ads/library/?id=2303830643290435', 
'https://www.facebook.com/ads/library/?id=1070416277828018', 
'https://www.facebook.com/ads/library/?id=1152649285846051', 
'https://www.facebook.com/ads/library/?id=1081008179892671', 
'https://www.facebook.com/ads/library/?id=3565791557065496', 
'https://www.facebook.com/ads/library/?id=709618477785259', 
'https://www.facebook.com/ads/library/?id=426877783037936', 
'https://www.facebook.com/ads/library/?id=878040264055843', 
'https://www.facebook.com/ads/library/?id=1398841181026609', 
'https://www.facebook.com/ads/library/?id=3197121330583026', 
'https://www.facebook.com/ads/library/?id=949069809575446', 
'https://www.facebook.com/ads/library/?id=1845062408993641', 
'https://www.facebook.com/ads/library/?id=772518161743381', 
'https://www.facebook.com/ads/library/?id=1258632395427957', 
'https://www.facebook.com/ads/library/?id=592479443316863', 
'https://www.facebook.com/ads/library/?id=568499366112816', 
'https://www.facebook.com/ads/library/?id=1564312037786741', 
'https://www.facebook.com/ads/library/?id=421147004297580', 
'https://www.facebook.com/ads/library/?id=523567387393037', 
'https://www.facebook.com/ads/library/?id=1094324778677322', 
'https://www.facebook.com/ads/library/?id=1940716846418088', 
'https://www.facebook.com/ads/library/?id=947314353980875', 
'https://www.facebook.com/ads/library/?id=1725291978012902', 
'https://www.facebook.com/ads/library/?id=563382496490041', 
'https://www.facebook.com/ads/library/?id=2121694391620391', 
'https://www.facebook.com/ads/library/?id=925180583050518', 
'https://www.facebook.com/ads/library/?id=2040495763069714', 
'https://www.facebook.com/ads/library/?id=558921573770794', 
'https://www.facebook.com/ads/library/?id=1090681426180934', 
'https://www.facebook.com/ads/library/?id=1846981022744130', 
'https://www.facebook.com/ads/library/?id=534620435948849', 
'https://www.facebook.com/ads/library/?id=531548543175924', 
'https://www.facebook.com/ads/library/?id=391104343971057', 
'https://www.facebook.com/ads/library/?id=937393714391478', 
'https://www.facebook.com/ads/library/?id=1239028010643522', 
'https://www.facebook.com/ads/library/?id=1088210582455398', 
'https://www.facebook.com/ads/library/?id=597500729612014', 
'https://www.facebook.com/ads/library/?id=2028159557683043', 
'https://www.facebook.com/ads/library/?id=943520374492510', 
'https://www.facebook.com/ads/library/?id=1041672377083894', 
'https://www.facebook.com/ads/library/?id=777006351069709', 
'https://www.facebook.com/ads/library/?id=785103283701885', 
'https://www.facebook.com/ads/library/?id=1513401859571333', 
'https://www.facebook.com/ads/library/?id=318555131201296', 
'https://www.facebook.com/ads/library/?id=1097486144951689', 
'https://www.facebook.com/ads/library/?id=1940716846418088', 
'https://www.facebook.com/ads/library/?id=935929041814244', 
'https://www.facebook.com/ads/library/?id=1725291978012902', 
'https://www.facebook.com/ads/library/?id=937393714391478',
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
