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
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    const fullNumber = prefix + newPhoneNumber;
    onChange({ target: { name, value: fullNumber } });
  };

  return (
    <div className={className}>
      {showLabel && (
        <label className="block text-gray-700 mb-2" htmlFor={id}>
          {label} {required && '*'}
        </label>
      )}
      <div className="flex">
        {/* Country Prefix Dropdown */}
        <div className="relative">
          <select
            value={prefix}
            onChange={(e) => handlePrefixChange(e.target.value)}
            className="h-full px-3 py-2 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:z-10"
          >
            {countryPrefixes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
        </div>
        
        {/* Phone Number Input */}
        <input
          type="tel"
          id={id}
          name={name}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="12345678"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:z-10"
          required={required}
        />
      </div>
      
      {/* Display full number for reference */}
      {phoneNumber && (
        <div className="mt-1 text-xs text-gray-500">
          完整號碼: {prefix}{phoneNumber}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
