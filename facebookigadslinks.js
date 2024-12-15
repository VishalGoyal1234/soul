const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = [
    'https://www.facebook.com/ads/library/?id=1026605729223504',
    'https://www.facebook.com/ads/library/?id=1112953833697417',
    'https://www.facebook.com/ads/library/?id=2343556976004945',
    'https://www.facebook.com/ads/library/?id=1084067953029204',
    'https://www.facebook.com/ads/library/?id=1037008958176888',
    'https://www.facebook.com/ads/library/?id=484974360664273',
    'https://www.facebook.com/ads/library/?id=592697156673220',
    'https://www.facebook.com/ads/library/?id=598384092608195',
    'https://www.facebook.com/ads/library/?id=964895948782914',
    'https://www.facebook.com/ads/library/?id=551834830991229',
    'https://www.facebook.com/ads/library/?id=1982972538879787',
    'https://www.facebook.com/ads/library/?id=1108459724012438',
    'https://www.facebook.com/ads/library/?id=1629507211278252',
    'https://www.facebook.com/ads/library/?id=1712684832885822',
    'https://www.facebook.com/ads/library/?id=1208343767130779',
    'https://www.facebook.com/ads/library/?id=2014784168982922',
    'https://www.facebook.com/ads/library/?id=1208343767130779',
    'https://www.facebook.com/ads/library/?id=589267890222934',
    'https://www.facebook.com/ads/library/?id=2567554220103697',
    'https://www.facebook.com/ads/library/?id=413302751833557',
    'https://www.facebook.com/ads/library/?id=1367803014425158',
    'https://www.facebook.com/ads/library/?id=8607664732588522',
    'https://www.facebook.com/ads/library/?id=472610289132741',
    'https://www.facebook.com/ads/library/?id=545213901490613',
    'https://www.facebook.com/ads/library/?id=2045162619254763',
    'https://www.facebook.com/ads/library/?id=452821934475386',
    'https://www.facebook.com/ads/library/?id=558073576799042',
    'https://www.facebook.com/ads/library/?id=842525181375143',
    'https://www.facebook.com/ads/library/?id=851098166788633',
    'https://www.facebook.com/ads/library/?id=1472900980033258',
    'https://www.facebook.com/ads/library/?id=1038317197136255',
    'https://www.facebook.com/ads/library/?id=840286091394943',
    'https://www.facebook.com/ads/library/?id=469405509221655',
    'https://www.facebook.com/ads/library/?id=498332985998961',
    'https://www.facebook.com/ads/library/?id=1280403779589174',
    'https://www.facebook.com/ads/library/?id=1187476105632537',
    'https://www.facebook.com/ads/library/?id=772726994809942',
    'https://www.facebook.com/ads/library/?id=198176156676577',
    'https://www.facebook.com/ads/library/?id=363397026060043',
    'https://www.facebook.com/ads/library/?id=4022052684743869',
    'https://www.facebook.com/ads/library/?id=1807082153458481',
    'https://www.facebook.com/ads/library/?id=1581769099117661',
    'https://www.facebook.com/ads/library/?id=560124913401835',
    'https://www.facebook.com/ads/library/?id=1597374797538333',
    'https://www.facebook.com/ads/library/?id=1576199766361152',
    'https://www.facebook.com/ads/library/?id=1675743596313384',
    'https://www.facebook.com/ads/library/?id=1052264870003708',
    'https://www.facebook.com/ads/library/?id=1639066356961119',
    'https://www.facebook.com/ads/library/?id=3832086483713922',
    'https://www.facebook.com/ads/library/?id=1822534371619409',
    'https://www.facebook.com/ads/library/?id=605421265497640',
    'https://www.facebook.com/ads/library/?id=504603566068170',
    'https://www.facebook.com/ads/library/?id=483046704303526',
    'https://www.facebook.com/ads/library/?id=2103493100072330',
    'https://www.facebook.com/ads/library/?id=1932203840591199',
    'https://www.facebook.com/ads/library/?id=576406338327284',
    'https://www.facebook.com/ads/library/?id=384123544728348',
    'https://www.facebook.com/ads/library/?id=946384886840034',
    'https://www.facebook.com/ads/library/?id=982094870419159',
    'https://www.facebook.com/ads/library/?id=527034297001885',
    'https://www.facebook.com/ads/library/?id=8742134772528865',
    'https://www.facebook.com/ads/library/?id=907341441550524',
    'https://www.facebook.com/ads/library/?id=1300089601183733',
    'https://www.facebook.com/ads/library/?id=586358397212141',
    'https://www.facebook.com/ads/library/?id=1115493353394875',
    'https://www.facebook.com/ads/library/?id=3468475603449140',
    'https://www.facebook.com/ads/library/?id=1221614188911696',
    'https://www.facebook.com/ads/library/?id=2870159386476415',
    'https://www.facebook.com/ads/library/?id=1364121471662384',
    'https://www.facebook.com/ads/library/?id=1640206616934701',
    'https://www.facebook.com/ads/library/?id=1773971170028120',
    'https://www.facebook.com/ads/library/?id=464200596328794',
    'https://www.facebook.com/ads/library/?id=1089336422521724',
    'https://www.facebook.com/ads/library/?id=1099594021612679',
    'https://www.facebook.com/ads/library/?id=1111613853821265',
    'https://www.facebook.com/ads/library/?id=876049064692160',
    'https://www.facebook.com/ads/library/?id=1979825152541691',
    'https://www.facebook.com/ads/library/?id=1254518662501646',
    'https://www.facebook.com/ads/library/?id=560452839948083',
    'https://www.facebook.com/ads/library/?id=579944277961465',
    'https://www.facebook.com/ads/library/?id=1674238376837758',
    'https://www.facebook.com/ads/library/?id=891531756127308',
    'https://www.facebook.com/ads/library/?id=1691206264941852',
    'https://www.facebook.com/ads/library/?id=1624873488239507',
    'https://www.facebook.com/ads/library/?id=775605571397033',
    'https://www.facebook.com/ads/library/?id=1673269566617580',
    'https://www.facebook.com/ads/library/?id=599729115830889',
    'https://www.facebook.com/ads/library/?id=3046584702159936',
    'https://www.facebook.com/ads/library/?id=1733567370771514',
    'https://www.facebook.com/ads/library/?id=931218275187022',
    'https://www.facebook.com/ads/library/?id=584385647409617',
    'https://www.facebook.com/ads/library/?id=8366473936790469',
    'https://www.facebook.com/ads/library/?id=897483249160295',
    'https://www.facebook.com/ads/library/?id=503531766041641',
    'https://www.facebook.com/ads/library/?id=978707444283239',
    'https://www.facebook.com/ads/library/?id=1452854415636678',
    'https://www.facebook.com/ads/library/?id=625465040152729',
    'https://www.facebook.com/ads/library/?id=1619204428684531',
    'https://www.facebook.com/ads/library/?id=1087624895983716',
    'https://www.facebook.com/ads/library/?id=1304922587198799',
    'https://www.facebook.com/ads/library/?id=894010112799940',
    'https://www.facebook.com/ads/library/?id=886799206987013',
    'https://www.facebook.com/ads/library/?id=609478708172114',
    'https://www.facebook.com/ads/library/?id=9052563738129475',
    'https://www.facebook.com/ads/library/?id=462912239800590',
    'https://www.facebook.com/ads/library/?id=1134948268189482',
    'https://www.facebook.com/ads/library/?id=904117835154386',
    'https://www.facebook.com/ads/library/?id=1983908725418322',
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
