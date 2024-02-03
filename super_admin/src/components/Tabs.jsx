import React from "react";
import { Text } from "./Text";

const Tabs = ({
  wrapperClassname,
  options,
  onSelect,
  isActive,
  customCount,
}) => {
  return (
    <ul className={`${wrapperClassname} flex items-center`}>
      {Array.isArray(options)
        ? options.map((d) => (
            <li
              className="flex items-center px-4 py-2.5 relative group"
              onClick={() => onSelect(d)}
            >
              <Text className="text-gray-600">{d.label}</Text>

              {customCount && (
                <div className="bg-primary h-7 w-7 rounded-full flex items-center justify-center ml-2">
                  <Text className="text-white-A700">{customCount(d)}</Text>
                </div>
              )}

              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isActive?.id === d?.id && "bg-primary"
                } group-hover:bg-primary transition-all duration-300 ease-in-out`}
              />
            </li>
          ))
        : null}
    </ul>
  );
};

export default Tabs;
