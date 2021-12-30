import localForage from "localforage";

export const config = {
  name: "PWA test",
  storeName: "pwa_test",
  version: 1.0,
  description: "Offline storage for the app data",
};

const db = localForage.createInstance(config);
export default db;
export const tasksKey = "tasks";

export async function init() {
  const initialTasks = [
    {
      text: "Build tools",
      checked: true,
    },
    {
      text: "Create page layout",
      checked: true,
    },
    {
      text: "Input fields",
      checked: true,
    },
    {
      text: "Offline data storage",
      checked: true,
    },
    {
      text: "Upload images",
      checked: false,
    },
  ];
  await db.setItem(tasksKey, initialTasks);
}
