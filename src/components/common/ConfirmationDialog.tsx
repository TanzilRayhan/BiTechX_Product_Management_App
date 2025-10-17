'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#A44A3F]/10">
          <AlertTriangle className="h-8 w-8 text-[#A44A3F]" />
        </div>
        <h3 className="mt-6 text-xl font-bold text-[#0D1821]">{title}</h3>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{message}</p>
      </div>

      <div className="mt-8 flex gap-3 justify-end">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-6 py-2.5 bg-white border-2 border-gray-300 text-[#0D1821] rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="px-6 py-2.5 bg-[#A44A3F] text-white rounded-lg hover:bg-[#A44A3F]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </Modal>
  );
};
