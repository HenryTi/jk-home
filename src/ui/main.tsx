import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva-tools';
import { CCartApp } from 'CCartApp';
import { observable } from 'mobx';
import { meTab } from '../me';

export const store = {
    //homeCount: observable.box<number>(-1),
    //cartCount: observable.box<number>(101),
};

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VHome extends VPage<CCartApp> {
    async showEntry(param?: any) {
        this.openPage(this.render);
    }
    render = (param?: any): JSX.Element => {
        let { cHome, cMember, cCart, cart } = this.controller;
        let faceTabs = [
            { name: 'home', label: '首页', icon: 'home', content: cHome.tab, notify: undefined/*store.homeCount*/ },
            { name: 'member', label: '会员', icon: 'vcard', content: cMember.tab },
            { name: 'cart', label: '购物车', icon: 'shopping-cart', content: cCart.tab, notify: cart.count },
            { name: 'me', label: '我的', icon: 'user', content: meTab }
        ].map(v => {
            let { name, label, icon, content, notify } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
            }
        });
        return <Page header={false}>
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
