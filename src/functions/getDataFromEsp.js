var espdata = "default";

exports.handler = function(event, context, callback) {
  try {
    const data = JSON.parse(event.body).data;
    espdata = data;
  } catch (e) {}
  //const data = "de";
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data: espdata }),
  });
};
