import OpenAI from "openai";
import { OPENAI_MODEL, REPO_ANALYSIS_PROMPT } from "../utils/constants";
import { parseGithubUrl } from "../utils/githubUrl";
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
  const parsed = parseGithubUrl(repoUrl);
  if (!parsed) {
    throw new Error("Invalid GitHub URL format");
  }

  const { owner, repo } = parsed;
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

  let data: { private?: boolean; full_name?: string; description?: string };
  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from GitHub. Please try again.");
  }

  if (data.private) {
    throw new Error(
      `Repo ${data.full_name} is private, please contact the owner`,
    );
  }

  return {
    title: repo,
    description: data.description ?? "",
  };
}

export async function analyseRepo(
  repoUrl: string,
  id: string,
  title: string,
  description: string,
): Promise<void> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.",
    );
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  let response;
  try {
    response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: REPO_ANALYSIS_PROMPT },
      {
        role: "user",
        content: `The repository is: ${repoUrl}`,
      },
    ],
    model: OPENAI_MODEL,
    });
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      if (message.includes("api key") || message.includes("authentication")) {
        throw new Error("Invalid OpenAI API key. Please check your .env configuration.");
      }
      if (message.includes("rate") || message.includes("quota")) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (message.includes("network") || message.includes("fetch")) {
        throw new Error("Network error. Please check your connection and try again.");
      }
    }
    throw new Error("Analysis failed. Please try again.");
  }

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
