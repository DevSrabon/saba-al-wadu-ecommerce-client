import StarIcon from '@components/icons/star-icon'
import React from 'react'

export const ProductRating: React.FC<{ item: number }> = ({ item }): any => {
  return (
    <div className="flex -mx-0.5 mb-3.5">
      {[...Array(5)].map((_, idx) => (
        <StarIcon
          key={idx}
          color={idx < item ? '#F3B81F' : '#DFE6ED'}
          className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
        />
      ))}
    </div>
  )
}

