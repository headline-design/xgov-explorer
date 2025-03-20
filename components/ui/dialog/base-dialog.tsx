import React, { useState, useEffect, useRef, FocusEventHandler } from "react";
import Portal from "../portal";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/lib/hooks/use-media-query";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClass?: string;
  dialogWidth?: string;
  unstyledModal?: boolean;
};

const BaseDialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  backdropClass,
  unstyledModal = false,
  dialogWidth = "450px",
  children,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const focusGuardBefore = useRef<HTMLDivElement | null>(null);
  const focusGuardAfter = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useMediaQuery();

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFocusTrap = (e: FocusEvent) => {
    if (e.target === focusGuardAfter.current) {
      modalRef.current?.focus();
    }
    if (e.target === focusGuardBefore.current) {
      modalRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.right = "unset";
      document.documentElement.style.borderRight = "19px";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.scrollBehavior = "auto";

      modalRef.current?.focus();
    } else {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("right");
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("scroll-behavior");
      document.documentElement.style.removeProperty("border-right");
    }
    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("right");
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("scroll-behavior");
      document.documentElement.style.removeProperty("border-right");
    };
  }, [isOpen]);



  if (!isOpen) return null;

  if (isMobile) {
    return (
      <Portal selector="modal-root">
        <div
          id="modal-backdrop"
          className="fixed inset-0 z-40 bg-backdrop-1"
          onClick={handleClose}
        >
          <div
            className="focus-guard"
            tabIndex={0}
            ref={focusGuardBefore}
            onFocus={
              handleFocusTrap as unknown as FocusEventHandler<HTMLDivElement>
            }
          />

          {/* Modal content */}

          <div
            style={{ width: "100%" }}
            className={cn(
              "rust-dialog",
              "fixed bottom-0 left-0 right-0 z-50 mt-24 w-full overflow-hidden rounded-t-[10px] border-t bg-background",
              className,
            )}
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-header"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
          <div
            className="focus-guard"
            tabIndex={0}
            ref={focusGuardAfter}
            onFocus={
              handleFocusTrap as unknown as FocusEventHandler<HTMLDivElement>
            }
          />
        </div>
      </Portal>
    );
  }

  return (
    <Portal selector="modal-root">
      <div className={styles.dialogBackdrop} onClick={handleClose} />
      <div
        id="modal-backdrop"
        className={cn(styles.dialogOverlay, backdropClass)}
        onClick={handleClose}
      >
        <div
          className="focus-guard"
          tabIndex={0}
          ref={focusGuardBefore}
          onFocus={
            handleFocusTrap as unknown as FocusEventHandler<HTMLDivElement>
          }
        />

        {/* Modal content */}

        <div
          data-state={isOpen ? "open" : "closed"}
          style={{ width: dialogWidth }}
          className={cn(
            unstyledModal ? "" : styles.dialogWrapper,
            className,
            dialogWidth ? "" : "max-w-md",
          )}
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-header"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
        <div
          className="focus-guard"
          tabIndex={0}
          ref={focusGuardAfter}
          onFocus={
            handleFocusTrap as unknown as FocusEventHandler<HTMLDivElement>
          }
        />
      </div>
    </Portal>
  );
};

export default BaseDialog;
