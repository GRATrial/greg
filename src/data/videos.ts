// ### PLACEHOLDER: Researcher will customize video data

export interface VideoResult {
  id: string;
  title: string;
  source: string;
  duration: string;
  views: string;
  thumbnailKey?: string;
}

// Fictional video results for research simulation
export const VIDEOS: VideoResult[] = [
  {
    id: "v1",
    title: "Greg Krieger talks about knife-making process | Deer Rock ...",
    source: "YouTube · Deer Rock Knives",
    duration: "4:15",
    views: "Mar 8, 2024"
  },
  {
    id: "v2",
    title: "Lafayette Football Highlights — Greg Krieger #69 OL ...",
    source: "YouTube · Leopard Athletics",
    duration: "3:42",
    views: "Nov 14, 2023"
  },
  {
    id: "v3",
    title: "Rock Harbor Church Sunday Sermon — Pastor Greg Krieger",
    source: "YouTube · Rock Harbor Covenant Church",
    duration: "38:21",
    views: "Jun 3, 2024"
  }
];

