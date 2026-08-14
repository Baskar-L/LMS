import { FiInbox } from "react-icons/fi";

const EmptyState = ({
  title = "No Data Found",
  description = "Nothing to display",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <FiInbox
        size={60}
        className="text-gray-400"
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;