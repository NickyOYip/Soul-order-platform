const DetailCardOption = ({ option, selectedValue, onChange, isBaseOption }) => {
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
  };  const numChoices = option.optionDetails.length;
  // Use horizontal layout only if optionType is explicitly 'horizontal detail card'
  const useHorizontalLayout = option.optionType === 'horizontal detail card';  const getGridCols = () => {
    if (!useHorizontalLayout) return 'grid-cols-1';
    
    // For horizontal layout, ensure horizontal display even on mobile
    if (numChoices <= 1) return 'grid-cols-1';
    if (numChoices === 2) return 'grid-cols-2';
    if (numChoices === 3) return 'grid-cols-3';
    if (numChoices === 4) return 'grid-cols-2 md:grid-cols-4';
    if (numChoices >= 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    
    return 'grid-cols-1';
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {option.optionTitle}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className={`grid gap-2 ${getGridCols()} ${
        !useHorizontalLayout 
          ? 'max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100'
          : ''
      }`}>{option.optionDetails.map((detail, index) => (
          <label 
            key={index} 
            className={`flex ${
              useHorizontalLayout ? 'flex-col' : 'items-start'
            } p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedValue === detail.name
                ? 'border-pink-500 bg-pink-50 shadow-sm'
                : 'border-gray-300 hover:border-pink-300 hover:shadow-sm'
            } ${useHorizontalLayout ? 'min-h-[120px]' : ''}`}
          >
            <input
              type="radio"
              name={`option-${option.optionNo}`}
              value={detail.name}
              checked={selectedValue === detail.name}
              onChange={(e) => onChange(e.target.value)}
              className={`text-pink-500 focus:ring-pink-500 ${
                useHorizontalLayout ? 'mb-2' : 'mt-0.5 mr-3'
              }`}
            />
            <div className={useHorizontalLayout ? 'flex-1 text-center' : 'flex-1'}>
              <div className={`flex ${
                useHorizontalLayout 
                  ? 'flex-col items-center gap-1 mb-2' 
                  : 'items-center justify-between mb-1'
              }`}>
                <div className={`flex items-center gap-2 ${
                  useHorizontalLayout ? 'flex-col' : ''
                }`}>
                  <span className="font-medium text-gray-800">{detail.name}</span>
                  {detail.tag && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getTagStyle(detail.tag)}`}>
                      {detail.tag}
                    </span>
                  )}
                </div>
                {detail.additionalPrice > 0 && !isBaseOption && (
                  <span className="text-pink-600 font-medium">+${detail.additionalPrice}</span>
                )}
                {detail.additionalPrice > 0 && isBaseOption && (
                  <span className="text-gray-600 font-medium">${detail.additionalPrice}</span>
                )}
              </div>              {detail.description && (
                <div className={`text-sm text-gray-600 ${
                  useHorizontalLayout ? 'text-center' : ''
                }`}>
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

export default DetailCardOption;
