const SectionTitle = ({
  children,
  centered = false,
  className = "",
  subtitle = "",
}) => {
  return (
    <div className={`mb-6 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl font-bold text-gray-800">{children}</h2>
      {subtitle && <p className="mt-2 text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
