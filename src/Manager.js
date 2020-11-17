const mongoose = require("mongoose")
const schema = require("./Schema")

class EconomyManager {
    /*
        * Discord-Economy Manager
        * @param {global/server} options Options
    */

    constructor(options = {global: true}) {
        this.db = options.db;
        if(!options.db) throw new Error("Please define mongoDb url {db: 'url'}")

        this.__urlValid().then(r => {
            if(r != true) throw new Error("Please define valid mongoDB url {db: 'url'}")
            this.connect = true
        })
    }

    __urlValid() {
        return new Promise(async (resolve, reject) => {
            mongoose.connect(this.db, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    resolve(true)
                })
                .catch((e) => {
                    reject(false)
                })
        })
    }

    async fetchUser(userId) {
        if(!userId) throw new Error("Please define userId")
        const user = await schema.findOne({uid: userId})
        if(!user) { 
            await schema.create({uid: userId})
            return {
                uid: userId,
                balance: 0,
                bank: 0,
                daily: false,
                work: false,
                rob: false
            }
        }

        return {
            uid: user.uid,
            balance: user.balance,
            bank: user.bank,
            daily: user.daily,
            work: user.work,
            rob: user.rob
        }
    }

    async addMoney(userId, money) {
        if(!userId) throw new Error("Please define userId")
        if(!money) throw new Error("Please define money")
        if(typeof money !== "number") throw new Error("Money is not number")

        const user = await schema.findOne({uid: userId})
        if(!user) { 
            await schema.create({uid: userId, balance: money})
            return {
                uid: userId,
                balance: money,
                newbalance: money,
                bank: 0,
                daily: false,
                work: false,
                rob: false,
                success: true
            }
        }

        var m = user.balance + money
        user.balance = m
        await user.save()
        return {
            uid: user.uid,
            balance: m,
            newbalance: money,
            bank: user.bank,
            daily: user.daily,
            work: user.work,
            rob: user.rob,
            success: true
        }
    }

    async subtractMoney(userId, money) {
        if(!userId) throw new Error("Please define userId")
        if(!money) throw new Error("Please define money")
        if(typeof money !== "number") throw new Error("Money is not number")

        const user = await schema.findOne({uid: userId})
        if(!user) { 
            await schema.create({uid: userId, balance: 0})
            return {
                uid: userId,
                balance: 0,
                newbalance: 0,
                bank: 0,
                daily: false,
                work: false,
                rob: false,
                success: false
            }
        }

        var suc = false
        var m = user.balance - money
        if(user.balance > money || user.balance == money) {
            user.balance = m
            await user.save()
            suc = true
        } 

        return {
            uid: user.uid,
            balance: m,
            newbalance: money,
            bank: user.bank,
            daily: user.daily,
            work: user.work,
            rob: user.rob,
            success: suc
        }
    }

    async daily(userId, money) {
        if(!userId) throw new Error("Please define userId")
        if(!money) throw new Error("Please define money")

        const user = await schema.findOne({uid: userId})
        if(!user) { 
            await schema.create({uid: userId, balance: money, daily: Date.now() + 86400000})
            return {
                uid: userId,
                balance: money,
                newbalance: money,
                bank: 0,
                daily: Date.now() + 86400000,
                work: false,
                rob: false,
                cooldown: false,
                success: true
            }
        }

        let left = user.daily - Date.now();
        let day = 24 * 60 * 60 * 1000;
  
        let _days = left / day;
        let days = Math.floor(_days);
        let _hours = (_days - days) * 24;
        let hours = Math.floor(_hours);
        let mins = Math.floor((_hours - hours) * 60);
        let secs = Math.floor((_hours - hours) * (60 * 60));
        let mills = Math.floor((_hours - hours) * ((60 * 60) * 1000));
        let mics = Math.floor((_hours - hours) * ((60 * 60) * 1000000));
        let nanos = Math.floor((_hours - hours) * ((60 * 60) * 1000000000));
        let picos = Math.floor((_hours - hours) * ((60 * 60) * 1000000000000));

        if(Date.now() < parseInt(user.daily)) return {
            cooldown: true,
            timer: {
                days: days,
                hours: hours,
                mins: mins,
                secs: secs,
                mills: mills,
                mics: mics,
                nanos: nanos,
                picos: picos
            }
        }

        var m = user.balance + money
        user.balance = m
        user.daily = Date.now() + 86400000
        await user.save()

        return {
            uid: user.uid,
            balance: m,
            newbalance: money,
            bank: user.bank,
            daily: Date.now() + 86400000,
            work: user.work,
            rob: user.rob,
            cooldown: false,
            success: true
        }
    }

    async work(userId, money) {
        if(!userId) throw new Error("Please define userId")
        if(!money) throw new Error("Please define money")

        const user = await schema.findOne({uid: userId})
        if(!user) { 
            await schema.create({uid: userId, balance: money, work: Date.now() + 2700000})
            return {
                uid: userId,
                balance: money,
                newbalance: money,
                bank: 0,
                daily: false,
                work: Date.now() + 2700000,
                rob: false,
                cooldown: false,
                success: true
            }
        }

        let left = user.work - Date.now();
        let day = 24 * 60 * 60 * 1000;
  
        let _days = left / day;
        let days = Math.floor(_days);
        let _hours = (_days - days) * 24;
        let hours = Math.floor(_hours);
        let mins = Math.floor((_hours - hours) * 60);
        let secs = Math.floor((_hours - hours) * (60 * 60));
        let mills = Math.floor((_hours - hours) * ((60 * 60) * 1000));
        let mics = Math.floor((_hours - hours) * ((60 * 60) * 1000000));
        let nanos = Math.floor((_hours - hours) * ((60 * 60) * 1000000000));
        let picos = Math.floor((_hours - hours) * ((60 * 60) * 1000000000000));

        if(Date.now() < parseInt(user.work)) return {
            cooldown: true,
            timer: {
                days: days,
                hours: hours,
                mins: mins,
                secs: secs,
                mills: mills,
                mics: mics,
                nanos: nanos,
                picos: picos
            }
        }

        var m = user.balance + money
        user.balance = m
        user.work = Date.now() + 2700000
        await user.save()

        return {
            uid: user.uid,
            balance: m,
            newbalance: money,
            bank: user.bank,
            daily: user.daily,
            work: Date.now() + 2700000,
            rob: user.rob,
            cooldown: false,
            success: true
        }
    }
}

exports.EconomyManager = EconomyManager