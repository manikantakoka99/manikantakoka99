export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

export type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
};

async function ghFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchGitHubProfile(
  username: string,
): Promise<GitHubProfile | null> {
  return ghFetch<GitHubProfile>(`https://api.github.com/users/${username}`);
}

export async function fetchGitHubRepos(
  username: string,
): Promise<GitHubRepo[] | null> {
  const data = await ghFetch<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
  );
  if (!data) return null;
  return data.filter((r) => !r.fork);
}

export async function fetchGitHubEvents(
  username: string,
): Promise<{ id: string; type: string; repo: string; created_at: string }[] | null> {
  const data = await ghFetch<
    {
      id: string;
      type: string;
      repo: { name: string };
      created_at: string;
    }[]
  >(`https://api.github.com/users/${username}/events/public?per_page=10`);
  if (!data) return null;
  return data.map((e) => ({
    id: e.id,
    type: e.type,
    repo: e.repo.name,
    created_at: e.created_at,
  }));
}
