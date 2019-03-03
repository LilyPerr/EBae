const express = require('express')
const fetch = require('node-fetch');
const jsonxml = require('jsontoxml');
const soap = require('soap');
const bodyparser = require('body-parser')
const app = express()
const port = 3000
const key = 'kevinfan-Ebae-SBX-916e2f149-9ba29d82'
const secret = 'SBX-16e2f14953db-e3ee-44b4-a44f-6fa2'
let token = ''

app.use("/", express.static(__dirname));

function oauth(){
  console.log("hello");
  const url = "https://api.ebay.com/identity/v1/oauth2/token"
  fetch(url, {
    method: "POST",
    headers: {
      'Authorization': "Basic S2V2aW5GYW4tRWJhZS1QUkQtOTE2ZGU1NmRjLWExMjk5YmZmOlBSRC0xNmRlNTZkYzMzOGItYWIwNy00ZjAzLWI2OGEtM2UyNw==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
  }).then((response) => {
    return response.json()
  }).then((data) => {
    token = data['access_token']
  }).catch(err => {
    console.log(err)
  })
}

app.get('/', function(req, res) {
  res.sendFile(path.join(public, 'index.html'));
})

app.get('/auth', function(req, res){
  data = oauth()
  return data
})


app.post('/sell', function(req, res){
  console.log(req.params, req.query, req.body.location)

  template = `
<?xml version="1.0" encoding="utf-8"?>
<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials>
    <eBayAuthToken>` + token + `
    </eBayAuthToken>
  </RequesterCredentials>
  <ErrorLanguage>en_US</ErrorLanguage>
  <WarningLevel>High</WarningLevel>
  <Item>
    <Title>` + name + `</Title>
    <Description> at
    `
    + location + ". come here and learn about " + info +
    `
    </Description>
    <PrimaryCategory>
      <CategoryID>377</CategoryID>
    </PrimaryCategory>
    <StartPrice>` + price + `</StartPrice>
    <CategoryMappingAllowed>true</CategoryMappingAllowed>
    <ConditionID></ConditionID>
    <Country>US</Country>
    <Currency>USD</Currency>
    <DispatchTimeMax>3</DispatchTimeMax>
    <ListingDuration>Days_7</ListingDuration>
    <ListingType>Chinese</ListingType>
    <PaymentMethods>PayPal</PaymentMethods>
    <PayPalEmailAddress>sellerpaymentaddress@mailserver.com</PayPalEmailAddress>
    <PictureDetails>
      <PictureURL>https://mypicserver.com/myphoto.jpg</PictureURL>
    </PictureDetails>
    <PostalCode>95125</PostalCode>
    <Quantity>1</Quantity>
    <ReturnPolicy>
      <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>
      <RefundOption>MoneyBack</RefundOption>
      <ReturnsWithinOption>Days_30</ReturnsWithinOption>
      <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>
    </ReturnPolicy>
    <ShippingDetails>
      <ShippingType>Flat</ShippingType>
      <ShippingServiceOptions>
        <ShippingServicePriority>1</ShippingServicePriority>
        <ShippingService>USPSMedia</ShippingService>
        <ShippingServiceCost>2.50</ShippingServiceCost>
      </ShippingServiceOptions>
    </ShippingDetails>
    <Site>US</Site>
  </Item>
</AddItemRequest>
`

})


app.listen(port, () => console.log(port))
