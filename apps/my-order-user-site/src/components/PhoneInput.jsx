import { useState } from 'react';

const PhoneInput = ({ 
  value = '', 
  onChange, 
  name = 'phone', 
  id = 'phone', 
  required = false, 
  className = '',
  label = '電話號碼',
  showLabel = true 
}) => {
  // Initialize prefix and phone number from the value prop
  const initializePhoneData = (inputValue) => {
    if (inputValue && inputValue.startsWith('+')) {
      const prefixMatch = countryPrefixes.find(p => inputValue.startsWith(p.code));
      if (prefixMatch) {
        return {
          prefix: prefixMatch.code,
          number: inputValue.substring(prefixMatch.code.length)
        };
      }
    }
    return {
      prefix: '+852',
      number: inputValue || ''
    };
  };

  const countryPrefixes = [
    { code: '+852', country: '香港', flag: '🇭🇰' },
    { code: '+86', country: '中國', flag: '🇨🇳' },
    { code: '+886', country: '台灣', flag: '🇹🇼' },
    { code: '+65', country: '新加坡', flag: '🇸🇬' },
    { code: '+60', country: '馬來西亞', flag: '🇲🇾' },
    { code: '+1', country: '美國/加拿大', flag: '🇺🇸' },
    { code: '+44', country: '英國', flag: '🇬🇧' },
    { code: '+61', country: '澳洲', flag: '🇦🇺' },
    { code: '+81', country: '日本', flag: '🇯🇵' },
    { code: '+82', country: '韓國', flag: '🇰🇷' }
  ];

  const initialData = initializePhoneData(value);
  const [prefix, setPrefix] = useState(initialData.prefix);
  const [phoneNumber, setPhoneNumber] = useState(initialData.number);

  const handlePrefixChange = (newPrefix) => {
    setPrefix(newPrefix);
    const fullNumber = newPrefix + phoneNumber;
    onChange({ target: { name, value: fullNumber } });
  };
  const handlePhoneNumberChange = (e) => {
    let newPhoneNumber = e.target.value;
    // Allow only numbers, spaces, hyphens, and parentheses
    newPhoneNumber = newPhoneNumber.replace(/[^\d\s\-\(\)]/g, '');
    setPhoneNumber(newPhoneNumber);
    const fullNumber = prefix + newPhoneNumber;
    onChange({ target: { name, value: fullNumber } });
  };

  // Simple validation for phone number length
  const isValidPhoneNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  const phoneNumberValid = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;
  return (
    <div className={className}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}      <div className="relative group">
        <div className={`flex rounded-lg shadow-sm border transition-all duration-200 hover:border-gray-400 w-full max-w-full ${
          phoneNumber && !phoneNumberValid 
            ? 'border-red-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500' 
            : phoneNumber && phoneNumberValid 
            ? 'border-green-300 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500'
            : 'border-gray-300 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500'
        }`}>          {/* Country Prefix Dropdown */}
          <div className="flex-shrink-0">
            <select
              value={prefix}
              onChange={(e) => handlePrefixChange(e.target.value)}
              className="h-full px-3 py-3 pr-7 border-0 bg-gray-50 text-gray-700 rounded-l-lg focus:outline-none focus:bg-white focus:ring-0 cursor-pointer text-sm font-medium w-24 sm:w-28 appearance-none hover:bg-gray-100 transition-colors duration-200"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '0.875rem 0.875rem'
              }}>
              {countryPrefixes.map((country) => (
                <option key={country.code} value={country.code} className="py-2">
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
          </div>
            {/* Elegant Separator */}
          <div className="w-px bg-gray-300 self-stretch my-2 flex-shrink-0"></div>
          
          {/* Phone Number Input */}
          <input
            type="tel"
            id={id}
            name={name}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="請輸入電話號碼"
            className="flex-1 min-w-0 px-3 py-3 border-0 rounded-r-lg focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 text-sm bg-white"
            required={required}
          />
          
          {/* Validation icon */}
          {phoneNumber && (
            <div className="flex items-center pr-2 flex-shrink-0">
              {phoneNumberValid ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          )}
        </div>
        
        {/* Country name tooltip on hover */}
        <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{countryPrefixes.find(c => c.code === prefix)?.flag}</span>
              <span>{countryPrefixes.find(c => c.code === prefix)?.country}</span>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute bottom-full left-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
          </div>
        </div>
      </div>      {/* Display full number with enhanced styling and validation */}
      {phoneNumber && (
        <div className="mt-3">
          <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs rounded-lg px-3 py-3 border transition-all duration-200 ${
            phoneNumberValid 
              ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="flex items-center space-x-1">
                <svg className={`w-4 h-4 ${phoneNumberValid ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {phoneNumberValid ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span className="font-medium text-gray-700">完整號碼:</span>
              </div>
              <span className="font-mono text-gray-900 bg-white px-2 py-1 rounded border text-sm break-all">
                {prefix}{phoneNumber}
              </span>
            </div>
            <div className={`flex items-center space-x-1 ${phoneNumberValid ? 'text-green-600' : 'text-red-600'}`}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-xs font-medium">
                {phoneNumberValid ? '有效格式' : '格式錯誤'}
              </span>
            </div>
          </div>
          {!phoneNumberValid && (
            <div className="mt-2 text-xs text-red-600 flex items-start space-x-1">
              <svg className="w-3 h-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>電話號碼長度應為 7-15 位數字</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
