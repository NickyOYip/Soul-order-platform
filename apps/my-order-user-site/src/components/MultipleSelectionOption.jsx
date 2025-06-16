const MultipleSelectionOption = ({ option, selectedValues, onChange }) => {
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

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {option.optionTitle} (可多選)
      </label>
      <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100">
        {option.optionDetails.map((detail, index) => (
          <label 
            key={index}
            className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedValues.includes(detail.name)
                ? 'border-pink-500 bg-pink-50 shadow-sm'
                : 'border-gray-300 hover:border-pink-300 hover:shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(detail.name)}
              onChange={(e) => onChange(detail.name, e.target.checked)}
              className="mt-0.5 mr-3 text-pink-500 focus:ring-pink-500"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{detail.name}</span>
                  {detail.tag && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getTagStyle(detail.tag)}`}>
                      {detail.tag}
                    </span>
                  )}
                </div>
                {detail.additionalPrice > 0 && (
                  <span className="text-pink-600 font-medium">+${detail.additionalPrice}</span>
                )}
              </div>              {detail.description && (
                <div className="text-sm text-gray-600">
                  {detail.description.split('\n').map((line, i) => (
                    <div key={i}>{line.trim()}</div>
                  ))}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectionOption;
