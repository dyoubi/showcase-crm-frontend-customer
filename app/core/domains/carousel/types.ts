export type GetCarouselContentResponse = {
  contentURL: string;
};

export type Carousel = {
  casinoId: string;
  id: string;
  items: ReadonlyArray<{
    contentId: string;
    priority: number;
    duration: number;
    redirection: string;
  }>;
  key: string;
};

export type CarouselItem = {
  contentId: string;
  priority: number;
  duration: number;
  redirection: string;
  contentURL: string; // Optional, can be added later
  remoteURL?: string; // Optional, can be added later
};

export type GetCarouselsResponse = ReadonlyArray<Carousel>;
