const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
  console.log("Incoming booking:", JSON.stringify(event, null, 2));

  const input = event.arguments.input;
  const { customerName, email, date, time, style } = input;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Hi ${customerName},\n\nYour hair appointment for ${style} is confirmed on ${date} at ${time}.\n\nThank you for booking with Braids by Vee!`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Appointment Confirmation',
      },
    },
    Source: 'dvikky46@gmail.com', // Make sure this is a verified sender in SES
  };

  try {
    await ses.sendEmail(params).promise();

    return {
      id: input.id || "temp-id", // Ideally you'd generate a real ID
      customerName,
      email,
      phone: input.phone,
      style,
      date,
      time,
      notes: input.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

  } catch (err) {
    console.error("Email send failed:", err);
    throw new Error(`Email failed to send: ${err.message}`);
  }
};
