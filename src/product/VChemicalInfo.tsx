import * as React from 'react';
import { tv, View } from 'tonva';
import { CProduct, productPropItem } from './CProduct';
import { observer } from 'mobx-react';

export class VChemicalInfo extends View<CProduct> {

    render(param: any): JSX.Element {
        let { id: productId } = param;
        //let { controller } = this;
        //controller.getChemicalInfo(productId);
        return <this.content productId={productId} />;
    }

    private content = observer(({productId}) => {

        //let { productId } = param;
        let chemicalInfo = this.controller.getChemicalInfo(productId);
        //let { chemicalInfoContainer } = this.controller;
        //let chemicalInfo = chemicalInfoContainer[productId];
        if (chemicalInfo === undefined) return null;

        let { chemical, purity, CAS, molecularFomula, molecularWeight } = chemicalInfo;
        return <>
            {productPropItem('CAS', CAS)}
            {productPropItem('纯度', purity)}
        </>
    })
}
