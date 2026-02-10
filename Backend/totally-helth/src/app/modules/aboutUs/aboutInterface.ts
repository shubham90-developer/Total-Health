// interfaces/aboutUs.interface.ts

export interface IAboutUs {
  _id?: string;

  // General Information
  title: string;
  subtitle: string;
  banner: string;
  infoTitle1?: string;
  infoSubtitle1?: string;
  infoTitle2?: string;
  infoSubtitle2?: string;
  aboutDescription: string;

  // Founder Information
  founderTitle?: string;
  founderImage?: string;
  founderName?: string;
  founderDesignation?: string;
  founderDescription?: string;

  // About Information
  aboutInfoTitle?: string;
  aboutInfoSubtitle?: string;
  isoCertificate?: string;
  infoBanner1?: string;
  infoBanner2?: string;
  infoBanner3?: string;
  aboutInfoDescription?: string;

  // Meta Options
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;

  additionalInfo?: {
    title: string;
    subtitle: string;
    description: string;
    images: string[];
  };
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
