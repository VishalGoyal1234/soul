const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=559505813378774',
'https://www.facebook.com/ads/library/?id=881797034118551',
'https://www.facebook.com/ads/library/?id=1121644702916166',
'https://www.facebook.com/ads/library/?id=931784435014295',
'https://www.facebook.com/ads/library/?id=1089687772870272',
'https://www.facebook.com/ads/library/?id=620245217034239',
'https://www.facebook.com/ads/library/?id=1795713551202484',
'https://www.facebook.com/ads/library/?id=1637661760196449',
'https://www.facebook.com/ads/library/?id=1105701587845247',
'https://www.facebook.com/ads/library/?id=537310385941392',
'https://www.facebook.com/ads/library/?id=530242506667508',
'https://www.facebook.com/ads/library/?id=855851706628382',
'https://www.facebook.com/ads/library/?id=1567675104137835',
'https://www.facebook.com/ads/library/?id=463643100085767',
'https://www.facebook.com/ads/library/?id=926891925547396',
'https://www.facebook.com/ads/library/?id=924914402918852',
'https://www.facebook.com/ads/library/?id=1092113269020924',
'https://www.facebook.com/ads/library/?id=1269386544086414',
'https://www.facebook.com/ads/library/?id=1298707548139914',
'https://www.facebook.com/ads/library/?id=1089142249317194',
'https://www.facebook.com/ads/library/?id=1093789438953033',
'https://www.facebook.com/ads/library/?id=1728559371264288',
'https://www.facebook.com/ads/library/?id=1093789438953033',
'https://www.facebook.com/ads/library/?id=1114137466768668',
'https://www.facebook.com/ads/library/?id=544124808506880',
'https://www.facebook.com/ads/library/?id=1301574817505013',
'https://www.facebook.com/ads/library/?id=550663051132759',
'https://www.facebook.com/ads/library/?id=591393256620340',
'https://www.facebook.com/ads/library/?id=1626593858271783',
'https://www.facebook.com/ads/library/?id=1626847621584796',
'https://www.facebook.com/ads/library/?id=1525673238153323',
'https://www.facebook.com/ads/library/?id=1119771589771794',
'https://www.facebook.com/ads/library/?id=1818762448528193',
'https://www.facebook.com/ads/library/?id=491680133904697',
'https://www.facebook.com/ads/library/?id=531576823194371',
'https://www.facebook.com/ads/library/?id=578957807853822',
'https://www.facebook.com/ads/library/?id=8255628671210422',
'https://www.facebook.com/ads/library/?id=1907893939735920',
'https://www.facebook.com/ads/library/?id=2127585047643418',
'https://www.facebook.com/ads/library/?id=2308031779561256',
'https://www.facebook.com/ads/library/?id=1074477087791945',
'https://www.facebook.com/ads/library/?id=599193782773523',
'https://www.facebook.com/ads/library/?id=969336875060509',
'https://www.facebook.com/ads/library/?id=568215332823607',
'https://www.facebook.com/ads/library/?id=878410584436158',
'https://www.facebook.com/ads/library/?id=907121694819221',
'https://www.facebook.com/ads/library/?id=1334494721295066',
'https://www.facebook.com/ads/library/?id=905605998332416',
'https://www.facebook.com/ads/library/?id=472228642011146',
'https://www.facebook.com/ads/library/?id=1275951306885387',
'https://www.facebook.com/ads/library/?id=932715482076246',
'https://www.facebook.com/ads/library/?id=1243826423504454',
'https://www.facebook.com/ads/library/?id=3897880257150876',
'https://www.facebook.com/ads/library/?id=1252314112764404',
'https://www.facebook.com/ads/library/?id=999262752004369',
'https://www.facebook.com/ads/library/?id=2064276697335838',
'https://www.facebook.com/ads/library/?id=582316247657053',
'https://www.facebook.com/ads/library/?id=2267123143655081',
'https://www.facebook.com/ads/library/?id=1088018529487868',
'https://www.facebook.com/ads/library/?id=4683403988551314',
'https://www.facebook.com/ads/library/?id=1083885930056989',
'https://www.facebook.com/ads/library/?id=1211392363264984',
'https://www.facebook.com/ads/library/?id=1788965691871678',
'https://www.facebook.com/ads/library/?id=1270430304094422',
'https://www.facebook.com/ads/library/?id=1069908988260101',
'https://www.facebook.com/ads/library/?id=1120217806110945',
'https://www.facebook.com/ads/library/?id=1357030541935700',
'https://www.facebook.com/ads/library/?id=869356668725900',
'https://www.facebook.com/ads/library/?id=539252525733185',
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
                const pageAliasMatch = scriptContent.match(/"page_alias":"([^"]+)"/);
                if (igUsernameMatch) {
                    igUsername = igUsernameMatch[1];
                } else if (pageAliasMatch) {                    
                    pageId = pageAliasMatch[1];
                } else {
                    const pageIdMatch = scriptContent.match(/"page_id":"([^"]+)"/);
                    pageId = 'https://www.facebook.com/' + pageIdMatch[1];
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
