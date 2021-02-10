import React, { useEffect, useState } from 'react';
import { Input, Row, Title, Col, ButtonSpacer } from '../styled';
import { useQuery } from 'react-query';
import axios from 'axios';
import WidgetButton from './WidgetButton';

type queryData = {
  api: string;
  event: string;
  hex: string;
  ['theme-dark']: string;
  ['keep-shopping']: string;
};

interface WidgetPanelProps {
  apiUrl: String;
  venueId: Number;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({ apiUrl, venueId }) => {
  const [hex, setHex] = useState<string>('#dd3333');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [keepShopping, setKeepShopping] = useState<boolean>(false);

  const { data } = useQuery(['event'], () =>
    axios.get(
      ` https://${apiUrl}/api/public/events/?page=1&page_size=10&venue__in=${venueId}`
    )
  );

  return (
    <>
      <Row>
        <Col>
          <WidgetButton
            id={''}
            hex={hex}
            darkTheme={darkTheme}
            keepShopping={keepShopping}
            type="loginWidget"
            label="login"
          />
          <ButtonSpacer></ButtonSpacer>
          <WidgetButton
            id={''}
            hex={hex}
            darkTheme={darkTheme}
            keepShopping={keepShopping}
            type="checkoutWidget"
            label="checkout widget"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Venue Widgets</Title>
          <WidgetButton
            id={venueId.toString()}
            hex={hex}
            darkTheme={darkTheme}
            keepShopping={keepShopping}
            type="calendarWidget"
            label="calendar widget"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Event Widgets</Title>
          {data &&
            data.data.results.map((result, index) => (
              <WidgetButton
                key={index}
                id={result.slug}
                hex={hex}
                darkTheme={darkTheme}
                keepShopping={keepShopping}
                type="eventPurchaseWidget"
                label={result.slug}
              />
            ))}
        </Col>
      </Row>
    </>
  );
};

export default WidgetPanel;
