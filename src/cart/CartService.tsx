//import { CCartApp } from 'CCartApp';
import { Query, TuidDiv, Action } from 'tonva';
import { CartViewModel, CartItem } from './Cart2';
import { CartPackRow } from './Cart';
import { LoaderProductWithChemical } from '../product/itemLoader';
import { groupByProduct } from '../tools/groupByProduct';
import { CApp } from '../CApp';

export class CartServiceFactory {

    static getCartService(cApp: CApp) {
        if (cApp.isLogined)
            return new CartRemoteService(cApp);
        return new CartLocalService(cApp);
    }
}

export abstract class CartService {

    protected cApp: CApp;
    //private getInventoryAllocationQuery: Query;
    //private packTuid: TuidDiv;

    constructor(cApp: CApp) {
        this.cApp = cApp;
        //let { cUqWarehouse, cUqProduct } = this.cApp;
        //this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        //this.packTuid = cUqProduct.tuidDiv('productx', 'packx');
    }

    abstract get isLocal(): boolean;
    abstract async load(): Promise<CartViewModel>;

    protected async generateCartItems(cartData: any): Promise<CartViewModel> {

        let result = new CartViewModel();
        if (cartData) {
            for (let cd of cartData) {
                let { product, createdate, packs } = cd;
                result.cartItems.push(await this.generateCartItem(product.id, packs))
            }
        }
        return result;
    }

    protected async generateCartItem(productId: number, packs: any[]): Promise<CartItem> {

        let cartItem: CartItem = {} as any;
        let productService = new LoaderProductWithChemical(this.cApp);
        cartItem.product = await productService.load(productId);
        cartItem.createdate = Date.now();
        cartItem.$isSelected = true;
        cartItem.$isDeleted = false;

        cartItem.packs = [];
        if (packs !== undefined) {
            for (let p of packs) {
                let { pack, price, quantity, currency } = p;
                let packItem: CartPackRow = {
                    pack: pack, // this.packTuid.boxId(packId),
                    price: price,
                    quantity: quantity,
                    currency: currency,
                };
                packItem.inventoryAllocation =
                    await this.cApp.uqs.warehouse.GetInventoryAllocation.table({ product: productId, pack: pack.id, salesRegion: this.cApp.currentSalesRegion })
                cartItem.packs.push(packItem);
            }
        }
        return cartItem;
    }

    abstract async addToCart(cartViewModel: CartViewModel, productId: number, packId: number, quantity: number, price: number, currency: any):Promise<void>;

    abstract async removeFromCart(cartViewModel: CartViewModel, rows: [{ productId: number, packId: number }]):Promise<void>;

    abstract async clear(cartViewModel: CartViewModel):Promise<void>;

    abstract async merge(source: CartViewModel):Promise<any>;
}

export class CartRemoteService extends CartService {
    /*
    private getCartQuery: Query;
    private setCartAction: Action;
    private removeFromCartAction: Action;
    private mergeCartAction: Action;
    */

    get isLocal(): boolean { return false }
    
    /*
    constructor(cApp: CApp) {
        super(cApp);

        let { cUqOrder } = this.cApp;
        this.getCartQuery = cUqOrder.query('getcart')
        this.setCartAction = cUqOrder.action('setcart');
        this.removeFromCartAction = cUqOrder.action('removefromcart');
        this.mergeCartAction = cUqOrder.action('mergeCartAction');
    }
    */

    async load(): Promise<CartViewModel> {
        let cartData = await this.cApp.uqs.order.GetCart.page(undefined, 0, 100);
        let cartData2 = groupByProduct(cartData);
        return await this.generateCartItems(cartData2);
    }

    /**
     * 添加购物车
     * @param pack 要添加到购物车中的包装
     * @param quantity 要添加到购物车中包装的个数
     */
    async addToCart(cartViewModel: CartViewModel, productId: number, packId: number, quantity: number, price: number, currency: any):Promise<void> {
        let param = {
            product: productId,
            pack: packId,
            price: price,
            currency: currency,
            quantity: quantity
        }

        try {
            await this.cApp.uqs.order.SetCart.submit(param);
            let cartItem: CartItem = await this.generateCartItem(productId
                , [{ pack: packId, price: price, quantity: quantity, currency: currency && currency.id }]);
            cartViewModel.add(cartItem);
        } catch (error) {

        }
    }

    async removeFromCart(cartViewModel: CartViewModel, rows: [{ productId: number, packId: number }]):Promise<void> {
        if (rows && rows.length > 0) {
            cartViewModel.removeFromCart(rows);
            let param = rows.map(e => { return { product: e.productId, pack: e.packId } });
            await this.cApp.uqs.order.RemoveFromCart.submit({ rows: param })
        }
    }

    async clear(cartViewModel: CartViewModel):Promise<void> {
        let param = cartViewModel.cartItems.map(v => {
            let { product, packs } = v;
            return {
                product: product,
                ...packs
            }
        })
        await this.cApp.uqs.order.RemoveFromCart.submit({ rows: param });
    }

    async merge(source: CartViewModel):Promise<any> {
        let param = source.cartItems.map(v => {
            let { product, packs } = v;
            return {
                product: product,
                ...packs
            }
        })
        await this.cApp.uqs.order.MergeCart.submit({ rows: param });
        return await this.load();
    }
}

const LOCALCARTNAME: string = "cart";
export class CartLocalService extends CartService {

    constructor(cApp: CApp) {
        super(cApp);
    }

    get isLocal(): boolean { return true }

    async load(): Promise<CartViewModel> {
        try {
            let cartstring = localStorage.getItem(LOCALCARTNAME);
            let cartData = JSON.parse(cartstring);
            return await this.generateCartItems(cartData);
        }
        catch {
            localStorage.removeItem(LOCALCARTNAME);
        }
    }

    async addToCart(cartViewModel: CartViewModel, productId: number, packId: number, quantity: number, price: number, currency: any) {

        let cartItem: CartItem = await this.generateCartItem(productId
            , [{ pack: packId, price: price, quantity: quantity, currency: currency && currency.id }]);
        cartViewModel.add(cartItem);

        this.save(cartViewModel);
    }

    async removeFromCart(cartViewModel: CartViewModel, rows: [{ productId: number, packId: number }]) {
        cartViewModel.removeFromCart(rows);
        this.save(cartViewModel);
    }

    private save(cartViewModel: CartViewModel) {
        let items = cartViewModel.cartItems.map(e => {
            let { product, packs } = e;
            return {
                product: product.id,
                packs: packs && packs.map(v => {
                    let { pack, price, currency, quantity } = v;
                    return {
                        pack: pack.id,
                        price: price,
                        currency: currency && currency.id,
                        quantity: quantity,
                    }
                }),
            }
        });

        let text = JSON.stringify(items);
        localStorage.setItem(LOCALCARTNAME, text);
    }

    async clear(cartViewModel: CartViewModel): Promise<void> {
        localStorage.removeItem(LOCALCARTNAME);
    }

    async merge(source: CartViewModel) {
    }

}
