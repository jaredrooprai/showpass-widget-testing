import React from 'react';
import { Button } from '../styled';

interface WidgetButtonProps {
  id: string;
  hex: string;
  darkTheme: boolean;
  keepShopping: boolean;
  type: string;
  disabled?: boolean;
}

const WidgetButton: React.FC<WidgetButtonProps> = (props) => {
  const { id, hex, darkTheme, keepShopping, type, ...other } = props;
  return (
    <Button
      {...other}
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
