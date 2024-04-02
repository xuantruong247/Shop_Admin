import React, { useState } from "react";
import { CollectionType } from "../collections/type";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiTextProps> = ({
  value,
  onChange,
  onRemove,
  placeholder,
  collections,
}) => {
  const [isValue, setIsValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  console.log(value);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectTable = collections.filter((collection) => {
    const titleMatch = collection.title
      .toLowerCase()
      .includes(isValue.toLowerCase());
    return !selected.includes(collection) && titleMatch;
  });
  return (
    <div className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <Button
              className="ml-1 hover:text-red-1"
              onClick={() => {
                onRemove(collection._id);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Input
          placeholder={placeholder}
          value={isValue}
          onChange={(e) => {
            setIsValue(e.target.value);
          }}
          onBlur={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      <div className="relative mt-2">
        {isOpen && (
          <div className="absolute p-2 w-full z-50 top-0 overflow-auto border rounded-md shadow-md">
            {selectTable.map((collection) => (
              <ul
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(collection._id);
                }}
              >
                <li className="hover:text-red-1 cursor-pointer">
                  {collection.title}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
