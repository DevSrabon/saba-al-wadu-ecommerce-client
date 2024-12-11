import Alert from '@components/ui/alert';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';
import { useCategories } from '@rest/categories';

interface CategoryDropdownProps {
  className?: string;
}

export default function CategoryDropdownMenu({
  className,
}: CategoryDropdownProps) {
  const { categories, error, isLoading } = useCategories();

  return (
    <div className={cn('absolute z-30', className)}>
      <div className="max-h-full overflow-hidden">
        {error ? (
          <div className="2xl:ltr:pr-4">
            <Alert message={error.message} />
          </div>
        ) : isLoading ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <CategoryListCardLoader
              key={`category-list-${idx}`}
              uniqueKey="category-list-card-loader"
            />
          ))
        ) : (
          <CategoryMenu items={categories.slice(0, 9)} />
        )}
      </div>
    </div>
  );
}
