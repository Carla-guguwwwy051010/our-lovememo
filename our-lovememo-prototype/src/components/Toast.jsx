function Toast({ message, actionLabel, onAction }) {
  if (!message) return null;

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-50 w-[calc(100%-32px)] max-w-sm -translate-x-1/2">
      <div className="pointer-events-auto rounded-[24px] border-[3px] border-white bg-white/95 p-4 shadow-sticker">
        <p className="text-sm text-softBlack">{message}</p>
        {actionLabel ? <button
          type="button"
          onClick={onAction}
          className="mt-3 rounded-full bg-peach px-4 py-2 text-xs font-semibold text-softBlack"
        >
          {actionLabel}
        </button> : null}
      </div>
    </div>
  );
}

export default Toast;
