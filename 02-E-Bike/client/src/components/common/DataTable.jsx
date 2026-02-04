import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import EmptyState from "./EmptyState";

const DataTable = ({
  columns,
  data,
  isLoading,
  emptyMessage = "No data available",
  onRowClick,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || column.accessorKey || index}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  {column.label || column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || row._id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={
                  onRowClick
                    ? "hover:bg-gray-50 cursor-pointer transition-colors"
                    : ""
                }
              >
                {columns.map((column, colIndex) => {
                  // Get the column key
                  const columnKey = column.key || column.accessorKey;

                  // Get cell content
                  let cellContent;

                  if (column.cell) {
                    // TanStack Table format: cell({ row })
                    cellContent = column.cell({ row: { original: row } });
                  } else if (column.render) {
                    // Legacy format: render(row)
                    cellContent = column.render(row);
                  } else if (columnKey) {
                    // Default: access row property
                    cellContent = row[columnKey];
                  }

                  return (
                    <td
                      key={columnKey || colIndex}
                      className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
