export interface WikiSummary {
  type?:          string;
  title?:         string;
  displaytitle?:  string;
  namespace?:     WikiNamespace;
  wikibase_item?: string;
  titles?:        WikiTitles;
  pageid?:        number;
  thumbnail?:     WikiOriginalImage;
  originalimage?: WikiOriginalImage;
  lang?:          string;
  dir?:           string;
  revision?:      string;
  tid?:           string;
  timestamp?:     Date;
  description?:   string;
  content_urls?:  WikiContentUrls;
  api_urls?:      WikiAPIUrls;
  extract?:       string;
  extract_html?:  string;
}

export interface WikiNamespace {
  id: number,
  text: string
}

export interface WikiTitles {
  canonical: string,
  normalized: string,
  display: string
}

export interface WikiOriginalImage {
  source: string,
  width: number,
  height: number
}

export interface WikiContentUrls {
  desktop: WikiContentUrlsContent
  mobile: WikiContentUrlsContent
}

export interface WikiContentUrlsContent {
  page: string,
  revisions: string,
  edit: string,
  talk: string
}

export interface WikiAPIUrls {
  summary: string,
  metadata: string,
  references: string,
  media: string,
  edit_html: string,
  talk_page_html: string,
}
