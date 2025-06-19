import { useState } from 'react';
import { PlusIcon, XMarkIcon, TrashIcon, InformationCircleIcon, ChevronDownIcon, ChevronUpIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ProductOptionsEditor = ({ options = [], onOptionsChange }) => {  const [localOptions, setLocalOptions] = useState(options);  const [expandedOptions, setExpandedOptions] = useState(new Set());
  const [expandedDetails, setExpandedDetails] = useState(new Set());  const [confirmDialog, setConfirmDialog] = useState(null);

  const showConfirmDialog = (title, message, onConfirm) => {
    setConfirmDialog({
      title,
      message,
      onConfirm,
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleConfirm = () => {
    if (confirmDialog?.onConfirm) {
      confirmDialog.onConfirm();
    }
    setConfirmDialog(null);
  };

  const toggleOptionExpanded = (optionIndex) => {
    const newExpanded = new Set(expandedOptions);
    if (newExpanded.has(optionIndex)) {
      newExpanded.delete(optionIndex);
    } else {
      newExpanded.add(optionIndex);
    }
    setExpandedOptions(newExpanded);
  };

  const toggleDetailExpanded = (optionIndex, detailIndex) => {
    const detailKey = `${optionIndex}-${detailIndex}`;
    const newExpanded = new Set(expandedDetails);
    if (newExpanded.has(detailKey)) {
      newExpanded.delete(detailKey);
    } else {
      newExpanded.add(detailKey);
    }
    setExpandedDetails(newExpanded);
  };

  const optionTypes = [
    { 
      value: 'dropdown', 
      label: 'Dropdown 下拉選單', 
      description: '單選下拉式選單，用戶只能選擇一個選項',
      icon: '📋'
    },
    { 
      value: 'multiple selection', 
      label: 'Multiple Selection 多選', 
      description: '可多選的checkbox選項，用戶可選擇多個',
      icon: '☑️'
    },
    { 
      value: 'detail card', 
      label: 'Detail Card 詳細卡片', 
      description: '垂直詳細卡片佈局，顯示豐富資訊',
      icon: '🃏'
    },
    { 
      value: 'horizontal detail card', 
      label: 'Horizontal Card 橫向卡片', 
      description: '橫向詳細卡片佈局，適合簡潔選項',
      icon: '📄'
    }
  ];  const handleAddOption = () => {
    const newOption = {
      optionNo: localOptions.length + 1,
      optionType: 'dropdown',
      optionTitle: '',
      optionDetails: [
        {
          name: '',
          description: '',
          additionalPrice: 0,
          tag: ''
        }
      ]
    };
    
    const updatedOptions = [...localOptions, newOption];
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
    
    // Auto-expand the new option
    const newExpanded = new Set(expandedOptions);
    newExpanded.add(localOptions.length);
    setExpandedOptions(newExpanded);
  };  const handleRemoveOption = (optionIndex) => {
    const option = localOptions[optionIndex];
    const optionTitle = option.optionTitle || `選項 ${optionIndex + 1}`;
    
    showConfirmDialog(
      '刪除選項',
      `確定要刪除選項「${optionTitle}」嗎？\n\n此操作將會永久刪除此選項及其所有內容，無法復原。`,
      () => {
        const updatedOptions = localOptions.filter((_, index) => index !== optionIndex);
        setLocalOptions(updatedOptions);
        onOptionsChange(updatedOptions);
        
        // Clean up expanded state
        const newExpanded = new Set();
        expandedOptions.forEach(index => {
          if (index < optionIndex) {
            newExpanded.add(index);
          } else if (index > optionIndex) {
            newExpanded.add(index - 1);
          }
        });
        setExpandedOptions(newExpanded);
        
        // Clean up expanded details state
        const newExpandedDetails = new Set();
        expandedDetails.forEach(key => {
          const [optIdx] = key.split('-').map(Number);
          if (optIdx < optionIndex) {
            newExpandedDetails.add(key);
          } else if (optIdx > optionIndex) {
            const [, detIdx] = key.split('-');
            newExpandedDetails.add(`${optIdx - 1}-${detIdx}`);
          }
        });
        setExpandedDetails(newExpandedDetails);
      }
    );
  };

  const handleOptionChange = (optionIndex, field, value) => {
    const updatedOptions = localOptions.map((option, index) => 
      index === optionIndex ? { ...option, [field]: value } : option
    );
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };  const handleAddOptionDetail = (optionIndex) => {
    const updatedOptions = localOptions.map((option, index) => 
      index === optionIndex 
        ? { 
            ...option, 
            optionDetails: [...option.optionDetails, { name: '', description: '', additionalPrice: 0, tag: '' }] 
          }
        : option
    );
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
    
    // Auto-expand the new detail
    const newDetailIndex = localOptions[optionIndex].optionDetails.length;
    const detailKey = `${optionIndex}-${newDetailIndex}`;
    const newExpanded = new Set(expandedDetails);
    newExpanded.add(detailKey);
    setExpandedDetails(newExpanded);
  };  const handleRemoveOptionDetail = (optionIndex, detailIndex) => {
    const option = localOptions[optionIndex];
    const detail = option.optionDetails[detailIndex];
    const detailName = detail.name || `選項 ${detailIndex + 1}`;
    const optionTitle = option.optionTitle || `選項 ${optionIndex + 1}`;
    
    showConfirmDialog(
      '刪除選項內容',
      `確定要刪除「${optionTitle}」中的「${detailName}」嗎？\n\n此操作無法復原。`,
      () => {
        const updatedOptions = localOptions.map((option, index) => 
          index === optionIndex 
            ? { 
                ...option, 
                optionDetails: option.optionDetails.filter((_, dIndex) => dIndex !== detailIndex) 
              }
            : option
        );
        setLocalOptions(updatedOptions);
        onOptionsChange(updatedOptions);
        
        // Clean up expanded details state
        const newExpanded = new Set();
        expandedDetails.forEach(key => {
          const [optIdx, detIdx] = key.split('-').map(Number);
          if (optIdx === optionIndex) {
            if (detIdx < detailIndex) {
              newExpanded.add(key);
            } else if (detIdx > detailIndex) {
              newExpanded.add(`${optIdx}-${detIdx - 1}`);
            }
          } else {
            newExpanded.add(key);
          }
        });
        setExpandedDetails(newExpanded);
      }
    );
  };

  const handleOptionDetailChange = (optionIndex, detailIndex, field, value) => {
    const updatedOptions = localOptions.map((option, index) => 
      index === optionIndex 
        ? { 
            ...option, 
            optionDetails: option.optionDetails.map((detail, dIndex) => 
              dIndex === detailIndex ? { ...detail, [field]: value } : detail
            )
          }
        : option
    );
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };
  return (
    <div className="space-y-4">      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h4 className="text-sm font-medium text-gray-700">產品選項配置</h4>
        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center justify-center gap-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm w-full sm:w-auto"
        >
          <PlusIcon className="w-4 h-4" />
          新增選項
        </button>
      </div>      {/* Quick Help Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <InformationCircleIcon className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">選項類型說明</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-600">
          {optionTypes.map((type) => (
            <div key={type.value} className="flex items-start gap-1 p-1">
              <span className="mt-0.5 text-sm">{type.icon}</span>
              <div className="min-w-0">
                <span className="font-medium block sm:inline">{type.label.split(' ')[0]}</span>
                <span className="text-purple-500 block">{type.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Options List */}
      {localOptions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <span className="text-sm">尚未配置產品選項</span>
        </div>
      ) : (
        <div className="space-y-6">          {localOptions.map((option, optionIndex) => (
            <div key={optionIndex} className="border border-gray-200 rounded-lg bg-gray-50">
              {/* Collapsible Option Header */}
              <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleOptionExpanded(optionIndex)}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {expandedOptions.has(optionIndex) ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <div>
                    <div className="font-medium text-sm text-gray-700">
                      {option.optionTitle || `選項 ${optionIndex + 1}`}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span>{optionTypes.find(type => type.value === option.optionType)?.icon}</span>
                      <span>{optionTypes.find(type => type.value === option.optionType)?.label}</span>
                      <span className="text-gray-400">•</span>
                      <span>{option.optionDetails?.length || 0} 個選項</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(optionIndex);
                  }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="刪除選項"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>              {/* Expanded Option Content */}
              {expandedOptions.has(optionIndex) && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <div className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          選項標題
                        </label>
                        <input
                          type="text"
                          value={option.optionTitle}
                          onChange={(e) => handleOptionChange(optionIndex, 'optionTitle', e.target.value)}
                          placeholder="例如：尺寸、顏色、服務類型"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          選項類型
                        </label>
                        <select
                          value={option.optionType}
                          onChange={(e) => handleOptionChange(optionIndex, 'optionType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        >
                          {optionTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.icon} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Option type description */}
                    <div className="flex items-start gap-1 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <InformationCircleIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>
                        {optionTypes.find(type => type.value === option.optionType)?.description}
                      </span>
                    </div>
                  </div>

                  {/* Option Details */}
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-gray-600">選項內容</label>
                      <button
                        type="button"
                        onClick={() => handleAddOptionDetail(optionIndex)}
                        className="flex items-center gap-1 px-2 py-1 bg-white text-purple-600 border border-purple-200 rounded hover:bg-purple-50 transition-colors text-xs"
                      >
                        <PlusIcon className="w-3 h-3" />
                        新增
                      </button>                    </div>

                    {option.optionDetails.map((detail, detailIndex) => {
                      const detailKey = `${optionIndex}-${detailIndex}`;
                      const isDetailExpanded = expandedDetails.has(detailKey);
                      
                      return (
                        <div key={detailIndex} className="bg-white rounded border">
                          {/* Collapsible Detail Header */}
                          <div 
                            className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleDetailExpanded(optionIndex, detailIndex)}
                          >
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                {isDetailExpanded ? (
                                  <ChevronUpIcon className="w-3 h-3 text-gray-600" />
                                ) : (
                                  <ChevronDownIcon className="w-3 h-3 text-gray-600" />
                                )}
                              </button>
                              <div>
                                <div className="text-sm font-medium text-gray-700">
                                  {detail.name || `選項 ${detailIndex + 1}`}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  {detail.tag && <span className="bg-blue-100 text-blue-600 px-1 rounded text-xs">{detail.tag}</span>}
                                  {detail.additionalPrice > 0 && <span>+${detail.additionalPrice}</span>}
                                  {!detail.tag && detail.additionalPrice === 0 && <span>基本選項</span>}
                                </div>
                              </div>
                            </div>

                            {option.optionDetails.length > 1 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveOptionDetail(optionIndex, detailIndex);
                                }}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                title="刪除此選項"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>                          {/* Expanded Detail Content */}
                          {isDetailExpanded && (
                            <div className="px-3 pb-3 border-t border-gray-100 space-y-3">
                              <div className="pt-3 space-y-3">
                                {/* Name and Tag Row */}
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">選項名稱</label>
                                    <input
                                      type="text"
                                      value={detail.name}
                                      onChange={(e) => handleOptionDetailChange(optionIndex, detailIndex, 'name', e.target.value)}
                                      placeholder={
                                        option.optionType === 'dropdown' ? '例如：30分鐘、45分鐘' :
                                        option.optionType === 'multiple selection' ? '例如：綁紅線、額外服務' :
                                        option.optionType === 'detail card' ? '例如：RETURN TO ME' :
                                        option.optionType === 'horizontal detail card' ? '例如：小、中、大' :
                                        '選項名稱'
                                      }
                                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                                    />
                                  </div>
                                  <div className="w-full sm:w-20">
                                    <label className="block text-xs text-gray-500 mb-1">標籤</label>
                                    <input
                                      type="text"
                                      value={detail.tag}
                                      onChange={(e) => handleOptionDetailChange(optionIndex, detailIndex, 'tag', e.target.value)}
                                      placeholder="熱門"
                                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                                    />
                                  </div>
                                </div>
                                
                                {/* Price Row */}
                                <div className="w-full sm:w-32">
                                  <label className="block text-xs text-gray-500 mb-1">加價</label>
                                  <div className="relative">
                                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">+$</span>
                                    <input
                                      type="number"
                                      value={detail.additionalPrice}
                                      onChange={(e) => handleOptionDetailChange(optionIndex, detailIndex, 'additionalPrice', parseInt(e.target.value) || 0)}
                                      min="0"
                                      step="1"
                                      className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Description field */}
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  描述 
                                  {(option.optionType === 'detail card' || option.optionType === 'horizontal detail card') && 
                                    <span className="text-purple-600 ml-1">(重要：卡片佈局會顯示此描述)</span>
                                  }
                                </label>
                                <textarea
                                  value={detail.description}
                                  onChange={(e) => handleOptionDetailChange(optionIndex, detailIndex, 'description', e.target.value)}
                                  placeholder={
                                    option.optionType === 'dropdown' ? '例如：30分鐘電話占卜服務' :
                                    option.optionType === 'multiple selection' ? '例如：月老紅線加持，增強愛情連結' :
                                    option.optionType === 'detail card' ? '例如：適合復合&修復關係 | 鎖住對方的心&牽起紅線' :
                                    option.optionType === 'horizontal detail card' ? '例如：4小時、15小時、30小時' :
                                    '選項的詳細描述...'
                                  }
                                  rows={2}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {confirmDialog.title}
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {confirmDialog.message}
              </p>
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={confirmDialog.onCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                確定刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptionsEditor;
