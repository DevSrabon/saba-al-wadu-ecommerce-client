import cn from 'classnames';
import { useState } from 'react';
import { Color, Size, Variant } from 'src/types';

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  setAttributes: (key: any) => void;
  isOutOfStock: boolean;
  colors: Color[];
  sizes: Size[];
  variants: Variant[];
}

const ProductAttributes: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  variations,
  attributes,
  setAttributes,
  isOutOfStock,
  colors,
  sizes,
  variants,
}) => {
  if (!variations) return null;
  const [pAttributes, setPAttributes] = useState({
    color: '',
    size: '',
    variant: '',
  });
  return (
    <>
      {/* {Object.keys(variations).map((variationName, index) => (
        <div className={cn(className)} key={index}>
          <h4 className="mb-3 font-normal capitalize text-15px text-brand-dark text-opacity-70">
            {variationName.split('-').join(' ')}:
          </h4>
          <ul className="flex flex-wrap ltr:-mr-2">
            {variations[variationName].map((attribute: any) => (
              <li
                key={attribute?.av_id}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 flex justify-center items-center font-medium text-sm md:text-15px shadow-[0_5px_10px_0_rgba(0,79,154,0.3)] transform hover:shadow-[0_5px_10px_2px_rgba(0,79,154,0.4)] text-brand-dark transition duration-200 ease-in-out  px-3',
                  {
                    'shadow-[inset_0_5px_10px_0_rgba(0,79,154,0.2)] text-brand':
                      attributes[variationName] === attribute?.av_id,
                  }
                )}
                onClick={() => {
                  isOutOfStock &&
                    setAttributes((prev: any) => ({
                      ...prev,
                      [variationName]: attribute?.av_id,
                    }));
                }}
              >
                {attribute?.av_value}
              </li>
            ))}
          </ul>
        </div>
      ))} */}

      <div>
        {' '}
        <h3 className="text-sm font-medium mb-2">
          Color: {pAttributes?.color}
        </h3>
        <div className="flex flex-wrap gap-2">
          {colors?.map((color, index) => (
            <button
              key={index}
              onClick={() => {
                setPAttributes({ ...pAttributes, color: color?.color_name_en });
                isOutOfStock &&
                  setAttributes((prev: any) => ({
                    ...prev,
                    color: color.color_id,
                  }));
              }}
              className={`
                px-3 py-[5px] text-sm font-medium
                ${
                  pAttributes.color === color?.color_name_en
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black-200'
                }
                hover:bg-gray-100 transition-colors
                }
              `}
            >
              {color?.color_name_en}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium mb-2">Size: {pAttributes?.size}</h3>
        <div className="flex flex-wrap gap-2">
          {sizes?.map((size, index) => (
            <button
              key={index}
              onClick={() => {
                setPAttributes({ ...pAttributes, size: size?.size });
                isOutOfStock &&
                  setAttributes((prev: any) => ({
                    ...prev,
                    size: size.size_id,
                  }));
              }}
              className={`
                px-3 py-[5px] text-sm font-medium
                ${
                  pAttributes?.size === size?.size
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
      <div className="mt-2">
        <h3 className="text-sm font-medium mb-2">
          Variant: {pAttributes?.variant}
        </h3>
        <div className="flex flex-wrap gap-2">
          {variants?.map((variant, index) => (
            <button
              key={index}
              onClick={() => {
                setPAttributes({
                  ...pAttributes,
                  variant: variant?.fabric_name_en,
                });
                isOutOfStock &&
                  setAttributes((prev: any) => ({
                    ...prev,
                    variant: variant.variant_id,
                  }));
              }}
              className={`
                px-3 py-[5px] text-sm font-medium
                ${
                  pAttributes?.variant === variant?.fabric_name_en
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black-200'
                }
                hover:bg-gray-100 transition-colors
              
              `}
            >
              {variant?.fabric_name_en}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductAttributes;
