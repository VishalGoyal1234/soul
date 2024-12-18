const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=1870120973516076',
'https://www.facebook.com/ads/library/?id=1773215076866309',
'https://www.facebook.com/ads/library/?id=539449059050538',
'https://www.facebook.com/ads/library/?id=450163317929417',
'https://www.facebook.com/ads/library/?id=588957977161515',
'https://www.facebook.com/ads/library/?id=1653218568943129',
'https://www.facebook.com/ads/library/?id=1890480854809569',
'https://www.facebook.com/ads/library/?id=1123266099802228',
'https://www.facebook.com/ads/library/?id=3929998877319236',
'https://www.facebook.com/ads/library/?id=612839644477532',
'https://www.facebook.com/ads/library/?id=863545162520671',
'https://www.facebook.com/ads/library/?id=1101671498630539',
'https://www.facebook.com/ads/library/?id=565842429409973',
'https://www.facebook.com/ads/library/?id=27979705458340908',
'https://www.facebook.com/ads/library/?id=890042479986956',
'https://www.facebook.com/ads/library/?id=2925150150973604',
'https://www.facebook.com/ads/library/?id=837889875021599',
'https://www.facebook.com/ads/library/?id=2383658168666957',
'https://www.facebook.com/ads/library/?id=555855950666347',
'https://www.facebook.com/ads/library/?id=478098884886164',
'https://www.facebook.com/ads/library/?id=9054945351193305',
'https://www.facebook.com/ads/library/?id=431851013192937',
'https://www.facebook.com/ads/library/?id=478175254878314',
'https://www.facebook.com/ads/library/?id=574460172001022',
'https://www.facebook.com/ads/library/?id=891821136475782',
'https://www.facebook.com/ads/library/?id=572552852077494',
'https://www.facebook.com/ads/library/?id=1126369669141845',
'https://www.facebook.com/ads/library/?id=968513848466665',
'https://www.facebook.com/ads/library/?id=607865248332590',
'https://www.facebook.com/ads/library/?id=2071568936701549',
'https://www.facebook.com/ads/library/?id=388705484264597',
'https://www.facebook.com/ads/library/?id=613180377813234',
'https://www.facebook.com/ads/library/?id=8244831595617156',
'https://www.facebook.com/ads/library/?id=574165181895045',
'https://www.facebook.com/ads/library/?id=1146257113514634',
'https://www.facebook.com/ads/library/?id=1316587636008161',
'https://www.facebook.com/ads/library/?id=444373532052967',
'https://www.facebook.com/ads/library/?id=962019385989987',
'https://www.facebook.com/ads/library/?id=1690458591818047',
'https://www.facebook.com/ads/library/?id=1106072364505252',
'https://www.facebook.com/ads/library/?id=589004034075665',
'https://www.facebook.com/ads/library/?id=9162464790464823',
'https://www.facebook.com/ads/library/?id=4030770917188985',
'https://www.facebook.com/ads/library/?id=939244610966688',
'https://www.facebook.com/ads/library/?id=2252639921782887',
'https://www.facebook.com/ads/library/?id=586045857359870',
'https://www.facebook.com/ads/library/?id=618400990711842',
'https://www.facebook.com/ads/library/?id=8835378989880960',
'https://www.facebook.com/ads/library/?id=566686136074388',
'https://www.facebook.com/ads/library/?id=554227080781533',
'https://www.facebook.com/ads/library/?id=1849833825423452',
'https://www.facebook.com/ads/library/?id=1359268208373772',
'https://www.facebook.com/ads/library/?id=1643805353216408',
'https://www.facebook.com/ads/library/?id=1626471761587701',
'https://www.facebook.com/ads/library/?id=610362414766496',
'https://www.facebook.com/ads/library/?id=1146668244135012',
'https://www.facebook.com/ads/library/?id=1713572876153369',
'https://www.facebook.com/ads/library/?id=1275818350403222',
'https://www.facebook.com/ads/library/?id=2773088079560352',
'https://www.facebook.com/ads/library/?id=935386405226576',
'https://www.facebook.com/ads/library/?id=556577480530485',
'https://www.facebook.com/ads/library/?id=1332461477924931',
'https://www.facebook.com/ads/library/?id=943780671011947',
'https://www.facebook.com/ads/library/?id=1645213753042038',
'https://www.facebook.com/ads/library/?id=1332461477924931',
'https://www.facebook.com/ads/library/?id=1718207642058639',
'https://www.facebook.com/ads/library/?id=511304765254439',
'https://www.facebook.com/ads/library/?id=602322905774726',
'https://www.facebook.com/ads/library/?id=1869944623536076',
'https://www.facebook.com/ads/library/?id=3453011611667081',
'https://www.facebook.com/ads/library/?id=1302210201198655',
'https://www.facebook.com/ads/library/?id=909735481275787',
'https://www.facebook.com/ads/library/?id=886471863471274',
'https://www.facebook.com/ads/library/?id=1710772229494976',
'https://www.facebook.com/ads/library/?id=1282847559429124',
'https://www.facebook.com/ads/library/?id=1137818824725469',
'https://www.facebook.com/ads/library/?id=923570706418072',
'https://www.facebook.com/ads/library/?id=593429693228469',
'https://www.facebook.com/ads/library/?id=1115682959509839',
'https://www.facebook.com/ads/library/?id=909539997986384',
'https://www.facebook.com/ads/library/?id=996726792483579',
'https://www.facebook.com/ads/library/?id=1379087690141496',
'https://www.facebook.com/ads/library/?id=1199792284430416',
'https://www.facebook.com/ads/library/?id=553718220899865',
'https://www.facebook.com/ads/library/?id=620674603631550',
'https://www.facebook.com/ads/library/?id=8745019275581587',
'https://www.facebook.com/ads/library/?id=2278163939207324',
'https://www.facebook.com/ads/library/?id=1095571398914832',
'https://www.facebook.com/ads/library/?id=898127882436660',
'https://www.facebook.com/ads/library/?id=3931894283797665',
'https://www.facebook.com/ads/library/?id=1119314042924639',
'https://www.facebook.com/ads/library/?id=604532648912453',
'https://www.facebook.com/ads/library/?id=457075893835476',
'https://www.facebook.com/ads/library/?id=571345519160868',
'https://www.facebook.com/ads/library/?id=2448442045547741',
'https://www.facebook.com/ads/library/?id=921876209922724',
'https://www.facebook.com/ads/library/?id=1149567790026369',
'https://www.facebook.com/ads/library/?id=1104087294435623',
'https://www.facebook.com/ads/library/?id=1005198178050685',
'https://www.facebook.com/ads/library/?id=2103002983465042',
'https://www.facebook.com/ads/library/?id=965037095541667',
'https://www.facebook.com/ads/library/?id=487645827684771',
'https://www.facebook.com/ads/library/?id=1628113747783771',
'https://www.facebook.com/ads/library/?id=615806411117449',
'https://www.facebook.com/ads/library/?id=1309058760247834',
'https://www.facebook.com/ads/library/?id=1770152100401856',
'https://www.facebook.com/ads/library/?id=1745581302957948',
'https://www.facebook.com/ads/library/?id=1578453409455601',
'https://www.facebook.com/ads/library/?id=956479352514938',
'https://www.facebook.com/ads/library/?id=1983292068840815',
'https://www.facebook.com/ads/library/?id=585947621043808',
'https://www.facebook.com/ads/library/?id=555392300739622',
'https://www.facebook.com/ads/library/?id=1691168635165927',
'https://www.facebook.com/ads/library/?id=1711528679418354',
'https://www.facebook.com/ads/library/?id=895001469417071',
'https://www.facebook.com/ads/library/?id=971038785046220',
'https://www.facebook.com/ads/library/?id=1578779462779620',
'https://www.facebook.com/ads/library/?id=9228361860547933',
'https://www.facebook.com/ads/library/?id=983947880242084',
'https://www.facebook.com/ads/library/?id=8785893964797347',
'https://www.facebook.com/ads/library/?id=600851845833547',
'https://www.facebook.com/ads/library/?id=1394616554678389',
'https://www.facebook.com/ads/library/?id=1005197448101318',
'https://www.facebook.com/ads/library/?id=907657158148240',
'https://www.facebook.com/ads/library/?id=1243526590094837',
'https://www.facebook.com/ads/library/?id=543211695208425',
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
                if (scriptContent && scriptContent.includes('"page_profile_uri":')) {
                    const pageProfileUriMatch = scriptContent.match(/"page_profile_uri":"([^"]+)"/);
                    if (pageProfileUriMatch) {
                        pageProfileUri = pageProfileUriMatch[1];
                    }
                }
                const igUsernameMatch = scriptContent.match(/"ig_username":"([^"]+)"/);
                if (igUsernameMatch) {
                    igUsername = igUsernameMatch[1];
                }
                else if (pageProfileUri && pageProfileUri.includes('facebook.com')) {
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
