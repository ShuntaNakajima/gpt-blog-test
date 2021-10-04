import fs from "fs"
import path from "path"
import sharp, { OverlayOptions } from 'sharp'
import TextToSVG, { FontOptions, GenerationOptions } from 'text-to-svg'
import apiClient from "../plugins/notion-api"
import { convertBookMarkObject, convertPageListItem, convertStringFormula, PageListItem } from "../util/Interface/Page"
import ogpClient, { OGP } from "../plugins/getogp-api";
import superagent from "superagent"

const btoa = (str:File) => {
  let buffer;
  if (Buffer.isBuffer(str)) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'base64');
  }
  return buffer.toString('base64');
};

const sleep = (msec:number) => new Promise(resolve => setTimeout(resolve, msec));

const fetchOGP = async function(pageItems:PageListItem[]) {
  for (const page of pageItems) {
    await sleep(500);
    const [_,blocks] = await apiClient.getPage(convertStringFormula(page.page_id).string ?? "")
    for (const block of blocks) {
      const bookmark = convertBookMarkObject(block)
      if (bookmark){
        let ogp = await ogpClient.getOGP(bookmark.bookmark.url)
        const imageUrl = ogp.image
        superagent.get(imageUrl).end((err, res) => {
          const base64 = btoa(res.body);
          ogp.image = `data:image/png;base64,${base64}`
          fs.writeFile(`./tmp/${ogp.url.replaceAll('/','_')}.json`, JSON.stringify(ogp), function(err) {
            if (err) {
              console.log(err);
            }
          });
        });
      }
    }
  }
}

module.exports = function() {
// @ts-ignore
 this.nuxt.hook('generate:distCopied', async generator => {
  console.log('🔎 ogp-generator:get page')
  const pages = await apiClient.getPages()
  const pageItems = pages.map(page=> convertPageListItem(page))
  console.log('🔎 ogp-generator:start fetch OGP')
  await fetchOGP(pageItems)
  console.log('🔎 ogp-generator:finish all 🚀')
 })
}