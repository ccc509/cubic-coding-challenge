export type Feature = {
  name: string;
  description: string;
  interface: string;
  link: string;
};

export type Analysis = {
  id: string;
  title: string;
  features: Feature[];
};
