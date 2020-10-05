import React from 'react';
import { Button } from '../styled';

interface WidgetButtonProps {
  eventSlug: string;
  hex: string;
  darkTheme: boolean;
  keepShopping: boolean;
  type: string;
}
const WidgetButton: React.FC<WidgetButtonProps> = ({ eventSlug, hex, darkTheme, keepShopping, type }) => {
  return (
    <Button
      onClick={() =>
        window.showpass.tickets[type](eventSlug, {
          'theme-primary': hex,
          'theme-dark': darkTheme,
          'keep-shopping': keepShopping,
        })
      }
    >
      {type}
    </Button>
  );
};
export default WidgetButton;
