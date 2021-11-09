export type attrsMapType = { [key: string]: string };

export type jsonDataType = {
  type: string;
  name: string;
  attrs?: { [key: string]: string };
  genKey?: number;
  children?: jsonDataType[];
}[];
