export interface WPMedia {
  source_url: string;
  alt_text?: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  date: string;
  modified: string;
  categories: number[];
  tags: string[];
  author: number;
  featured_media: number;
  format: string;
  status: string;
  author_info?: {
  id: number;
  display_name: string;
  author_link?: string;
  slug?: string;
};
  category_info?: string;
  tag_info?: string;
  featured_image_urls?: {
    full?: [string, number, number, boolean];
    thumbnail?: [string, number, number, boolean];
    medium?: [string, number, number, boolean];
    medium_large?: [string, number, number, boolean];
    large?: [string, number, number, boolean];
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: Array<
      Array<{ id: number; name: string; slug: string; taxonomy: string }>
    >;
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  link: string;
  status: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  link: string;
  avatar_urls: {
    "24"?: string;
    "48"?: string;
    "96"?: string;
  };
}

export interface Story {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  storyType: "news" | "feature" | "opinion" | "interview" | "press-release";
  category: string;
  categories: string[];
  author: string;
  authorId: number;
  authorSlug: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string | null;
  featuredImageAlt: string;
  canonicalUrl: string;
  status: string;
  format: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string;
  avatar: string | null;
  storyCount: number;
}

export interface PageContent {
  slug: string;
  title: string;
  body: string;
  status: string;
}