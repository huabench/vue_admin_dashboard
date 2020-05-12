var espdata = "default";
var storeBattery = "100";

exports.handler = function(event, context, callback) {
  try {
    const jsonData = JSON.parse(event.body);
    espdata = jsonData.data;
    storeBattery = jsonData.battery;
  } catch (e) {}
  //const data = "de";
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data: espdata, battery: storeBattery }),
  });
};
