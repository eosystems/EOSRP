export interface JsonObjectMapper {
  getPropertyName(jsonKey: string): string;
  setJsonAttributes(json: any): void;
}
