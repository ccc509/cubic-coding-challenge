import OpenAI from "openai";
import { OPENAI_MODEL, REPO_ANALYSIS_PROMPT } from "../utils/constants";
import type { Analysis, Feature, RepoMetadata } from "../utils/types";

const searchHistory: Analysis[] = [];

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

export async function getRepoMetadata(repoUrl: string): Promise<RepoMetadata> {
  const urlPattern = /github\.com\/([^/]+)\/([^/]+)/;
  const match = repoUrl.match(urlPattern);

  if (!match) {
    throw new Error("Invalid GitHub URL format");
  }

  const [, owner, repo] = match;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  const response = await fetch(apiUrl, { headers });

  if (response.status === 404) {
    throw new Error(`Cannot find Github repo with URL: ${repoUrl}`);
  }

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const data = await response.json();

  if (data.private) {
    throw new Error(
      `Repo ${data.full_name} is private, please contact the owner`,
    );
  }

  return {
    title: repo,
    description: data.description,
  };
}

export async function analyseRepo(
  repoUrl: string,
  id: string,
  title: string,
  description: string,
): Promise<void> {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: REPO_ANALYSIS_PROMPT },
      {
        role: "user",
        content: `The repository is: ${repoUrl}`,
      },
    ],
    model: OPENAI_MODEL,
  });

  const featuresString = response.choices[0].message.content;

  let features: Feature[] = [];
  if (response && featuresString) {
    try {
      features = JSON.parse(featuresString) as Feature[];
    } catch {
      throw new Error(
        "Unable to parse the analysis results. Please try again.",
      );
    }
  }

  searchHistory.push({
    id,
    title,
    description,
    features,
  });
}
