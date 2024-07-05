// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles

export const role = {
  // Document structure roles
  toolbar: "toolbar",
  tooltip: "tooltip",
  feed: "feed",
  math: "math",
  presentation: "presentation",
  note: "note",
  group: "group",
  region: "region",

  // Widget roles
  scrollbar: "scrollbar",
  searchbox: "searchbox",
  separator: "separator",
  slider: "slider",
  spinbutton: "spinbutton",
  switch: "switch",
  tab: "tab",
  tabpanel: "tabpanel",
  treeitem: "treeitem",

  // Composite widgets
  combobox: "combobox",
  menu: "menu",
  menubar: "menubar",
  tablist: "tablist",
  tree: "tree",
  treegrid: "treegrid",

  // Live regions roles
  alert: "alert",
  log: "log",
  marquee: "marquee",
  status: "status",
  timer: "timer",

  // Window roles
  alertdialog: "alertdialog",
  dialog: "dialog",
} as const;
