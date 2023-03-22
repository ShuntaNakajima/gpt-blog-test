import fs from "fs"
import path from "path"
import sharp, { OverlayOptions } from 'sharp'
import TextToSVG, { FontOptions, GenerationOptions } from 'text-to-svg'
import apiClient from "../plugins/notion-api"
import { convertBookMarkObject, convertImageObject, convertPageListItem, convertStringFormula, PageListItem } from "../util/Interface/Page"
import ogpClient, { OGP } from "../plugins/getogp-api";
import superagent from "superagent"
import { Page } from "@notionhq/client/build/src/api-types"

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

const generateOGP = async function(pageItems:PageListItem[]) {
 const textToSVG = TextToSVG.loadSync('./assets/font/NotoSansJP-Medium.otf')
 const svgOptions:GenerationOptions = {x: 0, y: 0, fontSize: 48, anchor: "top", attributes: {fill: "black"}};
 const max_width = 1040
 for (const item of pageItems) {
  if (item.Title.title[0]){
    let titleSVGs:string[] = []
    const targetText = item.Title.title[0].plain_text || ""
    let currentText = ""

    for (const i of targetText){
      const newtext = currentText + i
      const {width,height} = textToSVG.getMetrics( newtext , svgOptions );
      if (width > max_width) {
        titleSVGs.push(textToSVG.getSVG(currentText,svgOptions))
        currentText = i
      }else{
        currentText = newtext
      }
    }
    if (currentText){
      titleSVGs.push(textToSVG.getSVG(currentText,svgOptions))
    }
    const titleOptions:OverlayOptions[] = titleSVGs.map((title,index)=>{
      let option:OverlayOptions = {
        input: Buffer.from(title),
        top: 80 + index*90,
        left: 80
      }
      return option
    })

    const dateSVG = textToSVG.getSVG(convertStringFormula(item.created).string || "", {
      x: 0,
      y: 0,
      fontSize: 36,
      anchor: 'top',
      attributes: { fill: '#A4A4A4' }
    })
    const authorSVG = textToSVG.getSVG("shunta.dev", {
      x: 0,
      y: 0,
      fontSize: 48,
      anchor: 'top',
      attributes: { fill: 'black' }
    })
    const authorOption = {
      input: Buffer.from(authorSVG),
      top: 450,
      left: 230
    }
    const dateOption = {
      input: Buffer.from(dateSVG),
      top: 500,
      left: 920
    }

    sharp('./assets/images/ogp/OGP_template_' + convertStringFormula(item.color).string + '.png' || "0")
      .composite(titleOptions.concat(authorOption,dateOption))
      .resize(1200, 630)
      .toFile('./dist/ogp/' + convertStringFormula(item.page_id).string + '.png', (error) => {
      if (error) throw Error('OGP Generate Error: ' + error)
      })
    }
  }
}

const fetchCoverImage = async function(pages: Page[]) {
  for (const page of pages) {
    await sleep(500);
    // @ts-ignore
    if (page.cover && page.cover.file.url) {
      // @ts-ignore
      const res = await superagent.get(page.cover.file.url)
      if (res){
        const base64 = btoa(res.body);
        await fs.promises.mkdir(`./dist/images/notionimages/cover/`, { recursive: true });
        await fs.promises.writeFile(`./dist/images/notionimages/cover/${page.id.replaceAll('-', '')}.png`, base64, 'base64')
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
          await fs.writeFile(`./dist/images/notionimages/${block.id}.png`, base64, 'base64', function(err: any) {
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
 this.nuxt.hook('generate:done', async generator => {
  console.log('🔎 ogp-generator:get page')
  const pages = await apiClient.getPages()
  const pageItems = pages.map(page=> convertPageListItem(page))
  console.log('🔎 ogp-generator:start generate OGP')
  // await generateOGP(pageItems)
  console.log('🔎 ogp-generator:start fetch Image')
  await fetchImage(pageItems)
  await fetchCoverImage(pages)
  console.log('🔎 ogp-generator:finish all 🚀')
 })
}