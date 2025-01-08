const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Add Facebook Ad IDs
const ids = [ "https://www.facebook.com/ads/library/?id=2973332452819172",
    "https://www.facebook.com/ads/library/?id=1654628871789158",
    "https://www.facebook.com/ads/library/?id=451751761342887",
    "https://www.facebook.com/ads/library/?id=577680001723144",
    "https://www.facebook.com/ads/library/?id=1821776901902117",
    "https://www.facebook.com/ads/library/?id=631914722503130",
    "https://www.facebook.com/ads/library/?id=1145406143688017",
    "https://www.facebook.com/ads/library/?id=3529529167176995",
    "https://www.facebook.com/ads/library/?id=886644040349886",
    "https://www.facebook.com/ads/library/?id=620716037281786",
    "https://www.facebook.com/ads/library/?id=1143125640761807",
    "https://www.facebook.com/ads/library/?id=1150238669868722",
    "https://www.facebook.com/ads/library/?id=1910364639494194",
    "https://www.facebook.com/ads/library/?id=9159886897390480",
    "https://www.facebook.com/ads/library/?id=1108529500529430",
    "https://www.facebook.com/ads/library/?id=1597207824265013",
    "https://www.facebook.com/ads/library/?id=9288826427847065",
    "https://www.facebook.com/ads/library/?id=1181480647321551",
    "https://www.facebook.com/ads/library/?id=901340465545367",
    "https://www.facebook.com/ads/library/?id=1376550373328168",
    "https://www.facebook.com/ads/library/?id=1729519120924396",
    "https://www.facebook.com/ads/library/?id=1121846836246267",
    "https://www.facebook.com/ads/library/?id=1584963215716219",
    "https://www.facebook.com/ads/library/?id=576317728694645",
    "https://www.facebook.com/ads/library/?id=9029337043817568",
    "https://www.facebook.com/ads/library/?id=477313278396361",
    "https://www.facebook.com/ads/library/?id=1289215742388846",
    "https://www.facebook.com/ads/library/?id=1164955171716678",
    "https://www.facebook.com/ads/library/?id=948031093496384",
    "https://www.facebook.com/ads/library/?id=1319104895781102",
    "https://www.facebook.com/ads/library/?id=1272432640684109",
    "https://www.facebook.com/ads/library/?id=942028700851240",
    "https://www.facebook.com/ads/library/?id=1379920223372165",
    "https://www.facebook.com/ads/library/?id=1351880045978016",
    "https://www.facebook.com/ads/library/?id=1240958457207107",
    "https://www.facebook.com/ads/library/?id=575110262153640",
    "https://www.facebook.com/ads/library/?id=4178172742445115",
    "https://www.facebook.com/ads/library/?id=517003257382879",
    "https://www.facebook.com/ads/library/?id=1293388791800981",
    "https://www.facebook.com/ads/library/?id=569226149251326",
    "https://www.facebook.com/ads/library/?id=1638223926905298",
    "https://www.facebook.com/ads/library/?id=526958837056297",
    "https://www.facebook.com/ads/library/?id=1956687444815930",
    "https://www.facebook.com/ads/library/?id=597770869639959",
    "https://www.facebook.com/ads/library/?id=1771001783744352",
    "https://www.facebook.com/ads/library/?id=1566006537436222",
    "https://www.facebook.com/ads/library/?id=1804016353756512",
    "https://www.facebook.com/ads/library/?id=814906360764135",
    "https://www.facebook.com/ads/library/?id=612578157919942",
    "https://www.facebook.com/ads/library/?id=1094219442387025",
    "https://www.facebook.com/ads/library/?id=1831869770889010",
    "https://www.facebook.com/ads/library/?id=940823577640133",
    "https://www.facebook.com/ads/library/?id=603532298888914",
    "https://www.facebook.com/ads/library/?id=1800905390649346",
    "https://www.facebook.com/ads/library/?id=1309593433397443",
    "https://www.facebook.com/ads/library/?id=1668937423750788",
    "https://www.facebook.com/ads/library/?id=2939143206243495",
    "https://www.facebook.com/ads/library/?id=1123774845796472",
    "https://www.facebook.com/ads/library/?id=2154964788297948",
    "https://www.facebook.com/ads/library/?id=1843352716194840",
    "https://www.facebook.com/ads/library/?id=1113098026955585",
    "https://www.facebook.com/ads/library/?id=1790998584969541",
    "https://www.facebook.com/ads/library/?id=483739488087854",
    "https://www.facebook.com/ads/library/?id=981256840498960",
    "https://www.facebook.com/ads/library/?id=439621235889124",
    "https://www.facebook.com/ads/library/?id=965707715442905",
    "https://www.facebook.com/ads/library/?id=920480856863373",
    "https://www.facebook.com/ads/library/?id=8749564751807629",
    "https://www.facebook.com/ads/library/?id=1128106868906211",
    "https://www.facebook.com/ads/library/?id=960235676025095",
    "https://www.facebook.com/ads/library/?id=623297286880707",
    "https://www.facebook.com/ads/library/?id=535177422851323",
    "https://www.facebook.com/ads/library/?id=9116559165068401",
    "https://www.facebook.com/ads/library/?id=911593107415646",
    "https://www.facebook.com/ads/library/?id=597070836244526",
    "https://www.facebook.com/ads/library/?id=496584429577564",
    "https://www.facebook.com/ads/library/?id=3802978733181409",
    "https://www.facebook.com/ads/library/?id=623274906707691",
    "https://www.facebook.com/ads/library/?id=606970491985550",
    "https://www.facebook.com/ads/library/?id=597879399530798",
    "https://www.facebook.com/ads/library/?id=1321322258889170",
    "https://www.facebook.com/ads/library/?id=3768176523445708",
    "https://www.facebook.com/ads/library/?id=514842938259397",
    "https://www.facebook.com/ads/library/?id=948377356676025",
    "https://www.facebook.com/ads/library/?id=1286076039279648",
    "https://www.facebook.com/ads/library/?id=1105727304333088",
    "https://www.facebook.com/ads/library/?id=1321578065504677",
    "https://www.facebook.com/ads/library/?id=451508084674745",
    "https://www.facebook.com/ads/library/?id=1127530055436297",
    "https://www.facebook.com/ads/library/?id=1140516591409320",
    "https://www.facebook.com/ads/library/?id=602051378977514",
    "https://www.facebook.com/ads/library/?id=1236210291014454",
    "https://www.facebook.com/ads/library/?id=946506910185548",
    "https://www.facebook.com/ads/library/?id=556590817365120",
    "https://www.facebook.com/ads/library/?id=1098257708653344",
    "https://www.facebook.com/ads/library/?id=1345916553064100",
    "https://www.facebook.com/ads/library/?id=988081619806076",
    "https://www.facebook.com/ads/library/?id=581469407818282",
    "https://www.facebook.com/ads/library/?id=458674817037304"
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
