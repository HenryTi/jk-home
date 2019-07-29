import * as React from 'react';
import { VPage, Page, Form, ObjectSchema, NumSchema, ArrSchema, UiSchema, UiArr, FormField } from 'tonva';
import { CCart } from './CCart';
import { List, LMR, FA } from 'tonva';
import { tv, BoxId } from 'tonva';
import { observer } from 'mobx-react';
import { MinusPlusWidget } from '../tools';
import { renderBrand, productPropItem } from '../product/CProduct';
import { ProductImage } from 'tools/productImage';
import { CartPackRow } from './Cart';

const cartSchema = [
    {
        name: 'list',
        type: 'arr',
        arr: [
            { name: 'checked', type: 'boolean' },
            { name: 'product', type: 'object' } as ObjectSchema,
            {
                name: 'packs', type: 'arr', arr: [
                    { name: 'pack', type: 'object' } as ObjectSchema,
                    { name: 'price', type: 'number' } as NumSchema,
                    { name: 'quantity', type: 'number' } as NumSchema,
                    { name: 'currency', type: 'object' } as ObjectSchema,
                    { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
                    { name: 'futureDeliveryTimeDescription', type: 'string' }
                ]
            }
        ],
    } as ArrSchema
];

export class VCart extends VPage<CCart> {
    async open() {
        this.openPage(this.page);
    }

    protected CheckOutButton = observer(() => {
        let { checkOut, cApp } = this.controller;
        let { cartViewModel } = cApp;
        let amount = cartViewModel.amount.get();
        let check = "去结算";
        let content = amount > 0 ?
            <>{check} (¥{amount})</> :
            <>{check}</>;
        return <button className="btn btn-success w-100" type="button" onClick={checkOut} disabled={amount <= 0}>
            {content}
        </button>;
    });

    render(params: any): JSX.Element {
        return <this.tab />;
    }

    private renderCartItem = (item: any) => {
        let { product } = item;
        return <div className="pr-1">
            <div className="row">
                <div className="col-lg-6 pb-3" onClick={() => this.controller.onProductClick(product.id)}>
                    {renderCartProduct(product, 0)}
                </div>
                <div className="col-lg-6"><FormField name="packs" /></div>
            </div>
        </div>;
    }

    private packsRow = (item: CartPackRow) => {
        let { pack, price, currency, inventoryAllocation, futureDeliveryTimeDescription } = item;

        let deliveryTimeUI = [];
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                return <div key={index} className="text-success">
                    {tv(warehouse, (values: any) => <>{values.name}</>)}: {quantity}
                    {deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI.push(<div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>);
        }

        return <div className="px-2">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack)}</b></div>
                <div className="w-6c mr-4 text-right"><span className="text-danger h5">¥{price}</span></div>
                <FormField name="quantity" />
            </div>
            <div>{deliveryTimeUI.map((v, index) => v)}</div>
        </div>;
    }

    private uiSchema: UiSchema = {
        selectable: true,
        deletable: true,
        restorable: true,
        items: {
            list: {
                widget: 'arr',
                Templet: this.renderCartItem,
                ArrContainer: (label: any, content: JSX.Element) => content,
                RowContainer: (content: JSX.Element) => <div className="py-3">{content}</div>,
                items: {
                    packs: {
                        widget: 'arr',
                        Templet: this.packsRow,
                        selectable: false,
                        deletable: false,
                        ArrContainer: (label: any, content: JSX.Element) => content,
                        RowContainer: (content: JSX.Element) => content,
                        RowSeperator: <div className="border border-gray border-top my-3" />,
                        items: {
                            quantity: {
                                widget: 'custom',
                                className: 'text-center',
                                WidgetClass: MinusPlusWidget,
                                onChanged: this.controller.onQuantityChanged
                            }
                        },
                    } as UiArr
                }
            } as UiArr
        }
    }

    protected cartForm = observer(() => {
        let { cartViewModel } = this.controller.cApp;
        // let cartData = cart.data;
        let { data: cartData } = cartViewModel;
        return <Form className="bg-white flex-fill overflow-auto" schema={cartSchema} uiSchema={this.uiSchema} formData={cartData} />
    });

    private empty() {
        return <div className="py-5 text-center bg-white">你的购物车空空如也</div>
    }

    private test = () => {
        let { cartViewModel } = this.controller.cApp;
        // let row = cart.items[0];
        let row = cartViewModel.cartItems[0];
        row.packs[0].quantity = row.packs[0].quantity + 1;
    }

    private testButton = () => <button onClick={() => this.test()}>test</button>;

    private page = observer((params: any): JSX.Element => {
        let { cartViewModel: cart } = this.controller.cApp;
        let footer: any, content: any;
        if (cart.count.get() === 0 && cart.cartItems.length === 0) {
            content = this.empty();
            footer = undefined;
        }
        else {
            content = <this.cartForm />;
            footer = <this.CheckOutButton />;
        }
        return <Page header="购物车" footer={footer}>
            {content}
        </Page>;
    })

    private tab = observer(() => {
        let { cartViewModel: cart } = this.controller.cApp;
        let header = <header className="py-2 text-center bg-info text-white">
            <FA className="align-middle" name="shopping-cart" size="2x" /> &nbsp; <span className="h5 align-middle">购物车</span>
        </header>;
        if (cart.count.get() === 0 && cart.cartItems.length === 0) {
            return <>
                {header}
                {this.empty()}
            </>;
        }
        return <div className="bg-white d-flex flex-column h-100">
            {header}
            <this.cartForm />
            <footer className="p-3"><this.CheckOutButton /></footer>
        </div>
    });
}

export function renderCartProduct(product: any, index: number) {
    let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
    return <div className="row d-flex mb-3 px-2">
        <div className="col-12">
            <div className="py-2">
                <strong>{description}</strong>
            </div>
            <div className="pb-2">
                <strong>{descriptionC}</strong>
            </div>
            <div className="row">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-4c h-4c" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {productPropItem('CAS', CAS)}
                        {productPropItem('纯度', purity)}
                        {productPropItem('编号', origin)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}