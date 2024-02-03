import { Text } from "components";
import React from "react";

import parser from "html-react-parser";

function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" target="__blank" className="text-primary underline">' +
      url +
      "</a>"
    );
  });
}

const Comment = ({ profile, name, date, role, description }) => {
  return (
    <div className="flex items-start p-6 space-x-2 border-b border-b-gray-300">
      <img
        alt="profile"
        src={profile}
        className="h-12 w-12 rounded-full object-cover bg-white-A700 border border-gray-300"
      />

      <div className="flex-1 flex flex-col">
        <div className="flex flex-row items-start justify-between mb-2">
          <div>
            <Text size={null} className="text-primary font-poppins font-medium">
              {name}
            </Text>

            {role && (
              <Text
                size={null}
                className="text-secondary font-poppins font-semibold text-xs"
              >
                {role}
              </Text>
            )}
          </div>

          <Text size={null} className="text-gray-600 font-poppins text-xs">
            {date}
          </Text>
        </div>

        <Text
          size={null}
          className="text-gray-600 font-poppins text-sm whitespace-pre-line"
        >
          {parser(urlify(description))}
        </Text>
      </div>
    </div>
  );
};

export default Comment;
