import { observable, action } from 'mobx';
import specificBill from '../data/specificBill'
import Bill from './billStoree';
import Representative from './representativeStore';
import User from './userStore';
import { getRecentBillsByMember, getSenatorsByState, getSpecificBill } from '../services/transport-layer';
import login from '../data/sampleLogin';
import { checkLogin, createUser, voteOnBill } from '../services/transport-layer';

class AppState {

    congress = '115';
    pictureURI;

    @observable bills;
    @observable rep;
    @observable token;
    @observable user;
    @observable press;

    @action
    authenticateUser = async (email, password) => {
        let res = await checkLogin(email, password);
        // let res = login;
        console.log(res)
        if (res.success) {
            this.user = new User(res.user);
            this.token = res.token;
            this.rep = new Representative(res.repData);
            this.bills = res.billData.map((bill) => {
                return new Bill(bill)
            });
            this.pictureURI = this.rep.firstName == "Barbara" ? "/lee.jpg" : "/raskin.jpg";
            this.press = res.statementData;
        }
        return res
    };

    @action
    createUser = async (firstName, lastName, address, email, password) => {
        let res = await createUser(firstName, lastName, address, email, password);
        // let res = login;
        if (res.success) {
            this.user = new User(res.user);
            this.token = res.token;
            this.rep = new Representative(res.repData);
            this.bills = res.billData.map((bill) => {
                return new Bill(bill)
            });
            this.press = res.statementData;
        }
        return res
    };

    @action
    voteOnBill = async (billId, num) => {
        let res = await voteOnBill(billId, this.user.email, num);
        if (!res.success) { return err.message };
        for (let i = 0; i < this.bills.length; i++) {
            if (this.bills[i]._id == res.bill._id) {
                this.bills[i] == res.bill;
            }
        }
        return res
    }

    // @action
    // getBills = async () => {
    //     let ids = this.representatives.map((rep) => {return rep.id});
    //     console.log(ids, "ids");
    //     let bills = [];
    //     for (let i = 0; i < ids.length; i++) {
    //         let billsToAdd = await getRecentBillsByMember(ids[i], 'introduced');
    //         bills = bills.concat(billsToAdd);
    //     }
    //
    //     let fullBillsToAdd = [];
    //     for (let i = 0; i < bills.length; i++) {
    //         let newBill = await getSpecificBill(bills[i].bill_uri);
    //
    //         let introduced_status = [];
    //         let house_committee_status =[];
    //         let house_floor_status = [];
    //         let senate_committee_status =[];
    //         let senate_floor_status = [];
    //         for (let i = 0; i < newBill.actions.length; i++) {
    //             if (newBill.actions[i].action_type === "IntroReferral") {
    //                 introduced_status = introduced_status.concat(newBill.actions[i].description)
    //             } else if (newBill.actions[i].action_type === "Committee") {
    //                 if (newBill.actions[i].chamber === "House") {
    //                     house_committee_status = house_committee_status.concat(newBill.actions[i].description)
    //                 } else {
    //                     senate_committee_status = senate_committee_status.concat(newBill.actions[i].description)
    //                 }
    //             } else if (newBill.actions[i].action_type === "Floor") {
    //                 if (newBill.actions[i].chamber === "House") {
    //                     house_floor_status = house_floor_status.concat(newBill.actions[i].description)
    //                 } else {
    //                     senate_floor_status = senate_floor_status.concat(newBill.actions[i].description)
    //                 }
    //             }
    //         }
    //         newBill.introduced_status = introduced_status;
    //         newBill.house_committee_status = house_committee_status;
    //         newBill.house_floor_status = house_floor_status;
    //         newBill.senate_committee_status = senate_committee_status;
    //         newBill.senate_floor_status = senate_floor_status;
    //
    //         fullBillsToAdd = fullBillsToAdd.concat(newBill);
    //     }
    //
    //
    //     // let sBills = [];
    //     // bills.forEach(async (bill) => {
    //     //     sBills += [await getSpecificBill(bill.bill_uri)]
    //     // });
    //     // console.log(sBills);
    //
    //     // let bills_updated = await getRecentBillsByMember(this.member_id, 'updated');
    //     // let bills_with_dups = bills_updated.concat(bills_introduced);
    //     // let bills = bills_with_dups.filter((elem, index, self) => {
    //     //     return index == self.indexOf(elem)
    //     // })
    //     this.bills = bills.map((bill) => {
    //         return new Bill(bill)
    //     });
    //
    //     console.log(this.bills)
    // };
    //
    // @action
    // getSenators = async (state) => {
    //     this.state = state;
    //     let representatives = await getSenatorsByState(this.state);
    //     this.representatives = representatives.map((representative) => {
    //         return new Representative(representative)
    //     });
    // };
}

export default new AppState();