import * as React from 'react';
import Loadable from 'react-loadable';
import { Controller, Loading, nav } from 'tonva-tools';
import { VMember } from './VMember';
import { CCartApp } from 'CCartApp';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class CMember extends Controller {

    cApp: CCartApp;
    @observable member: any;

    constructor(cApp: CCartApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

    protected async internalStart(param: any) {

        let memberAction = this.cApp.cUqMember.action('MemberAction');
        if (this.isLogined) {
            let ma = await memberAction.submit({});
            this.member = { recommendationCode: ma.code, point: ma.point };
        }
    }

    private loginCallback = async () => {
        nav.pop();
        await this.internalStart(undefined);
    }

    render = observer(() => {
        if (this.isLogined) {
            return this.member === undefined ? <Loading /> : this.renderView(VMember);
        } else {
            return <div 
                className="d-flex h-100 align-items-center justify-content-center text-muted">
                <button 
                    className="btn btn-primary"
                    onClick={()=>nav.showLogin(this.loginCallback, true)}>登录</button>
            </div>;
        }
    })

    tab = () => {
        this.start();
        return <this.render />;
    }

    /*{
        let LoadableComponent = Loadable({
            loader: () => import('../CCartApp'),
            loading: Loading,
            render(loaded, props) {
                let { cCartApp } = loaded;
                cCartApp.cMember.start();
                return <cCartApp.cMember.render />
            }
        });
        return <LoadableComponent />;
    }*/
}
