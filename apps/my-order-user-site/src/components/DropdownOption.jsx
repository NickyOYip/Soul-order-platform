const DropdownOption = ({ option, selectedValue, onChange, isBaseOption }) => {
  const getTagStyle = (tag) => {
    const tagStyles = {
      'Basic': 'bg-gray-100 text-gray-600 border-gray-200',
      'Popular': 'bg-blue-100 text-blue-600 border-blue-200',
      'Premium': 'bg-purple-100 text-purple-600 border-purple-200',
      'Best Value': 'bg-green-100 text-green-600 border-green-200',
      'Recommended': 'bg-orange-100 text-orange-600 border-orange-200',
      'Love': 'bg-pink-100 text-pink-600 border-pink-200',
      'Passion': 'bg-red-100 text-red-600 border-red-200',
      'Loyalty': 'bg-indigo-100 text-indigo-600 border-indigo-200',
      'Attraction': 'bg-rose-100 text-rose-600 border-rose-200',
      'Healing': 'bg-emerald-100 text-emerald-600 border-emerald-200',
      'Cleansing': 'bg-cyan-100 text-cyan-600 border-cyan-200',
      'Success': 'bg-yellow-100 text-yellow-600 border-yellow-200',
      'Wealth': 'bg-amber-100 text-amber-600 border-amber-200',
      'Career': 'bg-slate-100 text-slate-600 border-slate-200',
      'Add-on': 'bg-teal-100 text-teal-600 border-teal-200'
    };
    return tagStyles[tag] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (    <div className="mb-4">
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
        ))}
      </select>
      
      {/* Show selected option details with tag badge */}
      {selectedValue && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
          {option.optionDetails
            .filter(detail => detail.name === selectedValue)
            .map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                {detail.tag && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getTagStyle(detail.tag)}`}>
                    {detail.tag}
                  </span>
                )}
                <div className="flex-1">                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{detail.name}</span>
                    {detail.additionalPrice > 0 && !isBaseOption && (
                      <span className="text-pink-600 font-medium">+${detail.additionalPrice}</span>
                    )}
                    {detail.additionalPrice > 0 && isBaseOption && (
                      <span className="text-gray-600 font-medium">${detail.additionalPrice}</span>
                    )}
                  </div>{detail.description && (
                    <div className="text-sm text-gray-600 mt-1">
                      {detail.description.split('\n').map((line, i) => (
                        <div key={i}>{line.trim()}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DropdownOption;
