import SectionHeader from '@components/common/section-header';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import Alert from '@components/ui/alert';
import CategoryListCard from '@components/cards/category-list-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useCategories } from '@rest/categories';
import { ICategories } from 'src/types';

interface CategoriesProps {
  className?: string;
  variant?: 'antique';
}

const breakpoints = {
  '1480': {
    slidesPerView: 5,
  },
  '920': {
    slidesPerView: 3,
  },
  '600': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const CategoryGridListBlock: React.FC<CategoriesProps> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20',
  variant,
}) => {
  const { width } = useWindowSize();
  const { categories, error, isLoading } = useCategories();

  return (
    <div className={cn(className)}>
      <div className={'pt-0.5 pb-1.5'}>
        <SectionHeader
          sectionHeading="text-choose-categories"
          sectionSubHeading="text-favorite-different-categories"
          headingPosition="center"
        />

        <div className="-mt-1.5 md:-mt-2">
          {error ? (
            <Alert message={error?.message} />
          ) : width! < 1280 ? (
            <>
              <Carousel
                breakpoints={breakpoints}
                grid={{ rows: 3, fill: 'row' }}
                className="-mx-1.5 md:-mx-2"
                prevButtonClassName="-left-2 md:-left-2.5"
                nextButtonClassName="-right-2 lg:-right-2.5"
              >
                {isLoading && !categories?.length
                  ? Array.from({ length: 18 }).map((_, idx) => {
                      return (
                        <SwiperSlide
                          className="p-1.5 md:p-2"
                          key={`category--key-${idx}`}
                        >
                          <CategoryListCardLoader
                            uniqueKey={`category-card-${idx}`}
                          />
                        </SwiperSlide>
                      );
                    })
                  : categories?.map((category: ICategories) => (
                      <SwiperSlide
                        key={`category--key-${category.id}`}
                        className="p-1.5 md:p-2"
                      >
                        <CategoryListCard
                          category={category}
                          href={{
                            pathname: ROUTES.SEARCH,
                            query: { category: category.cate_slug },
                          }}
                          className="rounded-md text-brand-light shadow-category"
                        />
                      </SwiperSlide>
                    ))}
              </Carousel>
            </>
          ) : (
            <div className="flex-wrap justify-center -mx-1 xl:flex">
              {isLoading && !categories?.length
                ? Array.from({ length: 18 }).map((_, idx) => {
                    return (
                      <div
                        key={`category--key-${idx}`}
                        className="w-[25%] 2xl:w-[20%] 3xl:w-[16.666%] shrink-0 p-2"
                      >
                        <CategoryListCardLoader
                          uniqueKey={`category-card-${idx}`}
                        />
                      </div>
                    );
                  })
                : categories?.map((category: ICategories) => (
                    <div
                      key={`category--key-${category.id}`}
                      className="w-[25%] 2xl:w-[20%] 3xl:w-[16.666%] shrink-0 p-2"
                    >
                      <CategoryListCard
                        category={category}
                        href={{
                          pathname: ROUTES.SEARCH,
                          query: { category: category.cate_slug },
                        }}
                        className="rounded-md text-brand-light shadow-category"
                      />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGridListBlock;
