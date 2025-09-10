import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div
        className="absolute w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
        }}
        className="bg-white p-6 rounded-lg shadow-lg z-10  w-full lg:max-w-5xl  mx-4 md:p-12"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
