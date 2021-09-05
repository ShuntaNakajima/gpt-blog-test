import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";
import { Block, CheckboxPropertyValue, CreatedTimePropertyValue, FormulaPropertyValue, LastEditedTimePropertyValue, Page, StringFormulaValue, TitlePropertyValue } from "@notionhq/client/build/src/api-types";

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