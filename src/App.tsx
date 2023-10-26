import "./App.css";
import { Destination } from "./api/model";
import { ComboBox } from "./components/ComboBox";
import { DestinationDetails } from "./components/DestinationDetails";
import { NearbyDestinationsList } from "./components/NearbyDestinationsList";
import { useDebouncedState } from "./hooks/useDebouncedState";
import { useDestinations } from "./hooks/useDestinations";
import { useCallback, useState } from "react";
function App() {
  const [selected, setSelected] = useState<Destination | null>(null);
  const {
    value: inputValue,
    debounced: query,
    setValue: setInputValue,
  } = useDebouncedState("", 300);
  const { destinations, isLoading, error } = useDestinations({
    query,
    enabled: !!query && selected?.name !== query,
  });

  const onChange = useCallback(
    (destination: Destination | null) => {
      setSelected(destination);
      if (!destination) {
        setInputValue("");
      } else {
        const { name } = destination;
        setInputValue(name);
      }
    },
    [setInputValue]
  );

  return (
    <>
      <div className=" bg-neutral-100 rounded-3xl px-20 pt-32 pb-20 mb-20">
        <ComboBox
          destinations={destinations}
          {...{ isLoading, inputValue: inputValue, onChange, selected, error }}
          onQueryChange={setInputValue}
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
