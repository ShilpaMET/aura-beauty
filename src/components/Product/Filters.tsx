const Filters = ({ filters }: any) => {    
  return (
    <div>
      {filters?.map((filter: any) => (
        <div key={filter._uid} className="mb-6">
          <h4 className="font-semibold text-[#1E2B47] mb-2">{filter.group_name}</h4>

          {filter.type === 'range' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500">Min: {filter.min_price}</label>
              <input type="range" min={filter.min_price} max={filter.max_price} />
              <label className="text-sm text-gray-500">Max: {filter.max_price}</label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters;
