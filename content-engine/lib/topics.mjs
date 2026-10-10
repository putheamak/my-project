// Topic pages: topics.json groups posts by theme (one topic per Pinterest board).
// A published post belongs to a topic if its slug is listed in the topic's
// posts, or if its pinBoard matches the topic's board.

import fs from "node:fs";
import path from "node:path";

export function loadTopics(dir) {
  const file = path.join(dir, "topics.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")).topics ?? [];
}

// Returns the topics that have at least one of the given posts, each with its
// posts (newest first, in the order given).
export function topicsWithPosts(topics, posts) {
  return topics
    .map((t) => ({
      ...t,
      posts: posts.filter((p) => (t.posts ?? []).includes(p.slug) || (t.board && p.pinBoard === t.board)),
    }))
    .filter((t) => t.posts.length);
}
