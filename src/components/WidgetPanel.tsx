import React, { useEffect, useState } from 'react';
import { Input, Row, Title, Col, ButtonSpacer } from '../styled';
import { useQuery } from 'react-query';
import axios from 'axios';
import WidgetButton from './WidgetButton';

type queryData = {
  api: String;
  venue: String;
  hex: String;
  ['theme-dark']: String;
  ['keep-shopping']: String;
};

const encodeQueryData = (data: queryData): String => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};

interface WidgetPanelProps {
  apiUrl: String;
  venueSlug: String;
  venueId: Number;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({
  apiUrl,
  venueId,
  venueSlug,
}) => {
  const [hex, setHex] = useState<string>('#dd3333');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [keepShopping, setKeepShopping] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dt = urlParams.get('theme-dark');
    const ks = urlParams.get('keep-shopping');
    const hx = urlParams.get('hex');
    dt && setDarkTheme(dt === 'true');
    ks && setKeepShopping(ks === 'true');
    hx && setHex(hx);
  }, []);

  useEffect(() => {
    if (!apiUrl || !venueSlug) return;
    const params: queryData = {
      api: apiUrl,
      venue: venueSlug,
      hex: hex,
      ['theme-dark']: darkTheme.toString(),
      ['keep-shopping']: keepShopping.toString(),
    };
    window.history.replaceState(null, null, '?' + encodeQueryData(params));
  }, [apiUrl, venueSlug, darkTheme, keepShopping, hex]);

  const { data, isLoading } = useQuery(['event'], () =>
    axios.get(
      ` https://${apiUrl}/api/public/events/?page=1&page_size=10&venue__in=${venueId}`
    )
  );

  return (
    <>
      <Row style={{ alignItems: 'center' }}>
        <label>Hex Code</label>
        <Input
          placeholder="#dd3333"
          value={hex}
          style={{
            maxWidth: '65px',
            height: '23px',
            marginRight: '20px',
            marginLeft: '6px',
          }}
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
      <ButtonSpacer></ButtonSpacer>
      <Row>
        <Col>
          <Title>General Widgets</Title>
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
          {isLoading && <p>loading...</p>}
          {data &&
            data.data.results.map((result, index) => (
              <React.Fragment key={index}>
                <WidgetButton
                  id={result.slug}
                  hex={hex}
                  darkTheme={darkTheme}
                  keepShopping={keepShopping}
                  type="eventPurchaseWidget"
                  label={result.slug}
                />
                <ButtonSpacer></ButtonSpacer>
              </React.Fragment>
            ))}
        </Col>
      </Row>
    </>
  );
};

export default WidgetPanel;
