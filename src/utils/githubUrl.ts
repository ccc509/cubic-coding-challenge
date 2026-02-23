const GITHUB_URL_REGEX =
  /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+\/?$/;
const GITHUB_URL_PATTERN = /github\.com\/([^/]+)\/([^/]+)/;

export function isValidGithubUrl(url: string): boolean {
  const cleanUrl = url.replace(/\.git$/, "");
  return GITHUB_URL_REGEX.test(cleanUrl);
}

export function parseGithubUrl(repoUrl: string): { owner: string; repo: string } | null {
  const match = repoUrl.match(GITHUB_URL_PATTERN);
  if (!match) return null;
  const [, owner, repo] = match;
  return { owner, repo };
}
