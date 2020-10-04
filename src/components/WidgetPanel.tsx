import React, { useState } from 'react';
import { Input, Row } from '../styled/styled';
import WidgetButton from './WidgetButton';

interface WidgetPanelProps {
  eventSlug: string;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({ eventSlug }) => {
  const [hex, setHex] = useState<string>('#dd3333');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [keepShopping, setKeepShopping] = useState<boolean>(false);

  return (
    <>
      <Row style={{ alignItems: 'center' }}>
        <label>Hex Code</label>
        <Input
          placeholder="#dd3333"
          value={hex}
          style={{ maxWidth: '65px', height: '23px', marginRight: '20px', marginLeft: '6px' }}
          onChange={(e) => setHex(e.target.value)}
          maxLength={7}
        />
        <label>Dark Theme</label>
        <input
          type="checkbox"
          checked={darkTheme}
          onChange={() => setDarkTheme(!darkTheme)}
          style={{ cursor: 'pointer', marginRight: '20px' }}
        ></input>
        <label>Keep Shopping</label>
        <input
          type="checkbox"
          checked={keepShopping}
          onChange={() => setKeepShopping(!keepShopping)}
          style={{ cursor: 'pointer' }}
        ></input>
      </Row>
      <br />
      <Row>
        <WidgetButton
          eventSlug={eventSlug}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="eventPurchaseWidget"
        />
        <WidgetButton
          eventSlug={eventSlug}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="checkoutWidget"
        />
      </Row>
    </>
  );
};
export default WidgetPanel;
