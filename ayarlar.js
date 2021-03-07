const config = {
  "ownerID": process.env.OWNER,
  "admins": ["524213944043438098"],
  "support": ["524213944043438098"],
  "token": process.env.TOKEN,
  "dashboard" : {
    "botid":process.env.botID, 
    "oauthSecret": process.env.oauthSecret,
    "callbackURL": process.env.callback,
    "sessionSecret": "ADLMedia.",//Bu kısımı, değiştirmeyiniz ÇALIŞMAZ!.
    "domain": process.env.domain }};
module.exports = config;
