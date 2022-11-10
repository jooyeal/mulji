type ReleasesData = {
  albums: {
    href: string;
    items: Item[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  } | null;
};
