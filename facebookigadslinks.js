const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = ['https://www.facebook.com/ads/library/?id=908833751442033',
'https://www.facebook.com/ads/library/?id=584190961011519',
'https://www.facebook.com/ads/library/?id=1531237187552013',
'https://www.facebook.com/ads/library/?id=612496331356205',
'https://www.facebook.com/ads/library/?id=445046391995953',
'https://www.facebook.com/ads/library/?id=1036230151852311',
'https://www.facebook.com/ads/library/?id=1756421838485874',
'https://www.facebook.com/ads/library/?id=1250200432764766',
'https://www.facebook.com/ads/library/?id=1580129106027160',
'https://www.facebook.com/ads/library/?id=1094269662341461',
'https://www.facebook.com/ads/library/?id=500912879671649',
'https://www.facebook.com/ads/library/?id=530644019974479',
'https://www.facebook.com/ads/library/?id=1732872614157378',
'https://www.facebook.com/ads/library/?id=1628431231115313',
'https://www.facebook.com/ads/library/?id=1136414754589642',
'https://www.facebook.com/ads/library/?id=600817209089434',
'https://www.facebook.com/ads/library/?id=1135244791651469',
'https://www.facebook.com/ads/library/?id=625377376487991',
'https://www.facebook.com/ads/library/?id=2016632385477796',
'https://www.facebook.com/ads/library/?id=1120337549457817',
'https://www.facebook.com/ads/library/?id=878578957824026',
'https://www.facebook.com/ads/library/?id=942867471076498',
'https://www.facebook.com/ads/library/?id=573928878704626',
'https://www.facebook.com/ads/library/?id=2257472947967491',
'https://www.facebook.com/ads/library/?id=876986730973166',
'https://www.facebook.com/ads/library/?id=9377621758993931',
'https://www.facebook.com/ads/library/?id=898230172099310',
'https://www.facebook.com/ads/library/?id=2868394706671062',
'https://www.facebook.com/ads/library/?id=561586149993782',
'https://www.facebook.com/ads/library/?id=1164214455270968',
'https://www.facebook.com/ads/library/?id=1997009120768051',
'https://www.facebook.com/ads/library/?id=930781885685405',
'https://www.facebook.com/ads/library/?id=1270922530701128',
'https://www.facebook.com/ads/library/?id=595600229821215',
'https://www.facebook.com/ads/library/?id=598881589286778',
'https://www.facebook.com/ads/library/?id=1804635670274320',
'https://www.facebook.com/ads/library/?id=2344224869278564',
'https://www.facebook.com/ads/library/?id=424393397406936',
'https://www.facebook.com/ads/library/?id=3008003146018754',
'https://www.facebook.com/ads/library/?id=937089541182776',
'https://www.facebook.com/ads/library/?id=1612915136327831',
'https://www.facebook.com/ads/library/?id=1123793206048233',
'https://www.facebook.com/ads/library/?id=2519266741616675',
'https://www.facebook.com/ads/library/?id=1370974957390455',
'https://www.facebook.com/ads/library/?id=1312824376311747',
'https://www.facebook.com/ads/library/?id=582261291013236',
'https://www.facebook.com/ads/library/?id=932683568431062',
'https://www.facebook.com/ads/library/?id=623096203473133',
'https://www.facebook.com/ads/library/?id=768485018795629',
'https://www.facebook.com/ads/library/?id=1686020982256978',
'https://www.facebook.com/ads/library/?id=1268484617635085',
'https://www.facebook.com/ads/library/?id=449810344518763',
'https://www.facebook.com/ads/library/?id=1806831243187051',
'https://www.facebook.com/ads/library/?id=921056809973393',
'https://www.facebook.com/ads/library/?id=1488331981856268',
'https://www.facebook.com/ads/library/?id=1965969437162347',
'https://www.facebook.com/ads/library/?id=950400070286471',
'https://www.facebook.com/ads/library/?id=1270702664127121',
'https://www.facebook.com/ads/library/?id=1117106589942842',
'https://www.facebook.com/ads/library/?id=1229346454989597',
'https://www.facebook.com/ads/library/?id=868964191893473',
'https://www.facebook.com/ads/library/?id=929620492461104',
'https://www.facebook.com/ads/library/?id=441262692352728',
'https://www.facebook.com/ads/library/?id=1298028484721705',
'https://www.facebook.com/ads/library/?id=590369153455345',
'https://www.facebook.com/ads/library/?id=559358283363915',
'https://www.facebook.com/ads/library/?id=475344722245435',
'https://www.facebook.com/ads/library/?id=3952855618279872',
'https://www.facebook.com/ads/library/?id=957226689580270',
'https://www.facebook.com/ads/library/?id=1682155732736652',
'https://www.facebook.com/ads/library/?id=449059754889511',
'https://www.facebook.com/ads/library/?id=1507238376645732',
'https://www.facebook.com/ads/library/?id=1293088331716723',
'https://www.facebook.com/ads/library/?id=2031752880578002',
'https://www.facebook.com/ads/library/?id=537036485626553',
'https://www.facebook.com/ads/library/?id=441131629018826',
'https://www.facebook.com/ads/library/?id=528327403326725',
'https://www.facebook.com/ads/library/?id=1680780482492416',
'https://www.facebook.com/ads/library/?id=1236206810969783',
'https://www.facebook.com/ads/library/?id=399884619842726',
'https://www.facebook.com/ads/library/?id=911784194183784',
'https://www.facebook.com/ads/library/?id=1588917578670356',
'https://www.facebook.com/ads/library/?id=510590655286777',
'https://www.facebook.com/ads/library/?id=911756490861186',
'https://www.facebook.com/ads/library/?id=826881569352970',
'https://www.facebook.com/ads/library/?id=920791436575321',
'https://www.facebook.com/ads/library/?id=557866499969892',
'https://www.facebook.com/ads/library/?id=527089699962898',
'https://www.facebook.com/ads/library/?id=1445542002786148',
'https://www.facebook.com/ads/library/?id=470174672012476',
'https://www.facebook.com/ads/library/?id=2600750376790177',
'https://www.facebook.com/ads/library/?id=1073294604438547',
'https://www.facebook.com/ads/library/?id=440746658976243',
'https://www.facebook.com/ads/library/?id=1371473837550641',
'https://www.facebook.com/ads/library/?id=971556061493077',
'https://www.facebook.com/ads/library/?id=526730887055345',
'https://www.facebook.com/ads/library/?id=930426885488567',
'https://www.facebook.com/ads/library/?id=474467279029703',
'https://www.facebook.com/ads/library/?id=839595074886275',
'https://www.facebook.com/ads/library/?id=1757684838344059',
'https://www.facebook.com/ads/library/?id=1298510008086967',
'https://www.facebook.com/ads/library/?id=1155808126153655',
'https://www.facebook.com/ads/library/?id=1292115811991624',
'https://www.facebook.com/ads/library/?id=2919372488243327',
'https://www.facebook.com/ads/library/?id=2054755304946686',
'https://www.facebook.com/ads/library/?id=597177336432509',
'https://www.facebook.com/ads/library/?id=961635315865998',
'https://www.facebook.com/ads/library/?id=1742410446302618',
'https://www.facebook.com/ads/library/?id=604812528595350',
'https://www.facebook.com/ads/library/?id=1012974940589157',
'https://www.facebook.com/ads/library/?id=3769873953276864',
'https://www.facebook.com/ads/library/?id=1350100539317761',
'https://www.facebook.com/ads/library/?id=1764470771006387',
'https://www.facebook.com/ads/library/?id=1314879553266985',
'https://www.facebook.com/ads/library/?id=605677878652574',
'https://www.facebook.com/ads/library/?id=1665806127705980',
'https://www.facebook.com/ads/library/?id=1607691693223444',
'https://www.facebook.com/ads/library/?id=1787803518635097',
'https://www.facebook.com/ads/library/?id=811723377747907',
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
