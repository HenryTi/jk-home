import * as React from 'react';
import { VCartLabel } from './VCartLabel';
import { CCartApp } from 'CCartApp';
import { VCart } from './VCart';
import { Controller, RowContext } from 'tonva-tools';
import { Cart } from './Cart';
import { PackItem } from 'tools';

export class CCart extends Controller {

    cApp: CCartApp;
    cart: Cart;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
        this.cart = cApp.cart;
    }

    protected async internalStart(param: any) {
        this.openVPage(VCart);
    }

    /**
     *
     * 显示购物车图标
     */
    renderCartLabel() {
        return this.renderView(VCartLabel);
    }

    renderCart = () => {
        return this.renderView(VCart);
    }

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        //let { row } = context;
        let { data, parentData } = context;
        let { product } = parentData;
        let { pack, price, quantity, currency } = data as PackItem;
        //let { retail, currency } = pack;
        await this.cart.AddToCart(product, pack, value, price, currency);
    }

    onRowStateChanged = async (context: RowContext, selected: boolean, deleted: boolean) => {
        alert('onRowStateChanged')
    }

    /**
     * 导航到CheckOut界面
     */
    checkOut = async () => {

        if (!this.isLogined) {
            // 导航到登录界面
        } else {
            let selectCartItem = this.cart.getSelectItem();
            if (selectCartItem === undefined) return;
            let { cOrder } = this.cApp;
            await cOrder.start(selectCartItem);
        }
    }

    tab = () => <this.renderCart />
}
