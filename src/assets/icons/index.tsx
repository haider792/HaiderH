import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps as RNVIconProps } from 'react-native-vector-icons/Icon';
import { colors } from '../../constants/colors';

interface IconProps extends Omit<RNVIconProps, 'name'> {
  size?: number;
  color?: string;
}

const createIcon = (name: string, defaultColor: string) => {
  return ({ size = 24, color = defaultColor, ...props }: IconProps) => (
    <Ionicons name={name} size={size} color={color} {...props} />
  );
};

export const icons = {
  add: createIcon('add-circle-outline', colors.primary),
  delete: createIcon('trash-outline', colors.danger),
  check: createIcon('checkmark-circle-outline', colors.success),
  uncheck: createIcon('ellipse-outline', colors.border.dark),
  edit: createIcon('create-outline', colors.primary),
  close: createIcon('close-circle-outline', colors.text.secondary),
  search: createIcon('search-outline', colors.text.secondary),
  filter: createIcon('filter-outline', colors.text.secondary),
  sort: createIcon('swap-vertical-outline', colors.text.secondary),
};
