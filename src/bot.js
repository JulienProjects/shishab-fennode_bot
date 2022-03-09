import dotenv from 'dotenv'
dotenv.config()

import Twit from 'twit'
import  fs  from "fs"

var T = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
})


const sendImage = function(tweet){
    let image;
    const number = Math.floor(Math.random() * 101);
    console.log(number)
    
    switch (true) {
        case (number < 5):
            image = fs.readFileSync('./src/images/valiDose.jpg', { encoding: 'base64' })
            break;
        case (number >= 5 && number < 10):
            image = fs.readFileSync('./src/images/kanye.jpg', { encoding: 'base64' })
            break;
        case  (number >= 10 && number < 35): 
            image = fs.readFileSync('./src/images/vali.jpg', { encoding: 'base64' })
            break;
        case  (number >= 35 && number < 55): 
            image = fs.readFileSync('./src/images/colin.jpg', { encoding: 'base64' })
            break;
        case (number >= 55 && number < 100):
            image = fs.readFileSync('./src/images/taco.jpg', { encoding: 'base64' })
            break;
        default:
            image = fs.readFileSync('./src/images/hund.jpg', { encoding: 'base64' })
            console.log("OMG 100!!!!!!!!!!!!!!!!!!!")
            break;
    }
    T.post('favorites/create', { id: tweet.id_str })


    T.post('media/upload', { media_data: image }, function (err, data, response) {
        var mediaIdStr = data.media_id_string
        var meta_params = { media_id: mediaIdStr }
        let params = {
            status: '@' + tweet.user.screen_name,
            in_reply_to_status_id: '' + tweet.id_str,
            media_ids: [mediaIdStr]
          };
        
        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
              T.post('statuses/update', params)
            }
        }) 
    })
   
}
    
var stream = T.stream('statuses/filter', { track: ['shishaböfen', 'shisha böfen', "shisha böfe"] })
 
stream.on('tweet', function (tweet) {
    sendImage(tweet);
})


console.log("login success")