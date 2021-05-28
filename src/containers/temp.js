import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import 'antd/dist/antd.css';
import {
    Container,
    Dimmer,
    Image,
    Item,
    Label,
    Loader,
    Message,
    Segment
} from "semantic-ui-react";
import { productListURL, addToCartURL, FilterURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { authAxios } from "../utils";

import { Divider } from 'antd';
import {
    DownOutlined,
    UserOutlined
} from '@ant-design/icons';


import { Input, Select, Menu, Dropdown, Button, message } from 'antd';

const { Search } = Input;

const { Option } = Select;

const category = [
    { value: '', label: 'All' },
    { value: 'S', label: 'Shirt' },
    { value: 'SW', label: 'Sport Wear' },
    { value: 'OW', label: 'Outwear' }
];
const label = [
    { value: '', label: 'All' },
    { value: 'P', label: 'Primary' },
    { value: 'S', label: 'Secondary' },
    { value: 'D', label: 'Tertiary' }
];

const sort = [
    { value: '', label: 'None' },
    { value: 'price', label: 'Price low to high' },
    { value: '-price', label: 'Price high to low' }
];

const divStyle = {
    display: 'flex',
    alignItems: 'center'
};

class ProductList extends React.Component {
    state = {
        loading: false,
        error: null,
        data: [],
        selectedcategory: "",
        selectedlabel: "",
        selectedsort: "",
        selectedsearch: ""
    };

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get(productListURL)
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    }

    handleAddToCart = slug => {
        this.setState({ loading: true });
        authAxios
            .post(addToCartURL, { slug })
            .then(res => {
                this.props.refreshCart();
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleChange = (name, value) => {

        console.log(name, value);

        let selectedcategory = this.state.selectedcategory;
        let selectedlabel = this.state.selectedlabel;
        let selectedsort = this.state.selectedsort;
        let selectedsearch = this.state.selectedsearch;

        switch (name) {
            case "selectedcategory": selectedcategory = value; break;
            case "selectedlabel": selectedlabel = value; break;
            case "selectedsort": selectedsort = value; break;
            case "selectedsearch": selectedsearch = value; break;
        };

        axios
            .get(FilterURL(selectedcategory, selectedlabel, selectedsort, selectedsearch))
            .then(res => {
                this.setState({ [name]: value, data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });

    };

    render() {
        const { data, error, loading, selectedcategory, selectedlabel, selectedsort, selectedsearch } = this.state;
        return (
            <Container>
                {error && (
                    <Message
                        error
                        header="There was some errors with your submission"
                        content={JSON.stringify(error)}
                    />
                )}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src="/images/wireframe/short-paragraph.png" />
                    </Segment>
                )}


                <Item.Group divided>
                    <br />
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => this.handleChange("selectedsearch", value)}
                        style={{
                            fontSize: 16,
                            color: '#1890ff'
                        }}
                    />
                    <br /><br />

                    <div style={divStyle}>
                        <Label style={{ width: 80, marginRight: '200px' }} > Category :</ Label>
                        <Label style={{ width: 80, marginRight: '200px' }}>Label :</Label>
                        <Label style={{ width: 100 }}>Sort :</Label>
                    </div>



                    <div style={divStyle}>
                        <Select
                            name="selectedcategory"
                            value={selectedcategory}
                            menuPosition='fixed'
                            options={category}
                            selection
                            onChange={value => this.handleChange("selectedcategory", value)}
                            style={{ width: 200, marginRight: '80px', border: '2px solid grey' }}
                        />


                        <Select
                            name="selectedlabel"
                            value={selectedlabel}
                            menuPosition='fixed'
                            options={label}
                            selection
                            onChange={value => this.handleChange("selectedlabel", value)}
                            style={{ width: 200, marginRight: '80px', border: '2px solid grey' }}
                        />

                        <Select
                            name="selectedsort"
                            value={selectedsort}
                            menuPosition='fixed'
                            options={sort}
                            selection
                            onChange={value => this.handleChange("selectedsort", value)}
                            style={{ width: 200, border: '2px solid grey' }}
                        />
                    </div>


                    <Divider />
                    {data.map(item => {
                        return (
                            <Item key={item.id}>
                                <Item.Image src={item.image} />
                                <Item.Content>
                                    <Item.Header
                                        as="a"
                                        onClick={() =>
                                            this.props.history.push(`/products/${item.id}`)
                                        }
                                    >
                                        {item.title}
                                    </Item.Header>
                                    <Item.Meta>
                                        <span className="cinema">{item.category}</span>
                                    </Item.Meta>
                                    <Item.Description>{item.description}</Item.Description>
                                    <Item.Extra>
                                        {/* <Button
                      primary
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() => this.handleAddToCart(item.slug)}
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button> */}
                                        {item.discount_price && (
                                            <Label
                                                color={
                                                    item.label === "primary"
                                                        ? "blue"
                                                        : item.label === "secondary"
                                                            ? "green"
                                                            : "olive"
                                                }
                                            >
                                                Rs.{item.discount_price}
                                            </Label>
                                        )}
                                        {!item.discount_price && (
                                            <Label
                                                color={
                                                    item.label === "primary"
                                                        ? "blue"
                                                        : item.label === "secondary"
                                                            ? "green"
                                                            : "olive"
                                                }
                                            >
                                                Rs.{item.price}
                                            </Label>
                                        )}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        );
                    })}
                </Item.Group>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProductList);
