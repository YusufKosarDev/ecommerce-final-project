function FormField({ id, label, error, children, hint }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold text-dark">
        {label}
      </label>

      {children}

      {hint && !error && <p className="text-xs text-muted">{hint}</p>}

      {error && (
        <p role="alert" className="text-xs font-bold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
