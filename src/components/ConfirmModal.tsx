"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";

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
  return (
    <Dialog open={isOpen} onClose={onCancel} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-tranparent">
        <DialogPanel className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl transition-all">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </DialogTitle>
          <Description className="text-gray-600 mb-4">{message}</Description>

          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition cursor-pointer"
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
