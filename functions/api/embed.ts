import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

interface HelloResponse {
  statusCode: number
  body: string
}

export const  handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters
  const url = params?.url;
  if(!url){
    callback("400", {});
    return
  }
  const parser = require("ogp-parser")
  parser(encodeURI(url), { skipOembed: true })
    .then((data: any) => {
      const siteName = data.ogp["og:site_name"] || [""]
      const title = data.title
      const description = data.seo.description || data.ogp["og:description"] || [""]
      const image = data.ogp["og:image"] || [""]
      const twitterCard = data.seo["twitter:card"] || data.ogp["twitter:card"] || [""]
      callback(null, {
        statusCode: 200,
        "headers": { "Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify({
          url: url,
          siteName: siteName[0],
          title: title,
          description: description[0],
          image: image[0],
          twitterCard: twitterCard[0],
        })
      })
  })
}