import nodemailer from 'nodemailer'

export const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "raceautoindia@gmail.com",
      pass: "htpampvppnrofdcx",
    },
  });
  
  export const mailDetails = {
    from: "raceautoindia@gmail.com",
    to: "arunpandian972000@gmail.com",
    text: "Node.js testing mail for GeeksforGeeks",
  };
  

  