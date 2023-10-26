import { Destination } from "../api/model";
import { useNearbyDestinations } from "../hooks/useNearbyDestinations";
import { Button } from "@mui/base/Button";

interface Props {
  current: Destination;
  onSelect: (destination: Destination) => void;
}

export const NearbyDestinationsList = ({ current, onSelect }: Props) => {
  const { destinations, isLoading } = useNearbyDestinations({ current });

  return (
    <>
      <h2 className="mt-8 mb-6 text-2xl text-left">Nearby Locations</h2>
      {isLoading ? (
        <span className="loader text-slate-400" />
      ) : (
        <ul className="flex gap-4 flex-wrap">
          {destinations?.map((destination) => (
            <Button
              key={destination.id}
              className=" uppercase px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-500 focus:bg-blue-500 focus:ring outline-none text-white rounded-lg"
              onClick={() => onSelect(destination)}
            >
              {destination.name}
            </Button>
          ))}
        </ul>
      )}
    </>
  );
};
