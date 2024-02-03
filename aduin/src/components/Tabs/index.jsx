import React from "react";
import { Text } from "components";

const Tabs = ({ wrapperClassname, options, onSelect, isActive }) => {
  return (
    <ul className={`${wrapperClassname} flex items-center`}>
      {Array.isArray(options)
        ? options.map((d) => (
            <li
              className="flex items-center px-4 py-2.5 relative group"
              onClick={() => onSelect(d)}
            >
              <Text
                size=""
                className={`font-poppins text-xl font-normal group-hover:text-primary ${
                  isActive?.id === d?.id ? "text-primary" : "text-gray-600"
                }`}
              >
                {d.label}
              </Text>

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
