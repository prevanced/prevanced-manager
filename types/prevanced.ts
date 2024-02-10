export type PrevancedOptions = {
  ghRepo: string;
  ghReleaseTag: string;
  prevancedManagerUpdate: boolean;
};

export type PrevancedFilterApp = {
  name: string;
  checked: boolean;
};

export type PrevancedFilterApps = {
  filterApps: PrevancedFilterApp[];
};
