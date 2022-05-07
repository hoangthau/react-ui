export const treeData = [
  {
    name: "public",
    id: "01",
    children: []
  },
  {
    name: "src",
    id: "02",
    isFolder: true,
    isOpen: true,
    children: [
      { name: "App.js", id: "021" },
      { name: "index.js", id: "022" },
      { name: "styles.css", id: "023" },
      {
        name: "hooks",
        id: "024",
        isFolder: true,
        isOpen: true,
        children: [
          { name: "useData.js", id: "0241" },
          { name: "useAsync.js", id: "0242" },
          { name: "useClick.js", id: "0243" }
        ]
      }
    ]
  },
  {
    name: "helpers",
    id: "03",
    isFolder: true,
    isOpen: true,
    children: [
      { name: "getData.js", id: "031" },
      { name: "getInfo.js", id: "032" },
      { name: "getUser.js", id: "033" }
    ]
  },
  {
    name: "package.json",
    id: "04"
  }
];
