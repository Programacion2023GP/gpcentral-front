declare module "exceljs" {
  const ExcelJS: any;
  namespace ExcelJS {
    type Alignment = any;
    type Borders = any;
    type Workbook = any;
    type Worksheet = any;
    type Cell = any;
    type Row = any;
    type Column = any;
    type BorderStyle = any;
    type Font = any;
    type Fill = any;
  }
  export = ExcelJS;
}

declare module "react-map-gl/maplibre" {
  const Map: any;
  export { Map, Marker, Popup };
  export default Map;
}

declare module "@react-pdf/renderer" {
  export const BlobProvider: any;
  export const Document: any;
  export const Page: any;
  export const View: any;
  export const Text: any;
  export const Image: any;
  export const StyleSheet: any;
  export const Font: any;
}

declare module "maplibre-gl/dist/maplibre-gl.css";
