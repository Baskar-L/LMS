const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-3 text-sm text-gray-600">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="primary-btn"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;