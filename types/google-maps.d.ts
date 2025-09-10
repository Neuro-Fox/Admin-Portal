/// <reference types="@types/google.maps" />

declare namespace google.maps {
  namespace visualization {
    class HeatmapLayer extends google.maps.MVCObject {
      constructor(opts?: {
        data?:
          | google.maps.MVCArray<
              google.maps.LatLng | google.maps.visualization.WeightedLocation
            >
          | google.maps.LatLng[]
          | google.maps.visualization.WeightedLocation[];
        map?: google.maps.Map;
        radius?: number;
        opacity?: number;
      });
      getData(): google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >;
      setData(
        data:
          | google.maps.MVCArray<
              google.maps.LatLng | google.maps.visualization.WeightedLocation
            >
          | google.maps.LatLng[]
          | google.maps.visualization.WeightedLocation[]
      ): void;
      setMap(map: google.maps.Map | null): void;
      setOptions(options: {
        data?:
          | google.maps.MVCArray<
              google.maps.LatLng | google.maps.visualization.WeightedLocation
            >
          | google.maps.LatLng[]
          | google.maps.visualization.WeightedLocation[];
        map?: google.maps.Map;
        radius?: number;
        opacity?: number;
      }): void;
    }

    interface WeightedLocation {
      location: google.maps.LatLng;
      weight: number;
    }
  }
}
