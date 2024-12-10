import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';
import { useUser } from '@rest/user';
import { useEffect, useState } from 'react';

const AddressPage: React.FC = () => {
  let { me, isLoading } = useUser();
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, [isLoading]);

  if (!showChild) {
    return null;
  }
  return (
    <AddressGrid address={me?.address} />
  )
};

export default AddressPage;
