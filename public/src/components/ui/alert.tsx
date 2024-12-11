interface AlertProps {
  message?: string;
  className?: string;
  textColor?: string;
  borderColor?: string;
}

const Alert: React.FC<AlertProps> = ({
  message,
  className,
  textColor = 'text-brand-danger',
  borderColor = 'border-brand-danger',
}) => {
  return (
    <div
      className={`w-full h-full py-4 px-5 text-13px md:text-sm ${textColor} font-semibold flex items-center justify-center border ${borderColor}/40 rounded ${className}`}
    >
      {message}
    </div>
  );
};

export default Alert;
