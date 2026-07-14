"use client";

import { useEffect, useState } from "react";

export type SiteContentItem = {
  id: number;
  section: string;
  itemKey: string;
  title: string;
  subtitle: string;
  body: string;
  value: string;
  imageUrl: string;
  linkUrl: string;
  metadata: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
};

export function useContentSection<T extends SiteContentItem = SiteContentItem>(section: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);

  useEffect(() => {
    fetch(`/api/content?section=${encodeURIComponent(section)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch((err) => console.error(`Failed to load ${section} content:`, err));
  }, [section]);

  return items;
}
