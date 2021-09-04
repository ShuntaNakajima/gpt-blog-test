import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";
import { CheckboxPropertyValue, CreatedTimePropertyValue, FormulaPropertyValue, LastEditedTimePropertyValue, Page, StringFormulaValue, TitlePropertyValue } from "@notionhq/client/build/src/api-types";

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