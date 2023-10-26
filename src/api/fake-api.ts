import DESTINATIONS from "../destinations.json";
import { getLocationsWithinRadius } from "./getLocationsWithinRadius";
import { Destination } from "./model";

const REQUEST_DELAY_MS = 900;

const timedOutPromise = <T>(
  result: T,
  timeout: number,
  shouldReject?: boolean
) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject("Something went wrong, please try again later.");
      }
      resolve(result);
    }, timeout);
  });

export const getDestinations = (query?: string | undefined) => {
  console.log({ query });

  return timedOutPromise(
    query
      ? DESTINATIONS.filter((d) =>
          d.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : DESTINATIONS,
    REQUEST_DELAY_MS,
    query === "fail"
  );
};

export const getNearbyDestinations = (target: Destination) => {
  console.log({ target });
  return timedOutPromise(
    getLocationsWithinRadius(target, 500, DESTINATIONS),
    REQUEST_DELAY_MS
  );
};
