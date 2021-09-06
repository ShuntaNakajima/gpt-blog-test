import sharp, { OverlayOptions } from 'sharp'
import TextToSVG, { FontOptions, GenerationOptions } from 'text-to-svg'
import apiClient from "../plugins/notion-api"
import { convertPageListItem, convertStringFormula, PageListItem } from "../util/Interface/Page"

const generateOGP = async function() {
 const pages = await apiClient.getPages()
 const pageItems = pages.map(page=> convertPageListItem(page))
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
      .toFile('./static/ogp/' + convertStringFormula(item.page_id).string + '.png', (error) => {
      if (error) throw Error('OGP Generate Error: ' + error)
      })
    }
  }
}

module.exports = function() {
// @ts-ignore
 this.nuxt.hook('generate:before', async generator => {
  console.log('ogp-generator:start')
  await generateOGP()
  console.log('ogp-generator:finish')
 })
}