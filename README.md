***What is Discord-EasyEco ?***<br>
## Discord-EasyEco is easy mongoDb economy system :D

*Examples*
```js
const { Manager } = require("discord-easyeco")
const eco = new Manager.EconomyManager({
    db: "your db"
})

(async () => {
    var fetchUser = await eco.fetchUser(1) // 1 = userId
    console.log(fetchUser) // {uid: 1, balance: 0, bank: 0, daily: 'false', work: 'false', rob: 'false'}

    var addMoney = await eco.addMoney(1, 100) // 1 = userId , 100 = add money
    console.log(addMoney) // {uid: 1, balance: 100, newbalance: 100, bank: 0, daily: 'false', work: 'false', rob: 'false', success: true}

    var subtractMoney = await eco.subtractMoney(1, 100) // 1 = userId , 100 = subtract money
    console.log(subtractMoney) // {uid: 1, balance: 0, newbalance: 0, bank: 0, daily: 'false', work: 'false', rob: 'false', success: false} 
    // 0 balance? if(user.balance < money) balance = 0; success = false

    var work = await eco.work(1, 100) // 1 = userId , 100 = add money
    console.log(work) // {uid: 1, balance: 100, newbalance: 100, bank: 0, daily: 'false', work: {TIME}, rob: 'false', cooldown: false, success: true}

    var daily = await eco.daily(1, 100) // 1 = userId , 100 = add money
    console.log(daily) // {uid: 1, balance: 100, newbalance: 100, bank: 0, daily: {TIME}, work: 'false', rob: 'false', cooldown: false, success: true}

    var rob = await eco.rob(1, 2) // 1 = userId , 2 = robUserId
    console.log(daily) // {uid: 1, balance: 100, newbalance: 100, bank: 0, daily: 'false', work: 'false', rob: {TIME}, cooldown: false, success: true}
})
```


## Author: Hyro#8938<br>
## The Developers: https://discord.gg/thedevs<br>
## Blob Labs: https://discord.gg/fZRnshA
