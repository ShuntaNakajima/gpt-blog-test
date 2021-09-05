import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";
import { Block, CheckboxPropertyValue, CreatedTimePropertyValue, FileWithCaption, FormulaPropertyValue, LastEditedTimePropertyValue, Page, RichText, RichTextText, StringFormulaValue, TitlePropertyValue } from "@notionhq/client/build/src/api-types";

export interface PageListItem extends PropertyValueMap {
    Title: TitlePropertyValue
    isPublic: CheckboxPropertyValue
    created: FormulaPropertyValue
    updated: FormulaPropertyValue
    page_id: FormulaPropertyValue
}

export function convertPageListItem(page:Page){
    return page.properties as PageListItem
}

export function convertStringFormula(formula:FormulaPropertyValue){
    return formula.formula as StringFormulaValue
}

export function convertRichTextObject(block:Block){
    switch (block.type){
        case 'heading_1':
            return block[block.type]
        case 'heading_2':
            return block[block.type]
        case "heading_3":
            return block[block.type]
        case 'paragraph':
            return block[block.type]
        default:
            return null
      }
}

export function convertImageObject(block:Block){
    switch (block.type){
        case "image":
            switch (block[block.type].type){
                case "file":
                    return block[block.type] as FileWithCaption
                default:
                    null
            }
        default:
            return null
    }
}

export function getIdForH2(block:Block){
    const textObject = convertRichTextObject(block)
    if (textObject && block.type == "heading_2"){
        const text = getRichTextText(textObject.text[0])
        return text.plain_text?.replaceAll(' ','-')
    }else{
        return ""
    }
}

export function convertEmbetObject(block:Block){
    switch (block.type){
        case "embed":
            return block.embed
        default:
            return null
    }
}

export function convertBookMarkObject(block:Block){
    switch (block.type){
        case "bookmark":
            return block.bookmark.url as string
        default:
            return null
    }
}

export function getRichTextText(richText:RichText){
    if (richText.type === "text"){
        return richText
    } else {
        return {} as RichTextText
    }
}