export type Feature = {
  name: string;
  description: string;
  entryPoints: {
    name: string;
    link: string;
  }[];
};

export type Analysis = {
  id: string;
  title: string;
  description: string;
  features: Feature[];
};

export type RepoMetadata = {
  title: string;
  description: string;
};

export type UseRepoAnalysisState = {
  loading: boolean;
  error: string | null;
  analysis: Analysis | null;
};
