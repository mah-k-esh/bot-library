/**
 * This class is used to handle emojis
 * 
 * please refer 
 * https://www.npmjs.com/package/node-emoji
 * 
 * I ❤️ 🍕 => i Heart Pizza 
 * 
 * but it should be (i love pizza) based on the context we need to train it.
 * 
 * 
 * var emoji = require('node-emoji')
emoji.get('coffee') // returns the emoji code for coffee (displays emoji on terminals that support it)
emoji.which(emoji.get('coffee')) // returns the string "coffee"
emoji.get(':fast_forward:') // `.get` also supports github flavored markdown emoji (http://www.emoji-cheat-sheet.com/)
emoji.emojify('I :heart: :coffee:!') // replaces all :emoji: with the actual emoji, in this case: returns "I ❤️ ☕️!"
emoji.random() // returns a random emoji + key, e.g. `{ emoji: '❤️', key: 'heart' }`
emoji.search('cof') // returns an array of objects with matching emoji's. `[{ emoji: '☕️', key: 'coffee' }, { emoji: ⚰', key: 'coffin'}]`
emoji.unemojify('I ❤️ 🍕') // replaces the actual emoji with :emoji:, in this case: returns "I :heart: :pizza:"
emoji.find('🍕') // Find the `pizza` emoji, and returns `({ emoji: '🍕', key: 'pizza' })`;
emoji.find('pizza') // Find the `pizza` emoji, and returns `({ emoji: '🍕', key: 'pizza' })`;
emoji.hasEmoji('🍕') // Validate if this library knows an emoji like `🍕`
emoji.hasEmoji('pizza') // Validate if this library knowns a emoji with the name `pizza`
emoji.strip('⚠️ 〰️ 〰️ low disk space') // Strips the string from emoji's, in this case returns: "low disk space".
emoji.replace('⚠️ 〰️ 〰️ low disk space', (emoji) => `${emoji.key}:`) // Replace emoji's by callback method: "warning: low disk space"
 */

 class Emojis{




    constructor(eomjiConfig){
        
        if(eomjiConfig == null){
            eomjiConfig = this.getEmojiConfig();
        }
        
        this.eomjiConfig = eomjiConfig;
        this.emoji = require('node-emoji');
        //console.log("wtf is happening: "+JSON.stringify(emoji));

    }

    getEmojiConfig(){
        var emojiConfig= {
            "hearts": "love",
            "heart": "love"
        };

        return emojiConfig;
    }

    getPlainText(emojiedText){

        var response = this.emoji.replace(emojiedText,(emojiText)=>{ 

                //console.log("DEBUG:  "+JSON.stringify(emojiText));

                if(this.eomjiConfig[emojiText.key] != undefined && this.eomjiConfig[emojiText.key] != null){

                    return this.eomjiConfig[emojiText.key];
                }
                return emojiText.key;
            }
        );
        //console.log("response: "+response);
        return response;
    }

    getAllEmoji(query){
        
        return this.emoji.search(query);

    }

    getEmoji(query){

        //console.log(JSON.stringify(this.emoji));

        //search the emoji choose the first one
        var emojiList = this.emoji.search(query);
        
        if(emojiList.length > 0)
            return emojiList[0];
           
        return {"key": "not_found", "emoji":""}
        

    }

    getEmojiedText(){

    }

 }

 module.exports = Emojis;