const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=938570491494594', 
'https://www.facebook.com/ads/library/?id=1073814837550323', 
'https://www.facebook.com/ads/library/?id=1990141771460285', 
'https://www.facebook.com/ads/library/?id=1089025985941486', 
'https://www.facebook.com/ads/library/?id=543778868548655', 
'https://www.facebook.com/ads/library/?id=906094124474377', 
'https://www.facebook.com/ads/library/?id=1375162383448531', 
'https://www.facebook.com/ads/library/?id=1186453193042564', 
'https://www.facebook.com/ads/library/?id=551144897519972', 
'https://www.facebook.com/ads/library/?id=1495455327749714', 
'https://www.facebook.com/ads/library/?id=583361950926324', 
'https://www.facebook.com/ads/library/?id=1503148847036163', 
'https://www.facebook.com/ads/library/?id=1218980812719712', 
'https://www.facebook.com/ads/library/?id=545898454969492', 
'https://www.facebook.com/ads/library/?id=546489424781830', 
'https://www.facebook.com/ads/library/?id=9578751302141335', 
'https://www.facebook.com/ads/library/?id=478158728465763', 
'https://www.facebook.com/ads/library/?id=533445419439987', 
'https://www.facebook.com/ads/library/?id=1243576136890753', 
'https://www.facebook.com/ads/library/?id=1066487285023567', 
'https://www.facebook.com/ads/library/?id=3954080628160147', 
'https://www.facebook.com/ads/library/?id=1940048376422023', 
'https://www.facebook.com/ads/library/?id=582981314399654', 
'https://www.facebook.com/ads/library/?id=967607761841504', 
'https://www.facebook.com/ads/library/?id=868377828740936', 
'https://www.facebook.com/ads/library/?id=518528597746331', 
'https://www.facebook.com/ads/library/?id=526281173652843', 
'https://www.facebook.com/ads/library/?id=1211162766838654', 
'https://www.facebook.com/ads/library/?id=541048045290860', 
'https://www.facebook.com/ads/library/?id=564410866143680', 
'https://www.facebook.com/ads/library/?id=1982466732260201', 
'https://www.facebook.com/ads/library/?id=1736753067143919', 
'https://www.facebook.com/ads/library/?id=577233358183347', 
'https://www.facebook.com/ads/library/?id=394050213789901', 
'https://www.facebook.com/ads/library/?id=493085557081071', 
'https://www.facebook.com/ads/library/?id=1361322551505132', 
'https://www.facebook.com/ads/library/?id=1844143253059201', 
'https://www.facebook.com/ads/library/?id=584973200884959', 
'https://www.facebook.com/ads/library/?id=1161100885439985', 
'https://www.facebook.com/ads/library/?id=1504369723584571', 
'https://www.facebook.com/ads/library/?id=576875321696114', 
'https://www.facebook.com/ads/library/?id=527104690321005', 
'https://www.facebook.com/ads/library/?id=28665108563088036', 
'https://www.facebook.com/ads/library/?id=555087073931415', 
'https://www.facebook.com/ads/library/?id=1848274619327093', 
'https://www.facebook.com/ads/library/?id=552748687518155', 
'https://www.facebook.com/ads/library/?id=1113826940192508', 
'https://www.facebook.com/ads/library/?id=914779754080453', 
'https://www.facebook.com/ads/library/?id=3486338355004184', 
'https://www.facebook.com/ads/library/?id=1520962088484216', 
'https://www.facebook.com/ads/library/?id=897818372082066', 
'https://www.facebook.com/ads/library/?id=1059140319291712', 
'https://www.facebook.com/ads/library/?id=1626443707939783', 
'https://www.facebook.com/ads/library/?id=930641095156436', 
'https://www.facebook.com/ads/library/?id=2782786245237445', 
'https://www.facebook.com/ads/library/?id=939088581420491', 
'https://www.facebook.com/ads/library/?id=3951310538531154', 
'https://www.facebook.com/ads/library/?id=8870396646316827', 
'https://www.facebook.com/ads/library/?id=1077578443869590', 
'https://www.facebook.com/ads/library/?id=880946100914552', 
'https://www.facebook.com/ads/library/?id=1329616518022249', 
'https://www.facebook.com/ads/library/?id=923752805993553', 
'https://www.facebook.com/ads/library/?id=1496351487744839', 
'https://www.facebook.com/ads/library/?id=1889557631569859', 
'https://www.facebook.com/ads/library/?id=1278977069895803', 
'https://www.facebook.com/ads/library/?id=1608192890085465', 
'https://www.facebook.com/ads/library/?id=921974873255501', 
'https://www.facebook.com/ads/library/?id=1121644702916166', 
'https://www.facebook.com/ads/library/?id=561436846594119', 
'https://www.facebook.com/ads/library/?id=477441411504302', 
'https://www.facebook.com/ads/library/?id=1736127377184075', 
'https://www.facebook.com/ads/library/?id=1094303815739810', 
'https://www.facebook.com/ads/library/?id=1719300832205625', 
'https://www.facebook.com/ads/library/?id=877860657797173', 
'https://www.facebook.com/ads/library/?id=1237784780659551', 
'https://www.facebook.com/ads/library/?id=527929393474317', 
'https://www.facebook.com/ads/library/?id=1244533086679404', 
'https://www.facebook.com/ads/library/?id=1682519892284835', 
'https://www.facebook.com/ads/library/?id=2177368972663622', 
'https://www.facebook.com/ads/library/?id=7348834065226380', 
'https://www.facebook.com/ads/library/?id=341135329028809', 
'https://www.facebook.com/ads/library/?id=461723636228908', 
'https://www.facebook.com/ads/library/?id=638635798449089', 
'https://www.facebook.com/ads/library/?id=1818825008527974', 
'https://www.facebook.com/ads/library/?id=7672939942725163', 
'https://www.facebook.com/ads/library/?id=1694804577677661', 
'https://www.facebook.com/ads/library/?id=796532595491442', 
'https://www.facebook.com/ads/library/?id=956802249098983', 
'https://www.facebook.com/ads/library/?id=194743372133057', 
'https://www.facebook.com/ads/library/?id=1078686917386639', 
'https://www.facebook.com/ads/library/?id=449423494566167', 
'https://www.facebook.com/ads/library/?id=3486338355004184', 
'https://www.facebook.com/ads/library/?id=1072143744705941', 
'https://www.facebook.com/ads/library/?id=8678903792157530', 
'https://www.facebook.com/ads/library/?id=552472210830321', 
'https://www.facebook.com/ads/library/?id=491680133904697', 
'https://www.facebook.com/ads/library/?id=1131322015046202', 
'https://www.facebook.com/ads/library/?id=2308031779561256', 
'https://www.facebook.com/ads/library/?id=9149349848450306', 
'https://www.facebook.com/ads/library/?id=1281885123264064', 
'https://www.facebook.com/ads/library/?id=1553625161973130', 
'https://www.facebook.com/ads/library/?id=1249461679515757', 
'https://www.facebook.com/ads/library/?id=553276290842785', 
'https://www.facebook.com/ads/library/?id=597078882744445', 
'https://www.facebook.com/ads/library/?id=1074306161096753', 
'https://www.facebook.com/ads/library/?id=1077375880272098', 
'https://www.facebook.com/ads/library/?id=3897880257150876', 
'https://www.facebook.com/ads/library/?id=2015339945573194', 
'https://www.facebook.com/ads/library/?id=2317064298628754', 
'https://www.facebook.com/ads/library/?id=876432591272772', 
'https://www.facebook.com/ads/library/?id=1990141771460285', 
'https://www.facebook.com/ads/library/?id=591387890231194', 
'https://www.facebook.com/ads/library/?id=1073322470666379', 
'https://www.facebook.com/ads/library/?id=1259352311774128', 
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
