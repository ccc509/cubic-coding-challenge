import { v4 as uuidv4 } from "uuid";
import type { Analysis } from "../utils/types";

const searchHistory: Analysis[] = [
  {
    id: uuidv4(),
    title: "google",
    features: [
      {
        name: "NAME_ONE",
        description: "DESCRIPTON_ONE",
        interface: "INTERFACE_ONE",
        link: "LINK_ONE",
      },
      {
        name: "NAME_TWO",
        description: "DESCRIPTON_TWO",
        interface: "INTERFACE_TWO",
        link: "LINK_TWO",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "yahoo",
    features: [
      {
        name: "NAME_ONE",
        description: "DESCRIPTON_ONE",
        interface: "INTERFACE_ONE",
        link: "LINK_ONE",
      },
    ],
  },
];

export async function getHistory(): Promise<{ id: string; title: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return searchHistory.map(({ id, title }) => ({ id, title }));
}

export async function getAnalysis(analysisId: string): Promise<Analysis> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = searchHistory.findIndex((a) => a.id === analysisId);

  if (index === -1) {
    throw new Error(`Unable to find analysis with id ${analysisId}`);
  }

  return searchHistory[index];
}
