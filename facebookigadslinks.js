const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=937393714391478',
'https://www.facebook.com/ads/library/?id=896046985947748',
'https://www.facebook.com/ads/library/?id=1645953409605219',
'https://www.facebook.com/ads/library/?id=1108645334170881',
'https://www.facebook.com/ads/library/?id=620414043742815',
'https://www.facebook.com/ads/library/?id=1106560364464700',
'https://www.facebook.com/ads/library/?id=982009083960437',
'https://www.facebook.com/ads/library/?id=1506778963373564',
'https://www.facebook.com/ads/library/?id=1193817738778678',
'https://www.facebook.com/ads/library/?id=892825696312380',
'https://www.facebook.com/ads/library/?id=427265436926459',
'https://www.facebook.com/ads/library/?id=2896128867215838',
'https://www.facebook.com/ads/library/?id=1701435600414675',
'https://www.facebook.com/ads/library/?id=595149119588988',
'https://www.facebook.com/ads/library/?id=9179063242151437',
'https://www.facebook.com/ads/library/?id=946130194133618',
'https://www.facebook.com/ads/library/?id=1731393274379985',
'https://www.facebook.com/ads/library/?id=892825696312380',
'https://www.facebook.com/ads/library/?id=1106662721468152',
'https://www.facebook.com/ads/library/?id=452413997693665',
'https://www.facebook.com/ads/library/?id=3565791557065496',
'https://www.facebook.com/ads/library/?id=3892326484418867',
'https://www.facebook.com/ads/library/?id=2374399316242204',
'https://www.facebook.com/ads/library/?id=1647396009211267',
'https://www.facebook.com/ads/library/?id=560355523473052',
'https://www.facebook.com/ads/library/?id=606243751821229',
'https://www.facebook.com/ads/library/?id=473840592409150',
'https://www.facebook.com/ads/library/?id=568499366112816',
'https://www.facebook.com/ads/library/?id=1122289036118376',
'https://www.facebook.com/ads/library/?id=1564312037786741',
'https://www.facebook.com/ads/library/?id=985709736714667',
'https://www.facebook.com/ads/library/?id=536768772675974',
'https://www.facebook.com/ads/library/?id=1084509496486596',
'https://www.facebook.com/ads/library/?id=1940716846418088',
'https://www.facebook.com/ads/library/?id=1049584713523401',
'https://www.facebook.com/ads/library/?id=600757459118635',
'https://www.facebook.com/ads/library/?id=1168911867898293',
'https://www.facebook.com/ads/library/?id=875926094620012',
'https://www.facebook.com/ads/library/?id=479785224727881',
'https://www.facebook.com/ads/library/?id=479785224727881',
'https://www.facebook.com/ads/library/?id=1318768062734278',
'https://www.facebook.com/ads/library/?id=484804520842353',
'https://www.facebook.com/ads/library/?id=2014906035680222',
'https://www.facebook.com/ads/library/?id=1568534510444997',
'https://www.facebook.com/ads/library/?id=8799396673519734',
'https://www.facebook.com/ads/library/?id=1266240674646217',
'https://www.facebook.com/ads/library/?id=434647043040939',
'https://www.facebook.com/ads/library/?id=2417481618604854',
'https://www.facebook.com/ads/library/?id=562145186714616',
'https://www.facebook.com/ads/library/?id=1090137589264846',
'https://www.facebook.com/ads/library/?id=942925347774569',
'https://www.facebook.com/ads/library/?id=563382496490041',
'https://www.facebook.com/ads/library/?id=1759329711575002',
'https://www.facebook.com/ads/library/?id=1152798566436442',
'https://www.facebook.com/ads/library/?id=1524495428256518',
'https://www.facebook.com/ads/library/?id=568379959157022',
'https://www.facebook.com/ads/library/?id=2387239738286709',
'https://www.facebook.com/ads/library/?id=572796938979498',
'https://www.facebook.com/ads/library/?id=1787876965297552',
'https://www.facebook.com/ads/library/?id=518374347889043',
'https://www.facebook.com/ads/library/?id=610922071403205',
'https://www.facebook.com/ads/library/?id=2810191795830449',
'https://www.facebook.com/ads/library/?id=894740262827118',
'https://www.facebook.com/ads/library/?id=2132773067155514',
'https://www.facebook.com/ads/library/?id=2297481323938187',
'https://www.facebook.com/ads/library/?id=1591176864840905',
'https://www.facebook.com/ads/library/?id=1310545243699386',
'https://www.facebook.com/ads/library/?id=3840284369592322',
'https://www.facebook.com/ads/library/?id=389171527557121',
'https://www.facebook.com/ads/library/?id=9079069602156360',
'https://www.facebook.com/ads/library/?id=389171527557121',
'https://www.facebook.com/ads/library/?id=479636621829204',
'https://www.facebook.com/ads/library/?id=1050377460106396',
'https://www.facebook.com/ads/library/?id=479636621829204',
'https://www.facebook.com/ads/library/?id=967708031888413',
'https://www.facebook.com/ads/library/?id=3352101671594029',
'https://www.facebook.com/ads/library/?id=1956522354845016',
'https://www.facebook.com/ads/library/?id=595344156324271',
'https://www.facebook.com/ads/library/?id=602991562269056',
'https://www.facebook.com/ads/library/?id=1293628048729443',
'https://www.facebook.com/ads/library/?id=931829062217293',
'https://www.facebook.com/ads/library/?id=1846614685742405',
'https://www.facebook.com/ads/library/?id=547875671565059',
'https://www.facebook.com/ads/library/?id=1370764313898228',
'https://www.facebook.com/ads/library/?id=3825617587711352',
'https://www.facebook.com/ads/library/?id=602090869037973',
'https://www.facebook.com/ads/library/?id=1232145191187664',
'https://www.facebook.com/ads/library/?id=2409913229340608',
'https://www.facebook.com/ads/library/?id=1253973795883775',
'https://www.facebook.com/ads/library/?id=2409913229340608',
'https://www.facebook.com/ads/library/?id=8877466782306834',
'https://www.facebook.com/ads/library/?id=1247026813238606',
'https://www.facebook.com/ads/library/?id=495423746388522',
'https://www.facebook.com/ads/library/?id=1249893582932885',
'https://www.facebook.com/ads/library/?id=934091314940866',
'https://www.facebook.com/ads/library/?id=1326019911759773',
'https://www.facebook.com/ads/library/?id=1264127028180631',
'https://www.facebook.com/ads/library/?id=610535567984678',
'https://www.facebook.com/ads/library/?id=455699354001534',
'https://www.facebook.com/ads/library/?id=575030372057348',
'https://www.facebook.com/ads/library/?id=1750897029033255',
'https://www.facebook.com/ads/library/?id=2676691269207786',
'https://www.facebook.com/ads/library/?id=607352118544768',
'https://www.facebook.com/ads/library/?id=1537788296923623',
'https://www.facebook.com/ads/library/?id=1987593288419133',
'https://www.facebook.com/ads/library/?id=602908422141462',
'https://www.facebook.com/ads/library/?id=4062938830654858',
'https://www.facebook.com/ads/library/?id=990654786218436',
'https://www.facebook.com/ads/library/?id=931978575125033',
'https://www.facebook.com/ads/library/?id=509262408793783',
'https://www.facebook.com/ads/library/?id=2570071173203044',
'https://www.facebook.com/ads/library/?id=3155546264593740',
'https://www.facebook.com/ads/library/?id=567562595991818',
'https://www.facebook.com/ads/library/?id=566330759541018',
'https://www.facebook.com/ads/library/?id=27715688768075415',
'https://www.facebook.com/ads/library/?id=520392247820406',
'https://www.facebook.com/ads/library/?id=1494752441240454',
'https://www.facebook.com/ads/library/?id=1564469804200968',
'https://www.facebook.com/ads/library/?id=1157752365922438',
'https://www.facebook.com/ads/library/?id=577981248508663',
'https://www.facebook.com/ads/library/?id=481399377801852',
'https://www.facebook.com/ads/library/?id=558738300253569',
'https://www.facebook.com/ads/library/?id=1142941684107525',
'https://www.facebook.com/ads/library/?id=1108645334170881',
'https://www.facebook.com/ads/library/?id=1121746216011513',
'https://www.facebook.com/ads/library/?id=1927876384403635',
'https://www.facebook.com/ads/library/?id=9660450677301808',
'https://www.facebook.com/ads/library/?id=592367017070157',
'https://www.facebook.com/ads/library/?id=923977569323981',
'https://www.facebook.com/ads/library/?id=550541384410183',
'https://www.facebook.com/ads/library/?id=843766327726089',
'https://www.facebook.com/ads/library/?id=599779729243632',
'https://www.facebook.com/ads/library/?id=1871129663413979',
'https://www.facebook.com/ads/library/?id=620414043742815',
'https://www.facebook.com/ads/library/?id=3880934645477681',
'https://www.facebook.com/ads/library/?id=592479443316863',
'https://www.facebook.com/ads/library/?id=1301783044389604',
'https://www.facebook.com/ads/library/?id=1807334536758701',
'https://www.facebook.com/ads/library/?id=1682502939276301',
'https://www.facebook.com/ads/library/?id=559120970067839',
'https://www.facebook.com/ads/library/?id=564968042968156',
'https://www.facebook.com/ads/library/?id=894373502801678',
'https://www.facebook.com/ads/library/?id=580751701312122',
'https://www.facebook.com/ads/library/?id=1087194802850971',
'https://www.facebook.com/ads/library/?id=520170574352335',
'https://www.facebook.com/ads/library/?id=1613598232843847',
'https://www.facebook.com/ads/library/?id=937393714391478',
'https://www.facebook.com/ads/library/?id=4064806793843101',
'https://www.facebook.com/ads/library/?id=502926792791385',
'https://www.facebook.com/ads/library/?id=580275994415110',
'https://www.facebook.com/ads/library/?id=588129653667402',
'https://www.facebook.com/ads/library/?id=460189980432627',
'https://www.facebook.com/ads/library/?id=1083475676657414',
'https://www.facebook.com/ads/library/?id=1254588212708333',
'https://www.facebook.com/ads/library/?id=2926463804189369',
'https://www.facebook.com/ads/library/?id=3942593112663678',
'https://www.facebook.com/ads/library/?id=968357042013969',
'https://www.facebook.com/ads/library/?id=1120273946377162',
'https://www.facebook.com/ads/library/?id=1506475103686579',
'https://www.facebook.com/ads/library/?id=3822997077916360',
'https://www.facebook.com/ads/library/?id=528246140000416',
'https://www.facebook.com/ads/library/?id=577964161558801',
'https://www.facebook.com/ads/library/?id=1237008004171358',
'https://www.facebook.com/ads/library/?id=1086650513195069',
'https://www.facebook.com/ads/library/?id=1411200503600402',
'https://www.facebook.com/ads/library/?id=1198488641412646',
'https://www.facebook.com/ads/library/?id=874098001575073',
'https://www.facebook.com/ads/library/?id=408308575664309',
'https://www.facebook.com/ads/library/?id=3049572611877372',
'https://www.facebook.com/ads/library/?id=8374596602609924',
'https://www.facebook.com/ads/library/?id=943520374492510',
'https://www.facebook.com/ads/library/?id=534272512554452',
'https://www.facebook.com/ads/library/?id=512872744843515',
'https://www.facebook.com/ads/library/?id=859689116343874',
'https://www.facebook.com/ads/library/?id=942126094416657',
'https://www.facebook.com/ads/library/?id=539351062381525',
'https://www.facebook.com/ads/library/?id=824647459877350',
'https://www.facebook.com/ads/library/?id=1079594453777139',
'https://www.facebook.com/ads/library/?id=1006357384563074',
'https://www.facebook.com/ads/library/?id=1570410477163151',
'https://www.facebook.com/ads/library/?id=539674258454089',
'https://www.facebook.com/ads/library/?id=1038746594144522',
'https://www.facebook.com/ads/library/?id=1200142301118863',
'https://www.facebook.com/ads/library/?id=511283184806953',
'https://www.facebook.com/ads/library/?id=525290430163227',
'https://www.facebook.com/ads/library/?id=1513401859571333',
'https://www.facebook.com/ads/library/?id=890389666240655',
'https://www.facebook.com/ads/library/?id=390467874060574',
'https://www.facebook.com/ads/library/?id=427638873609358',
'https://www.facebook.com/ads/library/?id=1613051392814003',
'https://www.facebook.com/ads/library/?id=346517374953276',
'https://www.facebook.com/ads/library/?id=1460987021472712',
'https://www.facebook.com/ads/library/?id=1527915888106144',
'https://www.facebook.com/ads/library/?id=1480197656222223',
'https://www.facebook.com/ads/library/?id=1195154974946803',
'https://www.facebook.com/ads/library/?id=1152704529302708',
'https://www.facebook.com/ads/library/?id=3565791557065496',
'https://www.facebook.com/ads/library/?id=1349223235767968',
'https://www.facebook.com/ads/library/?id=417989470980321',
'https://www.facebook.com/ads/library/?id=1078214119948337',
'https://www.facebook.com/ads/library/?id=807398314755527',
'https://www.facebook.com/ads/library/?id=378436068419592',
'https://www.facebook.com/ads/library/?id=3809065175988705',
'https://www.facebook.com/ads/library/?id=376385001413816',
'https://www.facebook.com/ads/library/?id=1501613067246881',
'https://www.facebook.com/ads/library/?id=181770468304638',
'https://www.facebook.com/ads/library/?id=1233384597289576',
'https://www.facebook.com/ads/library/?id=582699887390947',
'https://www.facebook.com/ads/library/?id=2567490903390771',
'https://www.facebook.com/ads/library/?id=5552932954793631',
'https://www.facebook.com/ads/library/?id=1894513987384168',
'https://www.facebook.com/ads/library/?id=517554712603092',
'https://www.facebook.com/ads/library/?id=2098227453560131',
'https://www.facebook.com/ads/library/?id=2374399316242204',
'https://www.facebook.com/ads/library/?id=473840592409150',
'https://www.facebook.com/ads/library/?id=1333103571042856',
'https://www.facebook.com/ads/library/?id=3903683609916733',
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
