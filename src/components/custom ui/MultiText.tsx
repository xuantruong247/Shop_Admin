"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  placeholder: string;
}

const MultiText: React.FC<MultiTextProps> = ({
  value,
  onChange,
  onRemove,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge
            key={index}
            className="bg-grey-1 rounded-xl outline-none text-white"
            onClick={() => onRemove(item)}
          >
            {item}
            <button
              onClick={() => {
                onRemove(item);
              }}
              className=" ml-2 rounded-full ounline-none hover:bg-red-1"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
