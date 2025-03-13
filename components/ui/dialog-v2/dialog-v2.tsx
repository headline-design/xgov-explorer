"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import useTabletQuery from "@/lib/hooks/use-tablet-query";

const DialogV2 = ({
    unstyledModal = false,
    children,
    showModal,
    setShowModal,
    modalActions,
    closeAction = true,
    footer = false,
    closeLabel = "Cancel",
    className,
    onClose,
    preventDefaultClose,
    title,
    description,
    header,
    backdropClass,
    handle = false,
    dialogWidth,
    dialogStack = false,
}: {
    unstyledModal?: boolean;
    children: React.ReactNode;
    showModal?: boolean;
    title?: string;
    description?: string;
    header?: boolean;
    footer?: boolean;
    setShowModal?: Dispatch<SetStateAction<boolean>>;
    className?: string;
    modalActions?: React.ReactNode;
    closeAction?: boolean;
    onClose?: () => void;
    closeLabel?: string;
    preventDefaultClose?: boolean;
    backdropClass?: string;
    handle?: boolean;
    dialogWidth?: string;
    dialogStack?: boolean;
}) => {
    const router = useRouter();

    const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
        if (preventDefaultClose && !dragged) {
            return;
        }
        // fire onClose event if provided
        if (onClose) {
            onClose();
        }

        // if setShowModal is defined, use it to close modal
        if (setShowModal) {
            setShowModal(false);
            // else, this is intercepting route @modal
        } else {
            router.back();
        }
    };
    const { isTablet } = useTabletQuery();

    const renderDialogHeader = () => {
        return (
            <>
                {title ? (
                    header && !description ? (
                        <header className="flex flex-col items-start justify-center space-y-3 border-b bg-accents-1 px-6 py-5">
                            <DialogPrimitive.Title asChild>
                                <h3 className="text-lg font-medium">{title}</h3>
                            </DialogPrimitive.Title>
                        </header>
                    ) : header && description ? (
                        <header className="mb-6 flex flex-col items-start justify-center border-b-transparent bg-inherit">
                            <DialogPrimitive.Title asChild>
                                <h3 className="text-2xl font-semibold">{title}</h3>
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Description asChild>
                                <p className="text-base">{description}</p>
                            </DialogPrimitive.Description>
                        </header>
                    ) : (
                        <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
                    )
                ) : null}
            </>
        );
    };

    const renderDrawerHeader = () => {
        return (
            <>
                {title ? (
                    header && !description ? (
                        <header className="flex flex-col items-start justify-center space-y-3 border-b bg-accents-1 px-6 py-5">
                            <Drawer.Title asChild>
                                <h3 className="text-lg font-medium">{title}</h3>
                            </Drawer.Title>
                        </header>
                    ) : header && description ? (
                        <header className="mb-6 flex flex-col items-start justify-center border-b-transparent bg-inherit">
                            <Drawer.Title asChild>
                                <h3 className="text-2xl font-semibold">{title}</h3>
                            </Drawer.Title>
                            <Drawer.Description asChild>
                                <p className="text-base">{description}</p>
                            </Drawer.Description>
                        </header>
                    ) : (
                        <Drawer.Title>{title}</Drawer.Title>
                    )
                ) : null}
            </>
        );
    };

    const renderDialogFooter = () => {
        return (
            <div className="modal-actions sticky bottom-0 flex items-center justify-between rounded-b-lg border-t bg-accents-1 p-4 text-center">
                {closeAction && (
                    <Button variant="outline" onClick={() => closeModal()} >
                        {closeLabel}
                    </Button>
                )}
                {modalActions}
            </div>
        );
    };

    const renderDrawerContent = () => {
        return (
            <>
                {title && description && header ? (
                    <>
                        <div className="overflow-y-auto p-6">
                            {renderDrawerHeader()}
                            {children}
                        </div>
                        {footer && <>      {renderDialogFooter()} </>}
                    </>
                ) : (
                    <>
                        {renderDrawerHeader()}
                        {children}
                        {footer && <>      {renderDialogFooter()} </>}
                    </>
                )}
            </>
        );
    };

    const renderDialogContent = () => {
        return (
            <>
                {title && description && header ? (
                    <>
                        <div className="overflow-y-auto p-6">
                            {renderDialogHeader()}
                            {children}
                        </div>
                        {footer && <>      {renderDialogFooter()} </>}
                    </>
                ) : (
                    <>
                        {renderDialogHeader()}
                        {children}
                        {footer && <>      {renderDialogFooter()} </>}
                    </>
                )}
            </>
        );
    };

    if (isTablet) {
        return (
            <Drawer.Root
                dismissible={dialogStack ? false : true}
                open={setShowModal ? showModal : true}
                onOpenChange={(open) => {
                    if (!open && !dialogStack) {
                        closeModal({ dragged: true });
                    }
                }}
            >
                <Drawer.Overlay className="fixed inset-0 z-[60] bg-backdrop-1" />
                <Drawer.Portal>
                    <Drawer.Content
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        className={cn(
                            "rust-dialog",
                            "fixed bottom-0 left-0 right-0 z-[70] mt-24 w-full overflow-hidden rounded-t-[10px] border-t bg-background",
                            className,
                        )}
                    >
                        {handle && (
                            <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
                                <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
                            </div>
                        )}
                        {renderDrawerContent()}
                    </Drawer.Content>
                    <Drawer.Overlay />
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

    return (
        <DialogPrimitive.Root
            open={setShowModal ? showModal : true}
            onOpenChange={(open) => {
                if (!open) {
                    setTimeout(() => closeModal(), 300);
                    closeModal();
                }
            }}
        >
            <DialogPrimitive.Portal>
                <div className={styles.dialogBackdrop} />
                <DialogPrimitive.Overlay
                    id="modal-backdrop"
                    className={cn(styles.dialogOverlay, backdropClass)}
                >
                    <div tabIndex={-1}>
                        <DialogPrimitive.Content
                            style={{ width: dialogWidth }}

                            className={cn(
                                unstyledModal ? "" : styles.dialogWrapper,
                                className,
                                dialogWidth ? "" : "max-w-3xl",
                            )}
                        >
                            {renderDialogContent()}
                        </DialogPrimitive.Content>
                    </div>
                </DialogPrimitive.Overlay>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};

export default DialogV2;


