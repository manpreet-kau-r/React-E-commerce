import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './mvc.png';
import {
  Button,
  Container,
  Grid,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import {
  SmileOutlined
} from '@ant-design/icons';

import { Card, Col, Row, Rate } from 'antd';

const { Meta } = Card;

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};


class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "6em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>

            <div style={{ height: 330, width: 600, padding: '30px', background: '#ececec', marginBottom: 20 }}>
              <Card title="We assist our Customers to the best at our end..." bordered={false}
                style={{ fontSize: '20px' }}>
                <p>Our mission is to continually raise the bar of the customer experience by using the
                internet and technology to help customers find, discover and buy anything, and
              empower businesses and content creators to maximise their success.</p>
              </Card>
            </div>

            <div style={{ height: 240, width: 600, padding: '30px', background: '#ececec', marginBottom: 20 }}>
              <Card title="We sell products that you really want" bordered={false}
                style={{ fontSize: '20px' }}>
                <p>Yes that's right, you thought it was the stuff of dreams, but we bring it to you.</p>
              </Card>
            </div>

          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Card
              hoverable
              style={{ width: 400, height: 600 }}
              cover={<img alt="mvc" src={logo} />}
            >
              <Meta title="My Vintage clozet" description="MVC" />
            </Card>

          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link to="/products"><Button size="huge">Check Them Out</Button></Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ height: 240, padding: '2.1em 8em', background: '#f7eed7' }} vertical>
      <div style={{ padding: '0em 8em' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="What a company" bordered={true} style={{ fontSize: '20px' }}>
              This is what they all say about us<br />
              <Rate
                disabled
                defaultValue={5}
                character={<SmileOutlined />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Mission" bordered={true} style={{ fontSize: '20px' }}>
              Aim to make world a more stylish, colorful and happier place
          </Card>
          </Col>
          <Col span={8}>
            <Card title="Rating" bordered={true} style={{ fontSize: '20px' }}>
              <Rate defaultValue={4} character={({ index }) => { return index + 1; }} />
              <br />
              <Rate disabled defaultValue={4} />
            </Card>
          </Col>
        </Row>
      </div>

    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <div style={{ padding: '30px', background: '#ececec', marginBottom: 20 }}>
          <Card title="Breaking The Grid, Grabs Your Attention" bordered={false}
            style={{ margin: '0.1em', fontSize: '20px' }}>
            <p>Instead of focusing on competition, we focus at providing a delightful and memorable customer experience.</p>
            <Button as="a" size="medium">
              Read More
                </Button>
          </Card>
        </div>
      </Container>
    </Segment>
  </ResponsiveContainer >
);
export default HomepageLayout;
