// Jsonをオブジェクトにマッピングする機能を提供します。
//
// // そのままMappingします
// @JsonProperty()
// description: string;
//
// // JSONのDescriptionをdescriptionにMappingします
// @JsonProperty('Description')
// description: string;
//
// setJsonAttributes(json) で値を設定可能です。

export function JsonProperty(mappingProperty?: any): any {
  return function addMappingProperty(target: any, property: string): void {
    if (!target._jsonMappingProperties) {
      target._jsonMappingProperties = {};
    }
    let jsonMappingKey = property;
    if (mappingProperty) {
      jsonMappingKey = mappingProperty;
    }

    target._jsonMappingProperties[jsonMappingKey] = property;
  }
}

