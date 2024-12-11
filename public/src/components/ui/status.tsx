export const Status: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <span className={item?.status?.name?.replace(/\s/g, '_').toLowerCase()}>
      <span
        className={`bullet ${
          item === 'Pending'
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-green-100 text-accent'
        }`}
      />
      {item}
    </span>
  );
};
