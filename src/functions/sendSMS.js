const accountSID = "AC63fdb74efaac7d762c20bbd34843a5d6";
const authToken = "cbedaf255215887757dd887cf84ac1b0";
const client = require("twilio")(accountSID, authToken);

exports.handler = async function(event, context, callback) {
  const { to, msg } = JSON.parse(event.body);
  callback(null, {
    statusCode: 200,
    body: to + msg,
  });
  await client.messages.create({
    to: to,
    from: "+12058097452",
    body: msg,
  });
};
