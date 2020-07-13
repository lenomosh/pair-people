
const students = [
    'Okoth Philip Andrew',
    'Okwacha David',
    'Omar Mohamed',
    'Omondi Derrick',
    'Omondi LennoX',
    'Onaya Christine',
    'Onchieku Eddie',
    'Opiyo Arnold',
    'Osango Charles',
    'Osiko John',
    'Otieno John Paul',
    'Peter Kibui',
    'Robai Valentine',
    'Snadys Dancan',
    'Thuita Lilian',
    'Fartun Mohamed',
    'Mbagaya Virsail',
    'Mbaya Michael',
    'Mercyline Aoko',
    'Michael Omondi',
    'Muita Agnes',
    'Mumbi Molly',
    'Mureithi Dennis Kamunya',
    'Mwangi Ritho',
]

const pairPeople = (data, NumberPerGroup) => {
    let duplicateData = JSON.parse(JSON.stringify(data));
    let pairedPeople = []
    while (duplicateData.length !== 0) {
        let onePair = [];
        for (let j = 0; j < NumberPerGroup; j++) {
            const generateRandomIndex = Math.floor(Math.random() * duplicateData.length)
            // get the item from duplicatedata array
            const itemFromArray = duplicateData[generateRandomIndex]
            // add the item to onepair array
            onePair.push(itemFromArray)
            // remove item from main data 
            duplicateData.splice(generateRandomIndex, 1)
        }
        pairedPeople.push(onePair);
        onePair = []
    }
    return (pairedPeople);
}
// pair the groups for one month
const generateOneWeekData = () => {
    // pair people
    const pairedPeople = pairPeople(students, 2);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    let pairedInOneWeek = {}
    let duplicatePairedPeople = JSON.parse(JSON.stringify(pairedPeople));
    for (let i = 0; i < daysOfWeek.length; i++) {
        let oneDayPairObj = {
            morning: null,
            evening: null
        }
        //    get a pair that will present in morning and evening
        let oneDayPairArr = []
        for (let j = 0; j < 2; j++) {
            // generate random index     
            const generatedIndex = Math.floor(Math.random() * duplicatePairedPeople.length)
            const onePair = duplicatePairedPeople[generatedIndex];
            oneDayPairArr.push(onePair);
            duplicatePairedPeople.splice(generatedIndex, 1)
        }
        // assign pairs to either morning or evening session
        const index = Math.floor(Math.random() * oneDayPairArr.length)//index for the item
        oneDayPairObj.morning = oneDayPairArr[index];
        // remove the item from the array
        oneDayPairArr.splice(index, 1)
        oneDayPairObj.evening = oneDayPairArr[0];
        oneDayPairArr = [];
        pairedInOneWeek[daysOfWeek[i]] = oneDayPairObj;
    }
    return pairedInOneWeek;
}

const  downloadData =(data, fileName,extension)=>{
    const cvsHeader = 'Application/octet-stream';    
    let dataStr = `data:${extension =='csv'?'Application/octet-stream':'text/json;charset=utf-8'},${encodeURIComponent(extension=='json'?JSON.stringify(data):data)}`;
    // create and anchor tag for download
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `${fileName}.${extension}`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    // remove the anchor tag after downloading
    downloadAnchorNode.remove();
  }
const formatDataAsCSV = (jsonData) => {
    /* Dummy Data Set of the expected JSON Data */
   /* const jsonData = {
        "Monday": {
            "morning": ["Thuita Lilian", "osango Charles"],
            "evening": ["Mwangi Ritho", "Okwacha David"]
        },
        "Tuesday": {
            "morning": ["Robai Valentine", "Omar Mohamed"],
            "evening": ["Mumbi Molly", "Opiyo Arnold"]
        },
        "Wednesday": {
            "morning": ["Okello Jeremy", null],
            "evening": ["Onaya Christine", "mercyline Aoko"]
        },
        "Thursday": {
            "morning": ["Fartun Mohamed", "Okoth Philip Andrew"],
            "evening": ["Mbaya Michael", "Snadys Dancan"]
        },
        "Friday": {
            "morning": ["Mureithi Dennis Kamunya", "Muita Agnes"],
            "evening": ["Mbagaya Virsail", "Onchieku Eddie"]
        }
    }
    */
    const headers = ['Day', 'Morning Session', 'Evening Session'];
    let csv = ``;
    const removeNull = data =>Array.from(data, item =>item=== null ? 'no one else' : item)
    csv+=headers.join(',') +  '\r\n' // \r\n are used to escape to a new line and move the cursor to the begining of the line
    Object.entries(jsonData).map(element => { 
        const day = element[0]
        // replace null with a string
        const morning = removeNull(element[1].morning).join(' and ')        
        const evening = removeNull(element[1].evening).join(' and ')
        const line = `${day},${morning},${evening}\r\n`
        csv +=line;
    })

    return csv;
}
const dataToDownload = generateOneWeekData();
downloadData(formatDataAsCSV(dataToDownload),'weekFourPair','csv')
// console.log(formatDataAsCSV(dataToDownload));
// document.body.innerHTML = formatDataAsCSV(dataToDownload);
