
class NetworkUtils{

    constructor(database) {
        this.database = database;
    }

    sendMail(recipient, subject, message,res, cc){

        return new Promise((resolve,reject) => {

            console.log(" Inside Email Trigger");

            var transporter = nodemailer.createTransport({

                service: 'outlook365',

                auth: {

                    user: "gokulanvikashv@outlook.com",

                    pass: "Allspark2018"

                }

            });

            var mailOptions = {

                from: "gokulanvikashv@outlook.com",

                to: recipient,

                subject: subject,

                text: message,

                cc: cc,

                html: message+'<br/><br/><br/><br/><br/><img src="https://image.ibb.co/mPszYH/pasted_Image_1.png" height="50px" width="50px"/> <br> Nick Fury <br/> Event Director<br/>Codes N Gears\'18',

            };



            transporter.sendMail(mailOptions,function(error,info) {

                if (error) {

                    console.log(error)

                reject(error);

                } else {

                console.log("success");

                resolve(true);

                }

            });

        });

    }

}

module.exports = NetworkUtils;