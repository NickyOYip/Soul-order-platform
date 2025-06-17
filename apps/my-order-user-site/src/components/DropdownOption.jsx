const DropdownOption = ({ option, selectedValue, onChange, isBaseOption }) => {
  return (<div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {option.optionTitle}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
      >
        <option value="">請選擇 {option.optionTitle}</option>        {option.optionDetails.map((detail, index) => (
          <option key={index} value={detail.name}>
            {detail.tag && `[${detail.tag}] `}
            {detail.name}
            {detail.additionalPrice > 0 && !isBaseOption && ` (+$${detail.additionalPrice})`}
            {detail.additionalPrice > 0 && isBaseOption && ` ($${detail.additionalPrice})`}
            {detail.description && ` - ${detail.description}`}
          </option>
        ))}      </select>
    </div>
  );
};

export default DropdownOption;
