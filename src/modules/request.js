import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import xmlConvert from "xml-js";
import Registration from "../models/Registration";

class Request {
  notificationHubName;
  connectionString;
  endpoint;
  sasToken;

  init(notificationHubName, connectionString) {
    this.notificationHubName = notificationHubName;
    this.connectionString = connectionString;
    var parts = connectionString.split(";");
    if (parts.length != 3) throw "Error parsing connection string";

    let sasKeyName, sasKeyValue;
    parts.forEach(part => {
      if (part.indexOf("Endpoint") == 0) {
        this.endpoint = "https" + part.substring(11);
      } else if (part.indexOf("SharedAccessKeyName") == 0) {
        sasKeyName = part.substring(20);
      } else if (part.indexOf("SharedAccessKey") == 0) {
        sasKeyValue = part.substring(16);
      }
    });

    const targetUri = encodeURIComponent(
      this.endpoint.toLowerCase()
    ).toLowerCase();

    // Set expiration in seconds
    const expireOnDate = new Date();
    expireOnDate.setMinutes(expireOnDate.getMinutes() + 90);
    const expires =
      Date.UTC(
        expireOnDate.getUTCFullYear(),
        expireOnDate.getUTCMonth(),
        expireOnDate.getUTCDate(),
        expireOnDate.getUTCHours(),
        expireOnDate.getUTCMinutes(),
        expireOnDate.getUTCSeconds()
      ) / 1000;
    const toSign = targetUri + "\n" + expires;

    // using CryptoJS
    const signature = hmacSHA256(toSign, sasKeyValue);
    const base64signature = Base64.stringify(signature);
    const base64UriEncoded = encodeURIComponent(base64signature);

    // construct autorization string
    this.sasToken = `SharedAccessSignature sr=${targetUri}&sig=${base64UriEncoded}&se=${expires}&skn=${sasKeyName}`;
  }

  getRegistrations() {
    return fetch(
      `${this.endpoint}${this.notificationHubName}/registrations/?api-version=2015-01`,
      {
        headers: {
          Authorization: this.sasToken,
          "x-ms-version": "2015-01"
        }
      }
    )
      .then(response => response.text())
      .then(text => {
        const data = xmlConvert.xml2js(text);
        return data.elements[0].elements
          .filter(element => element.name === "entry")
          .map(element => new Registration(element));
      });
  }

  deleteRegistration(id) {
    return fetch(
      `${this.endpoint}${this.notificationHubName}/registrations/${id}?api-version=2015-01`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/atom+xml;type=entry;charset=utf-8",
          Authorization: this.sasToken,
          "x-ms-version": "2015-01"
        }
      }
    );
  }
}

const request = new Request();
export default request;
