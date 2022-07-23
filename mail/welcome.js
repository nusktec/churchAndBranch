const nodemailer = require('nodemailer');

const rsvp =  (email, name) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "cyrilogoh@gmail.com",
            pass: "Cyril@1401!"
        }
    });
    
    { 
        const mailOptions = {
            from: "cyrilogoh@gmail.com",
            to:  email,
            subject: `Thank You , ${name}`,
            html:``
};
return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
        console.log(error)
        return
    }
});
};
};


rsvp("admin@kusuconsult.com", "Mr.Stephen Sunday(KusuConsult)")