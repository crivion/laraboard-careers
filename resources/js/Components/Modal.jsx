import React, { useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { Transition } from "@headlessui/react";

export default function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => { },
}) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : null;
  }, [show]);

  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === "Escape" && props.show) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    };
  }, []);

  const maxWidthClass = {
    xs: "max-w-xs",
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[maxWidth];

  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <Transition show={show} leave="duration-200">
      <div className="fixed inset-0 overflow-y-auto overflow-scroll h-full flex items-center justify-center px-4 py-6 sm:px-0 z-[99999]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 transform transition-all"
            onClick={close}
          >
            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
          </div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg overflow-x-hidden overflow-y-scroll shadow-xl transform transition-all w-full max-h-96 md:max-h-full mx-auto ${maxWidthClass}`}
          >
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>,
    modalRoot
  );
}
