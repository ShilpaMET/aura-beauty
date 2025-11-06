'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import { useEffect, useState } from 'react';

interface FilterGroup {
  _uid: string;
  component: 'filter_group';
  group_name: string;
  filter_type: 'range' | 'checkbox' | 'switch';
  min_price?: number;
  max_price?: number;
  checkbox_options?: string[];
  switch_default?: boolean;
}

const Filters = ({
  filters,
  appliedFilters,
  onApplyFilters,
}: {
  filters: FilterGroup[];
  appliedFilters: Record<string, any>;
  onApplyFilters: (filters: Record<string, any>) => void;
}) => {
  // Create a temporary state for editing
  const [tempFilters, setTempFilters] = useState<Record<string, any>>({});

  // Initialize tempFilters when appliedFilters changes
  useEffect(() => {
    setTempFilters(appliedFilters);
  }, [appliedFilters]);

  // --- Handlers ---
  const handleReset = (group: string) => {
    setTempFilters((prev: any) => {
      const updated = { ...prev };
      delete updated[group];
      return updated;
    });
  };

  const handleRangeChange = (group: string, value: number, min: number, max: number) => {
    setTempFilters((prev: any) => ({
      ...prev,
      [group]: { min, max: value },
    }));
  };

  const handleCheckboxToggle = (group: string, option: string) => {
    setTempFilters((prev: any) => {
      const current = prev[group] || [];
      const updated = current.includes(option)
        ? current.filter((o: string) => o !== option)
        : [...current, option];
      return { ...prev, [group]: updated };
    });
  };

  const handleSwitchToggle = (group: string) => {
    setTempFilters((prev: any) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
  };

  return (
    <div
      {...storyblokEditable({ filters })}
      className="bg-white rounded-xl border border-gray-200 p-6 w-full"
    >
      <h3 className="text-lg font-semibold text-[#1E2B47] mb-4">Filters</h3>

      {filters?.length ? (
        filters.map((filter) => (
          <div key={filter._uid} className="mb-6 border-b border-gray-100 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-semibold text-[#1E2B47]">{filter.group_name}</h4>
              <button
                onClick={() => handleReset(filter.group_name)}
                className="text-xs text-gray-400 hover:text-[#112D4E]"
              >
                Reset
              </button>
            </div>

            {/* SWITCH FILTER */}
            {filter.filter_type === 'switch' && (
              <div className="flex items-center gap-3 mt-3">
                <div
                  onClick={() => handleSwitchToggle(filter.group_name)}
                  className={`relative w-10 h-5 flex items-center rounded-full cursor-pointer transition ${
                    tempFilters[filter.group_name]
                      ? 'bg-[#112D4E]'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute bg-white w-4 h-4 rounded-full transition-all ${
                      tempFilters[filter.group_name]
                        ? 'translate-x-5'
                        : 'translate-x-1'
                    }`}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  Available
                </span>
              </div>
            )}

            {/* RANGE FILTER */}
            {filter.filter_type === 'range' && (
              <div className="flex flex-col gap-3 mt-3">
                <input
                  type="range"
                  min={filter.min_price ?? 0}
                  max={filter.max_price ?? 10000}
                  step="100"
                  value={
                    tempFilters[filter.group_name]?.max ??
                    Math.floor(
                      (filter.min_price ?? 0) +
                        ((filter.max_price ?? 10000) - (filter.min_price ?? 0)) / 2
                    )
                  }
                  onChange={(e) =>
                    handleRangeChange(
                      filter.group_name,
                      parseInt(e.target.value),
                      filter.min_price ?? 0,
                      filter.max_price ?? 10000
                    )
                  }
                  className="w-full accent-[#112D4E]"
                />
                <div className="flex justify-between text-xs text-gray-700">
                  <div className="bg-gray-50 border rounded-md px-3 py-1">
                    ${filter.min_price}
                  </div>
                  <span className="text-gray-400">—</span>
                  <div className="bg-gray-50 border rounded-md px-3 py-1">
                    $
                    {tempFilters[filter.group_name]?.max ??
                      filter.max_price}
                  </div>
                </div>
              </div>
            )}

            {/* CHECKBOX FILTERS */}
            {filter.filter_type === 'checkbox' && (
              <div className="mt-3 space-y-2">
                {filter.checkbox_options?.map((option, i) => {
                  const isChecked =
                    tempFilters[filter.group_name]?.includes(option);
                  return (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() =>
                          handleCheckboxToggle(filter.group_name, option)
                        }
                        className="accent-[#112D4E]"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm">No filters available.</p>
      )}

      <button
        type="button"
        onClick={handleApply}
        className="w-full mt-6 bg-[#112D4E] text-white py-2 rounded-md hover:bg-[#0f2442] transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
