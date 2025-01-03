import { ReactNode } from "react";

export type varientproptype = {
  item: varient;
};

export type varient = {
  [x: string]: ReactNode;
  id: number;
  title: string;
  title_slug: string;
  image_mid: string;
  created_at: any;

};

export type varientproparray = {
  item: varient[];
};
