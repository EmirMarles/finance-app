// import data from '../data.json' with { type: 'json' };
import { themes } from "../consts/thems";

export function formatTime(isoString, short) {

    const dateObject = new Date(isoString)

    if (short) {
        const formatted = dateObject.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(',', ''); // "11 Aug 2024"
        return formatted
    }
    else {
        const formatted = dateObject.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');

        return formatted
    }
}

export function formatTimeForRecurring(isoString) {
    const dateObject = new Date(isoString)

    let formatted = dateObject.toLocaleDateString('en-GB', {
        day: '2-digit',
    }).replace(',', ''); // "11 Aug 2024"

    if (formatted === '1') {
        formatted = formatted + 'st'
    } else if (formatted === '2') {
        formatted = formatted + 'nd'
    } else if (formatted === '3') {
        formatted = formatted + 'rd'
    } else {
        formatted = formatted + 'th'
    }

    return formatted
}

export function countTransactionsPages(transactions) {
    const len = transactions.length;
    const pages = len / 18
    let ret = Math.round(pages)

    if (ret < 1) {
        ret = 1
    }
    return ret
}


// const transactions = data.transactions;

function findCategoryInUniqueArray(uniqueArr, category) {
    for (let i = 0; i < uniqueArr.length; i++) {
        if (uniqueArr[i].category === category) {
            return true
        }
    }
    return false
}


export function getAllCategories(transactions) {

    let uniqueCategories = []

    uniqueCategories[0] = {
        category: 'All',
        categoryId: crypto.randomUUID()
    }
    let j = 1;
    for (let i = 0; i < transactions.length; i++) {
        if (!findCategoryInUniqueArray(uniqueCategories, transactions[i].category)) {

            let obj = {
                category: transactions[i].category,
                categoryId: crypto.randomUUID()
            }
            uniqueCategories[j] = obj;
            j++
        }
    }

    return uniqueCategories
}

export function filterTransactions(sort, category, transactions) {

    let firstSort = []

    if (category.category === 'All') {
        firstSort = transactions
    }
    let j = 0
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category === category.category) {
            firstSort[j] = transactions[i];
            j++
        }
    }
    // newest / latest sort
    if (sort === 'new') {
        console.log('')
    } else if (sort === 'late') {
        console.log('')
    }
    return firstSort
}

export function calculateMoneySpentOnCategory(category, transactions) {
    let totalSpent = 0
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category === category) {
            if (transactions[i].amount < 0) {
                totalSpent = totalSpent + transactions[i].amount * (-1)
            }
        }
    }
    return totalSpent
}

export function calculatePercentageBudgetSpent(maximum, spent) {
    const percentage = maximum / spent * 100
    return percentage
}

export function getLatestTransactionsByCategory(transactions, category) {

    let returnTransactions = []
    let j = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (category === transactions[i].category) {
            returnTransactions[j] = transactions[i]
            j++
        }
        if (returnTransactions.length === 3) {
            break
        }
    }
    // three latest
    return returnTransactions
}


export function calculateLimit(budgetData) {
    let limit = 0

    for (let i = 0; i < budgetData.length; i++) {
        limit = limit + budgetData[i].maximum
    }

    return limit
}

export function searchForBills(searchString, recurringBillsData) {
    let searchResults = []

    let j = 0;
    for (let i = 0; i < recurringBillsData.length; i++) {
        if (recurringBillsData[i].name.toUpperCase() === searchString.toUpperCase()) {
            searchResults[j] = recurringBillsData[i]
        }
    }

    return searchResults
}

export function getColorNameByRgbString(rgbString) {
    const colorName = themes.filter(theme => theme.theme === rgbString)
    return colorName.length > 0 ? colorName[0].color : null
}

export function sortRecurringBills(recurringBills, method) {
    let recurringSort = [...recurringBills];
    if (method === 'Latest') {
        recurringSort.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    else {
        recurringSort.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })
    }
    return recurringSort
}

export function getRidOfDuplicateRecurringBills(recurringBills) {
    if (!Array.isArray(recurringBills)) return [];

    const uniqueBillsMap = new Map();

    for (const bill of recurringBills) {
        const uniqueKey = `${bill.name}`;

        if (!uniqueBillsMap.has(uniqueKey)) {
            uniqueBillsMap.set(uniqueKey, bill);
        }
    }

    return Array.from(uniqueBillsMap.values());
}
// // const category = {
// //     avatar: './assets/images/avatars/swift-ride-share.jpg',
// //     name: 'Swift Ride Share',
// //     category: 'Transportation',
// //     date: '2024-07-02T19:50:05Z',
// //     amount: -16.5,
// //     recurring: false
// // }

// // console.log('transactions:', transactions);
// const categories = getAllCategories(transactions)
// console.log('categories:', categories);