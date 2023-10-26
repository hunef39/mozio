import { useAutocomplete } from "@mui/base/useAutocomplete";
import { Destination } from "../api/model";

interface Props {
  query: string;
  isLoading: boolean;
  destinations: Destination[] | undefined;
  onQueryChange: (query: string) => void;
  onChange: (destination: Destination | null) => void;
  selected: Destination | null;
}

export function ComboBox({
  destinations,
  onQueryChange,
  onChange,
  query,
  isLoading,
  selected,
}: Props) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete<Destination>({
    id: "combo-box",
    options: destinations ?? [],
    getOptionLabel: ({ name }) => name,
    inputValue: query,
    onInputChange: (_, value) => onQueryChange(value),
    onChange: (_, destination) => onChange(destination),
    selectOnFocus: true,
    clearOnBlur: false,
    value: selected,
  });

  const shouldDisplayMenu = !!query && selected?.name !== query && focused;

  return (
    <div className="relative ">
      <label {...getInputLabelProps()} className="text-left w-full block pb-2">
        Location
      </label>
      <div {...getRootProps()} className="flex">
        <input
          className="focus:ring-2 rounded-lg px-4 py-2 border-gray-300 border grow"
          {...getInputProps()}
          placeholder="Search for a location..."
        />
      </div>

      {shouldDisplayMenu && (
        <div className="mt-2 bg-white shadow-lg rounded-lg absolute w-full">
          {isLoading ? (
            <div className="py-4">
              <span className="loader text-slate-400" />
            </div>
          ) : !destinations?.length ? (
            <div className="py-4">No Results</div>
          ) : (
            <ul {...getListboxProps()} className="flex flex-col">
              {(groupedOptions as Destination[]).map((option, index) => {
                const props = getOptionProps({ option, index });
                return (
                  <li
                    {...props}
                    className={` [&.Mui-focused]:bg-slate-100 px-4 py-2 block text-left ${props.className} `}
                  >
                    {option.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
