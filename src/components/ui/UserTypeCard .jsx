const UserTypeCard = ({ type, onSelect }) => {
  const IconComponent = type.icon;

  return (
    <div
      onClick={() => onSelect(type.id)}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-orange-200"
    >
      <div
        className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-6 mx-auto`}
      >
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        {type.title}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">
        {type.description}
      </p>
    </div>
  );
};

export default UserTypeCard;
