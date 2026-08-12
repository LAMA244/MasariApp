import React from 'react';
import { CityCard } from './CityCard';
import { CityId } from '../types';

interface CityImageProps {
  cityId?: CityId | string;
  src?: string;
  alt?: string;
  cityNameAr?: string;
  isSelected?: boolean;
  className?: string;
  containerClassName?: string;
  size?: 'normal' | 'compact';
}

export const CityImage: React.FC<CityImageProps> = ({
  cityId = 'riyadh',
  isSelected = false,
  className = '',
  size = 'normal',
}) => {
  return (
    <CityCard
      cityId={cityId}
      isSelected={isSelected}
      className={className}
      size={size}
    />
  );
};
