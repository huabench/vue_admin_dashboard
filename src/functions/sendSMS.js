const accountSID = "AC63fdb74efaac7d762c20bbd34843a5d6";
const authToken = "c3d55f8425dfdee14f68877aa9b9c48c";
const client = require("twilio")(accountSID, authToken);

exports.handler = async function(event, context, callback) {
  const { to, msg } = JSON.parse(event.body);
  callback(null, {
    statusCode: 200,
    body: to + msg,
  });
  return await client.messages
    .create({
      to: to,
      from: "+12058097452",
      body: msg,
    })
    .then((response) => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    })
    .catch((error) => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
