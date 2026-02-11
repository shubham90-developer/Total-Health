// sectionInterface.ts
export interface IServices {
  title: string;
  description: string;
  image: string;
}

export interface IServicesDocument extends Document {
  sections: IServices[];
}
