const request = require("request");

async function detectBadWords(text) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: "https://api.api-ninjas.com/v1/profanityfilter?text=" + text,
        headers: {
          "X-Api-Key": "5PYd3loY5hqwVroWmcGa1g==HZdFE5MXQVIEywBx",
        },
      },
      function (error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode != 200) {
          reject(
            new Error(
              "Error: " + response.statusCode + " " + body.toString("utf8")
            )
          );
        } else {
          const censoredContent = JSON.parse(body).censored;
          console.log("--", censoredContent);
          resolve(censoredContent);
        }
      }
    );
  });
}

module.exports = {
  detectBadWords,
};
