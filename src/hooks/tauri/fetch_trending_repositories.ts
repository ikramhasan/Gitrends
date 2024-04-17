import { invoke } from "@tauri-apps/api";

const fetchTrendingRepositories = async (): Promise<Repository[]> => {
  return invoke<Repository[]>("fetch_trending_repos", { name: "Next.js" });
};

export { fetchTrendingRepositories };
