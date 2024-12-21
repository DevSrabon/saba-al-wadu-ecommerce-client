import cn from 'classnames';
import { useState } from 'react';
import { Color, Size } from 'src/types';

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  setAttributes: (key: any) => void;
  isOutOfStock: boolean;
  colors: Color[];
  sizes: Size[];
}

const ProductAttributes: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  variations,
  attributes,
  setAttributes,
  isOutOfStock,
  colors,
  sizes,
}) => {
  if (!variations) return null;
  const [selectedSize, setSelectedSize] = useState('');
  return (
    <>
      {Object.keys(variations).map((variationName, index) => (
        <div className={cn(className)} key={index}>
          <h4 className="mb-3 font-normal capitalize text-15px text-brand-dark text-opacity-70">
            {variationName.split('-').join(' ')}:
          </h4>
          <ul className="flex flex-wrap ltr:-mr-2">
            {variations[variationName].map((attribute: any) => (
              <li
                key={attribute.av_id}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 flex justify-center items-center font-medium text-sm md:text-15px shadow-[0_5px_10px_0_rgba(0,79,154,0.3)] transform hover:shadow-[0_5px_10px_2px_rgba(0,79,154,0.4)] text-brand-dark transition duration-200 ease-in-out  px-3',
                  {
                    'shadow-[inset_0_5px_10px_0_rgba(0,79,154,0.2)] text-brand':
                      attributes[variationName] === attribute.av_id,
                  }
                )}
                onClick={() => {
                  isOutOfStock &&
                    setAttributes((prev: any) => ({
                      ...prev,
                      [variationName]: attribute.av_id,
                    }));
                }}
              >
                {attribute.av_value}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {colors?.map((color) => color.color_name_en)}

      <div>
        <h3 className="text-sm font-medium mb-2">Size: {selectedSize}</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(size?.size)}
              className={`
                px-4 py-2 text-sm font-medium
                ${
                  selectedSize === size?.size
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black-200'
                }
                hover:bg-gray-100 transition-colors
                ${size?.size === 'PLUS SIZE' ? 'w-full sm:w-auto' : ''}
              `}
            >
              {size?.size}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductAttributes;
