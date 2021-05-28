import React from "react";
import logo from './mvc.png';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment
} from "semantic-ui-react";
import 'antd/dist/antd.css';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";
import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    EnterOutlined,
    SmileOutlined,
    UserOutlined
} from '@ant-design/icons';

import { Avatar } from 'antd';

class CustomLayout extends React.Component {
    componentDidMount() {
        this.props.fetchCart();
    }

    render() {
        const { authenticated, cart, loading } = this.props;

        return (
            <div style={{ background: '#ecf7d7' }}>
                <Menu inverted>
                    <Container>
                        <Link to="/">
                            <Menu.Item header>
                                <Avatar size="small" style={{ backgroundColor: '#ffffff', paddingInline: "2px", marginRight: "3px" }}
                                    icon={<Image src={logo} />} />
                                MVC </Menu.Item>
                        </Link>
                        <Link to="/">
                            <Menu.Item header>
                                <Avatar size="small" style={{ backgroundColor: '#4e6fa3', paddingInline: "2px", marginRight: "3px" }} icon={<HomeOutlined />} />
                                Home</Menu.Item>
                        </Link>
                        <Link to="/products">
                            <Menu.Item header>
                                <Avatar size="small" style={{ backgroundColor: '#996600', paddingInline: "2px", marginRight: "3px" }} icon={<SmileOutlined />} />
                            Products</Menu.Item>
                        </Link>
                        {authenticated ? (
                            <React.Fragment>
                                <Menu.Menu position="right">
                                    <Link to="/profile">
                                        <Menu.Item>
                                            <Avatar size="small" style={{ backgroundColor: '#87d068', paddingInline: "2px", marginRight: "3px" }} icon={<UserOutlined />} />
                                            Profile</Menu.Item>
                                    </Link>
                                    <Dropdown
                                        icon="cart yellow"
                                        loading={loading}
                                        text={`${cart !== null ? cart.order_items.length : 0}`}
                                        pointing
                                        className="link item"
                                    >
                                        <Dropdown.Menu>
                                            {cart !== null ? (
                                                <React.Fragment>
                                                    {cart.order_items.map(order_item => {
                                                        return (
                                                            <Dropdown.Item key={order_item.id}>
                                                                {order_item.quantity} x {order_item.item.title}
                                                            </Dropdown.Item>
                                                        );
                                                    })}
                                                    {cart.order_items.length < 1 ? (
                                                        <Dropdown.Item>No items in your cart</Dropdown.Item>
                                                    ) : null}
                                                    <Dropdown.Divider />

                                                    <Dropdown.Item
                                                        icon="arrow right"
                                                        text="Checkout"
                                                        onClick={() =>
                                                            this.props.history.push("/order-summary")
                                                        }
                                                    />
                                                </React.Fragment>
                                            ) : (
                                                    <Dropdown.Item>No items in your cart</Dropdown.Item>
                                                )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link to="/">
                                        <Menu.Item header onClick={() => this.props.logout()}>
                                            <Avatar size="small" style={{ backgroundColor: '#e83333', paddingInline: "2px", marginRight: "3px" }} icon={<LogoutOutlined />} />
                                        Logout
                  </Menu.Item></Link>
                                </Menu.Menu>
                            </React.Fragment>
                        ) : (
                                <Menu.Menu position="right">
                                    <Link to="/login">
                                        <Menu.Item header>
                                            <Avatar size="small" style={{ backgroundColor: '#87d068', paddingInline: "2px", marginRight: "3px" }} icon={<LoginOutlined />} />
                                        Login</Menu.Item>
                                    </Link>
                                    <Link to="/signup">
                                        <Menu.Item header>
                                            <Avatar size="small" style={{ backgroundColor: '#4e6fa3', paddingInline: "2px", marginRight: "3px" }} icon={<EnterOutlined />} />
                                        Signup</Menu.Item>
                                    </Link>
                                </Menu.Menu>
                            )}
                    </Container>
                </Menu>

                {this.props.children}

                <Segment
                    inverted
                    vertical
                    style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
                >
                    <Container textAlign="center">
                        <Grid divided inverted stackable>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Group 1" />
                                <List link inverted>
                                    <List.Item as="a">Link One</List.Item>
                                    <List.Item as="a">Link Two</List.Item>
                                    <List.Item as="a">Link Three</List.Item>
                                    <List.Item as="a">Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Group 2" />
                                <List link inverted>
                                    <List.Item as="a">Link One</List.Item>
                                    <List.Item as="a">Link Two</List.Item>
                                    <List.Item as="a">Link Three</List.Item>
                                    <List.Item as="a">Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Group 3" />
                                <List link inverted>
                                    <List.Item as="a">Link One</List.Item>
                                    <List.Item as="a">Link Two</List.Item>
                                    <List.Item as="a">Link Three</List.Item>
                                    <List.Item as="a">Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header inverted as="h4" content="Footer Header" />
                                <p>
                                    Extra space for a call to action inside the footer that could
                                    help re-engage users.
                </p>
                            </Grid.Column>
                        </Grid>

                        <Divider inverted section />
                        <Image centered size="mini" src="/logo.png" />
                        <List horizontal inverted divided link size="small">
                            <List.Item as="a" href="#">
                                Site Map
              </List.Item>
                            <List.Item as="a" href="#">
                                Contact Us
              </List.Item>
                            <List.Item as="a" href="#">
                                Terms and Conditions
              </List.Item>
                            <List.Item as="a" href="#">
                                Privacy Policy
              </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        cart: state.cart.shoppingCart,
        loading: state.cart.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        fetchCart: () => dispatch(fetchCart())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CustomLayout)
);
