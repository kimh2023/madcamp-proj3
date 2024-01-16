import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const manifest = {
  manifest_version: 3,
  default_locale: "en",
  name: "VisionShop: Visual Product Finder",
  version: packageJson.version,
  description: `
    Discover and Pin Products Instantly: VisionShop lets you easily identify 
    products from any image on the web. With just a click, find similar items, 
    save your favorites, and explore a world of visual shopping.
  `,
  permissions: ["storage", "sidePanel", "activeTab", "cookies"], // 'activeTab' 권한 추가
  side_panel: {
    default_path: "src/pages/sidepanel/index.html",
  },
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png",
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html",
  },
  icons: {
    128: "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-34.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
