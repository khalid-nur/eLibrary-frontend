import { motion } from "framer-motion";

interface ActionModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  confirmColor?: string;
  disableConfirm?: boolean;
}

const ActionModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  disableConfirm,
  confirmText = "Confirm",
  confirmColor = "bg-blue-600 text-white",
}: ActionModalProps) => {
  return (
    <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="absolute w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg z-10 w-full max-w-sm mx-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{message}</p>

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-lg hover:opacity-90 ${confirmColor} ${
              disableConfirm ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={disableConfirm}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ActionModal;
