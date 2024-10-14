interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return error ? <p className="text-red-500 mb-4">{error}</p> : null;
}
