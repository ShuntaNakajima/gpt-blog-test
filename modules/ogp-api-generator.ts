const fs = require('fs').promises;
import path from "path"
import sharp, { OverlayOptions } from 'sharp'
import TextToSVG, { FontOptions, GenerationOptions } from 'text-to-svg'
import apiClient from "../plugins/notion-api"
import { convertBookMarkObject, convertImageObject, convertPageListItem, convertStringFormula, PageListItem } from "../util/Interface/Page"
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
        try {
          let ogp = await ogpClient.getOGP(bookmark.bookmark.url)
          const imageUrl = ogp.image
          const res = await superagent.get(imageUrl)
          if(res){
            const base64 = btoa(res.body);
            ogp.image = `data:image/png;base64,${base64}`
            await fs.writeFile(`./tmp/${block.id}.json`, JSON.stringify(ogp));
          }
        }catch{
          console.log("🙅‍♀️ Error occur while loading ",bookmark.bookmark.url)
        }
      }
    }
  }
}

const fetchImage = async function(pageItems: PageListItem[]) {
  for (const page of pageItems) {
    await sleep(500);
    const [_,blocks] = await apiClient.getPage(convertStringFormula(page.page_id).string ?? "")
    for (const block of blocks) {
      const image = convertImageObject(block)
      if (image){
        const res = await superagent.get(image.file.url)
        if (res){
          const base64 = btoa(res.body);
          await fs.writeFile(`./static/images/notionimages/${block.id}.png`, base64, 'base64', function(err) {
            if (err) throw err;
            console.log('error while img saving',err);
          });
        }
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
  console.log('🔎 ogp-generator:start fetch Image')
  await fetchImage(pageItems)
  console.log('🔎 ogp-generator:finish all 🚀')
 })
}