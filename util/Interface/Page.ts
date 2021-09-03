import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";
import { CheckboxPropertyValue, CreatedTimePropertyValue, LastEditedTimePropertyValue, TitlePropertyValue } from "@notionhq/client/build/src/api-types";

export interface PageInterface extends PropertyValueMap {
    Title: TitlePropertyValue
    isPublic: CheckboxPropertyValue
    created: CreatedTimePropertyValue
    updated: LastEditedTimePropertyValue
}