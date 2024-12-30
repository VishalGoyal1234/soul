const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=408993131064017',
'https://www.facebook.com/ads/library/?id=565211332981311',
'https://www.facebook.com/ads/library/?id=939404977745514',
'https://www.facebook.com/ads/library/?id=606933288481880',
'https://www.facebook.com/ads/library/?id=1127868562046644',
'https://www.facebook.com/ads/library/?id=1303686650669433',
'https://www.facebook.com/ads/library/?id=1098485708415411',
'https://www.facebook.com/ads/library/?id=1823629571797142',
'https://www.facebook.com/ads/library/?id=597441863239576',
'https://www.facebook.com/ads/library/?id=930733835399232',
'https://www.facebook.com/ads/library/?id=456703344143631',
'https://www.facebook.com/ads/library/?id=793667336246069',
'https://www.facebook.com/ads/library/?id=590422510538117',
'https://www.facebook.com/ads/library/?id=1257922852107494',
'https://www.facebook.com/ads/library/?id=588065457489998',
'https://www.facebook.com/ads/library/?id=1320888705766463',
'https://www.facebook.com/ads/library/?id=942176957837259',
'https://www.facebook.com/ads/library/?id=2547109772153312',
'https://www.facebook.com/ads/library/?id=1538694263450766',
'https://www.facebook.com/ads/library/?id=1316404976382498',
'https://www.facebook.com/ads/library/?id=1816099552526900',
'https://www.facebook.com/ads/library/?id=620671750316770',
'https://www.facebook.com/ads/library/?id=1105166171113217',
'https://www.facebook.com/ads/library/?id=569114719267041',
'https://www.facebook.com/ads/library/?id=1650048352390942',
'https://www.facebook.com/ads/library/?id=1092528309184670',
'https://www.facebook.com/ads/library/?id=1241994293560347',
'https://www.facebook.com/ads/library/?id=495105419729011',
'https://www.facebook.com/ads/library/?id=1333405228096773',
'https://www.facebook.com/ads/library/?id=1655706641962476',
'https://www.facebook.com/ads/library/?id=1538725540176101',
'https://www.facebook.com/ads/library/?id=574711525342421',
'https://www.facebook.com/ads/library/?id=573732635371229',
'https://www.facebook.com/ads/library/?id=498019603298840',
'https://www.facebook.com/ads/library/?id=575410245199718',
'https://www.facebook.com/ads/library/?id=526986293710785',
'https://www.facebook.com/ads/library/?id=1231337041849069',
'https://www.facebook.com/ads/library/?id=1264238658028377',
'https://www.facebook.com/ads/library/?id=1105161027473768',
'https://www.facebook.com/ads/library/?id=2353117321709740',
'https://www.facebook.com/ads/library/?id=632808635802568',
'https://www.facebook.com/ads/library/?id=1244063090147211',
'https://www.facebook.com/ads/library/?id=1532182454124096',
'https://www.facebook.com/ads/library/?id=485479014108639',
'https://www.facebook.com/ads/library/?id=1813626752781134',
'https://www.facebook.com/ads/library/?id=1140088154399992',
'https://www.facebook.com/ads/library/?id=1668363897081561',
'https://www.facebook.com/ads/library/?id=472692515859685',
'https://www.facebook.com/ads/library/?id=598090582598998',
'https://www.facebook.com/ads/library/?id=2664086337133645',
'https://www.facebook.com/ads/library/?id=1747577166095486',
'https://www.facebook.com/ads/library/?id=1231319497945132',
'https://www.facebook.com/ads/library/?id=8894371937311143',
'https://www.facebook.com/ads/library/?id=3069269173223962',
'https://www.facebook.com/ads/library/?id=1083900080146556',
'https://www.facebook.com/ads/library/?id=902788138636803',
'https://www.facebook.com/ads/library/?id=1998222884017934',
'https://www.facebook.com/ads/library/?id=1760117137864060',
'https://www.facebook.com/ads/library/?id=1610182736304471',
'https://www.facebook.com/ads/library/?id=887114670073023',
'https://www.facebook.com/ads/library/?id=951753392948142',
'https://www.facebook.com/ads/library/?id=588324370239534',
'https://www.facebook.com/ads/library/?id=462178959921790',
'https://www.facebook.com/ads/library/?id=1145030447002180',
'https://www.facebook.com/ads/library/?id=1096374928382495',
'https://www.facebook.com/ads/library/?id=1121923369570042',
'https://www.facebook.com/ads/library/?id=2100076033744546',
'https://www.facebook.com/ads/library/?id=555711537318609',
'https://www.facebook.com/ads/library/?id=1535445803838925',
'https://www.facebook.com/ads/library/?id=551584840998836',
'https://www.facebook.com/ads/library/?id=1582270385746604',
'https://www.facebook.com/ads/library/?id=1083151546446431',
'https://www.facebook.com/ads/library/?id=1119032686611895',
'https://www.facebook.com/ads/library/?id=1170927917704784',
'https://www.facebook.com/ads/library/?id=1115040480131904',
'https://www.facebook.com/ads/library/?id=1744050699720050',
'https://www.facebook.com/ads/library/?id=978112307682067',
'https://www.facebook.com/ads/library/?id=3788085948107343',
'https://www.facebook.com/ads/library/?id=472259275464113',
'https://www.facebook.com/ads/library/?id=1658197925048089',
'https://www.facebook.com/ads/library/?id=448636434936923',
'https://www.facebook.com/ads/library/?id=905510141681136',
'https://www.facebook.com/ads/library/?id=943900547074967',
'https://www.facebook.com/ads/library/?id=2265400867163887',
'https://www.facebook.com/ads/library/?id=3886619581659343',
'https://www.facebook.com/ads/library/?id=1468278643822256',
'https://www.facebook.com/ads/library/?id=1104436831259451',
'https://www.facebook.com/ads/library/?id=2880762032076939',
'https://www.facebook.com/ads/library/?id=522397420764910',
'https://www.facebook.com/ads/library/?id=503591139341263',
'https://www.facebook.com/ads/library/?id=565986799175078',
'https://www.facebook.com/ads/library/?id=2930530110438364',
'https://www.facebook.com/ads/library/?id=1613791535839246',
'https://www.facebook.com/ads/library/?id=1074045727712863',
'https://www.facebook.com/ads/library/?id=1216663922782106',
'https://www.facebook.com/ads/library/?id=1071017144608054',
'https://www.facebook.com/ads/library/?id=2314795242221261',
'https://www.facebook.com/ads/library/?id=2076591052757205',
'https://www.facebook.com/ads/library/?id=559814509937759',
'https://www.facebook.com/ads/library/?id=2053744841726636',
'https://www.facebook.com/ads/library/?id=1527757827861366',
'https://www.facebook.com/ads/library/?id=1519782148769876',
'https://www.facebook.com/ads/library/?id=1265018311189315',
'https://www.facebook.com/ads/library/?id=1952996721842862',
'https://www.facebook.com/ads/library/?id=514854021493519',
'https://www.facebook.com/ads/library/?id=920249549919198',
'https://www.facebook.com/ads/library/?id=487005560783648',
'https://www.facebook.com/ads/library/?id=1189174618973523',
'https://www.facebook.com/ads/library/?id=1023755366425219',
'https://www.facebook.com/ads/library/?id=1201214364241723',
'https://www.facebook.com/ads/library/?id=1190254098970105',
'https://www.facebook.com/ads/library/?id=2728531540635479',
'https://www.facebook.com/ads/library/?id=1206704920368211',
'https://www.facebook.com/ads/library/?id=1231516048290655',
'https://www.facebook.com/ads/library/?id=809477124694499',
'https://www.facebook.com/ads/library/?id=480794518075355',
'https://www.facebook.com/ads/library/?id=1134372350999394',
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
