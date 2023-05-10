const getPosition = async (
  options?: PositionOptions,
): Promise<GeolocationPosition> => {
  return new Promise(
    (
      resolve: (position: GeolocationPosition) => void,
      reject: (error: GeolocationPositionError) => void,
    ) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    },
  );
};

export const GeoLocationService = {
  getPosition,
};
