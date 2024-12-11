import React, { useState } from 'react';
import cn from 'classnames';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { debounce } from 'lodash';
import { useSearchProducts } from '@rest/product';

type Props = {
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border',
    },
    ref
  ) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const { products, isLoading } = useSearchProducts({
      name: search,
    });
    useFreezeBodyScroll(
      inputFocus === true || displaySearch || displayMobileSearch
    );
    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
    }
    const debouncedSearch = React.useRef(
      debounce((criteria: string) => {
        setSearch(criteria);
      }, 1000)
    ).current;

    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
      debouncedSearch(e.currentTarget.value);
    }
    function clear() {
      setSearchText('');
      setSearch('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    React.useEffect(() => {
      return () => {
        debouncedSearch.cancel();
      };
    }, [debouncedSearch]);

    return (
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div
          className={cn(
            'overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 transition-all duration-300 fixed',
            {
              open: displayMobileSearch,
              'input-focus-overlay-open': inputFocus === true,
              'open-search-overlay': displaySearch,
            }
          )}
          onClick={() => clear()}
        />
        {/* End of overlay */}

        <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
          <div className="flex flex-col w-full mx-auto">
            <SearchBox
              searchId={searchId}
              name="search"
              value={searchText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={() => enableInputFocus()}
              variant={variant}
            />
          </div>
          {/* End of searchbox */}

          {search && (
            <div className="w-full absolute top-[56px] ltr:left-0 bg-brand-light rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <Scrollbar className="os-host-flexbox">
                <div className="w-full max-h-[380px]">
                  {isLoading
                    ? Array.from({ length: 15 }).map((_, idx) => (
                        <div
                          key={`search-result-loader-key-${idx}`}
                          className="py-2.5 ltr:pl-5 ltr:pr-10  scroll-snap-align-start"
                        >
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        </div>
                      ))
                    : products?.map((item, index) => (
                        <div
                          key={`search-result-key-${index}`}
                          className="py-2.5 ltr:pl-5 ltr:pr-10 scroll-snap-align-start transition-colors duration-200 hover:bg-fill-base"
                          onClick={clear}
                        >
                          <SearchProduct item={item} key={index} />
                        </div>
                      ))}
                </div>
              </Scrollbar>
            </div>
          )}
          {/* End of search result */}
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';
export default Search;
