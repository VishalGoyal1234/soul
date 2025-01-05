const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=613766034368709',
'https://www.facebook.com/ads/library/?id=1347386123088397',
'https://www.facebook.com/ads/library/?id=564111629796372',
'https://www.facebook.com/ads/library/?id=1296281201521460',
'https://www.facebook.com/ads/library/?id=620863290281296',
'https://www.facebook.com/ads/library/?id=1263203088296911',
'https://www.facebook.com/ads/library/?id=518852991167822',
'https://www.facebook.com/ads/library/?id=610733831430746',
'https://www.facebook.com/ads/library/?id=1116735766560287',
'https://www.facebook.com/ads/library/?id=542545998781496',
'https://www.facebook.com/ads/library/?id=1144839553680253',
'https://www.facebook.com/ads/library/?id=961159592565503',
'https://www.facebook.com/ads/library/?id=1287658515693284',
'https://www.facebook.com/ads/library/?id=3556781131297363',
'https://www.facebook.com/ads/library/?id=596097429837177',
'https://www.facebook.com/ads/library/?id=1133628178152928',
'https://www.facebook.com/ads/library/?id=9373819872669679',
'https://www.facebook.com/ads/library/?id=2045568269198340',
'https://www.facebook.com/ads/library/?id=621777273621398',
'https://www.facebook.com/ads/library/?id=811113851144919',
'https://www.facebook.com/ads/library/?id=579087348359757',
'https://www.facebook.com/ads/library/?id=459532570343977',
'https://www.facebook.com/ads/library/?id=1530452804280442',
'https://www.facebook.com/ads/library/?id=637738725595303',
'https://www.facebook.com/ads/library/?id=977142054286298',
'https://www.facebook.com/ads/library/?id=2514270928778925',
'https://www.facebook.com/ads/library/?id=1331847241499414',
'https://www.facebook.com/ads/library/?id=1110490970390222',
'https://www.facebook.com/ads/library/?id=1141465884281354',
'https://www.facebook.com/ads/library/?id=511521024615550',
'https://www.facebook.com/ads/library/?id=610776094747842',
'https://www.facebook.com/ads/library/?id=808107911439815',
'https://www.facebook.com/ads/library/?id=945553054170876',
'https://www.facebook.com/ads/library/?id=1132282141957476',
'https://www.facebook.com/ads/library/?id=944719827603519',
'https://www.facebook.com/ads/library/?id=448973678269168',
'https://www.facebook.com/ads/library/?id=951341450289244',
'https://www.facebook.com/ads/library/?id=1319734952363695',
'https://www.facebook.com/ads/library/?id=1641249863270431',
'https://www.facebook.com/ads/library/?id=996600382506991',
'https://www.facebook.com/ads/library/?id=575288038754598',
'https://www.facebook.com/ads/library/?id=594992683118320',
'https://www.facebook.com/ads/library/?id=1110783867189786',
'https://www.facebook.com/ads/library/?id=854611406598702',
'https://www.facebook.com/ads/library/?id=572655075374598',
'https://www.facebook.com/ads/library/?id=2263728987330366',
'https://www.facebook.com/ads/library/?id=1516708965696156',
'https://www.facebook.com/ads/library/?id=2919507091545679',
'https://www.facebook.com/ads/library/?id=597718336087673',
'https://www.facebook.com/ads/library/?id=615195507601776',
'https://www.facebook.com/ads/library/?id=883919783919663',
'https://www.facebook.com/ads/library/?id=8998183333537467',
'https://www.facebook.com/ads/library/?id=1259968018588074',
'https://www.facebook.com/ads/library/?id=1644243492821956',
'https://www.facebook.com/ads/library/?id=1219379152484946',
'https://www.facebook.com/ads/library/?id=3997346953829080',
'https://www.facebook.com/ads/library/?id=572314841916095',
'https://www.facebook.com/ads/library/?id=1677052172872086',
'https://www.facebook.com/ads/library/?id=1698860380963635',
'https://www.facebook.com/ads/library/?id=894969082599065',
'https://www.facebook.com/ads/library/?id=538690398879299',
'https://www.facebook.com/ads/library/?id=8378316575621875',
'https://www.facebook.com/ads/library/?id=8297229373658579',
'https://www.facebook.com/ads/library/?id=1649769298930871',
'https://www.facebook.com/ads/library/?id=1064318998642105',
'https://www.facebook.com/ads/library/?id=1180970629787535',
'https://www.facebook.com/ads/library/?id=886309816164908',
'https://www.facebook.com/ads/library/?id=7872030639573515',
'https://www.facebook.com/ads/library/?id=942277387940764',
'https://www.facebook.com/ads/library/?id=26356752767306432',
'https://www.facebook.com/ads/library/?id=395740779916350',
'https://www.facebook.com/ads/library/?id=1863628144045644',
'https://www.facebook.com/ads/library/?id=617699497074626',
'https://www.facebook.com/ads/library/?id=1158767938498461',
'https://www.facebook.com/ads/library/?id=441063945211168',
'https://www.facebook.com/ads/library/?id=3814409882136460',
'https://www.facebook.com/ads/library/?id=1651207498965636',
'https://www.facebook.com/ads/library/?id=398263063073418',
'https://www.facebook.com/ads/library/?id=399187193013879',
'https://www.facebook.com/ads/library/?id=1024450508827744',
'https://www.facebook.com/ads/library/?id=7531193776912276',
'https://www.facebook.com/ads/library/?id=1035494157604613',
'https://www.facebook.com/ads/library/?id=992877841994566',
'https://www.facebook.com/ads/library/?id=622176426086411',
'https://www.facebook.com/ads/library/?id=689189735082324',
'https://www.facebook.com/ads/library/?id=449564674892276',
'https://www.facebook.com/ads/library/?id=1116735766560287',
'https://www.facebook.com/ads/library/?id=518852991167822',
'https://www.facebook.com/ads/library/?id=1144839553680253',
'https://www.facebook.com/ads/library/?id=619472844098599',
'https://www.facebook.com/ads/library/?id=626496426487020',
'https://www.facebook.com/ads/library/?id=1133628178152928',
'https://www.facebook.com/ads/library/?id=1530452804280442',
'https://www.facebook.com/ads/library/?id=8516005521861286',
'https://www.facebook.com/ads/library/?id=1331847241499414',
'https://www.facebook.com/ads/library/?id=448973678269168',
'https://www.facebook.com/ads/library/?id=951341450289244',
'https://www.facebook.com/ads/library/?id=27922696964043674',
'https://www.facebook.com/ads/library/?id=9778484242167410',
'https://www.facebook.com/ads/library/?id=3940766122826817',
'https://www.facebook.com/ads/library/?id=543922852135545',
'https://www.facebook.com/ads/library/?id=468232959269443',
'https://www.facebook.com/ads/library/?id=1778659219562600',
'https://www.facebook.com/ads/library/?id=571834828570629',
'https://www.facebook.com/ads/library/?id=8837011059683720',
'https://www.facebook.com/ads/library/?id=1684236415701542',
'https://www.facebook.com/ads/library/?id=1758695061624804',
'https://www.facebook.com/ads/library/?id=942277387940764',
'https://www.facebook.com/ads/library/?id=2568938853312665',
'https://www.facebook.com/ads/library/?id=828056225466982',
'https://www.facebook.com/ads/library/?id=689189735082324',
'https://www.facebook.com/ads/library/?id=2387922004883495',
'https://www.facebook.com/ads/library/?id=615195507601776',
'https://www.facebook.com/ads/library/?id=8522099597912298',
'https://www.facebook.com/ads/library/?id=1996829037424879',
'https://www.facebook.com/ads/library/?id=1106558237127400',
'https://www.facebook.com/ads/library/?id=886309816164908',
'https://www.facebook.com/ads/library/?id=26356752767306432',
'https://www.facebook.com/ads/library/?id=399187193013879',
'https://www.facebook.com/ads/library/?id=381266157644953',
'https://www.facebook.com/ads/library/?id=992877841994566',
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
