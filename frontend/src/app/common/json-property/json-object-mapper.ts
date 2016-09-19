export class JsonObjectMapper {
  static deserialize<T>(klass: { new(): T }, json: any): T {
    let obj: T = new klass();

    for (let key in json) {
      let propertyName: string = klass.prototype._jsonMappingProperties[key];
      if (propertyName) {
        let value: any = json[key];
        obj[propertyName] = value;
      }
    }

    return obj;
  }
}
