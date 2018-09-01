import { ItemProperties } from "../components/Item";

class OfflineClient {
  public static getSavedItems(): Map<number, ItemProperties> {
    return new Map<number, ItemProperties>(
      JSON.parse(localStorage.getItem("savedItems") || "[]")
    );
  }

  public static setSavedItems(itemsToSave: Map<number, ItemProperties>): void {
    localStorage.setItem(
      "savedItems",
      JSON.stringify(Array.from(itemsToSave.entries()))
    );
  }
}

export default OfflineClient;