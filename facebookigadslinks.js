const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1134372350999394',
'https://www.facebook.com/ads/library/?id=380771154619716',
'https://www.facebook.com/ads/library/?id=516782664129136',
'https://www.facebook.com/ads/library/?id=7881342898627402',
'https://www.facebook.com/ads/library/?id=437967485306792',
'https://www.facebook.com/ads/library/?id=810943677131385',
'https://www.facebook.com/ads/library/?id=1100095917880756',
'https://www.facebook.com/ads/library/?id=382190657477525',
'https://www.facebook.com/ads/library/?id=283224641451265',
'https://www.facebook.com/ads/library/?id=1538766843725393',
'https://www.facebook.com/ads/library/?id=377738701763433',
'https://www.facebook.com/ads/library/?id=1563111321089726',
'https://www.facebook.com/ads/library/?id=412716654456524',
'https://www.facebook.com/ads/library/?id=1130061525085000',
'https://www.facebook.com/ads/library/?id=784205827055515',
'https://www.facebook.com/ads/library/?id=7660249887360016',
'https://www.facebook.com/ads/library/?id=3616136151968298',
'https://www.facebook.com/ads/library/?id=6735342423188186',
'https://www.facebook.com/ads/library/?id=288897054137701',
'https://www.facebook.com/ads/library/?id=2815867511897888',
'https://www.facebook.com/ads/library/?id=2642747449232860',
'https://www.facebook.com/ads/library/?id=1047685436276035',
'https://www.facebook.com/ads/library/?id=273850942125449',
'https://www.facebook.com/ads/library/?id=232461782850068',
'https://www.facebook.com/ads/library/?id=796573551959692',
'https://www.facebook.com/ads/library/?id=196001099794921',
'https://www.facebook.com/ads/library/?id=1429205404564663',
'https://www.facebook.com/ads/library/?id=461082192708844',
'https://www.facebook.com/ads/library/?id=277223954648444',
'https://www.facebook.com/ads/library/?id=565211332981311',
'https://www.facebook.com/ads/library/?id=939404977745514',
'https://www.facebook.com/ads/library/?id=597441863239576',
'https://www.facebook.com/ads/library/?id=1098485708415411',
'https://www.facebook.com/ads/library/?id=1823629571797142',
'https://www.facebook.com/ads/library/?id=597441863239576',
'https://www.facebook.com/ads/library/?id=793667336246069',
'https://www.facebook.com/ads/library/?id=1244063090147211',
'https://www.facebook.com/ads/library/?id=1257922852107494',
'https://www.facebook.com/ads/library/?id=923311746611910',
'https://www.facebook.com/ads/library/?id=870428045003957',
'https://www.facebook.com/ads/library/?id=1668363897081561',
'https://www.facebook.com/ads/library/?id=9082045045149786',
'https://www.facebook.com/ads/library/?id=588065457489998',
'https://www.facebook.com/ads/library/?id=1646437542577410',
'https://www.facebook.com/ads/library/?id=2664086337133645',
'https://www.facebook.com/ads/library/?id=4026622197565893',
'https://www.facebook.com/ads/library/?id=1264238658028377',
'https://www.facebook.com/ads/library/?id=568031495856026',
'https://www.facebook.com/ads/library/?id=573470582244550',
'https://www.facebook.com/ads/library/?id=613068457818823',
'https://www.facebook.com/ads/library/?id=614360234423831',
'https://www.facebook.com/ads/library/?id=620671750316770',
'https://www.facebook.com/ads/library/?id=576704591655977',
'https://www.facebook.com/ads/library/?id=1285089312613009',
'https://www.facebook.com/ads/library/?id=1157272888711441',
'https://www.facebook.com/ads/library/?id=452379874635508',
'https://www.facebook.com/ads/library/?id=3927128830946922',
'https://www.facebook.com/ads/library/?id=1123309092763209',
'https://www.facebook.com/ads/library/?id=529108563488544',
'https://www.facebook.com/ads/library/?id=603736182139716',
'https://www.facebook.com/ads/library/?id=1338996934149398',
'https://www.facebook.com/ads/library/?id=1350831072741839',
'https://www.facebook.com/ads/library/?id=611030188114680',
'https://www.facebook.com/ads/library/?id=1267630241123158',
'https://www.facebook.com/ads/library/?id=1098485708415411',
'https://www.facebook.com/ads/library/?id=1651500309094044',
'https://www.facebook.com/ads/library/?id=2832333800274843',
'https://www.facebook.com/ads/library/?id=1079685660595889',
'https://www.facebook.com/ads/library/?id=1674127073517614',
'https://www.facebook.com/ads/library/?id=3476601675810153',
'https://www.facebook.com/ads/library/?id=1267754367678780',
'https://www.facebook.com/ads/library/?id=1571335160926788',
'https://www.facebook.com/ads/library/?id=588863890400339',
'https://www.facebook.com/ads/library/?id=632870965752488',
'https://www.facebook.com/ads/library/?id=1620130705556651',
'https://www.facebook.com/ads/library/?id=490587310720898',
'https://www.facebook.com/ads/library/?id=1088430606112598',
'https://www.facebook.com/ads/library/?id=1662423934309287',
'https://www.facebook.com/ads/library/?id=1530603997651013',
'https://www.facebook.com/ads/library/?id=591498470490988',
'https://www.facebook.com/ads/library/?id=1765015040948408',
'https://www.facebook.com/ads/library/?id=2099115613863916',
'https://www.facebook.com/ads/library/?id=1241719933580667',
'https://www.facebook.com/ads/library/?id=558024600535580',
'https://www.facebook.com/ads/library/?id=614715087565844',
'https://www.facebook.com/ads/library/?id=573732635371229',
'https://www.facebook.com/ads/library/?id=464320443122961',
'https://www.facebook.com/ads/library/?id=9206790312704872',
'https://www.facebook.com/ads/library/?id=527258703683331',
'https://www.facebook.com/ads/library/?id=529027193621370',
'https://www.facebook.com/ads/library/?id=9109568732437649',
'https://www.facebook.com/ads/library/?id=8851215128305411',
'https://www.facebook.com/ads/library/?id=1995951714217194',
'https://www.facebook.com/ads/library/?id=1921576814997873',
'https://www.facebook.com/ads/library/?id=1584354272267644',
'https://www.facebook.com/ads/library/?id=1970820816772804',
'https://www.facebook.com/ads/library/?id=981634553848353',
'https://www.facebook.com/ads/library/?id=1157442182616292',
'https://www.facebook.com/ads/library/?id=551611804693411',
'https://www.facebook.com/ads/library/?id=547332724955330',
'https://www.facebook.com/ads/library/?id=597660445977711',
'https://www.facebook.com/ads/library/?id=1182687730247510',
'https://www.facebook.com/ads/library/?id=2398085793874604',
'https://www.facebook.com/ads/library/?id=466881812816217',
'https://www.facebook.com/ads/library/?id=958246779686088',
'https://www.facebook.com/ads/library/?id=1221442512279828',
'https://www.facebook.com/ads/library/?id=8926086400761463',
'https://www.facebook.com/ads/library/?id=1527625861271401',
'https://www.facebook.com/ads/library/?id=1975078756328670',
'https://www.facebook.com/ads/library/?id=2908206782690616',
'https://www.facebook.com/ads/library/?id=953502680033652',
'https://www.facebook.com/ads/library/?id=1240025920443996',
'https://www.facebook.com/ads/library/?id=531899749847976',
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
