import { Destination } from "../api/model";

interface Props {
  destination: Destination;
}
export const DestinationDetails = ({
  destination: { name, description, country, climate, currency },
}: Props) => (
  <div className="flex flex-col gap-2 items-start text-lg">
    <h1 className=" text-3xl mb-2">{name}</h1>
    <p className="text-lg">{description}</p>
    <div>
      <b>Country: </b>
      {country}
    </div>
    <div>
      <b>Climate: </b>
      {climate}
    </div>
    <div>
      <b>Currency: </b>
      {currency}
    </div>
  </div>
);
