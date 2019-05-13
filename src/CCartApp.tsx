//import * as React from 'react';
import { User, nav } from 'tonva-tools';
import { CApp, CUq } from 'tonva-react-uq';
import { CCart } from 'cart/CCart';
import { CProduct } from 'product';
import { COrder } from 'order/COrder';
import { CHome } from './home/CHome';
import { CProductCategory } from 'productCategory/CProductCategory';
//import { CSelectContact } from 'customer/CSelectContact';
import { CMember } from 'member/CMember';
import { WebUser } from 'CurrentUser';
import { consts } from './home/consts';
import { CartViewModel, CartService, CartRemoteService, CartLocalService, CartServiceFactory } from 'cart/Cart2';
import { CMe } from 'me/CMe';

export class CCartApp extends CApp {
    cartService: CartService;
    cartViewModel: CartViewModel;
    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;
    currentUser: WebUser;

    cUqOrder: CUq;
    cUqProduct: CUq;
    cUqCommon: CUq;
    cUqWebUser: CUq;
    cUqCustomer: CUq;
    cUqCustomerDiscount: CUq;
    cUqPromotion: CUq;
    cUqWarehouse: CUq;
    cUqMember: CUq;

    cHome: CHome;
    cCart: CCart;
    cProduct: CProduct;
    cOrder: COrder;
    //cSelectContact: CSelectContact;
    cProductCategory: CProductCategory;
    cMember: CMember;
    cMe: CMe;

    protected async internalStart() {
        this.cUqOrder = this.getCUq(consts.uqOrder);
        this.cUqProduct = this.getCUq(consts.uqProduct);
        this.cUqCommon = this.getCUq(consts.uqCommon);
        this.cUqWebUser = this.getCUq(consts.uqWebUser);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);
        this.cUqCustomerDiscount = this.getCUq(consts.uqCustomerDiscount);
        this.cUqPromotion = this.getCUq(consts.uqPromotion);
        this.cUqWarehouse = this.getCUq(consts.uqWarehouse);
        this.cUqMember = this.getCUq(consts.uqMember);

        let salesRegionTuid = this.cUqCommon.tuid('salesregion');
        this.currentSalesRegion = await salesRegionTuid.load(1);

        let languageTuid = this.cUqCommon.tuid('language');
        this.currentLanguage = await languageTuid.load(197);

        this.currentUser = new WebUser(this.cUqWebUser, this.cUqCustomer);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }

        this.cartService = CartServiceFactory.getCartService(this);
        this.cartViewModel = await this.cartService.load();

        this.cProductCategory = new CProductCategory(this, undefined);
        this.cCart = new CCart(this, undefined);
        this.cHome = new CHome(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cOrder = new COrder(this, undefined);
        //this.cSelectContact = new CSelectContact(this, undefined);
        this.cMember = new CMember(this, undefined);
        this.cMe = new CMe(this, undefined);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cProductCategory.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(this.VAppMain, initTabName);
    }

    async loginCallBack(user: User) {
        if (this.cartService.isLocal) {
            let cartLocal = { ...this.cartViewModel } as CartViewModel;
            // this.cartService.clear(this.cartViewModel);
            this.cartService = CartServiceFactory.getCartService(this);
            this.cartViewModel = await this.cartService.load();
            // this.cartViewModel = await this.cartService.merge(cartLocal);
        }
    }

    protected onDispose() {
        this.cartViewModel.dispose();
    }
}
