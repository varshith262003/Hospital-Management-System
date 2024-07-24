/* eslint-disable react/prop-types */

const LocalInput = ({ ...props }) => {
    const uniqueId = Math.random().toString(36).substring(7);
    return (
      <div className="flex flex-col items-start w-full">
        <label className="font-medium text-sm" htmlFor={uniqueId}>{props.placeholder}</label>
        <input
          {...props}
          id={uniqueId}
          className="w-full border-gray-300 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:border-0 p-2"
        />
      </div>
    );
  };

export default LocalInput;