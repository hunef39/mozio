interface WithCoordinates {
  latitude: number;
  longitude: number;
}

export function getLocationsWithinRadius<Location extends WithCoordinates>(
  target: Location,
  distanceInMiles: number,
  locations: Location[]
): Location[] {
  const earthRadiusInMiles = 3958.8; // Radius of the Earth in miles

  const filteredLocations = locations.filter((location) => {
    if (
      target.longitude === location.longitude &&
      target.latitude === location.latitude
    ) {
      return false;
    }
    const dLat = (location.latitude - target.latitude) * (Math.PI / 180);
    const dLon = (location.longitude - target.longitude) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(target.latitude * (Math.PI / 180)) *
        Math.cos(location.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusInMiles * c;

    return distance <= distanceInMiles;
  });

  return filteredLocations;
}
