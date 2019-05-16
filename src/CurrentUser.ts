import { User, loadAppUqs } from 'tonva-tools';
import { Map, BoxId, CUq, Tuid } from 'tonva-react-uq';
import { observable, computed } from 'mobx';

export class WebUser {

    id: number;
    name: string;
    nick?: string;
    icon?: string;
    guest: number;
    token: string;

    @observable firstName: string;
    gender: string;
    salutation: string;
    @observable organizationName: string;
    departmentName: string;

    telephone: string;
    @observable mobile: string;
    email: string;
    @computed get allowOrdering() {
        return this.currentCustomer !== undefined ||
            (this.mobile && this.firstName && this.organizationName);
    }

    private _user: User;

    private webUserTuid: Tuid;
    private webUserCustomerMap: Map;
    private webUserContactMap: Map;
    private webUserContactsMap: Map;
    private webUserSettingMap: Map;

    private webUserSettings: any;

    private cUsqCustomer: CUq;

    constructor(cUsqWebUser: CUq, cUsqCustomer: CUq) {
        this.webUserTuid = cUsqWebUser.tuid("webUser");
        this.webUserCustomerMap = cUsqWebUser.map('webUserCustomer');
        this.webUserContactMap = cUsqWebUser.map('webUserContact');
        this.webUserContactsMap = cUsqWebUser.map('webUserContacts');
        this.webUserSettingMap = cUsqWebUser.map('webUserSetting');
        this.cUsqCustomer = cUsqCustomer;
    }

    setUser = async (user: User) => {
        if (user !== undefined) {
            this._user = user;
            this.id = user.id;
            this.name = user.name;
            this.nick = user.nick;
            this.icon = user.icon;
            this.guest = user.guest;
            this.token = user.token;

            await this.loadWebUser();
        }
    }

    private async loadWebUser() {
        if (this._user !== undefined) {
            let webUser = await this.webUserTuid.load(this.id);
            if (webUser) {
                let { firstName, gender, salutation, organizationName, departmentName } = webUser;
                this.firstName = firstName;
                this.gender = gender;
                this.salutation = salutation;
                this.organizationName = organizationName;
                this.departmentName = departmentName;
            }
            let contact = await this.webUserContactMap.obj({ webUser: this.id });
            if (contact) {
                let { telephone, mobile, email } = contact;
                this.telephone = telephone;
                this.mobile = mobile;
                this.email = email;
            }
            let value = await this.webUserCustomerMap.obj({ webUser: this.id });
            if (value != undefined)
                this.currentCustomer = new Customer(value.customer, this.cUsqCustomer);
        }
    }

    get isLogined(): boolean {
        return this._user !== undefined;
    }
    get hasCustomer(): boolean {
        return this.currentCustomer !== undefined;
    }
    currentCustomer: Customer;

    async getContacts(): Promise<any[]> {

        if (this.currentCustomer !== undefined) {
            return await this.currentCustomer.getContacts()
        }
        return await this.webUserContactsMap.table({ webUser: this.id });
    }

    async addContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.addContact(contactId);
            return;
        }
        await this.webUserContactsMap.add({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async delContact(contactId: number) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.delContact(contactId);
            return;
        }
        await this.webUserContactsMap.del({ webUser: this.id, arr1: [{ contact: contactId }] });
    }

    async getSetting() {
        this.webUserSettings = await this.webUserSettingMap.obj({ webUser: this.id });
        return this.webUserSettings;
    }

    async setDefaultShippingContact(contactId: BoxId) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultShippingContact(contactId);
            return;
        }
        // await this.webUserSettingMap.add({ webUser: this.id, shippingContact: contactId });
        this.webUserSettings.shippingContact = contactId;
        this.saveDefaultSettings();
    }

    async setDefaultInvoiceContact(contactId: BoxId) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultInvoiceContact(contactId);
            return;
        }
        await this.webUserSettingMap.add({ webUser: this.id, arr1: [{ invoiceContact: contactId }] });
    }

    async setDefaultInvoice(invoiceTypeId: BoxId, invoiceInfoId: BoxId) {
        if (this.currentCustomer !== undefined) {
            await this.currentCustomer.setDefaultInvoice(invoiceTypeId, invoiceInfoId);
            return;
        }
        // await this.webUserSettingMap.add({ webUser: this.id, arr1: [{ invoiceType: invoiceTypeId, invoiceInfo: invoiceInfoId }] });
        this.webUserSettings.invoiceType = invoiceTypeId;
        this.webUserSettings.InvoiceInfo = invoiceInfoId;
        this.saveDefaultSettings();
    }

    async saveDefaultSettings() {
        await this.webUserSettingMap.add(this.webUserSettings);
    }


    async changeWebUser(webUser: any) {
        await this.webUserTuid.save(this.id, webUser);
        await this.loadWebUser();
    }

    async changeWebUserContact(webUserContact: any) {
        webUserContact.webUser = this.id;
        await this.webUserContactMap.add(webUserContact);
        await this.loadWebUser();
    }
};

export class Customer {

    private contactMap: Map;
    id: number;

    private customerSettingMap: Map;

    private customerSettings: any;

    constructor(customer: BoxId, cUsqCustomer: CUq) {
        this.id = customer.id;
        this.contactMap = cUsqCustomer.map('customerContacts');
        this.customerSettingMap = cUsqCustomer.map('customerSetting');
    };

    async getContacts(): Promise<any[]> {
        return await this.contactMap.table({ customer: this.id });
    }

    async addContact(contactId: number) {
        await this.contactMap.add({ customer: this.id, arr1: [{ contact: contactId }] });
    }

    async delContact(contactId: number) {
        await this.contactMap.del({ customer: this.id, arr1: [{ contact: contactId }] });
    }

    async getSetting() {
        this.customerSettings = await this.customerSettingMap.obj({ customer: this.id });
        return this.customerSettings;
    }

    async setDefaultShippingContact(contactId: BoxId) {
        // await this.customerSettingMap.add({ customer: this.id, arr1: [{ defaultShippingContact: contactId }] });
        this.customerSettings.shippingContact = contactId;
        await this.setDefaultSettings();
    }

    async setDefaultInvoiceContact(contactId: BoxId) {
        // await this.customerSettingMap.add({ customer: this.id, arr1: [{ defaultInvoiceContact: contactId }] });
        this.customerSettings.invoiceContact = contactId;
        await this.setDefaultSettings();
    }

    async setDefaultInvoice(invoiceTypeId: BoxId, invoiceInfoId: BoxId) {
        this.customerSettings.invoiceType = invoiceTypeId;
        this.customerSettings.invoiceInfo = invoiceInfoId;
        // await this.customerSettingMap.add({ customer: this.id, arr1: [{ invoiceType: invoiceTypeId, invoiceInfo: invoiceInfoId }] });
        await this.setDefaultSettings();
    }

    async setDefaultSettings() {
        await this.customerSettingMap.add(this.customerSettings);
    }
}