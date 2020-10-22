import React from 'react';
import { Button } from '../styled';

interface WidgetButtonProps {
  id: string;
  hex: string;
  darkTheme: boolean;
  keepShopping: boolean;
  type: string;
}
const WidgetButton: React.FC<WidgetButtonProps> = ({ id, hex, darkTheme, keepShopping, type }) => {
  return (
    <Button
      onClick={() =>
        window.showpass.tickets[type](id, {
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
