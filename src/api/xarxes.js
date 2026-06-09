import { BASE_API } from "../utils/constants";

export async function getTweetsApi() {
  try {
    const url = `${BASE_API}/api/tweets/`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
