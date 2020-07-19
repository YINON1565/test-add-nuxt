// import httpService from './http.service.js'
import {storageService} from './storage.service.js'

const ACTIVITIES= 'activities'

export const activityService = {
    // getEmptyActivity,
    query,
    getActivityById,
    // getById,
    // save,
    // remove,
}

function query(filterBy, lang) {
    return loadActivitys(lang)
    // const queryParams = new URLSearchParams();
    // if (filterBy) {
    //     for (const property in filterBy) {
    //         if (filterBy[property]){
    //             queryParams.set(property, filterBy[property])
    //         }
    //     } 
    //     return httpService.get(`activity?${queryParams}`);
    // }
    // return httpService.get('activity');
}

function loadActivitys(){
    var activitys = storageService.load(ACTIVITIES)
    if (!activitys) { activitys =  [
        loadActivity('https://res.cloudinary.com/yinon1565/image/upload/v1591968150/logo-SHADARIM.png', {he: 'שדרי"ם', en: 'Shadarim'},{he: 'שלוחים, מחברים,קהילות', en: 'x'}, {he: 'מיזם רוח ותקשורת מיועד לכל מי שרוצה שהתורה שלו תוגש נכון, תעבור מסך ותיגע עמוק. אנו שואפים להגיע עם חומרי הסברה יהודים ללב האנושי בכל העולם ועושים זאת בפרוייקט רוח ותקשורת שיכשיר וילווה אנשי תורה בכתיבה, דיבור וטלוויזיה. במסגרת הפרוייקט נכיר את עוצמת המדיה ונבין את החשיבות בהשתתפות בשיח, נתבונן כיצד נוצר סדר יום ואיך משפיעים עליו, נעבוד יחד על איך לזקק רעיונות עמוקים ואיך להוציאם לפועל באמצעות כלים מעשיים.',en: 'A spirit and communication activity is designed for anyone who wants their Torah to be submitted right, pass a screen and touch deeply. We strive to reach Jewish information materials to the human heart throughout the world and do so in a spirit and communication project that will train and guide Torah people in writing, speech and television. As part of the project, we will recognize the power of the media and understand the importance of participating in the discourse, we will look at how an agenda is created and how it affects us, we will work together on how to refine deep ideas and how to implement them with practical tools.'}, 'https://res.cloudinary.com/yinon1565/image/upload/v1592108629/ocean-863142__340.webp'),
        loadActivity('https://res.cloudinary.com/yinon1565/image/upload/v1591968177/logo-RUT.png', {he: 'רו"ת', en: 'xx'}, {he: 'רוח ותקשורת', en: 'xx'}, {he: 'מיזם רוח ותקשורת מיועד לכל מי שרוצה שהתורה שלו תוגש נכון, תעבור מסך ותיגע עמוק. אנו שואפים להגיע עם חומרי הסברה יהודים ללב האנושי בכל העולם ועושים זאת בפרוייקט רוח ותקשורת שיכשיר וילווה אנשי תורה בכתיבה, דיבור וטלוויזיה. במסגרת הפרוייקט נכיר את עוצמת המדיה ונבין את החשיבות בהשתתפות בשיח, נתבונן כיצד נוצר סדר יום ואיך משפיעים עליו, נעבוד יחד על איך לזקק רעיונות עמוקים ואיך להוציאם לפועל באמצעות כלים מעשיים.',en: 'A spirit and communication activity is designed for anyone who wants their Torah to be submitted right, pass a screen and touch deeply. We strive to reach Jewish information materials to the human heart throughout the world and do so in a spirit and communication project that will train and guide Torah people in writing, speech and television. As part of the project, we will recognize the power of the media and understand the importance of participating in the discourse, we will look at how an agenda is created and how it affects us, we will work together on how to refine deep ideas and how to implement them with practical tools.'}, 'https://res.cloudinary.com/yinon1565/image/upload/v1592091516/root.jpg'),
        loadActivity('https://res.cloudinary.com/yinon1565/image/upload/v1591968189/logo-HABAIT.png', {he: 'הבית', en: 'The Home'},{he: 'מדרשת התוכן', en: 'xxx'}, {he: 'מיזם רוח ותקשורת מיועד לכל מי שרוצה שהתורה שלו תוגש נכון, תעבור מסך ותיגע עמוק. אנו שואפים להגיע עם חומרי הסברה יהודים ללב האנושי בכל העולם ועושים זאת בפרוייקט רוח ותקשורת שיכשיר וילווה אנשי תורה בכתיבה, דיבור וטלוויזיה. במסגרת הפרוייקט נכיר את עוצמת המדיה ונבין את החשיבות בהשתתפות בשיח, נתבונן כיצד נוצר סדר יום ואיך משפיעים עליו, נעבוד יחד על איך לזקק רעיונות עמוקים ואיך להוציאם לפועל באמצעות כלים מעשיים.',en: 'A spirit and communication activity is designed for anyone who wants their Torah to be submitted right, pass a screen and touch deeply. We strive to reach Jewish information materials to the human heart throughout the world and do so in a spirit and communication project that will train and guide Torah people in writing, speech and television. As part of the project, we will recognize the power of the media and understand the importance of participating in the discourse, we will look at how an agenda is created and how it affects us, we will work together on how to refine deep ideas and how to implement them with practical tools.'}, 'https://res.cloudinary.com/yinon1565/image/upload/v1592105559/nest.webp')
    ]
    storageService.store(ACTIVITIES,activitys) }
    // activitys = activitys.map(activity=> {
    //     return {
            
    //     }
    // } )
    return activitys;
}

var gNextId = 101

function loadActivity(logoUrl,  title, subtitle, description, headerUrl, imgUrls){

    return {_id: gNextId++ ,logoUrl, title,subtitle, description , headerUrl, imgUrls}
}

// function getById(activityId) {
//     return httpService.get(`activity/${activityId}`);
// }
function getActivityById(activityId) {
    const activitys = loadActivitys()
    return activitys.find(activity=>  activity._id === +activityId)
}

// function remove(activityId) {
//     return httpService.delete(`activity/${activityId}`);
// }

// function save(activity) {
//     return (activity._id) ? _update(activity) : _add(activity);
// }

// function _add(activity) {
//     return httpService.post(`activity`, activity);
// }

// function _update(activity) {
//     return httpService.put(`activity/${activity._id}`, activity);
// }

// function getEmptyActivity() {

//     return {
//         logoUrl: '',
//         title: '',
//         description: '',
//         startAt: '',
//         endsAt: '',
//         imgUrls: [],
//     }
// }
