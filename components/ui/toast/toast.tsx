import { toast as sonnerToast } from "sonner";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { IconClose } from "@/icons/close";

// Common interface for toast data
interface ToastData {
  message?: string;
  title?: string;
  description?: string;
  action?: any;
}

type ToastInput = string | ToastData;

// Helper function to normalize input
function normalizeToastData(input: ToastInput): ToastData {
  if (typeof input === "string") {
    return { message: input };
  }
  return input;
}

// Default toast component
const DefaultToast = ({
  data,
  dismiss,
}: {
  data: ToastData;
  dismiss: () => void;
}) => (
  <div className={styles.toastContainer}>
    <div className={styles.toastMessageWrapper}>
      <div className={styles.toastMessage}>
        <span>
          <div className={styles.toastStack} data-version="v1">
            <div className={styles.toastStack}>
              {data.title && (
                <p className={styles.toastTitle} data-version="v1">
                  {data.title}
                </p>
              )}
              {data.description && (
                <p className={styles.toastDescription} data-version="v1">
                  {data.description}
                </p>
              )}
              {data.message && <span>{data.message}</span>}
            </div>
          </div>
        </span>

        <div className={styles.toastActionsContainer}>
          <button className={styles.actionButton} onClick={dismiss}>
            <div className={styles.actionButtonContent}>
              <IconClose className={styles.actionButtonIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SuccessToast = ({
  data,
  dismiss,
}: {
  data: ToastData;
  dismiss: () => void;
}) => (
  <div className={cn(styles.toastContainer, styles.successContainer)}>
    <div className={styles.toastMessageWrapper}>
      <div className={styles.toastMessage}>
        <span>{data.message}</span>
        <div className={styles.toastActionsContainer}>
          <button className={styles.actionButton} onClick={dismiss}>
            <div className={styles.actionButtonContent}>
              <IconClose className={styles.actionButtonIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ErrorToast = ({
  data,
  dismiss,
}: {
  data: ToastData;
  dismiss: () => void;
}) => (
  <div className={cn(styles.toastContainer, styles.errorContainer)}>
    <div className={styles.toastMessageWrapper}>
      <div className={styles.toastMessage}>
        <span>{data.message}</span>
        <div className={styles.toastActionsContainer}>
          {data?.action && (
            <button className={styles.actionButton} onClick={data.action.onClick}>
              <div className={styles.actionButtonContent}>
               {data.action.label}
              </div>
            </button>
          )}
          <button className={styles.actionButton} onClick={dismiss}>
            <div className={styles.actionButtonContent}>
              <IconClose className={styles.actionButtonIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const WarningToast = ({
  data,
  dismiss,
}: {
  data: ToastData;
  dismiss: () => void;
}) => (
  <div className={cn(styles.toastContainer, styles.warningContainer)}>
    <div className={styles.toastMessageWrapper}>
      <div className={styles.toastMessage}>
        <span>{data.message}</span>
        <div className={styles.toastActionsContainer}>
          <button className={styles.actionButton} onClick={dismiss}>
            <div className={styles.actionButtonContent}>
              <IconClose className={styles.actionButtonIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export function toast(input: ToastInput) {
  const data = normalizeToastData(input);
  return sonnerToast.custom(
    (t) => (
      <DefaultToast
        data={data}
        dismiss={() => sonnerToast.dismiss((t as any).id)}
      />
    ),
    { duration: 5000 },
  );
}

// Extending the toast function with specific types
toast.success = (input: ToastInput) => {
  const data = normalizeToastData(input);
  return sonnerToast.custom(
    (t) => (
      <SuccessToast
        data={data}
        dismiss={() => sonnerToast.dismiss((t as any).id)}
      />
    ),
    { duration: 5000 },
  );
};

toast.error = (input: ToastInput) => {
  const data = normalizeToastData(input);
  return sonnerToast.custom(
    (t) => (
      <ErrorToast
        data={data}
        dismiss={() => sonnerToast.dismiss((t as any).id)}
      />
    ),
    { duration: 5000 },
  );
};

toast.warning = (input: ToastInput) => {
  const data = normalizeToastData(input);
  return sonnerToast.custom(
    (t) => (
      <WarningToast
        data={data}
        dismiss={() => sonnerToast.dismiss((t as any).id)}
      />
    ),
    { duration: 5000 },
  );
};

toast.promise = (
  promise: Promise<any>,
  messages: {
    loading?: string;
    success?: ToastInput;
    error?: ToastInput;
  },
) => {
  return sonnerToast.promise(promise, {
    loading: messages.loading && (
      <DefaultToast
        data={{ message: messages.loading }}
        dismiss={() => sonnerToast.dismiss()}
      />
    ),
    success: messages.success && (
      <SuccessToast
        data={normalizeToastData(messages.success)}
        dismiss={() => sonnerToast.dismiss()}
      />
    ),
    error: messages.error && (
      <ErrorToast
        data={normalizeToastData(messages.error)}
        dismiss={() => sonnerToast.dismiss()}
      />
    ),
  });
};
