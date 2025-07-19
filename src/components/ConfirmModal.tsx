"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { Fragment, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const cancelRef = useRef(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onCancel}
          as={Fragment}
          initialFocus={cancelRef}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
              key="confirm-modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.40 }}
              className="w-full max-w-md px-4"
            >
              <DialogPanel className="bg-white rounded-2xl p-6 shadow-xl transition-all">
                <DialogTitle className="text-xl font-semibold text-gray-800 mb-2">
                  {title}
                </DialogTitle>
                <Description className="text-gray-600 text-sm mb-6 leading-relaxed">{message}</Description>

                <div className="flex justify-end gap-3">
                  <button
                    ref={cancelRef}
                    onClick={onCancel}
                    className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition cursor-pointer"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition shadow-sm cursor-pointer"
                  >
                    {confirmText}
                  </button>
                </div>
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
