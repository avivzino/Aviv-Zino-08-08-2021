import { storageService } from "./storageService";
const API_KEY = "mO0XcixtapMUhtsQBCRoZssaOXX1YLLC";
const CACHED_GETS_STORAGE_KEY = "cachedGets";

export const httpService = {
  get,
};

async function get(endpoint) {
  try {
    const responseFromStorage = getResponseFromStorage(endpoint);
    if (responseFromStorage) return responseFromStorage;

    const data = await fetch(endpoint).then((response) => response.json());
    saveResponseInStorage(endpoint, data);
    return data;
  } catch (error) {
    console.log("Error while trying to fetch data: ", error);
    throw error;
  }
}

function getResponseFromStorage(endpoint) {
  const cachedGetsInStorage = storageService.getItem(CACHED_GETS_STORAGE_KEY);

  const existingEndpointObj = cachedGetsInStorage.find(
    (currGetObj) => currGetObj.endpoint === endpoint
  );

  return existingEndpointObj?.value ? existingEndpointObj.value : null;
}

function saveResponseInStorage(endpoint, value) {
  let lastCachedGetsStorageVal = storageService.getItem(
    CACHED_GETS_STORAGE_KEY
  );
  if (!lastCachedGetsStorageVal) {
    lastCachedGetsStorageVal = [];
  }

  const fiteredCachedGets = lastCachedGetsStorageVal.filter(
    (currCachedGet) => currCachedGet.endpoint !== endpoint
  );

  const NewCachedGetsStorageVal = [...fiteredCachedGets, { endpoint, value }];

  storageService.setItem(CACHED_GETS_STORAGE_KEY, NewCachedGetsStorageVal);
}
