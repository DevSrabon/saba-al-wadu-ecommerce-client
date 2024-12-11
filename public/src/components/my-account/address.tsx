import Layout from '@components/layout/layout';
import AddressGrid from '@components/address/address-grid';
import { useAddressQuery } from '@framework/address/address';
import { useUser } from '@rest/user';
import { getLayout } from '@components/layout/layout-five';

export default function AccountDetailsPage() {
  let { me, isLoading } = useUser();
  return (
    <div className="pt-4">
      {!isLoading ? (
        <AddressGrid address={me?.address} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

AccountDetailsPage.getLayout = getLayout;
