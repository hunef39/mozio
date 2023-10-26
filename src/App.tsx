import "./App.css";
import { Destination } from "./api/model";
import { ComboBox } from "./components/ComboBox";
import { DestinationDetails } from "./components/DestinationDetails";
import { NearbyDestinationsList } from "./components/NearbyDestinationsList";
import { useDestinations } from "./hooks/useDestinations";
import { useCallback, useState } from "react";
function App() {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [query, setQuery] = useState("a");
  const { destinations, isLoading, error } = useDestinations({
    query,
    enabled: !!query && selected?.name !== query,
  });

  const onChange = useCallback((destination: Destination | null) => {
    setSelected(destination);
    if (!destination) {
      setQuery("");
    } else {
      const { name } = destination;
      setQuery(name);
    }
  }, []);

  return (
    <>
      <div className=" bg-neutral-100 rounded-3xl px-20 pt-32 pb-20 mb-20">
        <ComboBox
          destinations={destinations}
          {...{ isLoading, query, onChange, selected, error }}
          onQueryChange={setQuery}
        />
      </div>
      {selected && (
        <>
          <DestinationDetails destination={selected} />
          <NearbyDestinationsList current={selected} onSelect={onChange} />
        </>
      )}
      {}
    </>
  );
}

export default App;
