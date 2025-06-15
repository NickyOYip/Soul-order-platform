import DropdownOption from './DropdownOption';
import DetailCardOption from './DetailCardOption';
import MultipleSelectionOption from './MultipleSelectionOption';

const ProductOptions = ({ 
  item, 
  selectedOptions, 
  selectedMultiple, 
  onOptionChange, 
  onMultipleSelectionChange 
}) => {
  if (!item.hasOptions || !item.options) {
    return null;
  }

  return (
    <>
      {item.options.map((option) => {
        if (option.optionType === 'dropdown') {
          return (
            <div key={option.optionNo} className="mb-4">
              <DropdownOption
                option={option}
                selectedValue={selectedOptions[option.optionNo] || ''}
                onChange={(value) => onOptionChange(option.optionNo, value)}
              />
            </div>
          );
        } else if (option.optionType === 'detail card') {
          return (
            <div key={option.optionNo} className="mb-4">
              <DetailCardOption
                option={option}
                selectedValue={selectedOptions[option.optionNo] || ''}
                onChange={(value) => onOptionChange(option.optionNo, value)}
              />
            </div>
          );
        } else if (option.optionType === 'multiple selection') {
          return (
            <div key={option.optionNo} className="mb-4">
              <MultipleSelectionOption
                option={option}
                selectedValues={selectedMultiple[option.optionNo] || []}
                onChange={(optionName, isChecked) => 
                  onMultipleSelectionChange(option.optionNo, optionName, isChecked)
                }
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default ProductOptions;
