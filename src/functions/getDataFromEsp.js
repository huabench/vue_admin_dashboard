var espdata = "default";
var battery = "100";

exports.handler = function(event, context, callback) {
  try {
    const jsonData = JSON.parse(event.body);
    const data = jsonData.data;
    const battery = jsonData.battery;
    espdata = data;
  } catch (e) {}
  //const data = "de";
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data: data, battery: battery }),
  });
};
