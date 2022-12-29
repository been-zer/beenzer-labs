export interface UserCoords {
  coords: {
    accuracy: number | null,
    altitude: number | null,
    altitudeAccuracy: number | null,
    heading: number | null,
    latitude: number | null,
    longitude: number | null,
    speed: number | null,
  },
  timestamp: number | null,
}

