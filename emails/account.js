const sgMail = require('@sendgrid/mail')

const sgMailApiKey = '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'

sgMail.setApiKey(sgMailApiKey)

// ${price}
module.exports.sendEmail = (email, password) => {
    
  console.log(email +" : "+password)
    sgMail.send({
        to: email,
        from: 'isnitchedapp@gmail.com',
        subject: 'Isnitched Password Reset',
        text: `Hello. <br> Welocome to Isnitched App. <br> Your new password is: ${password} `,
        html: `<p>Hello. <br> Welocome to Isnitched App. <br>Your new password is: <b>${password}</b></p>`

    }).then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });

}

