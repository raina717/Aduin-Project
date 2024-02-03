import React from "react";

// eslint-disable-next-line no-unused-vars
import { TableData } from "../utils/constants";

const CustomTable = ({
  options,
  tableClassname,
  customTableHeader,
  customTableBody,
}) => {
  /**
   *
   * @param {typeof TableData} data
   */
  const _renderBody = (data) => {
    const keyList = data.categories.map((d) => d.id);

    let result = [];

    for (let i = 0; i < data.data.length; i++) {
      let tempResult = [];

      const rowData = data.data[i];

      // eslint-disable-next-line array-callback-return
      Object.entries(rowData).map(([key, value]) => {
        if (keyList.find((k) => k === key)) {
          tempResult.push(
            <td
              className={`px-3 py-[10px] text-sm font-poppins ${
                typeof value === "string"
                  ? value.length > 20
                    ? "ellipsis"
                    : ""
                  : "text-center"
              }`}
            >
              <span>{value}</span>
            </td>
          );
        }
      });

      result.push(
        <tr className="bg-white-A700 border-b border-b-gray-300">
          {tempResult}
        </tr>
      );
    }

    return result;
  };

  if (!options) {
    return null;
  }

  return (
    <table className={tableClassname}>
      <thead className="bg-gray-300 border-b-2 border-b-[#C5CDDB] sticky top-0 left-0 right-0 z-10">
        {customTableHeader ??
          options.categories.map((d) => (
            <th
              key={`custom_tbl-${d.id}`}
              className="uppercase font-poppins text-xs text-left px-3 py-[10px]"
              style={d.style}
            >
              {d.label}
            </th>
          ))}
      </thead>

      <tbody>{customTableBody ?? _renderBody(options)}</tbody>
    </table>
  );
};

export default CustomTable;
