import { Tag } from '@framework/types';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { useModalAction } from '@components/common/modal/modal.context';

interface Props {
  data: string;
  className?: string;
}

const TagLabel: React.FC<Props> = ({ className, data }) => {
  const router = useRouter();
  const { closeModal } = useModalAction();
  function changeTags() {
    closeModal();
    router.push(ROUTES.SEARCH);
  }
  return (
    <div
      className={cn(
        'font-medium text-13px md:text-sm rounded hover:bg-fill-four block border border-sink-base px-2 py-1 transition',
        className
      )}
      role="button"
      onClick={changeTags}
    >
      {data}
    </div>
  );
};

export default TagLabel;
