"use client"; // Client-side component

import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { IoCloseSharp } from "react-icons/io5";

type DialogProps = {
  isopen: boolean;
  onchange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

const CustomDialog = ({ isopen, onchange, title, description, children }: DialogProps) => {
  return (
    <Dialog.Root open={isopen} onOpenChange={onchange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />

        {/* Main Content Container */}
        <Dialog.Content
          className={twMerge(
            "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
            "w-full md:w-[90vw] md:max-w-[550px] h-full md:h-auto md:max-h-[85vh]",
            "bg-neutral-800 border border-neutral-700 rounded-md p-[25px]",
            "drop-shadow-md focus:outline-none overflow-y-auto scroll-smooth",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" // Scrollbar hide
          )}
        >
          {/* Title */}
          <Dialog.Title className="text-white text-xl font-bold mb-4 text-center">
            {title}
          </Dialog.Title>

          {/* Description */}
          <Dialog.Description className="text-white text-center mb-5 leading-normal text-sm">
            {description}
          </Dialog.Description>

          {/* Scrollable Children */}
          <div className="max-h-[60vh] overflow-y-auto scroll-smooth">
            {children}
          </div>

          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 inline-flex items-center justify-center text-white hover:text-gray-300"
              onClick={() => onchange(false)}
              aria-label="Close"
            >
              <IoCloseSharp size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CustomDialog;